import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadFirePreset } from "@tsparticles/preset-fire";// if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
useEffect(() => {
  initParticlesEngine(async (engine) => {
    await loadFirePreset(engine); // Load only the fire preset
  }).then(() => {
    setInit(true);
  });
}, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

 const options: ISourceOptions = useMemo(() => ({
  preset: "fire", // this activates the fire preset
}), []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};


export default ParticlesBackground