import { useParticlesConfig } from "../../configs/ParticlesConfig";
import { useCallback } from "react";
import SocialLinks from "../Nav/SocialLinks/SocialLinks";
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
          id="tsparticles1"
          className="absolute inset-0 w-full h-full"
          options={heroParticlesOptions}
        />

        <div className="flex flex-col p-[5%] h-full relative rounded-lg z-15 bg-gradient-to-r lg:from-[rgba(13,10,11,1)] lg:via-[rgba(13,10,11,1)] lg:to-[rgba(13,10,11,0)]">
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
          <div className="inline-flex">
            <Nav />
          </div>
          <SocialLinks centered={false} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)]" />
      </div>
    </>
  );
}

function Nav({ className = "" }) {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <ul className={`text-5xl lg:text-7xl mt-20 select-none ${className}`}>
      {["TechStack", "Projects", "Contact Me"].map((item) => (
        <li
          key={item}
          className="group cursor-pointer mt-3"
          onClick={() => scrollToSection(`${item.replace(" ", "").toLowerCase()}-section`)}
        >
          <span className="text-lime-400 group-hover:text-8xl duration-300">
            {"=> "}
          </span>
          <span className="inline-block duration-300 transition-transform transform group-hover:translate-x-4">
            <a>{item}</a>
          </span>
        </li>
      ))}
    </ul>
  );
}
