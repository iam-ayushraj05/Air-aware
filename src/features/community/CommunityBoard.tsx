"use client";

import React, { useState } from "react";
import { DEMO_COMMUNITY_STATS } from "@/lib/sustainability";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, Trophy, Flag, AlertTriangle, Check, Share2, Sparkles } from "lucide-react";

export function CommunityBoard() {
  const [joinedChallenge, setJoinedChallenge] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const challenge = DEMO_COMMUNITY_STATS.currentChallenge;
  const progressPercent = Math.round(
    (challenge.currentActions / challenge.goalActions) * 100
  );

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
      {/* Demo Notice Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
          <span>
            <strong>DEMO DATA NOTICE:</strong> Community participants and counts are simulated demonstration benchmarks to show how collaborative urban targets function.
          </span>
        </div>
      </div>

      {/* Featured 7-Day Clean Commute Challenge */}
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
              variant={joinedChallenge ? "secondary" : "primary"}
              onClick={() => setJoinedChallenge(!joinedChallenge)}
              className="self-start sm:self-auto text-xs"
            >
              {joinedChallenge ? (
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

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {challenge.description}
          </p>

          {/* Goal Progress */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs text-emerald-200">
              <span>Community Progress Goal</span>
              <span className="font-semibold">
                {challenge.currentActions.toLocaleString()} / {challenge.goalActions.toLocaleString()} actions ({progressPercent}%)
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
              <span>{DEMO_COMMUNITY_STATS.activeParticipants} active neighbors</span>
              <span>{challenge.daysRemaining} days remaining in cycle</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Community Action Feed & Shareable Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Pledges */}
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
            {DEMO_COMMUNITY_STATS.recentPledges.map((pledge, idx) => (
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

        {/* Shareable Action Card */}
        <Card className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-gradient-to-br from-emerald-50/40 to-teal-50/40 dark:from-emerald-950/20 dark:to-slate-900 border-emerald-200 dark:border-emerald-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4" />
              <span>Shareable Clean-Air Badge</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-center space-y-2 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold text-lg">
                AA
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Clean Commute Advocate
              </h4>
              <p className="text-xs text-slate-500">
                Pledged to choose low-emission mobility to reduce ground-level PM2.5 in our community.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="w-full text-xs flex items-center justify-center gap-2 border-emerald-300 text-emerald-800 dark:text-emerald-200"
          >
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copiedShare ? "Link Copied to Clipboard!" : "Share Community Pledge"}</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}
