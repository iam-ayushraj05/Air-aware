import React from "react";
import { StructuredRecommendation } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

interface RecommendationCardProps {
  recommendation: StructuredRecommendation;
  onToggleComplete?: (id: string) => void;
}

export function RecommendationCard({
  recommendation,
  onToggleComplete,
}: RecommendationCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card
      className={clsx(
        "transition-all duration-200 border-l-4",
        recommendation.completed
          ? "border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20"
          : "border-l-teal-600 bg-white dark:bg-slate-900"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          {onToggleComplete && (
            <button
              type="button"
              onClick={() => onToggleComplete(recommendation.id)}
              className="mt-0.5 text-slate-400 hover:text-emerald-600 focus:outline-emerald-600 rounded"
              aria-label={
                recommendation.completed
                  ? `Mark "${recommendation.action}" as incomplete`
                  : `Mark "${recommendation.action}" as completed`
              }
            >
              <CheckCircle2
                className={clsx(
                  "w-5 h-5 transition-colors",
                  recommendation.completed ? "text-emerald-600 fill-emerald-100" : "text-slate-300"
                )}
                aria-hidden="true"
              />
            </button>
          )}

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {recommendation.category}
              </span>
              <span className="text-xs text-slate-500">
                Confidence: {Math.round(recommendation.confidence * 100)}%
              </span>
              {recommendation.isGeneral && (
                <span className="text-[10px] text-slate-400 italic">(General guidance)</span>
              )}
            </div>

            <h4
              className={clsx(
                "text-sm font-semibold text-slate-900 dark:text-white leading-snug",
                recommendation.completed && "line-through text-slate-500 dark:text-slate-400"
              )}
            >
              {recommendation.action}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {recommendation.reason}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 self-start"
          aria-expanded={expanded}
          aria-label="Toggle details: evidence and expected benefit"
        >
          <ChevronDown
            className={clsx("w-4 h-4 transition-transform", expanded && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Expanded Grounded Evidence & Benefit */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
            <strong className="block text-slate-700 dark:text-slate-300 mb-0.5">
              Grounded Data Evidence:
            </strong>
            <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
              {recommendation.evidence}
            </span>
          </div>

          <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
            <strong className="block text-emerald-900 dark:text-emerald-200 mb-0.5">
              Expected Measurable Benefit:
            </strong>
            <span className="text-emerald-800 dark:text-emerald-300 text-[11px]">
              {recommendation.expectedBenefit}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
