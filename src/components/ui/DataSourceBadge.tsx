import React from "react";
import { DataSourceOrigin } from "@/lib/types";
import { Activity, Database, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";

interface DataSourceBadgeProps {
  origin: DataSourceOrigin;
  updatedAt?: string;
  className?: string;
}

export function DataSourceBadge({ origin, updatedAt, className }: DataSourceBadgeProps) {
  const formattedTime = updatedAt
    ? new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  if (origin === "live") {
    return (
      <div
        className={clsx(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300",
          className
        )}
        title="Live real-time feed from Open-Meteo"
        aria-label="Data source: Live Open-Meteo feed"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
        <Activity className="w-3.5 h-3.5" aria-hidden="true" />
        <span>LIVE DATA</span>
        {formattedTime && <span className="text-emerald-600 font-normal">({formattedTime})</span>}
      </div>
    );
  }

  if (origin === "cached") {
    return (
      <div
        className={clsx(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950 dark:text-blue-300",
          className
        )}
        title="Cached air quality data from recent request"
        aria-label="Data source: Cached feed"
      >
        <Database className="w-3.5 h-3.5" aria-hidden="true" />
        <span>CACHED DATA</span>
        {formattedTime && <span className="text-blue-600 font-normal">({formattedTime})</span>}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 border border-amber-600 animate-bounce shadow-sm",
        className
      )}
      title="Demo simulation data because live meteorological API was unreachable or demo mode enabled."
      aria-label="Data source: DEMO SIMULATION DATA"
    >
      <AlertTriangle className="w-4 h-4 text-slate-950" aria-hidden="true" />
      <span>DEMO DATA (SIMULATED)</span>
    </div>
  );
}
