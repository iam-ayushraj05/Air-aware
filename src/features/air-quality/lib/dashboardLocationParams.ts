import { ReadonlyURLSearchParams } from "next/navigation";
import { UserLifestyleProfile } from "@/lib/types";

export interface ParsedLocationResult {
  locationName: string;
  latitude: number;
  longitude: number;
  isCustom: boolean;
}

/**
 * Parses URL search parameters for city name and coordinates, falling back to user profile defaults.
 *
 * @param searchParams Next.js ReadonlyURLSearchParams
 * @param fallbackProfile User lifestyle profile for defaults
 * @returns ParsedLocationResult
 */
export function parseDashboardLocationParams(
  searchParams: ReadonlyURLSearchParams,
  fallbackProfile: UserLifestyleProfile
): ParsedLocationResult {
  const cityParam = searchParams.get("city");
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  if (cityParam && latParam && lonParam) {
    const parsedLat = parseFloat(latParam);
    const parsedLon = parseFloat(lonParam);
    if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
      return {
        locationName: cityParam,
        latitude: parsedLat,
        longitude: parsedLon,
        isCustom: true,
      };
    }
  }

  return {
    locationName: fallbackProfile.locationName,
    latitude: fallbackProfile.latitude,
    longitude: fallbackProfile.longitude,
    isCustom: false,
  };
}
