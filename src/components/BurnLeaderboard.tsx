import { FC, useEffect, useState } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import { TOKEN_MINT_ADDRESS, RPC_URL } from "../Config";

interface BurnRecord {
  address: string;
  amount: number;
  timestamp: number;
}

// Global state to store leaderboard data
let globalLeaderboardData: BurnRecord[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

export const BurnLeaderboard: FC = () => {
  const [leaderboard, setLeaderboard] = useState<BurnRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const heliusConnection = new Connection(
    RPC_URL,
    "confirmed"
  );

  const fetchBurnLeaderboardData = async (): Promise<BurnRecord[]> => {
    try {
      console.log("begin to fetch burn leaderboard data...");
      const mintPubkey = new PublicKey(TOKEN_MINT_ADDRESS);
      
      let decimals = 6;
      try {
        const mintInfo = await heliusConnection.getParsedAccountInfo(mintPubkey);
        if (
          mintInfo.value && 
          'parsed' in mintInfo.value.data && 
          mintInfo.value.data.parsed.type === 'mint'
        ) {
          decimals = mintInfo.value.data.parsed.info.decimals;
          console.log("Token precision:", decimals);
        }
      } catch (err) {
        console.warn("Failed to get token precision, using default:", err);
      }
      
      console.log("Getting token transaction signatures...");
      const signatures = await heliusConnection.getSignaturesForAddress(mintPubkey, { limit: 1000 });
      console.log(`Found ${signatures.length} transaction signatures`);
      
      const burnRecordMap = new Map<string, number>();
      let processedCount = 0;
      
      for (const sig of signatures) {
        try {
          const tx = await heliusConnection.getParsedTransaction(sig.signature, { maxSupportedTransactionVersion: 0 });
          processedCount++;
          
          if (processedCount % 10 === 0) {
            console.log(`${processedCount}/${signatures.length} transactions processed`);
          }
          
          if (!tx || !tx.meta || !tx.transaction.message.instructions) continue;
          
          const instructions = tx.transaction.message.instructions;
          for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            
            if (
              typeof instruction === 'object' && 
              'parsed' in instruction && 
              instruction.program === 'spl-token' && 
              instruction.parsed?.type === 'burn'
            ) {
              const info = instruction.parsed.info;
              
              if (info && info.mint === TOKEN_MINT_ADDRESS) {
                const burnerAddress = info.authority;
                const burnAmount = Number(info.amount) / Math.pow(10, decimals);
                
                const currentAmount = burnRecordMap.get(burnerAddress) || 0;
                burnRecordMap.set(burnerAddress, currentAmount + burnAmount);
              }
            }
          }
        } catch (err) {
          console.error("fetch burn leaderboard data failed:", err);
        }
      }
      
      console.log(`found ${burnRecordMap.size} burn addresses`);
      
      const burnRecords: BurnRecord[] = Array.from(burnRecordMap.entries()).map(([address, amount]) => ({
        address,
        amount,
        timestamp: Date.now()
      }));
      
      const topBurners = burnRecords.sort((a, b) => b.amount - a.amount).slice(0, 7);
      console.log("top 7 burners:", topBurners);
      
      // Update global cache
      globalLeaderboardData = topBurners;
      lastFetchTime = Date.now();
      
      return topBurners;
    } catch (err) {
      console.error("fetch burn leaderboard data failed:", err);
      return [];
    }
  };

  useEffect(() => {
    const loadLeaderboardData = async () => {
      setLoading(true);
      try {
        // Use cached data if available and not expired
        const now = Date.now();
        if (globalLeaderboardData.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
          console.log("Using cached leaderboard data");
          setLeaderboard(globalLeaderboardData);
          setLoading(false);
          return;
        }
        
        // Fetch new data if cache is empty or expired
        console.log("Cache expired or empty, fetching new data");
        const data = await fetchBurnLeaderboardData();
        setLeaderboard(data);
      } catch (err) {
        console.error("fetch leaderboard failed:", err);
      }
      setLoading(false);
    };

    loadLeaderboardData();
  }, []);

  return (
    <div className="w-full px-4">
    <div className="w-full max-w-md bg-black/50 backdrop-blur-sm rounded-xl p-4 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center bg-golden-gradient text-transparent bg-clip-text">
        Burn Leaderboard
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-gothic-gold/30 border-t-gothic-gold rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-96">
          {leaderboard.length > 0 ? (
            leaderboard.map((record, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center p-3 rounded-lg ${
                  index === 0 ? 'bg-gothic-gold/20' : index === 1 ? 'bg-gothic-gold/15' : index === 2 ? 'bg-gothic-gold/10' : 'bg-gothic-dark/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${index < 3 ? 'text-gothic-gold' : 'text-gothic-gold/80'}`}>{index + 1}</span>
                  <span className="text-gothic-gold/80">{record.address.slice(0, 4)}...{record.address.slice(-4)}</span>
                </div>
                <span className="font-bold text-gothic-gold">{record.amount.toFixed(2)} GAGA</span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gothic-gold/60">No burn records</div>
          )}
        </div>
        )}
      </div>
    </div>
  );
};