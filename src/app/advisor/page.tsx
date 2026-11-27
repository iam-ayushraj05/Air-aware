"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatInterface } from "@/features/chat/ChatInterface";
import { AirQualitySnapshot, UserLifestyleProfile } from "@/lib/types";
import { loadUserProfile } from "@/lib/storage";
import { getFallbackDemoData } from "@/server/demo-data";
import { Sparkles } from "lucide-react";

export default function AdvisorPage() {
  const [airData, setAirData] = useState<AirQualitySnapshot | null>(null);
  const [profile, setProfile] = useState<UserLifestyleProfile | null>(null);

  useEffect(() => {
    const prof = loadUserProfile();
    setProfile(prof);

    fetch(
      `/api/air-quality?lat=${prof.latitude}&lon=${prof.longitude}&name=${encodeURIComponent(prof.locationName)}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.data) setAirData(data.data);
        else setAirData(getFallbackDemoData(prof.locationName, prof.latitude, prof.longitude));
      })
      .catch(() => {
        setAirData(getFallbackDemoData(prof.locationName, prof.latitude, prof.longitude));
      });
  }, []);

  const snapshot = airData ?? getFallbackDemoData();

  return (
    <>
      <Navbar currentLocationName={snapshot.location.name} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Personal Clean-Air Advisor
              </span>
              <span className="text-xs text-slate-500">Real-time Grounded AI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>AirAware AI Assistant</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Personalized guidance on exercise safety, ventilation timing, vulnerable family
              members, and commute decisions.
            </p>
          </div>

          <ChatInterface airQuality={snapshot} profile={profile ?? {}} />
        </main>
      </div>
    </>
  );
}
