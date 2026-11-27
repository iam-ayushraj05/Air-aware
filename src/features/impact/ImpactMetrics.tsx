"use client";

import { TrackedActionItem } from "@/lib/types";
import { calculatePersonalImpact } from "@/lib/sustainability";
import { Card } from "@/components/ui/Card";
import { Info } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ImpactStatCards } from "./components/ImpactStatCards";

interface ImpactMetricsProps {
  actions: TrackedActionItem[];
}

/**
 * Visual impact metrics dashboard comparing personal carbon/particulate reductions
 * against municipal participant averages.
 */
export function ImpactMetrics({ actions }: ImpactMetricsProps) {
  const impact = calculatePersonalImpact(actions);

  const weeklyData = [
    { day: "Mon", userKg: 1.2, communityAvg: 0.9 },
    { day: "Tue", userKg: 0.8, communityAvg: 0.85 },
    { day: "Wed", userKg: 2.1, communityAvg: 1.1 },
    { day: "Thu", userKg: 1.5, communityAvg: 0.95 },
    { day: "Fri", userKg: 2.4, communityAvg: 1.2 },
    { day: "Sat", userKg: 0.5, communityAvg: 0.7 },
    { day: "Sun (Today)", userKg: impact.totalEmissionsSavedKg, communityAvg: 1.0 },
  ];

  return (
    <div className="space-y-6">
      <ImpactStatCards impact={impact} />

      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Personal vs. Community Clean-Air Contribution (kg CO2e)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily carbon savings comparison against city-wide average participants
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Past 7 Days
          </span>
        </div>

        <div
          className="h-60 w-full"
          role="img"
          aria-label="Weekly carbon reduction chart comparing user and community"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs space-y-1 shadow-lg">
                        <div className="font-bold">{payload[0]?.payload.day}</div>
                        <div className="text-emerald-400">Your Savings: {payload[0]?.value} kg</div>
                        <div className="text-slate-300">City Avg: {payload[1]?.value} kg</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="userKg"
                name="Your Avoided Emissions"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="communityAvg"
                name="City Average"
                fill="#94A3B8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">{impact.disclaimer}</p>
        </div>
      </Card>
    </div>
  );
}
