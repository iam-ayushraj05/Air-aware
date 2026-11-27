import { AirQualitySnapshot } from "@/lib/types";
import { HotspotCityConfig } from "./hotspotTypes";

/**
 * Builds marked simulated fallback data for global city hotspots when external APIs are unreachable.
 *
 * @param city City configuration containing coordinates and country
 * @returns AirQualitySnapshot with demo marker
 */
export function buildFallbackHotspotSnapshot(city: HotspotCityConfig): AirQualitySnapshot {
  const isDelhi = city.name === "New Delhi";
  const isLondon = city.name === "London";

  return {
    aqi: isDelhi ? 268 : isLondon ? 42 : 68,
    category: isDelhi ? "very_unhealthy" : isLondon ? "good" : "moderate",
    standard: "US_AQI",
    pollutants: {
      pm2_5: {
        value: isDelhi ? 182 : 9.8,
        unit: "µg/m³",
        label: "PM2.5",
        safeLimit: 15,
        status: isDelhi ? "severe" : isLondon ? "good" : "moderate",
      },
      pm10: {
        value: isDelhi ? 310 : 16.4,
        unit: "µg/m³",
        label: "PM10",
        safeLimit: 45,
        status: isDelhi ? "severe" : isLondon ? "good" : "moderate",
      },
    },
    weather: {
      temperature: 14,
      humidity: 75,
      windSpeed: 8,
      weatherCode: 1,
      conditionText: "Simulated Data",
    },
    hourly: [],
    location: {
      name: city.name,
      country: city.country,
      latitude: city.lat,
      longitude: city.lon,
    },
    dataSource: "demo",
    updatedAt: new Date().toISOString(),
    isWinterSmogActive: isDelhi,
  };
}
