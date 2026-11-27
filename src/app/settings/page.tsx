"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileSettingsForm } from "@/features/profile/ProfileSettingsForm";
import { loadUserProfile, loadUserPreferences } from "@/lib/storage";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState(loadUserProfile());
  const [prefs, setPrefs] = useState(loadUserPreferences());

  return (
    <>
      <Navbar currentLocationName={profile.locationName} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                User Configuration
              </span>
              <span className="text-xs text-slate-500">Local-Only Persistence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>Settings & Household Profile</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Manage your location preferences, vulnerability flags, accessibility contrast, and
              local storage state.
            </p>
          </div>

          <ProfileSettingsForm
            initialProfile={profile}
            initialPreferences={prefs}
            onSaved={() => {
              setProfile(loadUserProfile());
              setPrefs(loadUserPreferences());
            }}
          />
        </main>
      </div>
    </>
  );
}
