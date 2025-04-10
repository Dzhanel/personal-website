import Particles from "@tsparticles/react";
import { useParticlesConfig } from "../../configs/ParticlesConfig";
import { useState } from "react";
import Nav from "../Nav/Nav";
interface TechCardProps {
  title: string;
  skills: string;
}

export default function TechStack() {
  const { techStackParticlesOptions } = useParticlesConfig();
  const techCards = [
    {
      title: "Languages",
      skills: "C#, JavaScript, Python, C, Ruby, Haskell, SQL",
    },
    {
      title: "Frameworks & libraries",
      skills:
        "ASP.NET, Ruby On Rails, React, NextJS, Node.JS, TailwindCSS, Bootstrap",
    },
    {
      title: "And More",
      skills: "Git, Unix/Linux",
    },
  ];

  return (
    <div className="relative min-h-screen mt-20">
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />

      <Particles
        id="tsparticles2"
        className="absolute inset-0 w-full h-full"
        options={techStackParticlesOptions}
      />

      <div className="relative z-20 mt-0">
        <Nav section="TechStack" />

        <div className="flex flex-col lg:flex-row justify-center items-center mt-10 md:mt-24 px-4 space-y-16 lg:space-y-0 lg:space-x-16 xl:space-x-24">
          {techCards.map((card, index) => (
            <TechCard key={index} title={card.title} skills={card.skills} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />
    </div>
  );
}

function TechCard({ title, skills }: TechCardProps) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / 15;
    const tiltY = -(x - centerX) / 15;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`,
      boxShadow: `
        0 5px 15px rgba(0, 0, 0, 0.3),
        ${tiltY * 0.5}px ${tiltX * 0.5}px 15px rgba(255, 255, 255, 0.1)
      `,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
    });
  };

  return (
    <div
      className="font-[ConsoleNeue] w-[90%] max-w-lg md:max-w-xl lg:w-[500px] xl:w-[550px]
                h-96 md:h-[450px] lg:h-[500px] xl:h-[550px]
                border border-lime-700 rounded-lg
                flex flex-col justify-center items-center cursor-pointer
                backdrop-blur-sm bg-[rgba(30,30,30,0.7)]
                transition-all duration-300 ease-out"
      style={{
        ...tiltStyle,
        transition: "all 0.1s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center p-6 md:p-10 lg:p-12 overflow-hidden">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white relative z-10">
          {title}
        </h2>
        <div className="w-24 md:w-32 lg:w-40 h-1 bg-lime-500 my-4 md:my-6 lg:my-8 rounded-full"></div>
        <p className="mt-6 md:mt-8 lg:mt-10 text-center text-xl md:text-2xl lg:text-3xl relative z-10 px-4 md:px-6 lg:px-8">
          {skills}
        </p>
      </div>
    </div>
  );
}
