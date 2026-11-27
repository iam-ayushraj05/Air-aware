import { LocationInfo } from "@/lib/types";

export const POPULAR_CITIES: LocationInfo[] = [
  { name: "New Delhi", country: "India", latitude: 28.61, longitude: 77.21 },
  { name: "London", country: "United Kingdom", latitude: 51.51, longitude: -0.13 },
  { name: "New York", country: "United States", latitude: 40.71, longitude: -74.01 },
  { name: "Beijing", country: "China", latitude: 39.9, longitude: 116.4 },
  { name: "Los Angeles", country: "United States", latitude: 34.05, longitude: -118.24 },
  { name: "Tokyo", country: "Japan", latitude: 35.68, longitude: 139.69 },
];

interface PopularCitiesGridProps {
  onSelectCity: (city: LocationInfo) => void;
}

/**
 * Grid of quick-select metropolitan hubs.
 */
export function PopularCitiesGrid({ onSelectCity }: PopularCitiesGridProps) {
  return (
    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
        Popular Monitored Cities
      </span>
      <div className="grid grid-cols-2 gap-2">
        {POPULAR_CITIES.map((city, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelectCity(city)}
            className="p-2 text-left text-xs rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}
