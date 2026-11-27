"use client";

import { Card } from "@/components/ui/Card";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { useCityHotspots, HOTSPOT_CITIES } from "./hooks/useCityHotspots";
import { CityHotspotCard } from "./components/CityHotspotCard";

/**
 * Grid component showcasing live air quality hotspots across global metropolitan regions.
 */
export function LandingCityHotspots() {
  const { cityData, loading } = useCityHotspots();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {HOTSPOT_CITIES.map((city) => {
        const item = cityData[city.name];

        if (loading || !item) {
          return (
            <Card key={city.name} className="space-y-3">
              <LoadingSkeleton className="h-6 w-32" />
              <LoadingSkeleton className="h-4 w-44" />
              <LoadingSkeleton className="h-10 w-24 rounded-full" />
              <LoadingSkeleton className="h-16 w-full" />
              <LoadingSkeleton className="h-9 w-full rounded-lg" />
            </Card>
          );
        }

        return <CityHotspotCard key={city.name} city={city} snapshot={item.snapshot} />;
      })}
    </div>
  );
}
