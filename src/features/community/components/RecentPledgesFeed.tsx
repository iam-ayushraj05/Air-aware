import { Card } from "@/components/ui/Card";
import { Users } from "lucide-react";

interface RecentPledgesFeedProps {
  pledges: Array<{
    neighborhood: string;
    action: string;
    time: string;
  }>;
}

/**
 * List of neighborhood clean-air pledges with simulated benchmark notice.
 */
export function RecentPledgesFeed({ pledges }: RecentPledgesFeedProps) {
  return (
    <Card className="lg:col-span-7 space-y-4">
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span>Live Neighborhood Clean-Air Pledges</span>
        </h3>
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          DEMO FEED
        </span>
      </div>

      <div className="space-y-2.5">
        {pledges.map((pledge, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs"
          >
            <div>
              <strong className="block text-slate-800 dark:text-slate-200 font-semibold">
                {pledge.neighborhood}
              </strong>
              <span className="text-emerald-700 dark:text-emerald-400">{pledge.action}</span>
            </div>
            <span className="text-slate-400 text-[11px]">{pledge.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
