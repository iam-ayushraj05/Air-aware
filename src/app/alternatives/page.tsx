"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ComparisonCard } from "@/features/sustainability/ComparisonCard";
import { SUSTAINABLE_ALTERNATIVES } from "@/lib/sustainability";
import { SustainableAlternativeComparison, TrackedActionItem } from "@/lib/types";
import { saveTrackedActions, loadTrackedActions, loadUserProfile } from "@/lib/storage";
import { RefreshCw, CheckCircle2 } from "lucide-react";

export default function AlternativesPage() {
  const [profile] = useState(loadUserProfile());
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddAction = (item: SustainableAlternativeComparison) => {
    const existing = loadTrackedActions();
    const newAction: TrackedActionItem = {
      id: `act-${Date.now()}`,
      actionId: item.id,
      title: item.title,
      timestamp: new Date().toISOString(),
      emissionsSavedKg: item.emissionsAvoidedKgCO2ePerTripOrDay[0],
      pmAvoidedGrams: item.pm25AvoidedGrams[0],
      category: item.category,
    };

    saveTrackedActions([...existing, newAction]);
    setAddedIds((prev) => new Set([...prev, item.id]));

    setToastMessage(`"${item.title}" added to your Impact Tracker and Daily Routine!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      <Navbar currentLocationName={profile.locationName} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Sustainable Alternatives
              </span>
              <span className="text-xs text-slate-500">Transparent Methodology</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>Small Changes. Cleaner Cities.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Interactive comparisons of daily habits with calculated ranges of avoided greenhouse gases and particulate matter.
            </p>
          </div>

          {toastMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Catalog of Sustainable Alternatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUSTAINABLE_ALTERNATIVES.map((item) => (
              <ComparisonCard
                key={item.id}
                item={item}
                onAddAction={handleAddAction}
                isAdded={addedIds.has(item.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
