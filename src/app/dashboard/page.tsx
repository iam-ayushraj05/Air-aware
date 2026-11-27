"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { LocationModal } from "@/components/layout/LocationModal";
import { AQICard } from "@/features/air-quality/AQICard";
import { PollutantGrid } from "@/features/air-quality/PollutantGrid";
import { WeatherCard } from "@/features/air-quality/WeatherCard";
import { TrendChart } from "@/features/air-quality/TrendChart";
import { WinterSmogBanner } from "@/features/winter-smog/WinterSmogBanner";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { loadTrackedActions } from "@/lib/storage";
import { generateRecommendations } from "@/lib/recommendations";
import { calculateIndoorScore } from "@/lib/indoor";
import { calculatePersonalImpact } from "@/lib/sustainability";
import { getFallbackDemoData } from "@/server/demo-data";
import { useDashboardData } from "@/features/air-quality/hooks/useDashboardData";
import { DashboardHealthGuidance } from "@/features/air-quality/components/DashboardHealthGuidance";
import { DashboardIndoorSanctuary } from "@/features/air-quality/components/DashboardIndoorSanctuary";
import { DashboardImpactBanner } from "@/features/air-quality/components/DashboardImpactBanner";
import Link from "next/link";
import { Sparkles } from "lucide-react";

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
  const indoorScore = calculateIndoorScore({ hasPurifier: profile?.hasAirPurifier }, snapshot.aqi);
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

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {formattedDate} &bull; Urban Environmental Intelligence
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Good day, {profile?.locationName ?? snapshot.location.name} Resident
              </h1>
            </div>

            <Link href="/advisor" aria-label="Open AirAware AI assistant">
              <Button
                size="sm"
                className="gap-1.5 self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Ask AirAware AI</span>
              </Button>
            </Link>
          </div>

          <WinterSmogBanner
            isActive={snapshot.isWinterSmogActive}
            aqi={snapshot.aqi}
            tempC={snapshot.weather.temperature}
            windSpeed={snapshot.weather.windSpeed}
          />

          {isLoading ? (
            <LoadingSkeleton className="h-44 w-full" />
          ) : (
            <AQICard snapshot={snapshot} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <PollutantGrid pollutants={snapshot.pollutants} />
            </div>
            <div className="lg:col-span-4">
              <WeatherCard weather={snapshot.weather} />
            </div>
          </div>

          <TrendChart data={snapshot.hourly} />

          <DashboardHealthGuidance
            pm25Value={snapshot.pollutants.pm2_5.value}
            recommendations={recs}
          />

          <DashboardIndoorSanctuary indoorScore={indoorScore} />

          <DashboardImpactBanner
            totalCompleted={impact.totalCompleted}
            totalEmissionsSavedKg={impact.totalEmissionsSavedKg}
          />
        </main>
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
