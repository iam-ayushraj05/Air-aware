import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FamilyChecklist } from "@/features/air-quality/FamilyChecklist";
import { IndoorScoreResult } from "@/lib/indoor";
import Link from "next/link";
import { Home } from "lucide-react";

interface DashboardIndoorSanctuaryProps {
  indoorScore: IndoorScoreResult;
}

/**
 * Indoor air sanctuary card alongside family vulnerability checklist.
 */
export function DashboardIndoorSanctuary({ indoorScore }: DashboardIndoorSanctuaryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
            Based on your current filtration and ventilation timing, your home indoor air quality
            rating is{" "}
            <strong className="text-emerald-700 font-semibold uppercase">
              {indoorScore.rating.replace("_", " ")}
            </strong>
            .
          </p>

          {indoorScore.priorityActions.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                Recommended Hack:
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {indoorScore.priorityActions[0]}
              </span>
            </div>
          )}
        </div>

        <Link
          href="/indoor-lab"
          className="block pt-2"
          aria-label="Run full room assessment in Indoor Lab"
        >
          <Button variant="outline" size="sm" className="w-full text-xs">
            Run Full Room Assessment
          </Button>
        </Link>
      </Card>

      <div className="lg:col-span-6">
        <FamilyChecklist />
      </div>
    </div>
  );
}
