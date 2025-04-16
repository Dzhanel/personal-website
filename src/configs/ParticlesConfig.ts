import { ISourceOptions } from "@tsparticles/engine";
import heroRaw from "./heroOptions.json";
import techStackRaw from "./techStackOptions.json";
import projectsRaw from "./projectsOptions.json"
import contactMeRaw from "./contactMe.json"

export const useParticlesConfig = () => {
  const heroParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(heroRaw)) as ISourceOptions;
  const techStackParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(techStackRaw)) as ISourceOptions;
  const projectsParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(projectsRaw)) as ISourceOptions;
  const contactMeParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(contactMeRaw)) as ISourceOptions;

  return { heroParticlesOptions,projectsParticlesOptions, techStackParticlesOptions, contactMeParticlesOptions };
};