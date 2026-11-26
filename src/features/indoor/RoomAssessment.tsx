"use client";

import React, { useState } from "react";
import { calculateIndoorScore, PLANT_PURIFICATION_FACTS } from "@/lib/indoor";
import { IndoorAssessmentData } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Home, AlertCircle, Info } from "lucide-react";
import { clsx } from "clsx";

interface RoomAssessmentProps {
  outdoorAqi?: number;
}

export function RoomAssessment({ outdoorAqi = 140 }: RoomAssessmentProps) {
  const [data, setData] = useState<Partial<IndoorAssessmentData>>({
    roomType: "living_room",
    hasPurifier: true,
    purifierHepa: true,
    cookingFuel: "piped_gas",
    exhaustFanWorking: true,
    ventilationMethod: "smart_timing",
    hasIncenseOrCandles: false,
    dustCleaningFrequency: "daily_damp",
    indoorPlantsCount: 3,
  });

  const result = calculateIndoorScore(data, outdoorAqi);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-300";
    if (score >= 65) return "text-teal-600 bg-teal-50 border-teal-300";
    if (score >= 45) return "text-amber-600 bg-amber-50 border-amber-300";
    return "text-rose-600 bg-rose-50 border-rose-300";
  };

  return (
    <div className="space-y-6">
      {/* Assessment Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Controls */}
        <Card className="lg:col-span-7 space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              <span>Interactive Home Air Assessment</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize parameters to see your real-time heuristic indoor clean-air score.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Air Purifier Toggle */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Air Purifier in Room</strong>
                <span className="text-slate-500">True HEPA filtration removes 99.97% of PM2.5</span>
              </div>
              <Button
                variant={data.hasPurifier ? "primary" : "outline"}
                size="sm"
                onClick={() => setData((p) => ({ ...p, hasPurifier: !p.hasPurifier }))}
              >
                {data.hasPurifier ? "Active" : "None"}
              </Button>
            </div>

            {/* Cooking Fuel */}
            <div>
              <label htmlFor="cooking-fuel-select" className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Primary Cooking Method
              </label>
              <select
                id="cooking-fuel-select"
                value={data.cookingFuel}
                onChange={(e) =>
                  setData((p) => ({ ...p, cookingFuel: e.target.value as IndoorAssessmentData["cookingFuel"] }))
                }
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              >
                <option value="electric_induction">Electric Induction (Zero Combustion)</option>
                <option value="piped_gas">Piped Fossil Gas (NO2 emissions)</option>
                <option value="lpg">LPG Cylinder</option>
                <option value="biomass">Biomass / Charcoal (High PM2.5 Risk)</option>
              </select>
            </div>

            {/* Exhaust Fan */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Operational Kitchen Exhaust</strong>
                <span className="text-slate-500">Ducted hood vents oil droplets outdoors</span>
              </div>
              <Button
                variant={data.exhaustFanWorking ? "primary" : "outline"}
                size="sm"
                onClick={() => setData((p) => ({ ...p, exhaustFanWorking: !p.exhaustFanWorking }))}
              >
                {data.exhaustFanWorking ? "Yes" : "No"}
              </Button>
            </div>

            {/* Ventilation Habit */}
            <div>
              <label htmlFor="ventilation-select" className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Ventilation Strategy During Smog
              </label>
              <select
                id="ventilation-select"
                value={data.ventilationMethod}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    ventilationMethod: e.target.value as IndoorAssessmentData["ventilationMethod"],
                  }))
                }
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              >
                <option value="smart_timing">Smart Timing (Ventilate during afternoon clean windows)</option>
                <option value="always_closed">Always Closed (Sealed windows)</option>
                <option value="always_open">Always Open (Unfiltered natural draft)</option>
              </select>
            </div>

            {/* Incense or Scented Candles */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Incense Sticks or Scented Candles</strong>
                <span className="text-slate-500">Indoor combustion adds ultra-fine carbon soot</span>
              </div>
              <Button
                variant={data.hasIncenseOrCandles ? "danger" : "outline"}
                size="sm"
                onClick={() => setData((p) => ({ ...p, hasIncenseOrCandles: !p.hasIncenseOrCandles }))}
              >
                {data.hasIncenseOrCandles ? "Used" : "Avoided"}
              </Button>
            </div>

            {/* Dust cleaning method */}
            <div>
              <label htmlFor="cleaning-method-select" className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Dust Cleaning Technique
              </label>
              <select
                id="cleaning-method-select"
                value={data.dustCleaningFrequency}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    dustCleaningFrequency: e.target.value as IndoorAssessmentData["dustCleaningFrequency"],
                  }))
                }
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              >
                <option value="daily_damp">Daily Microfiber Damp Mopping (Traps Dust)</option>
                <option value="weekly_vacuum">HEPA-Filtered Vacuum</option>
                <option value="dry_brooming">Dry Brooming (Resuspends Particles)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Real-time Heuristic Score Output */}
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

            {/* Score Ring */}
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
              <p className="text-xs text-slate-500 mt-2">
                Outdoor AQI Baseline: {outdoorAqi}
              </p>
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>Source Reduction</span>
                  <span className="font-semibold">{result.breakdown.sourceReductionScore} / 30</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(result.breakdown.sourceReductionScore / 30) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>Active Filtration</span>
                  <span className="font-semibold">{result.breakdown.filtrationScore} / 30</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full"
                    style={{ width: `${(result.breakdown.filtrationScore / 30) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>Ventilation Strategy</span>
                  <span className="font-semibold">{result.breakdown.ventilationScore} / 25</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${(result.breakdown.ventilationScore / 25) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>Cleaning & Dust Control</span>
                  <span className="font-semibold">{result.breakdown.cleaningScore} / 15</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${(result.breakdown.cleaningScore / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Identified Risks & Priority Actions */}
            {result.priorityActions.length > 0 && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl space-y-1.5 text-xs">
                <strong className="block text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  Top Priority Improvement:
                </strong>
                <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                  {result.priorityActions[0]}
                </p>
              </div>
            )}
          </div>

          <p className="text-[10px] text-slate-400 leading-tight italic pt-2 border-t border-slate-100 dark:border-slate-800">
            {result.heuristicDisclaimer}
          </p>
        </Card>
      </div>

      {/* Honest Science on Indoor Plants */}
      <Card className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1 text-xs">
            <strong className="text-slate-900 dark:text-white font-semibold block text-sm">
              Scientific Perspective: Do Houseplants Clean Urban Winter Smog?
            </strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {PLANT_PURIFICATION_FACTS.summary} {PLANT_PURIFICATION_FACTS.details}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
