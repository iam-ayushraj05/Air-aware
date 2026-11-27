import { StructuredRecommendation } from "@/lib/types";
import { RecommendationCard } from "@/features/air-quality/RecommendationCard";
import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";

interface DashboardHealthGuidanceProps {
  pm25Value: number;
  recommendations: StructuredRecommendation[];
}

/**
 * Health recommendations section with link to smart routine planner.
 */
export function DashboardHealthGuidance({
  pm25Value,
  recommendations,
}: DashboardHealthGuidanceProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <span>Today&apos;s Personalized Health Guidance</span>
          </h2>
          <p className="text-xs text-slate-500">
            Grounded in current PM2.5 levels ({pm25Value} µg/m³) and your profile
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
        {recommendations.slice(0, 4).map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}
