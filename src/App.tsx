import { WalletContextProvider } from "./contexts/WalletContextProvider";
import Background from "./components/Background";
import { ToastContainer, Zoom } from "react-toastify";
import { BurnToken } from "./components/BurnToken";
import { useEffect, useState } from "react";
import { BurnLeaderboard } from "./components/BurnLeaderboard";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import LoadingPage from "./components/LoadingPage";
function App() {
  const [isBurn, setIsBurn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <WalletContextProvider>
      <div className="min-h-screen w-full">
        {isLoading && <LoadingPage />}
        <Background />
        <div className="relative z-[9999]">
          <div className="absolute right-5 top-4 hidden sm:block">
            <WalletMultiButton />
          </div>
        </div>
        <div className="burnComponent absolute inset-0 w-full h-full z-50 flex flex-col justify-center items-center gap-8">
          <div className="sm:hidden">
            <WalletMultiButton />
          </div>
          {isBurn ? <BurnToken /> : <BurnLeaderboard />}
        </div>

        <div className="flex justify-center items-center gap-4 absolute bottom-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:w-auto">
          <button
            onClick={() => setIsBurn(true)}
            className="w-1/2 sm:w-32 text-gothic-gold/80 hover:text-gothic-gold border-2 border-gothic-gold/80 rounded-md px-4 py-2 bg-gothic-dark/30 hover:bg-gothic-dark/50 transition-all duration-300"
          >
            Burn
          </button>
          <button
            onClick={() => setIsBurn(false)}
            className="w-1/2 sm:w-32 text-gothic-gold/80 hover:text-gothic-gold border-2 border-gothic-gold/80 rounded-md px-4 py-2 bg-gothic-dark/30 hover:bg-gothic-dark/50 transition-all duration-300"
          >
            Leaderboard
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" transition={Zoom} />
    </WalletContextProvider>
  );
}

export default App;
