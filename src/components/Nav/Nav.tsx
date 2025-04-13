import { useCallback, useState } from "react";
import SocialLinks from "./SocialLinks/SocialLinks";
import MobileMenu from "./MobileMenu/MobileMenu";

export default function Nav({ section }: { section: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setMobileMenuOpen(false);
    }
  }, []);

  const navItems = ["About", "TechStack", "Projects", "Contact Me"];

  return (
    <>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navItems={navItems}
        section={section}
        scrollToSection={scrollToSection}
      />

      <div className="text-center mb-8 md:hidden">
        <h1 className="font-[ConsoleNeue] text-4xl md:text-5xl lg:text-6xl font-bold text-lime-500 mt-6 mb-2 tracking-wide">
          {section}
        </h1>
        <div className="w-24 h-1 bg-lime-500 mx-auto"></div>
      </div>

      <div className="font-[ConsoleNeue] text-center text-3xl md:text-5xl lg:text-7xl font-bold md:pt-10 text-white mx-10 select-none hidden md:block">
        {navItems.map((currentNavItem, index) => (
          <div key={currentNavItem} className="inline-block mx-5 align-middle">
            {index > 0 && (
              <span className="text-gray-500">
                {currentNavItem === section ? (
                  <span className="text-lime-500"> • </span>
                ) : (
                  <span className="text-gray-500"> • </span>
                )}
              </span>
            )}
            <a
              onClick={() =>
                scrollToSection(
                  `${currentNavItem.replace(" ", "").toLowerCase()}-section`
                )
              }
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

      {/* Show social links in desktop view */}
      <div className="hidden md:block">
        <SocialLinks centered={true} />
      </div>
    </>
  );
}
