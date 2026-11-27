"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ImpactMetrics } from "@/features/impact/ImpactMetrics";
import { TrackedActionItem } from "@/lib/types";
import { loadTrackedActions, loadUserProfile } from "@/lib/storage";
import { Award } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function ImpactPage() {
  const [profile] = useState(loadUserProfile());
  const [actions, setActions] = useState<TrackedActionItem[]>([]);

  useEffect(() => {
    setActions(loadTrackedActions());
  }, []);

  return (
    <>
      <Navbar currentLocationName={profile.locationName} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Impact Tracker
              </span>
              <span className="text-xs text-slate-500">Measurable Contributions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>My Clean-Air Impact</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Track your daily choices and their transparently calculated reductions in carbon
              emissions and ambient PM2.5.
            </p>
          </div>

          <ImpactMetrics actions={actions} />

          {/* Action Log History */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Completed Actions Log ({actions.length})
              </h3>
            </div>

            {actions.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 space-y-2">
                <p>No sustainable actions recorded yet today.</p>
                <p className="text-slate-400">
                  Head over to Sustainable Choices to adopt low-emission habits!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {actions.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="block text-slate-900 dark:text-white">{act.title}</strong>
                      <span className="text-slate-500 text-[11px]">
                        {new Date(act.timestamp).toLocaleDateString()} at{" "}
                        {new Date(act.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold block">
                        -{act.emissionsSavedKg} kg CO2e
                      </span>
                      <span className="text-teal-600 text-[10px]">
                        -{act.pmAvoidedGrams} g PM2.5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </main>
      </div>
    </>
  );
}
