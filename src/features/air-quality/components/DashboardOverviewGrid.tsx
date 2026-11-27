import { PollutantGrid } from "@/features/air-quality/PollutantGrid";
import { WeatherCard } from "@/features/air-quality/WeatherCard";
import { AirQualitySnapshot, WeatherCondition } from "@/lib/types";

interface DashboardOverviewGridProps {
  pollutants: AirQualitySnapshot["pollutants"];
  weather: WeatherCondition;
}

/**
 * Responsive dual-column layout presenting the pollutant grid alongside current weather metrics.
 */
export function DashboardOverviewGrid({ pollutants, weather }: DashboardOverviewGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <PollutantGrid pollutants={pollutants} />
      </div>
      <div className="lg:col-span-4">
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
}
