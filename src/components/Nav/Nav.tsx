import { useCallback } from "react";
import SocialLinks from "./SocialLinks/SocialLinks";

export default function Nav({ section }: { section: string }) {
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
    <>
      <div className="font-[ConsoleNeue] text-center text-3xl md:text-5xl lg:text-7xl font-bold p md:pt-10 text-white mx-10">
        {["About", "TechStack", "Projects", "Contact Me"].map((currentNavItem, index) => (
          <div key={currentNavItem} className="inline-block mx-5 align-middle">
            {index > 0 && <span className={`text-${currentNavItem === section ? "lime" : "gray"}-500`}> • </span>}
            <a
              onClick={() => scrollToSection(`${currentNavItem.replace(" ", "").toLowerCase()}-section`)}
              className={`
                ${
                  currentNavItem === section
                    ? "text-white"
                    : "text-gray-500 text-2xl md:text-4xl lg:text-5xl cursor-pointer align-middle md:hover:text-5xl lg:hover:text-6xl hover:text-white hover:scale-110 transition-all duration-200"
                }
              `}
            >
              {currentNavItem}
            </a>
          </div>
        ))}
      </div>
      <SocialLinks centered={true} />
    </>
  );
}
