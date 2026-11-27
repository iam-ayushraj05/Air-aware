"use client";

import { useState } from "react";
import { DailyRoutinePlan, StructuredRecommendation } from "@/lib/types";
import { Sun, SunDim, Sunset, Moon } from "lucide-react";
import { RoutineHeaderProgress } from "./components/RoutineHeaderProgress";
import { RoutinePeriodSection } from "./components/RoutinePeriodSection";

interface DailyRoutineTimelineProps {
  initialPlan: DailyRoutinePlan;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

/**
 * Interactive diurnal schedule organizing clean-air interventions across morning,
 * midday, evening, and nocturnal phases.
 */
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

  const allItems = [...plan.morning, ...plan.afternoon, ...plan.evening, ...plan.night];
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
      <RoutineHeaderProgress
        locationName={plan.locationName}
        aqiContext={plan.aqiContext}
        summary={plan.summary}
        completedCount={completedCount}
        totalCount={totalCount}
        progressPercent={progressPercent}
        isRegenerating={isRegenerating}
        onRegenerate={onRegenerate}
      />

      <div className="space-y-6">
        {sections.map((sec) => (
          <RoutinePeriodSection
            key={sec.title}
            title={sec.title}
            time={sec.time}
            icon={sec.icon}
            color={sec.color}
            items={sec.items}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
