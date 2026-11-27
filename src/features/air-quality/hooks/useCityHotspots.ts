import { useState, useEffect } from "react";
import { AirQualitySnapshot } from "@/lib/types";

export interface HotspotCityConfig {
  name: string;
  country: string;
  lat: number;
  lon: number;
  context: string;
}

export const HOTSPOT_CITIES: HotspotCityConfig[] = [
  {
    name: "New Delhi",
    country: "India",
    lat: 28.61,
    lon: 77.21,
    context: "Winter Stagnation Season",
  },
  {
    name: "London",
    country: "United Kingdom",
    lat: 51.51,
    lon: -0.13,
    context: "Maritime Atlantic Flow",
  },
  {
    name: "New York",
    country: "United States",
    lat: 40.71,
    lon: -74.01,
    context: "Urban Corridor",
  },
];

export interface HotspotResultItem {
  snapshot: AirQualitySnapshot;
  isError: boolean;
}

/**
 * Custom hook fetching live Open-Meteo air quality for major global hotspots
 * with marked simulated fallback data if network is unreachable.
 */
export function useCityHotspots() {
  const [cityData, setCityData] = useState<Record<string, HotspotResultItem>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAllHotspots() {
      const results: Record<string, HotspotResultItem> = {};

      await Promise.all(
        HOTSPOT_CITIES.map(async (city) => {
          try {
            const res = await fetch(
              `/api/air-quality?lat=${city.lat}&lon=${city.lon}&name=${encodeURIComponent(city.name)}`
            );
            if (!res.ok) throw new Error("Fetch failed");
            const json = await res.json();
            if (json.data) {
              results[city.name] = { snapshot: json.data, isError: false };
            } else {
              throw new Error("No data returned");
            }
          } catch {
            results[city.name] = {
              snapshot: {
                aqi: city.name === "New Delhi" ? 268 : city.name === "London" ? 42 : 68,
                category:
                  city.name === "New Delhi"
                    ? "very_unhealthy"
                    : city.name === "London"
                      ? "good"
                      : "moderate",
                standard: "US_AQI",
                pollutants: {
                  pm2_5: {
                    value: city.name === "New Delhi" ? 182 : 9.8,
                    unit: "µg/m³",
                    label: "PM2.5",
                    safeLimit: 15,
                    status: "moderate",
                  },
                  pm10: {
                    value: city.name === "New Delhi" ? 310 : 16.4,
                    unit: "µg/m³",
                    label: "PM10",
                    safeLimit: 45,
                    status: "moderate",
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
                isWinterSmogActive: city.name === "New Delhi",
              },
              isError: true,
            };
          }
        })
      );

      if (isMounted) {
        setCityData(results);
        setLoading(false);
      }
    }

    fetchAllHotspots();

    return () => {
      isMounted = false;
    };
  }, []);

  return { cityData, loading };
}
