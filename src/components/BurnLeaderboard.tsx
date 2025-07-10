import { FC, useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";

interface BurnRecord {
  address: string;
  amount: number;
  timestamp: number;
}

export const BurnLeaderboard: FC = () => {
  const { connection } = useConnection();
  const [leaderboard, setLeaderboard] = useState<BurnRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // 这里调用您的API或直接从链上获取数据
        // const data = await fetchBurnLeaderboardData();
        // 示例数据
        const data = [
          { address: "8xJUJ...1234", amount: 1000, timestamp: Date.now() },
          { address: "9zKLM...5678", amount: 750, timestamp: Date.now() - 3600000 },
          { address: "7yNOP...9012", amount: 500, timestamp: Date.now() - 7200000 },
          { address: "8xJUJ...1234", amount: 1000, timestamp: Date.now() },
          { address: "9zKLM...5678", amount: 750, timestamp: Date.now() - 3600000 },
          { address: "7yNOP...9012", amount: 500, timestamp: Date.now() - 7200000 },
          { address: "8xJUJ...1234", amount: 1000, timestamp: Date.now() },
        ];
        setLeaderboard(data);
      } catch (err) {
        console.error("获取排行榜失败:", err);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, [connection]);

  return (
    <div className="w-full px-4">
    <div className="w-full max-w-md bg-black/50 backdrop-blur-sm rounded-xl p-4 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center bg-golden-gradient text-transparent bg-clip-text">
        Top Burners
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-gothic-gold/30 border-t-gothic-gold rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto">
          {leaderboard.map((record, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center p-3 rounded-lg ${
                index === 0 ? 'bg-gothic-gold/20' : 'bg-gothic-dark/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-gothic-gold">{index + 1}</span>
                <span className="text-gothic-gold/80">{record.address.slice(0, 4)}...{record.address.slice(-4)}</span>
              </div>
              <span className="font-bold text-gothic-gold">{record.amount} GAGA</span>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};