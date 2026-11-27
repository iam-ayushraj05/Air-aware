"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { DailyRoutineTimeline } from "@/features/routine/DailyRoutineTimeline";
import { AirQualitySnapshot, DailyRoutinePlan, UserLifestyleProfile } from "@/lib/types";
import { loadUserProfile } from "@/lib/storage";
import { buildDailyRoutinePlan } from "@/lib/recommendations";
import { getFallbackDemoData } from "@/server/demo-data";
import { CalendarDays } from "lucide-react";

export default function PlannerPage() {
  const [profile, setProfile] = useState<UserLifestyleProfile | null>(null);
  const [airData, setAirData] = useState<AirQualitySnapshot | null>(null);
  const [routinePlan, setRoutinePlan] = useState<DailyRoutinePlan | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    const prof = loadUserProfile();
    setProfile(prof);

    fetch(
      `/api/air-quality?lat=${prof.latitude}&lon=${prof.longitude}&name=${encodeURIComponent(prof.locationName)}`
    )
      .then((r) => r.json())
      .then((data) => {
        const snap =
          data.data ?? getFallbackDemoData(prof.locationName, prof.latitude, prof.longitude);
        setAirData(snap);
        setRoutinePlan(buildDailyRoutinePlan(snap, prof));
      })
      .catch(() => {
        const snap = getFallbackDemoData(prof.locationName, prof.latitude, prof.longitude);
        setAirData(snap);
        setRoutinePlan(buildDailyRoutinePlan(snap, prof));
      });
  }, []);

  const handleRegenerate = () => {
    if (!airData) return;
    setIsRegenerating(true);
    setTimeout(() => {
      setRoutinePlan(buildDailyRoutinePlan(airData, profile ?? {}));
      setIsRegenerating(false);
    }, 600);
  };

  const snapshot = airData ?? getFallbackDemoData();
  const plan = routinePlan ?? buildDailyRoutinePlan(snapshot, profile ?? {});

  return (
    <>
      <Navbar currentLocationName={snapshot.location.name} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Daily Routine Planner
              </span>
              <span className="text-xs text-slate-500">
                Morning &bull; Afternoon &bull; Evening &bull; Night
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>Build My Clean-Air Day</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              A sequence of specific actions timed around traffic rush hours and diurnal temperature
              inversions.
            </p>
          </div>

          <DailyRoutineTimeline
            initialPlan={plan}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
          />
        </main>
      </div>
    </>
  );
}
