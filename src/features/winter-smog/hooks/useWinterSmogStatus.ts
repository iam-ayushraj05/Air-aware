import { isWinterInversionRisk } from "../lib/winterSmogPhysics";

/**
 * Custom hook calculating inversion risk from temperature and wind velocity.
 */
export function useWinterSmogStatus(tempC: number, windSpeed: number) {
  const isLikely = isWinterInversionRisk(tempC, windSpeed);
  return { isLikely };
}
