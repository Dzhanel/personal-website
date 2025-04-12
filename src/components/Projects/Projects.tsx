import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { useParticlesConfig } from "../../configs/ParticlesConfig";
import Particles from "@tsparticles/react";
import { FaStar } from "react-icons/fa";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string | null;
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
  const [githubData, setGithubData] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/Dzhanel/repos`
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
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="relative min-h-screen mt-20">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />

        <Particles
          id="tsparticles3"
          className="absolute inset-0 w-full h-full"
          options={projectsParticlesOptions}
        />

        <div className="relative z-20">
          <Nav section="Projects" />

          <div className="container mt-10 pt-4 mx-auto px-5">
            {loading ? (
              <div className="w-100 h-100 justify-center text-center border-4 border-lime-500 rounded-full animate-spin border-t-transparent"></div>
            ) : error ? (
              <div className="bg-red-500 font-[ConsoleNeue] bg-opacity-20 border border-red-500 text-white p-4 rounded-lg">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {githubData.map((repo: Repository) => (
                  <Repo key={repo.id} repo={repo} formatDate={formatDate} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />
      </div>
    </>
  );
}

function Repo({
  repo,
  formatDate,
}: {
  repo: Repository;
  formatDate: (dateString: string) => string;
}) {
  return (
    <>
      <a
        key={repo.id}
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferre"
        className="backdrop-blur-sm bg-[rgba(30,30,30,0.5)] hover:bg-[rgba(40,40,40,0.7)] border border-lime-900 rounded-lg p-5 transition-all duration-100 flex flex-col h-full"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-1">{repo.stargazers_count}</span>
            <FaStar />
          </div>
        </div>

        <p className="text-gray-300 mb-4 flex-grow">
          {repo.description || "No description provided"}
        </p>

        <div className="mt-auto">
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="bg-blue-900 bg-opacity-30 text-blue-300 text-xs px-2 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
              {repo.topics.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{repo.topics.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex justify-between items-center text-sm">
            {repo.language && (
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1"
                  style={{
                    backgroundColor:
                      languageColors[repo.language] || languageColors.default,
                  }}
                ></div>
                <span className="text-gray-300">{repo.language}</span>
              </div>
            )}
            <span className="text-gray-400">
              Created {formatDate(repo.created_at)}
            </span>
          </div>
        </div>
      </a>
    </>
  );
}
