"use client";

import { useState } from "react";
import { DEMO_COMMUNITY_STATS } from "@/lib/sustainability";
import { AlertTriangle } from "lucide-react";
import { CommuteChallengeCard } from "./components/CommuteChallengeCard";
import { RecentPledgesFeed } from "./components/RecentPledgesFeed";
import { ShareCampaignCard } from "./components/ShareCampaignCard";

/**
 * Community board displaying collective commute challenges, neighbor pledges,
 * and clean-air advocacy tools.
 */
export function CommunityBoard() {
  const [joinedChallenge, setJoinedChallenge] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const challenge = DEMO_COMMUNITY_STATS.currentChallenge;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        "I just joined the 7-Day Clean Commute Challenge on AirAware to cut urban smog! Join the community: https://airaware.app"
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
          <span>
            <strong>DEMO DATA NOTICE:</strong> Community participants and counts are simulated
            demonstration benchmarks to show how collaborative urban targets function.
          </span>
        </div>
      </div>

      <CommuteChallengeCard
        challenge={challenge}
        activeParticipants={DEMO_COMMUNITY_STATS.activeParticipants}
        joined={joinedChallenge}
        onToggleJoin={() => setJoinedChallenge(!joinedChallenge)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <RecentPledgesFeed pledges={DEMO_COMMUNITY_STATS.recentPledges} />
        <ShareCampaignCard copied={copiedShare} onShare={handleShare} />
      </div>
    </div>
  );
}
