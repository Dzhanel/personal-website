import { useParticlesConfig } from "../../configs/ParticlesConfig";
import Nav from "./HeroNav/HeroNav";
import Particles from "@tsparticles/react";

export default function Hero() {
  const year = Math.floor(
    (new Date().getTime() - new Date("2024-09-24").getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
  );
  const yearsStr = ["first", "second", "third", "fourth"];
  const { heroParticlesOptions } = useParticlesConfig();

  return (
    <>
      <title>Welcome to My Website</title>
      <div className="flex w-full h-screen text-white p-0 font-[ConsoleNeue]">
        <Particles
          id="tsparticles"
          className="absolute inset-0 w-full h-full"
          options={heroParticlesOptions}
        />

        <div className="flex flex-col p-[5%] h-full relative rounded-lg z-10 bg-gradient-to-r from-[rgba(13,10,11,1)] via-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)]">
          <p className="font-[ConsoleNeue] text-6xl md:text-6px lg:text-8xl">
            Dzhanel Mehmed
          </p>
          <div className="max-w-3xl text-lg md:text-3xl mt-5">
            A junior web developer and currently a {yearsStr[year]} year student
            at TU-Sofia passionate about building modern and interactive web
            applications. I'm always learning and experimenting with new
            technologies to improve my skills. Excited to learn, create, and
            grow in the world of web development!
          </div>
          <div className="inline-flex sticky top-10 z-20">
            <Nav />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)]" />
      </div>
    </>
  );
}
