import { useEffect, useState, useRef } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import TechStack from "./components/TechStack/TechStack";
import { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import Projects from "./components/Projects/Projects";
import ContactMe from "./components/ContactMe/ContactMe";

// Custom hook for viewport detection
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

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
          <section id="about-section">
            <Hero />
          </section>
          <div className="h-[25vh]" />
          <section id="techstack-section">
            <TechStack />
          </section>
          <div className="h-[25vh]" />
          <section id="projects-section">
            <Projects />
          </section>
          <div className="h-[25vh]" />
          <section id="contactme-section">
            <ContactMe />
          </section>
        </>
      )}
    </>
  );
}
