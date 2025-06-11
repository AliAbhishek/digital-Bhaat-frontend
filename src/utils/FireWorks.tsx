import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";


const Fireworks = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFireworksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "fireworks",
        background: {
          color: "transparent",
        },
        fullScreen: {
          enable: true,
          zIndex: 1,
        },
      }}
    />
  );
};

export default Fireworks;