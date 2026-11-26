import React from "react";
import { AirQualitySnapshot } from "@/lib/types";
import { getAQICategoryInfo } from "@/lib/aqi";
import { Card } from "@/components/ui/Card";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { ShieldAlert, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface AQICardProps {
  snapshot: AirQualitySnapshot;
}

export function AQICard({ snapshot }: AQICardProps) {
  const categoryInfo = getAQICategoryInfo(snapshot.aqi, snapshot.standard);

  const getStatusIcon = () => {
    switch (categoryInfo.key) {
      case "good":
        return <CheckCircle className="w-6 h-6 text-emerald-500" aria-hidden="true" />;
      case "moderate":
        return <Info className="w-6 h-6 text-amber-500" aria-hidden="true" />;
      case "sensitive":
      case "unhealthy":
        return <AlertTriangle className="w-6 h-6 text-orange-500" aria-hidden="true" />;
      case "very_unhealthy":
      case "hazardous":
        return <ShieldAlert className="w-6 h-6 text-rose-600" aria-hidden="true" />;
    }
  };

  return (
    <Card className="border-2 shadow-sm overflow-hidden relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Current Air Quality Index ({snapshot.standard === "US_AQI" ? "US EPA Standard" : "European Standard"})
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{snapshot.location.name}</span>
            {snapshot.location.country && (
              <span className="text-sm font-normal text-slate-500">({snapshot.location.country})</span>
            )}
          </h2>
        </div>
        <DataSourceBadge origin={snapshot.dataSource} updatedAt={snapshot.updatedAt} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
        {/* Large AQI Value Display */}
        <div className="md:col-span-5 flex items-center gap-4">
          <div
            className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center font-bold text-white shadow-inner"
            style={{ backgroundColor: categoryInfo.color }}
            aria-label={`AQI Value: ${snapshot.aqi}`}
          >
            <span className="text-4xl font-extrabold tracking-tight">{snapshot.aqi}</span>
            <span className="text-[10px] tracking-wider uppercase opacity-90">AQI</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {categoryInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              {categoryInfo.summary}
            </p>
          </div>
        </div>

        {/* Health Implications & Context */}
        <div className="md:col-span-7 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
            <div className="space-y-1 text-xs">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold block">
                What this means for your household:
              </strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {categoryInfo.healthImplications}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
