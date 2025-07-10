import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletContextProvider } from "./contexts/WalletContextProvider";
import { BurnToken } from "./components/BurnToken";
import Background from "./components/Background";

function App() {
  return (
    <WalletContextProvider>
      <div className="min-h-screen w-full">
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
          <BurnToken />
        </div>
      </div>
    </WalletContextProvider>
  );
}

export default App;
