"use client";

import React, { useState } from "react";
import { SustainableAlternativeComparison } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HelpCircle, Check, Plus, Leaf } from "lucide-react";
import { clsx } from "clsx";

interface ComparisonCardProps {
  item: SustainableAlternativeComparison;
  onAddAction?: (item: SustainableAlternativeComparison) => void;
  isAdded?: boolean;
}

export function ComparisonCard({ item, onAddAction, isAdded }: ComparisonCardProps) {
  const [showFormula, setShowFormula] = useState(false);

  const getDifficultyBadge = (d: SustainableAlternativeComparison["difficulty"]) => {
    switch (d) {
      case "easy":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      case "hard":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
    }
  };

  return (
    <Card className="flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={clsx(
                  "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded",
                  getDifficultyBadge(item.difficulty)
                )}
              >
                {item.difficulty} Effort
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {item.costImpact.replace("_", " ")}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Current Practice
            </span>
            <span className="text-slate-700 dark:text-slate-300">{item.baselineChoice}</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60">
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-600" aria-hidden="true" />
              <span>Cleaner Alternative</span>
            </span>
            <span className="text-emerald-900 dark:text-emerald-100 font-medium">
              {item.sustainableChoice}
            </span>
          </div>
        </div>

        {/* Environmental Savings Range */}
        <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Avoided Greenhouse Gas (CO2e):</span>
            <span className="font-bold text-emerald-400">
              {item.emissionsAvoidedKgCO2ePerTripOrDay[0]} – {item.emissionsAvoidedKgCO2ePerTripOrDay[1]} kg / day
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800 pt-1.5">
            <span className="text-slate-300">Avoided Fine Particulate (PM2.5):</span>
            <span className="font-bold text-teal-300">
              {item.pm25AvoidedGrams[0]} – {item.pm25AvoidedGrams[1]} grams
            </span>
          </div>
          <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
            <span>Estimated impact: based on assumptions.</span>
            <button
              type="button"
              onClick={() => setShowFormula(!showFormula)}
              className="text-emerald-400 hover:underline flex items-center gap-0.5"
              aria-expanded={showFormula}
            >
              <HelpCircle className="w-3 h-3" />
              <span>How we calculate</span>
            </button>
          </div>
        </div>

        {/* Transparent Formula & Assumptions Accordion */}
        {showFormula && (
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <div>
              <strong className="block text-[11px] font-bold">Assumptions & Baseline:</strong>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                {item.assumptions}
              </p>
            </div>
            <div>
              <strong className="block text-[11px] font-bold">Calculation Formula:</strong>
              <code className="block p-1.5 rounded bg-slate-200 dark:bg-slate-900 font-mono text-[10px]">
                {item.formula}
              </code>
            </div>
            <div className="text-[10px] text-slate-500">
              Source Citation: {item.sourceCitation}
            </div>
          </div>
        )}
      </div>

      {/* Action CTA */}
      {onAddAction && (
        <Button
          variant={isAdded ? "secondary" : "primary"}
          size="sm"
          onClick={() => onAddAction(item)}
          disabled={isAdded}
          className="w-full text-xs"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              <span>Added to Today&apos;s Plan</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Adopt this Sustainable Action</span>
            </>
          )}
        </Button>
      )}
    </Card>
  );
}
