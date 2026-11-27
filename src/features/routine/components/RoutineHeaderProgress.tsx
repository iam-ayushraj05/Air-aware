import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RotateCcw, Sparkles } from "lucide-react";

interface RoutineHeaderProgressProps {
  locationName: string;
  aqiContext: number;
  summary: string;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  isRegenerating?: boolean | undefined;
  onRegenerate: () => void;
}

/**
 * Top card showing routine metadata, completion progress bar, and regenerate button.
 */
export function RoutineHeaderProgress({
  locationName,
  aqiContext,
  summary,
  completedCount,
  totalCount,
  progressPercent,
  isRegenerating,
  onRegenerate,
}: RoutineHeaderProgressProps) {
  return (
    <Card className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white border-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
              Personalized Clean-Air Day
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-100">
              AQI {aqiContext}
            </span>
          </div>
          <h2 className="text-xl font-bold">{locationName} Routine Schedule</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">{summary}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          isLoading={isRegenerating}
          className="text-white border-emerald-400 hover:bg-emerald-800 self-start sm:self-auto text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
          <span>Regenerate Routine</span>
        </Button>
      </div>

      <div className="pt-4 space-y-1.5">
        <div className="flex justify-between text-xs text-emerald-200">
          <span>Daily Routine Completion</span>
          <span className="font-semibold">
            {completedCount} of {totalCount} completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-emerald-950/80 rounded-full h-2.5 overflow-hidden border border-emerald-800">
          <div
            className="bg-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </Card>
  );
}
