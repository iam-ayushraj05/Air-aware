import React from "react";
import { PollutantDetail } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "clsx";

interface PollutantGridProps {
  pollutants: {
    pm2_5: PollutantDetail;
    pm10: PollutantDetail;
    no2?: PollutantDetail;
    ozone?: PollutantDetail;
    so2?: PollutantDetail;
    co?: PollutantDetail;
  };
}

export function PollutantGrid({ pollutants }: PollutantGridProps) {
  const items = [
    { key: "pm2_5", data: pollutants.pm2_5, primary: true },
    { key: "pm10", data: pollutants.pm10, primary: true },
    ...(pollutants.no2 ? [{ key: "no2", data: pollutants.no2, primary: false }] : []),
    ...(pollutants.ozone ? [{ key: "ozone", data: pollutants.ozone, primary: false }] : []),
    ...(pollutants.so2 ? [{ key: "so2", data: pollutants.so2, primary: false }] : []),
  ];

  return (
    <Card>
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
          Individual Pollutant Breakdown
        </h3>
        <span className="text-xs text-slate-500">WHO 24h Guidelines reference</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(({ key, data, primary }) => {
          const ratio = Math.min(2.5, data.value / (data.safeLimit || 1));
          const percent = Math.min(100, Math.round((ratio / 2.5) * 100));

          return (
            <div
              key={key}
              className={clsx(
                "p-3.5 rounded-xl border transition-all",
                primary
                  ? "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
                  : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {data.label}
                </span>
                <Badge variant={data.status}>{data.status.toUpperCase()}</Badge>
              </div>

              <div className="flex items-baseline gap-1 my-1">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {data.value}
                </span>
                <span className="text-xs text-slate-500">{data.unit}</span>
              </div>

              {/* Threshold bar */}
              <div className="space-y-1 mt-2">
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      "h-full rounded-full transition-all",
                      data.status === "good"
                        ? "bg-emerald-500"
                        : data.status === "moderate"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    )}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0</span>
                  <span>Safe limit: {data.safeLimit} {data.unit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
