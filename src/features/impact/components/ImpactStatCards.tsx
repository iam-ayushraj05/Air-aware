import { Card } from "@/components/ui/Card";
import { CheckCircle2, Wind, Award, Flame } from "lucide-react";
import { PersonalImpactResult } from "@/lib/sustainability";

interface ImpactStatCardsProps {
  impact: PersonalImpactResult;
}

/**
 * Overview cards displaying user actions logged, avoided CO2e, PM2.5, and streak days.
 */
export function ImpactStatCards({ impact }: ImpactStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0">
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs text-slate-500 block">Actions Logged</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {impact.totalCompleted}
          </span>
        </div>
      </Card>

      <Card className="p-4 bg-teal-50/60 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900/60 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-teal-600 text-white shrink-0">
          <Wind className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs text-slate-500 block">Avoided Emissions</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {impact.totalEmissionsSavedKg} <span className="text-xs font-normal">kg CO2e</span>
          </span>
        </div>
      </Card>

      <Card className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0">
          <Award className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs text-slate-500 block">Avoided PM2.5</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {impact.totalPmAvoidedGrams} <span className="text-xs font-normal">grams</span>
          </span>
        </div>
      </Card>

      <Card className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-amber-600 text-white shrink-0">
          <Flame className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs text-slate-500 block">Active Days Streak</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {impact.streakDays || 1} <span className="text-xs font-normal">days</span>
          </span>
        </div>
      </Card>
    </div>
  );
}
