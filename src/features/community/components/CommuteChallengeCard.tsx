import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trophy, Check, Flag } from "lucide-react";

interface CommuteChallengeCardProps {
  challenge: {
    title: string;
    description: string;
    currentActions: number;
    goalActions: number;
    daysRemaining: number;
  };
  activeParticipants: number;
  joined: boolean;
  onToggleJoin: () => void;
}

/**
 * Featured collaborative community challenge card showing progress toward neighborhood goals.
 */
export function CommuteChallengeCard({
  challenge,
  activeParticipants,
  joined,
  onToggleJoin,
}: CommuteChallengeCardProps) {
  const progressPercent = Math.round((challenge.currentActions / challenge.goalActions) * 100);

  return (
    <Card className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white border-0 shadow-lg">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-800/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Trophy className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-700 text-emerald-100">
                Featured Community Challenge
              </span>
              <h2 className="text-xl font-bold mt-1">{challenge.title}</h2>
            </div>
          </div>

          <Button
            variant={joined ? "secondary" : "primary"}
            onClick={onToggleJoin}
            className="self-start sm:self-auto text-xs"
          >
            {joined ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span>Participating</span>
              </>
            ) : (
              <>
                <Flag className="w-3.5 h-3.5 mr-1" />
                <span>Join This Challenge</span>
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{challenge.description}</p>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-emerald-200">
            <span>Community Progress Goal</span>
            <span className="font-semibold">
              {challenge.currentActions.toLocaleString()} / {challenge.goalActions.toLocaleString()}{" "}
              actions ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-emerald-950/80 rounded-full h-3 overflow-hidden border border-emerald-800">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{activeParticipants} active neighbors</span>
            <span>{challenge.daysRemaining} days remaining in cycle</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
