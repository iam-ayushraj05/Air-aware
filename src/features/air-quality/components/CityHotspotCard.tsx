import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { AirQualitySnapshot } from "@/lib/types";
import { getAQICategoryInfo } from "@/lib/aqi";
import { HotspotCityConfig } from "../hooks/useCityHotspots";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

interface CityHotspotCardProps {
  city: HotspotCityConfig;
  snapshot: AirQualitySnapshot;
}

/**
 * Card rendering city AQI category, pollutant metrics, and dashboard link.
 */
export function CityHotspotCard({ city, snapshot }: CityHotspotCardProps) {
  const categoryInfo = getAQICategoryInfo(snapshot.aqi, snapshot.standard);

  return (
    <Card className="hover:border-emerald-400 transition-all space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{city.name}</h3>
            <span className="text-xs text-slate-500">
              {city.context} &bull; {city.country}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className={clsx(
                "px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xs",
                snapshot.aqi <= 50 && "bg-emerald-800",
                snapshot.aqi > 50 && snapshot.aqi <= 100 && "bg-amber-800",
                snapshot.aqi > 100 && snapshot.aqi <= 150 && "bg-orange-800",
                snapshot.aqi > 150 && snapshot.aqi <= 200 && "bg-rose-800",
                snapshot.aqi > 200 && snapshot.aqi <= 300 && "bg-purple-900",
                snapshot.aqi > 300 && "bg-red-950"
              )}
            >
              AQI {snapshot.aqi}
            </span>
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
              {categoryInfo.label}
            </span>
          </div>
        </div>

        <div className="pt-1">
          <DataSourceBadge origin={snapshot.dataSource} updatedAt={snapshot.updatedAt} />
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1">
          <div className="flex justify-between text-slate-700 dark:text-slate-300">
            <span>PM2.5 Concentration:</span>
            <span className="font-bold">{snapshot.pollutants.pm2_5.value} µg/m³</span>
          </div>
          <div className="flex justify-between text-slate-700 dark:text-slate-300">
            <span>Surface Wind:</span>
            <span className="font-bold">{snapshot.weather.windSpeed} km/h</span>
          </div>
          <div className="flex justify-between text-slate-700 dark:text-slate-300">
            <span>Atmosphere:</span>
            <span className="font-medium text-emerald-700 dark:text-emerald-300">
              {snapshot.weather.conditionText}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {categoryInfo.summary}
        </p>
      </div>

      <Link
        href={`/dashboard?city=${encodeURIComponent(city.name)}&lat=${city.lat}&lon=${city.lon}`}
        className="w-full text-xs flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 hover:border-emerald-600 font-medium rounded-lg py-3 px-4 min-h-[48px] text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
        aria-label={`View live city dashboard for ${city.name}`}
      >
        <span>View {city.name} Dashboard</span>
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Link>
    </Card>
  );
}
