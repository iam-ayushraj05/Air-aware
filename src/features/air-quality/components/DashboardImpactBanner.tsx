import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Award } from "lucide-react";

interface DashboardImpactBannerProps {
  totalCompleted: number;
  totalEmissionsSavedKg: number;
}

/**
 * Banner highlighting personal emissions avoided and actions logged.
 */
export function DashboardImpactBanner({
  totalCompleted,
  totalEmissionsSavedKg,
}: DashboardImpactBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>Your Clean-Air Contribution</span>
          </div>
          <h3 className="text-lg font-bold">
            {totalCompleted} sustainable actions logged &bull; {totalEmissionsSavedKg} kg CO2e
            avoided
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Every reduced cold start and anti-idling habit decreases ground-level PM2.5 in your
            neighborhood.
          </p>
        </div>

        <Link
          href="/impact"
          className="self-start sm:self-auto shrink-0"
          aria-label="View personal Environmental Impact Tracker"
        >
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-xs">
            View Impact Tracker
          </Button>
        </Link>
      </div>
    </Card>
  );
}
