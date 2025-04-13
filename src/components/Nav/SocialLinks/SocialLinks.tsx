import {
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function SocialLinks({centered}:{centered:boolean}) {
  return (
    <div className={`flex space-x-4 mt-8 align-middle text-center select-none ${centered ? "justify-center" : ""}`}>
      {[
        {
          href: "https://github.com/Dzhanel",
          icon: <FaGithub size={30} />,
        },
        {
          href: "https://linkedin.com/in/dzhanel.mehmed.2005",
          icon: <FaLinkedin size={30} />,
        },
        {
          href: "https://instagram.com/dzhanel_m",
          icon: <FaInstagram size={30} />,
        },
        {
          href: "mailto:dzhanel.mehmed.05@gmail.com",
          icon: <FaEnvelope size={30} />,
        },
        {
          href: "https://dzhanelcv.tiiny.site",
          icon: <FaFileAlt size={30} />,
        },
      ].map(({ href, icon }, index) => (
        <a
          key={index}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="text-white hover:text-lime-500 transform hover:scale-150 align-middle transition duration-300"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
