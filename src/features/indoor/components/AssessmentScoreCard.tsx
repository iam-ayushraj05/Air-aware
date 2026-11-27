import { IndoorScoreResult } from "@/lib/indoor";
import { Card } from "@/components/ui/Card";
import { AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import { ScoreBreakdownBars } from "./ScoreBreakdownBars";

interface AssessmentScoreCardProps {
  result: IndoorScoreResult;
  outdoorAqi: number;
}

function getScoreColor(score: number): string {
  if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-300";
  if (score >= 65) return "text-teal-600 bg-teal-50 border-teal-300";
  if (score >= 45) return "text-amber-600 bg-amber-50 border-amber-300";
  return "text-rose-600 bg-rose-50 border-rose-300";
}

/**
 * Visual score indicator and sub-breakdown metric progress bars.
 */
export function AssessmentScoreCard({ result, outdoorAqi }: AssessmentScoreCardProps) {
  return (
    <Card className="lg:col-span-5 flex flex-col justify-between space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Indoor Air Quality Score
          </h3>
          <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {result.rating.replace("_", " ")}
          </span>
        </div>

        <div className="text-center py-4">
          <div
            className={clsx(
              "w-28 h-28 rounded-full border-4 mx-auto flex flex-col items-center justify-center font-extrabold shadow-sm",
              getScoreColor(result.score)
            )}
            aria-label={`Indoor clean air score: ${result.score} out of 100`}
          >
            <span className="text-4xl">{result.score}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Outdoor AQI Baseline: {outdoorAqi}</p>
        </div>

        <ScoreBreakdownBars breakdown={result.breakdown} />

        {result.keyRisks.length > 0 && (
          <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Key Risk Factors</span>
            </span>
            <ul className="text-[11px] text-amber-700 dark:text-amber-400 space-y-0.5 list-disc pl-4">
              {result.keyRisks.map((risk, i) => (
                <li key={i}>{risk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="text-[11px] text-slate-400 dark:text-slate-500 italic border-t border-slate-100 dark:border-slate-800 pt-3">
        {result.heuristicDisclaimer}
      </p>
    </Card>
  );
}
