 
const LoadingPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-page z-[99999] fixed">
      <div className="w-14 h-14 flex flex-col items-center">
        <img src="/logo.png" alt="logo" className="w-18 h-18" />
        <span className="text-2xl mt-2">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;