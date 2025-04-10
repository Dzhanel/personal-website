import { ISourceOptions } from "@tsparticles/engine";
import heroRaw from "./heroOptions.json";
import techStackRaw from "./techStackOptions.json";
import projectsRaw from "./projectsOptions.json"

export const useParticlesConfig = () => {
  const heroParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(heroRaw));
  const techStackParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(techStackRaw));
  const projectsParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(projectsRaw));

  return { heroParticlesOptions,projectsParticlesOptions, techStackParticlesOptions };
};