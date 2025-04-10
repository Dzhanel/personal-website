import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { useParticlesConfig } from "../../configs/ParticlesConfig";
import Particles from "@tsparticles/react";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  topics: string[];
}

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Ruby: "#701516",
  default: "#6e6e6e",
};

export default function Projects() {
  const { projectsParticlesOptions } = useParticlesConfig();
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("Dzhanel");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${githubUser}/repos`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setGithubData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchRepos();
  }, [githubUser]);

  return (
    <>
      <div className="relative min-h-screen mt-20">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />

        <Particles
          id="tsparticles3"
          className="absolute inset-0 w-full h-full"
          options={projectsParticlesOptions}
        />

        <div className="relative z-20 mt-0">
          <Nav section="Projects" />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />
      </div>
    </>
  );
}
