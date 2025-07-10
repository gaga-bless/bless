import China from "./China";
import Particles from "./Particles";

const Background = () => {
  return (
    <div className="about-bonk-container">
      <div className="background-wrapper">
        <div className="absolute inset-0 z-15">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.2}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={true}
          />
        </div>
        <div className="space-gas-container">
          <div className="space-gas">
            <img src="/SpaceGas-1.f187bac30df4e4c8fc8b.webp" alt="Space Gas 1" />
          </div>
          <div className="space-gas">
            <img src="/SpaceGas-2.53a69eaa9a192b8aad06.webp" alt="Space Gas 2" />
          </div>
          <div className="space-gas">
            <img src="/SpaceGas-3.c6228de47c59ea974b0e.webp" alt="Space Gas 3" />
          </div>
          <div className="space-gas">
            <img src="/SpaceGas-4.26724f0b055fda7e705b.webp" alt="Space Gas 4" />
          </div>
          <div className="space-gas">
            <img src="/SpaceGas-5.c05b99faacf0dcc6ddaa.webp" alt="Space Gas 5" />
          </div>
          <div className="space-gas">
            <img src="/SpaceGas-Dark.0698a05e443ede496e2e.webp" alt="Space Gas 6" />
          </div>
          <div className="space-gas">
            <img src="/SpaceGas.36d3b0c58bcbd7efba34.webp" alt="Space Gas 7" />
          </div>
        </div>
        <div className="clouds-back-container" style={{ zIndex: 13 }}>
          <div className="clouds-back">
            <img src="/cloud2.1dcdeae3af1626f9e3aa.webp" alt="Cloud 2" />
          </div>
          <div className="clouds-back3">
            <img src="/cloud3.a9fd8f35d3a91fdb0a87.webp" alt="Cloud 3" />
          </div>
          <div className="clouds-back">
            <img src="/cloud4.de217b1aaf6ad8270cbd.webp" alt="Cloud 4" />
          </div>
        </div>
        <div className="space-gas-container-stars" style={{ zIndex: 12 }}>
          <div className="stars">
            <img src="/Stars-1.5460b4c9e5b842112a96.webp" alt="Star 1" />
          </div>
        </div>
        <div className="space-gas-container-stars-2" style={{ zIndex: 12 }}>
          <div className="stars">
            <img src="/Stars.bb5fa88b3a2843d1bfd3.webp" alt="Star 2" />
          </div>
        </div>

        <div className="space-gas-container-cloud-front" style={{ zIndex: 15 }}>
          <div className="cloud-front-1">
            <img src="/cloud1.29bf8fb78a23fc9d92a1.webp" alt="Cloud 1" />
          </div>
        </div>

        <China />
      </div>
    </div>
  );
};
export default Background;
