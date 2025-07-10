import { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getMint,
  createBurnInstruction,
} from "@solana/spl-token";

const TOKEN_MINT_ADDRESS = "REPLACE_WITH_GAGA_TOKEN_ADDRESS"; // 👈 Token Mint

export const BurnToken: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!publicKey) return;
    const mint = new PublicKey(TOKEN_MINT_ADDRESS);
    const ata = await getAssociatedTokenAddress(mint, publicKey);
    const balance = await connection.getTokenAccountBalance(ata);
    setBalance(Number(balance.value.amount));
  };

  useEffect(() => {
    fetchBalance();
  }, [publicKey]);

  const handleBurn = async () => {
    if (!publicKey || !amount) return;
    setLoading(true);
    try {
      const mint = new PublicKey(TOKEN_MINT_ADDRESS);

      const ata = await getAssociatedTokenAddress(mint, publicKey);

      const mintInfo = await getMint(connection, mint);
      const decimals = mintInfo.decimals;

      const burnAmount = BigInt(
        Math.floor(Number(amount) * Math.pow(10, decimals))
      );

      const burnIx = createBurnInstruction(ata, mint, publicKey, burnAmount);

      const tx = new Transaction().add(burnIx);
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");

      alert(`🔥 Burned! Transaction hash: ${signature}`);
      fetchBalance();
    } catch (err) {
      console.error("🔥 Burn failed:", err);
      alert("Burn failed, please check the console for details.");
    }
    setLoading(false);
  };

  if (!publicKey) {
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 px-8">
        <div className="space-y-6 w-full bg-black/50 backdrop-blur-sm rounded-xl p-4">
          <div className="text-center">
            <img src="/logo.png" alt="GAGA" className="w-20 h-20 mx-auto mb-4" />
            {/* <h2 className="text-2xl font-semibold mb-2 bg-golden-gradient text-transparent bg-clip-text">
              Connect your wallet to burn your offerings
            </h2> */}
            <h2 className="text-2xl font-semibold mb-2 bg-golden-gradient text-transparent bg-clip-text">
              Coming Soon
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 px-8">
      <div className="space-y-6 w-full bg-black/50 backdrop-blur-sm rounded-xl p-4">
        <div className="text-center">
          <img src="/logo.png" alt="GAGA" className="w-20 h-20 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2 bg-golden-gradient text-transparent bg-clip-text">
            Your Offerings
          </h2>
          <div className="text-4xl font-bold text-gothic-gold">
            {balance.toFixed(2)} GAGA
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              placeholder="Enter amount to burn"
              min="0"
              step="0.000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gothic-dark/50 border border-gothic-gold/30 rounded-lg px-4 py-3 text-gothic-gold placeholder-gothic-gold/50 focus:outline-none focus:ring-2 focus:ring-gothic-gold/50"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gothic-gold/50">
              GAGA
            </div>
          </div>

          <button
            onClick={handleBurn}
            disabled={loading || !amount}
            className={`w-full py-4 px-6 rounded-lg font-semibold ${
              loading
                ? "bg-gothic-light/50 cursor-not-allowed"
                : "bg-[#fdc202] hover:bg-[#fdc202]/90"
            } transition-all duration-300`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-gothic-gold/30 border-t-gothic-gold rounded-full animate-spin"></div>
                <span>Burning...</span>
              </div>
            ) : (
              "🔥Burn Offering"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
