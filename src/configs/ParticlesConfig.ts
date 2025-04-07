import { ISourceOptions } from "@tsparticles/engine";
import heroRaw from "./heroOptions.json"; // Raw JSON file
import techStackRaw from "./techStackOptions.json"; // Raw JSON file

export const useParticlesConfig = () => {
  const heroParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(heroRaw));
  const techStackParticlesOptions: ISourceOptions = JSON.parse(JSON.stringify(techStackRaw));

  return { heroParticlesOptions, techStackParticlesOptions };
};