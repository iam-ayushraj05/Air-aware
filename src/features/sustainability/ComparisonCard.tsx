"use client";

import { useState } from "react";
import { SustainableAlternativeComparison } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Plus, Leaf } from "lucide-react";
import { clsx } from "clsx";
import { CalculationDisclosure } from "./components/CalculationDisclosure";
import { EnvironmentalSavingsBox } from "./components/EnvironmentalSavingsBox";

interface ComparisonCardProps {
  item: SustainableAlternativeComparison;
  onAddAction?: (item: SustainableAlternativeComparison) => void;
  isAdded?: boolean;
}

function getDifficultyBadge(d: SustainableAlternativeComparison["difficulty"]) {
  switch (d) {
    case "easy":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
    case "medium":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
    case "hard":
      return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
  }
}

/**
 * Card comparing baseline lifestyle choices with cleaner alternatives,
 * calculating avoided CO2e and PM2.5 with full formula transparency.
 */
export function ComparisonCard({ item, onAddAction, isAdded }: ComparisonCardProps) {
  const [showFormula, setShowFormula] = useState(false);

  return (
    <Card className="flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
      <div className="space-y-3">
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

        <EnvironmentalSavingsBox
          co2eRange={item.emissionsAvoidedKgCO2ePerTripOrDay}
          pm25Range={item.pm25AvoidedGrams}
          showFormula={showFormula}
          onToggleFormula={() => setShowFormula(!showFormula)}
        />

        {showFormula && (
          <CalculationDisclosure
            assumptions={item.assumptions}
            formula={item.formula}
            sourceCitation={item.sourceCitation}
          />
        )}
      </div>

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
              <span>Adopt Alternative Routine</span>
            </>
          )}
        </Button>
      )}
    </Card>
  );
}
