"use client";

import React, { useState } from "react";
import { DailyRoutinePlan, StructuredRecommendation } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RecommendationCard } from "@/features/air-quality/RecommendationCard";
import { Sun, SunDim, Sunset, Moon, RotateCcw, Sparkles } from "lucide-react";

interface DailyRoutineTimelineProps {
  initialPlan: DailyRoutinePlan;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

export function DailyRoutineTimeline({
  initialPlan,
  onRegenerate,
  isRegenerating,
}: DailyRoutineTimelineProps) {
  const [plan, setPlan] = useState<DailyRoutinePlan>(initialPlan);

  const toggleComplete = (id: string) => {
    const updateList = (list: StructuredRecommendation[]) =>
      list.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));

    setPlan((prev) => ({
      ...prev,
      morning: updateList(prev.morning),
      afternoon: updateList(prev.afternoon),
      evening: updateList(prev.evening),
      night: updateList(prev.night),
    }));
  };

  const allItems = [
    ...plan.morning,
    ...plan.afternoon,
    ...plan.evening,
    ...plan.night,
  ];
  const totalCount = allItems.length;
  const completedCount = allItems.filter((i) => i.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const sections = [
    {
      title: "Morning Routine",
      time: "06:00 - 11:00",
      icon: Sun,
      color: "text-amber-500",
      items: plan.morning,
    },
    {
      title: "Midday & Afternoon",
      time: "11:00 - 17:00",
      icon: SunDim,
      color: "text-orange-500",
      items: plan.afternoon,
    },
    {
      title: "Evening Routine",
      time: "17:00 - 21:00",
      icon: Sunset,
      color: "text-rose-500",
      items: plan.evening,
    },
    {
      title: "Night & Sleep Environment",
      time: "21:00 - 06:00",
      icon: Moon,
      color: "text-indigo-500",
      items: plan.night,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Progress & Regeneration */}
      <Card className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white border-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                Personalized Clean-Air Day
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-100">
                AQI {plan.aqiContext}
              </span>
            </div>
            <h2 className="text-xl font-bold">{plan.locationName} Routine Schedule</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">{plan.summary}</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            isLoading={isRegenerating}
            className="text-white border-emerald-400 hover:bg-emerald-800 self-start sm:self-auto text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
            <span>Regenerate Routine</span>
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="pt-4 space-y-1.5">
          <div className="flex justify-between text-xs text-emerald-200">
            <span>Daily Routine Completion</span>
            <span className="font-semibold">{completedCount} of {totalCount} completed ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-emerald-950/80 rounded-full h-2.5 overflow-hidden border border-emerald-800">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </Card>

      {/* Routine Sections */}
      <div className="space-y-6">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div key={sec.title} className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Icon className={`w-5 h-5 ${sec.color}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sec.title}</h3>
                  <span className="text-xs text-slate-500">{sec.time}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sec.items.map((item) => (
                  <RecommendationCard
                    key={item.id}
                    recommendation={item}
                    onToggleComplete={toggleComplete}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
