import { useState, useEffect } from "react";
import { HotspotResultItem, HOTSPOT_CITIES } from "../lib/hotspotTypes";
import { buildFallbackHotspotSnapshot } from "../lib/hotspotFallbacks";

export type { HotspotCityConfig, HotspotResultItem } from "../lib/hotspotTypes";
export { HOTSPOT_CITIES } from "../lib/hotspotTypes";

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
              snapshot: buildFallbackHotspotSnapshot(city),
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
