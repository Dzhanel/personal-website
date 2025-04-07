import { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import TechStack from "./components/TechStack/TechStack";
import { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

export default function App() {
  const [initParticles, setInitParticles] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  return (
    <>
      {initParticles && (
        <>
        <div className="relative">
          <div className="relative">
            <Hero />
          </div>
          <div className="h-[20px]" />
          <div id="techstack-section">
            <TechStack />
          </div>
      </div>
        </>
      )}
    </>
  );
}
