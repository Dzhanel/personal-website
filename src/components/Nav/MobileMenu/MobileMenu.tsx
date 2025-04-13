import { FaBars, FaTimes } from "react-icons/fa";
import SocialLinks from "../SocialLinks/SocialLinks";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  navItems: string[];
  section: string;
  scrollToSection: (sectionId: string) => void;
}

export default function MobileMenu({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  navItems, 
  section,
  scrollToSection 
}: MobileMenuProps) {
  return (
    <>
      <div className="cursor-pointer md:hidden fixed top-4 right-4 z-50">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="cursor-pointer p-2 bg-[rgba(30,30,30,0.7)] border border-lime-700 rounded-md"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className={`font-[ConsoleNeue] fixed inset-y-0 right-0 z-40 w-64 bg-[rgba(13,10,11,0.95)] transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden border-l border-lime-700 backdrop-blur-sm shadow-lg`}>
        <div className="pt-16 px-4">
          {navItems.map((currentNavItem) => (
            <div key={currentNavItem} className="my-5 block">
              <a
                onClick={() => scrollToSection(`${currentNavItem.replace(" ", "").toLowerCase()}-section`)}
                className={`
                  ${currentNavItem === section
                    ? "text-white text-2xl"
                    : "text-gray-500 cursor-pointer hover:text-white hover:translate-x-2 transition-all duration-200"
                  } block text-xl
                `}
              >
                {currentNavItem === section && "=> "}
                {currentNavItem}
              </a>
            </div>
          ))}
          <div className="mt-8">
            <SocialLinks centered={false} />
          </div>
        </div>
      </div>
    </>
  );
}