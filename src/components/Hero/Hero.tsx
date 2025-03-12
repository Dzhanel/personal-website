import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from "./ParticlesConfig";

export default function Hero() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const gradientString = "bg-gradient-to-r from-[rgb(3,9,2)] to-[rgba(2,0,36,0)]"
  const year = Math.floor((new Date().getTime() - new Date("2024-09-24").getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  const yearsStr = ['first', 'second', 'third', 'fourth']

  return (
    <div className="flex w-full h-screen text-white p-0 overflow-auto font-[ConsoleNeue]">
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 w-full h-full"
          options={particlesOptions}
        />
      )}
      <div className="flex flex-col p-[5%] justify-center h-full relative rounded-lg z-10 bg-gradient-to-r from-[rgba(13,10,11,1)] via-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)]">
        <div>
          <p className="font-[ConsoleNeue] text-6xl md:text-6px lg:text-8xl">
            Dzhanel Mehmed
          </p>
            <div className="max-w-3xl text-lg break-words overflow-hidden md:text-3xl mt-5">
              A junior web developer and currently a {yearsStr[year]} year student at TU-Sofia
              passionate about building modern and interactive web applications.
              I'm always learning and experimenting with new technologies to
              improve my skills. Excited to learn, create, and grow in the world
              of web development!
            </div>
          <div className="inline-flex">
            <ul className="text-5xl lg:text-7xl mt-20">
              {["TechStack", "Projects", "Contact Me"].map(
                (item) => (
                  <li key={item} className="group cursor-pointer mt-3">
                    <span className="text-lime-400">{"=> "}</span>
                    <span className="inline-block duration-200 transition-transform transform group-hover:translate-x-2">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
