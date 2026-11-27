import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Share2, Check } from "lucide-react";

interface ShareCampaignCardProps {
  copied: boolean;
  onShare: () => void;
}

/**
 * Shareable clean-air advocacy badge and link copy action.
 */
export function ShareCampaignCard({ copied, onShare }: ShareCampaignCardProps) {
  return (
    <Card className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-gradient-to-br from-emerald-50/40 to-teal-50/40 dark:from-emerald-950/20 dark:to-slate-900 border-emerald-200 dark:border-emerald-800">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span>Neighborhood Awareness</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Spread the Word on Winter Smog Protection
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Invite neighbors, parent groups, and community members to track daily AQI windows and
          coordinate carpools to reduce local emissions.
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onShare}
        className="w-full flex items-center justify-center gap-2 border-emerald-400 text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 text-xs"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Challenge with Neighbors</span>
          </>
        )}
      </Button>
    </Card>
  );
}
