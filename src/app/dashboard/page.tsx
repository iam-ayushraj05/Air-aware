"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { LocationModal } from "@/components/layout/LocationModal";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { loadTrackedActions } from "@/lib/storage";
import { generateRecommendations } from "@/lib/recommendations";
import { calculateIndoorScore } from "@/lib/indoor";
import { calculatePersonalImpact } from "@/lib/sustainability";
import { getFallbackDemoData } from "@/server/demo-data";
import { useDashboardData } from "@/features/air-quality/hooks/useDashboardData";
import { DashboardSections } from "@/features/air-quality/components/DashboardSections";

function DashboardContent() {
  const {
    profile,
    airData,
    isLoading,
    isRefreshing,
    isLocationModalOpen,
    setIsLocationModalOpen,
    handleSelectLocation,
    handleRefresh,
  } = useDashboardData();

  const snapshot = airData ?? getFallbackDemoData();
  const recs = generateRecommendations(snapshot, profile ?? {});
  const indoorScore = calculateIndoorScore(
    { hasPurifier: profile?.hasAirPurifier ?? false },
    snapshot.aqi
  );
  const tracked = loadTrackedActions();
  const impact = calculatePersonalImpact(tracked);

  const formattedDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Navbar
        currentLocationName={snapshot.location.name}
        onOpenLocationSearch={() => setIsLocationModalOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />
        <DashboardSections
          snapshot={snapshot}
          profile={profile}
          recs={recs}
          indoorScore={indoorScore}
          impact={impact}
          isLoading={isLoading}
          formattedDate={formattedDate}
        />
      </div>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleSelectLocation}
      />
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex items-center justify-center">
          <LoadingSkeleton className="h-64 w-full max-w-3xl" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
