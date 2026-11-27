"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { CommunityBoard } from "@/features/community/CommunityBoard";
import { loadUserProfile } from "@/lib/storage";
import { Users } from "lucide-react";

export default function CommunityPage() {
  const [profile] = useState(loadUserProfile());

  return (
    <>
      <Navbar currentLocationName={profile.locationName} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Community Action
              </span>
              <span className="text-xs text-slate-500">Collective Urban Responsibility</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>Cleaner Air Starts Together</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Join neighborhood clean-air challenges, pledge emission reductions, and track
              collective progress.
            </p>
          </div>

          <CommunityBoard />
        </main>
      </div>
    </>
  );
}
