"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { LocationModal } from "@/components/layout/LocationModal";
import { AQICard } from "@/features/air-quality/AQICard";
import { PollutantGrid } from "@/features/air-quality/PollutantGrid";
import { WeatherCard } from "@/features/air-quality/WeatherCard";
import { TrendChart } from "@/features/air-quality/TrendChart";
import { RecommendationCard } from "@/features/air-quality/RecommendationCard";
import { FamilyChecklist } from "@/features/air-quality/FamilyChecklist";
import { WinterSmogBanner } from "@/features/winter-smog/WinterSmogBanner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { AirQualitySnapshot, LocationInfo, UserLifestyleProfile, UserPreferences } from "@/lib/types";
import { loadUserProfile, loadUserPreferences, loadTrackedActions } from "@/lib/storage";
import { generateRecommendations } from "@/lib/recommendations";
import { calculateIndoorScore } from "@/lib/indoor";
import { calculatePersonalImpact } from "@/lib/sustainability";
import { getFallbackDemoData } from "@/server/demo-data";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Home,
  Award,
  ShieldAlert,
} from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserLifestyleProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [airData, setAirData] = useState<AirQualitySnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const fetchAirQuality = async (
    lat: number,
    lon: number,
    name: string,
    standard: UserPreferences["aqiStandard"] = "US_AQI"
  ) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("API call failed");
      const json = await res.json();
      if (json.data) {
        setAirData({
          ...json.data,
          standard,
        });
      } else {
        setAirData(getFallbackDemoData(name, lat, lon));
      }
    } catch {
      setAirData(getFallbackDemoData(name, lat, lon));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load profile and preferences on mount or when searchParams change
  useEffect(() => {
    const prof = loadUserProfile();
    const prefs = loadUserPreferences();
    setPreferences(prefs);

    const cityParam = searchParams.get("city");
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");

    if (cityParam && latParam && lonParam) {
      const parsedLat = parseFloat(latParam);
      const parsedLon = parseFloat(lonParam);
      if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
        const updatedProf: UserLifestyleProfile = {
          ...prof,
          locationName: cityParam,
          latitude: parsedLat,
          longitude: parsedLon,
        };
        setProfile(updatedProf);
        fetchAirQuality(parsedLat, parsedLon, cityParam, prefs.aqiStandard);
        return;
      }
    }

    setProfile(prof);
    fetchAirQuality(prof.latitude, prof.longitude, prof.locationName, prefs.aqiStandard);
  }, [searchParams]);

  const handleSelectLocation = (loc: LocationInfo) => {
    if (!profile) return;
    const updated = {
      ...profile,
      locationName: loc.name,
      latitude: loc.latitude,
      longitude: loc.longitude,
    };
    setProfile(updated);
    fetchAirQuality(loc.latitude, loc.longitude, loc.name, preferences?.aqiStandard ?? "US_AQI");
  };

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
        onRefresh={() =>
          fetchAirQuality(
            snapshot.location.latitude,
            snapshot.location.longitude,
            snapshot.location.name,
            preferences?.aqiStandard ?? "US_AQI"
          )
        }
        isRefreshing={isRefreshing}
      />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden">
          {/* Header Greeting */}
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
              <Button size="sm" className="gap-1.5 self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Ask AirAware AI</span>
              </Button>
            </Link>
          </div>

          {/* Winter Smog / Inversion Warning (Dynamic) */}
          <WinterSmogBanner
            isActive={snapshot.isWinterSmogActive}
            aqi={snapshot.aqi}
            tempC={snapshot.weather.temperature}
            windSpeed={snapshot.weather.windSpeed}
          />

          {/* Section 1: Main AQI Overview */}
          {isLoading ? (
            <LoadingSkeleton className="h-44 w-full" />
          ) : (
            <AQICard snapshot={snapshot} />
          )}

          {/* Section 2: Pollutants & Weather Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <PollutantGrid pollutants={snapshot.pollutants} />
            </div>
            <div className="lg:col-span-4">
              <WeatherCard weather={snapshot.weather} />
            </div>
          </div>

          {/* Section 3: 24-Hour Forecast Trend */}
          <TrendChart data={snapshot.hourly} />

          {/* Section 4: Personalized Health Actions & Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  <span>Today&apos;s Personalized Health Guidance</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Grounded in current PM2.5 levels ({snapshot.pollutants.pm2_5.value} µg/m³) and your profile
                </p>
              </div>

              <Link
                href="/planner"
                className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                aria-label="View Full Day Schedule in Smart Routine Planner"
              >
                <span>View Full Day Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recs.slice(0, 4).map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          </div>

          {/* Section 5: Indoor Sanctuary & Family Safeguards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Indoor Air Score Preview */}
            <Card className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Home className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    <span>Indoor Clean-Air Status</span>
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Score: {indoorScore.score}/100
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Based on your current filtration and ventilation timing, your home indoor air quality rating is{" "}
                  <strong className="text-emerald-700 font-semibold uppercase">{indoorScore.rating.replace("_", " ")}</strong>.
                </p>

                {indoorScore.priorityActions.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">Recommended Hack:</span>
                    <span className="text-slate-600 dark:text-slate-400">{indoorScore.priorityActions[0]}</span>
                  </div>
                )}
              </div>

              <Link href="/indoor-lab" className="block pt-2" aria-label="Run full room assessment in Indoor Lab">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Run Full Room Assessment
                </Button>
              </Link>
            </Card>

            {/* Family Checklist */}
            <div className="lg:col-span-6">
              <FamilyChecklist />
            </div>
          </div>

          {/* Section 6: Environmental Impact Quick Snapshot */}
          <Card className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" aria-hidden="true" />
                  <span>Your Clean-Air Contribution</span>
                </div>
                <h3 className="text-lg font-bold">
                  {impact.totalCompleted} sustainable actions logged &bull; {impact.totalEmissionsSavedKg} kg CO2e avoided
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Every reduced cold start and anti-idling habit decreases ground-level PM2.5 in your neighborhood.
                </p>
              </div>

              <Link href="/impact" className="self-start sm:self-auto shrink-0" aria-label="View personal Environmental Impact Tracker">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-xs">
                  View Impact Tracker
                </Button>
              </Link>
            </div>
          </Card>
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
