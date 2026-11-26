"use client";

import React from "react";
import { TrackedActionItem } from "@/lib/types";
import { calculatePersonalImpact } from "@/lib/sustainability";
import { Card } from "@/components/ui/Card";
import { Award, Flame, Wind, CheckCircle2, Info } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface ImpactMetricsProps {
  actions: TrackedActionItem[];
}

export function ImpactMetrics({ actions }: ImpactMetricsProps) {
  const impact = calculatePersonalImpact(actions);

  // Weekly visualization demo data merged with user action count
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
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Actions Completed */}
        <Card className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Actions Logged</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {impact.totalCompleted}
            </span>
          </div>
        </Card>

        {/* Avoided CO2e */}
        <Card className="p-4 bg-teal-50/60 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900/60 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-600 text-white shrink-0">
            <Wind className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Avoided Emissions</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {impact.totalEmissionsSavedKg} <span className="text-xs font-normal">kg CO2e</span>
            </span>
          </div>
        </Card>

        {/* Avoided PM2.5 */}
        <Card className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0">
            <Award className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Avoided PM2.5</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {impact.totalPmAvoidedGrams} <span className="text-xs font-normal">grams</span>
            </span>
          </div>
        </Card>

        {/* Streak */}
        <Card className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-600 text-white shrink-0">
            <Flame className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Active Days Streak</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {impact.streakDays || 1} <span className="text-xs font-normal">days</span>
            </span>
          </div>
        </Card>
      </div>

      {/* Comparison Chart */}
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

        <div className="h-60 w-full" role="img" aria-label="Weekly carbon reduction chart comparing user and community">
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
              <Bar dataKey="userKg" name="Your Avoided Emissions" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="communityAvg" name="City Average" fill="#94A3B8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transparent Methodology Box */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">{impact.disclaimer}</p>
        </div>
      </Card>
    </div>
  );
}
