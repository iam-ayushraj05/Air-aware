import { Card } from "@/components/ui/Card";
import { Info } from "lucide-react";
import { PLANT_PURIFICATION_FACTS } from "@/lib/indoor";

/**
 * Educational disclaimer section detailing peer-reviewed research on houseplant air-cleaning efficacy.
 */
export function PlantScienceCard() {
  return (
    <Card className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-xs">
          <strong className="text-slate-900 dark:text-white font-semibold block text-sm">
            Scientific Perspective: Do Houseplants Clean Urban Winter Smog?
          </strong>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {PLANT_PURIFICATION_FACTS.summary} {PLANT_PURIFICATION_FACTS.details}
          </p>
        </div>
      </div>
    </Card>
  );
}
