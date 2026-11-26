import React from "react";
import { WeatherCondition } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Wind, Thermometer, Droplets, CloudSun, AlertCircle } from "lucide-react";

interface WeatherCardProps {
  weather: WeatherCondition;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card>
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span>Local Atmospheric Conditions</span>
        </h3>
        <span className="text-xs text-slate-500">{weather.conditionText}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {/* Temperature */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <Thermometer className="w-4 h-4 text-emerald-600 mx-auto mb-1" aria-hidden="true" />
          <span className="text-xs text-slate-500 block">Temperature</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {weather.temperature}°C
          </span>
        </div>

        {/* Humidity */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" aria-hidden="true" />
          <span className="text-xs text-slate-500 block">Humidity</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {weather.humidity}%
          </span>
        </div>

        {/* Wind Speed */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <Wind className="w-4 h-4 text-teal-600 mx-auto mb-1" aria-hidden="true" />
          <span className="text-xs text-slate-500 block">Wind Velocity</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {weather.windSpeed} km/h
          </span>
        </div>
      </div>

      {weather.isTemperatureInversionLikely && (
        <div className="mt-3.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>Thermal Inversion Flag:</strong> Surface air is cold ({weather.temperature}°C) with low wind velocity ({weather.windSpeed} km/h), creating atmospheric trapping of particulate emissions.
          </p>
        </div>
      )}
    </Card>
  );
}
