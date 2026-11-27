import { AQICard } from "@/features/air-quality/AQICard";
import { TrendChart } from "@/features/air-quality/TrendChart";
import { WinterSmogBanner } from "@/features/winter-smog/WinterSmogBanner";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardOverviewGrid } from "./DashboardOverviewGrid";
import { DashboardHealthGuidance } from "./DashboardHealthGuidance";
import { DashboardIndoorSanctuary } from "./DashboardIndoorSanctuary";
import { DashboardImpactBanner } from "./DashboardImpactBanner";
import {
  AirQualitySnapshot,
  UserLifestyleProfile,
  StructuredRecommendation,
  IndoorScoreResult,
} from "@/lib/types";

interface DashboardSectionsProps {
  snapshot: AirQualitySnapshot;
  profile: UserLifestyleProfile | null;
  recs: StructuredRecommendation[];
  indoorScore: IndoorScoreResult;
  impact: { totalCompleted: number; totalEmissionsSavedKg: number };
  isLoading: boolean;
  formattedDate: string;
}

/**
 * Main dashboard content section rendering AQI cards, weather, forecasts, and AI recommendations.
 */
export function DashboardSections({
  snapshot,
  profile,
  recs,
  indoorScore,
  impact,
  isLoading,
  formattedDate,
}: DashboardSectionsProps) {
  return (
    <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden">
      <DashboardHeader
        formattedDate={formattedDate}
        residentCity={profile?.locationName ?? snapshot.location.name}
      />

      <WinterSmogBanner
        isActive={snapshot.isWinterSmogActive}
        aqi={snapshot.aqi}
        tempC={snapshot.weather.temperature}
        windSpeed={snapshot.weather.windSpeed}
      />

      {isLoading ? <LoadingSkeleton className="h-44 w-full" /> : <AQICard snapshot={snapshot} />}

      <DashboardOverviewGrid pollutants={snapshot.pollutants} weather={snapshot.weather} />

      <TrendChart data={snapshot.hourly} />

      <DashboardHealthGuidance pm25Value={snapshot.pollutants.pm2_5.value} recommendations={recs} />

      <DashboardIndoorSanctuary indoorScore={indoorScore} />

      <DashboardImpactBanner
        totalCompleted={impact.totalCompleted}
        totalEmissionsSavedKg={impact.totalEmissionsSavedKg}
      />
    </main>
  );
}
