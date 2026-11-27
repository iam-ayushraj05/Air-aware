import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  AirQualitySnapshot,
  LocationInfo,
  UserLifestyleProfile,
  UserPreferences,
} from "@/lib/types";
import { loadUserProfile, loadUserPreferences } from "@/lib/storage";
import { getFallbackDemoData } from "@/server/demo-data";
import { parseDashboardLocationParams } from "../lib/dashboardLocationParams";

/**
 * Custom hook encapsulating dashboard state, Open-Meteo fetching, URL query synchronization,
 * and location selection.
 */
export function useDashboardData() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserLifestyleProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [airData, setAirData] = useState<AirQualitySnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const fetchAirQuality = useCallback(
    async (
      lat: number,
      lon: number,
      name: string,
      standard: UserPreferences["aqiStandard"] = "US_AQI"
    ) => {
      setIsRefreshing(true);
      try {
        const res = await fetch(
          `/api/air-quality?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`
        );
        if (!res.ok) throw new Error("API call failed");
        const json = await res.json();
        setAirData(json.data ? { ...json.data, standard } : getFallbackDemoData(name, lat, lon));
      } catch {
        setAirData(getFallbackDemoData(name, lat, lon));
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    const prof = loadUserProfile();
    const prefs = loadUserPreferences();
    setPreferences(prefs);

    const parsed = parseDashboardLocationParams(searchParams, prof);
    const updatedProf: UserLifestyleProfile = {
      ...prof,
      locationName: parsed.locationName,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
    };
    setProfile(updatedProf);
    fetchAirQuality(parsed.latitude, parsed.longitude, parsed.locationName, prefs.aqiStandard);
  }, [searchParams, fetchAirQuality]);

  const handleSelectLocation = useCallback(
    (loc: LocationInfo) => {
      if (!profile) return;
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              locationName: loc.name,
              latitude: loc.latitude,
              longitude: loc.longitude,
            }
          : prev
      );
      fetchAirQuality(loc.latitude, loc.longitude, loc.name, preferences?.aqiStandard ?? "US_AQI");
    },
    [profile, preferences, fetchAirQuality]
  );

  const handleRefresh = useCallback(() => {
    const snapshot = airData ?? getFallbackDemoData();
    fetchAirQuality(
      snapshot.location.latitude,
      snapshot.location.longitude,
      snapshot.location.name,
      preferences?.aqiStandard ?? "US_AQI"
    );
  }, [airData, preferences, fetchAirQuality]);

  return {
    profile,
    preferences,
    airData,
    isLoading,
    isRefreshing,
    isLocationModalOpen,
    setIsLocationModalOpen,
    handleSelectLocation,
    handleRefresh,
  };
}
