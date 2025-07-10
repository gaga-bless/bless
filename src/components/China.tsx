const China = () => {
  return (
    <>
      <div className="space-gas-container-ufo" style={{ zIndex: 30 }}>
        <div className="ufo">
          <img src="/money.png" alt="money" className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5" />
        </div>
      </div>
      <div className="absolute top-[5%] left-[5%] z-20">
        <img src="/fo1.png" alt="GAGA" className="w-12 animate-[float1_8s_ease-in-out_infinite]" />
      </div>
      <div className="absolute top-[15%] left-[15%] z-20">
        <img src="/fo1.png" alt="GAGA" className="w-16 animate-[float2_10s_ease-in-out_infinite]" />
      </div>
      <div className="absolute top-[8%] left-[25%] z-20">
        <img src="/fo1.png" alt="GAGA" className="w-12 animate-[float3_9s_ease-in-out_infinite]" />
      </div>

      <div className="absolute top-[16%] right-[5%] z-20 transform scale-x-[-1]">
        <img src="/fo1.png" alt="GAGA" className="w-12 animate-[float2_8s_ease-in-out_infinite]" />
      </div>
      <div className="absolute top-[15%] right-[15%] z-20 transform scale-x-[-1]">
        <img src="/fo1.png" alt="GAGA" className="w-16 animate-[float3_10s_ease-in-out_infinite]" />
      </div>
      <div className="absolute top-[8%] right-[25%] z-20 transform scale-x-[-1]">
        <img src="/fo1.png" alt="GAGA" className="w-12 animate-[float1_9s_ease-in-out_infinite]" />
      </div>
    </>
  );
};
export default China;
