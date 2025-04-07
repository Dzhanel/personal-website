import { useCallback } from "react";

export default function Nav({ className = "" }) {
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
      {[
        { name: "TechStack", id: "techstack-section" },
        { name: "Projects", id: "projects-section" },
        { name: "Contact Me", id: "contact-section" },
      ].map((item) => (
        <li key={item.name} className="group cursor-pointer mt-3" onClick={() => scrollToSection(item.id)}>
          <span className="text-lime-400 group-hover:text-8xl duration-300">{"=> "}</span>
          <span className="inline-block duration-300 transition-transform transform group-hover:translate-x-4">
            <a>{item.name}</a>
          </span>
        </li>
      ))}
    </ul>
  );
}
