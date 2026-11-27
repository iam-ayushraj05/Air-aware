import { IndoorScoreResult } from "@/lib/indoor";

interface ScoreBreakdownBarsProps {
  breakdown: IndoorScoreResult["breakdown"];
}

/**
 * Metric progress bars detailing ventilation, filtration, source reduction, and cleaning sub-scores.
 */
export function ScoreBreakdownBars({ breakdown }: ScoreBreakdownBarsProps) {
  const categories = [
    {
      label: "Source Reduction",
      score: breakdown.sourceReductionScore,
      max: 30,
      color: "bg-emerald-500",
    },
    { label: "Active Filtration", score: breakdown.filtrationScore, max: 30, color: "bg-teal-500" },
    {
      label: "Smart Ventilation",
      score: breakdown.ventilationScore,
      max: 25,
      color: "bg-blue-500",
    },
    { label: "Cleaning Hygiene", score: breakdown.cleaningScore, max: 15, color: "bg-indigo-500" },
  ];

  return (
    <div className="space-y-2 text-xs">
      {categories.map((cat) => (
        <div key={cat.label}>
          <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
            <span>{cat.label}</span>
            <span className="font-semibold">
              {cat.score} / {cat.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`${cat.color} h-full rounded-full transition-all duration-300`}
              style={{ width: `${(cat.score / cat.max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
