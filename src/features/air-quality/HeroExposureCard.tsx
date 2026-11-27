"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

export function HeroExposureCard() {
  const [showCalculation, setShowCalculation] = useState(false);

  return (
    <div className="space-y-2">
      <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs space-y-2">
        <div className="flex items-center justify-between font-semibold text-emerald-300">
          <span>Estimated Exposure Reduction:</span>
          <span>60% – 85% PM2.5 Reduction</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
          <div className="bg-emerald-400 h-full w-[75%] rounded-full" />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span>Estimated impact: based on assumptions.</span>
          <button
            type="button"
            onClick={() => setShowCalculation(!showCalculation)}
            className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 rounded px-1"
            aria-expanded={showCalculation}
            aria-controls="hero-exposure-disclosure"
          >
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>How we calculate</span>
            <ChevronDown className={clsx("w-3 h-3 transition-transform", showCalculation && "rotate-180")} aria-hidden="true" />
          </button>
        </div>
      </div>

      {showCalculation && (
        <div
          id="hero-exposure-disclosure"
          className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-slate-300 text-xs space-y-2 animate-in fade-in duration-200"
        >
          <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Calculation Methodology & Assumptions</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            <strong>Baseline:</strong> Without filtration, natural outdoor particulate infiltration into residential apartments allows 50%–70% of ambient outdoor PM2.5 to enter living areas.
          </p>
          <p className="text-[11px] leading-relaxed text-slate-300">
            <strong>Mitigation:</strong> Operating a certified True HEPA mechanical filter sized for 4–5 Air Changes per Hour (ACH) matched to room Clean Air Delivery Rate (CADR) in a closed room reduces indoor PM2.5 by 60%–85% relative to outdoor ambient air.
          </p>
          <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1.5">
            Sources: US EPA Guide to Air Cleaners in the Home (EPA-402-F-08-004) &amp; Cummings &amp; Waring Indoor Air Quality Meta-Analysis.
          </div>
        </div>
      )}
    </div>
  );
}
