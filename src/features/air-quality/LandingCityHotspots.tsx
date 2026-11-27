"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { AirQualitySnapshot } from "@/lib/types";
import { getAQICategoryInfo } from "@/lib/aqi";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

interface HotspotCityConfig {
  name: string;
  country: string;
  lat: number;
  lon: number;
  context: string;
}

const HOTSPOT_CITIES: HotspotCityConfig[] = [
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

export function LandingCityHotspots() {
  const [cityData, setCityData] = useState<Record<string, { snapshot: AirQualitySnapshot; isError: boolean }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAllHotspots() {
      const results: Record<string, { snapshot: AirQualitySnapshot; isError: boolean }> = {};

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
            // Graceful fallback clearly marked as DEMO DATA
            results[city.name] = {
              snapshot: {
                aqi: city.name === "New Delhi" ? 268 : city.name === "London" ? 42 : 68,
                category: city.name === "New Delhi" ? "very_unhealthy" : city.name === "London" ? "good" : "moderate",
                standard: "US_AQI",
                pollutants: {
                  pm2_5: { value: city.name === "New Delhi" ? 182 : 9.8, unit: "µg/m³", label: "PM2.5", safeLimit: 15, status: "moderate" },
                  pm10: { value: city.name === "New Delhi" ? 310 : 16.4, unit: "µg/m³", label: "PM10", safeLimit: 45, status: "moderate" },
                },
                weather: { temperature: 14, humidity: 75, windSpeed: 8, weatherCode: 1, conditionText: "Simulated Data" },
                hourly: [],
                location: { name: city.name, country: city.country, latitude: city.lat, longitude: city.lon },
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

        const snap = item.snapshot;
        const categoryInfo = getAQICategoryInfo(snap.aqi, snap.standard);

        return (
          <Card key={city.name} className="hover:border-emerald-400 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {city.name}
                  </h3>
                  <span className="text-xs text-slate-500">{city.context} &bull; {city.country}</span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={clsx(
                      "px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xs",
                      snap.aqi <= 50 && "bg-emerald-800",
                      snap.aqi > 50 && snap.aqi <= 100 && "bg-amber-800",
                      snap.aqi > 100 && snap.aqi <= 150 && "bg-orange-800",
                      snap.aqi > 150 && snap.aqi <= 200 && "bg-rose-800",
                      snap.aqi > 200 && snap.aqi <= 300 && "bg-purple-900",
                      snap.aqi > 300 && "bg-red-950"
                    )}
                  >
                    AQI {snap.aqi}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                    {categoryInfo.label}
                  </span>
                </div>
              </div>

              {/* Data source transparency badge */}
              <div className="pt-1">
                <DataSourceBadge origin={snap.dataSource} updatedAt={snap.updatedAt} />
              </div>

              {/* Live metrics / summary */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>PM2.5 Concentration:</span>
                  <span className="font-bold">{snap.pollutants.pm2_5.value} µg/m³</span>
                </div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>Surface Wind:</span>
                  <span className="font-bold">{snap.weather.windSpeed} km/h</span>
                </div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>Atmosphere:</span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">{snap.weather.conditionText}</span>
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
      })}
    </div>
  );
}
