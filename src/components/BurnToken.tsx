import { FC, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  Connection,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getMint,
  createBurnInstruction,
} from "@solana/spl-token";
import { TOKEN_MINT_ADDRESS, RPC_URL } from "../Config";
import { toast } from "react-toastify";

export const BurnToken: FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const connection = new Connection(
    RPC_URL,
    "confirmed"
  );
  const mint = new PublicKey(TOKEN_MINT_ADDRESS);

  useEffect(() => {
    const getTokenAccount = async () => {
      if (!publicKey) return;
      
      try {
        const tokenAccount = await getAssociatedTokenAddress(mint, publicKey);
        const balance = await connection.getTokenAccountBalance(tokenAccount);
        console.log(balance.value.amount);
        setBalance(Number(balance.value.amount) / Math.pow(10, balance.value.decimals));
      } catch (err) {
        console.error("get balance failed:", err);
        setBalance(0);
      }
    };
    
    if (publicKey) {
      getTokenAccount();
    }
  }, [publicKey, connection, mint]);

  const handleBurn = async () => {
    if (!publicKey || !amount) return;
    setLoading(true);
    try {
      const ata = await getAssociatedTokenAddress(mint, publicKey);
      
      const mintInfo = await getMint(connection, mint);
      const decimals = mintInfo.decimals;

      const burnAmount = BigInt(Math.floor(Number(amount) * Math.pow(10, decimals)));
      
      const ix = createBurnInstruction(ata, mint, publicKey, burnAmount);
      
      const tx = new Transaction().add(ix);
      
      console.log("send burn transaction...");
      const sig = await sendTransaction(tx, connection);
      console.log("burn transaction sent, waiting for confirmation:", sig);
      
      const confirmation = await connection.confirmTransaction(sig, "confirmed");
      console.log("burn transaction confirmation:", confirmation);
      
      toast.success(`🔥 success! Ancestors bless you 🔥`);
      setAmount("");
      
      setTimeout(async () => {
        try {
          if (publicKey) {
            const tokenAccount = await getAssociatedTokenAddress(mint, publicKey);
            const balance = await connection.getTokenAccountBalance(tokenAccount);
            setBalance(Number(balance.value.amount) / Math.pow(10, balance.value.decimals));
          }
        } catch (refreshErr) {
          console.error("refresh balance failed:", refreshErr);
        }
      }, 2000);
    } catch (err) {
      console.error("burn failed:", err);
      toast.error("burn failed, please check the console");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (!publicKey) {
    return (
      <div className="w-full px-4">
        <div className="w-full max-w-md bg-black/50 backdrop-blur-sm rounded-xl p-4 mx-auto">
          <div className="text-center">
            <img
              src="/logo.png"
              alt="GAGA"
              className="w-20 h-20 mx-auto mb-4"
            />
            <div className="text-2xl font-semibold text-gothic-gold">🔥 Start your offering 🔥</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black/60 rounded-xl">
      <div className="text-center">
        <img src="/logo.png" alt="GAGA" className="w-20 h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gothic-gold">🔥 Your offering 🔥</h2>
        <p className="text-xl font-bold mt-2 text-gothic-gold/90">
          {`${balance.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} GAGA`}
        </p>
      </div>
      <div className="text-sm text-gothic-gold/60 text-center">
          <p className="flex items-center justify-center">
            <span className="font-semibold">Token Address:</span> {TOKEN_MINT_ADDRESS.slice(0, 5)}...{TOKEN_MINT_ADDRESS.slice(-5)}
            <button
              onClick={() => copyToClipboard(TOKEN_MINT_ADDRESS)}
              className="ml-2 px-2 bg-none text-gothic-gold/80 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </p>
        </div>
      <div className="mt-6 space-y-4">
        <input
          type="number"
          placeholder="Enter burn amount"
          min="0"
          step="0.000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-black/30 border border-gothic-gold text-gothic-gold placeholder-gothic-gold/50 focus:outline-none"
        />

        <button
          onClick={handleBurn}
          disabled={
            loading || !amount || Number(amount) > balance || !publicKey
          }
          className={`w-full py-3 rounded-md font-semibold transition-all duration-300 ${
            loading
              ? "bg-gothic-light/40 cursor-not-allowed"
              : "bg-[#fdc202] hover:bg-[#fdc202]/90"
          }`}
        >
          {loading ? "burning..." : "🔥 burn offering"}
        </button>
        
      </div>
    </div>
  );
};
