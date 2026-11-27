import { AirQualitySnapshot } from "@/lib/types";
import { DEMO_CITIES } from "./demo-cities";

export { DEMO_CITIES } from "./demo-cities";

/**
 * Returns a fallback AirQualitySnapshot clearly labeled with dataSource: "demo".
 *
 * @param locationName Display location name
 * @param lat Latitude coordinate
 * @param lon Longitude coordinate
 * @returns Fully populated AirQualitySnapshot with simulated metrics
 */
export function getFallbackDemoData(
  locationName: string = "New Delhi",
  lat: number = 28.61,
  lon: number = 77.21
): AirQualitySnapshot {
  const normalized = locationName.toLowerCase();
  let base: AirQualitySnapshot = DEMO_CITIES["delhi"] ?? {
    aqi: 120,
    category: "sensitive",
    standard: "US_AQI",
    pollutants: {
      pm2_5: { value: 43, unit: "µg/m³", label: "PM2.5", safeLimit: 15, status: "moderate" },
      pm10: { value: 75, unit: "µg/m³", label: "PM10", safeLimit: 45, status: "moderate" },
    },
    weather: { temperature: 18, humidity: 55, windSpeed: 8, weatherCode: 1, conditionText: "Mild" },
    hourly: [],
    location: { name: locationName, latitude: lat, longitude: lon },
    dataSource: "demo",
    updatedAt: new Date().toISOString(),
    isWinterSmogActive: false,
  };

  if (normalized.includes("london") && DEMO_CITIES["london"]) {
    base = DEMO_CITIES["london"];
  } else if (
    (normalized.includes("new york") || normalized.includes("nyc")) &&
    DEMO_CITIES["newyork"]
  ) {
    base = DEMO_CITIES["newyork"];
  }

  return {
    ...base,
    location: {
      name: locationName,
      latitude: lat,
      longitude: lon,
    },
    dataSource: "demo",
    updatedAt: new Date().toISOString(),
  };
}
