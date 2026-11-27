import { HelpCircle } from "lucide-react";

interface EnvironmentalSavingsBoxProps {
  co2eRange: [number, number];
  pm25Range: [number, number];
  showFormula: boolean;
  onToggleFormula: () => void;
}

/**
 * Metric summary card displaying avoided greenhouse gas and fine particulate matter ranges.
 */
export function EnvironmentalSavingsBox({
  co2eRange,
  pm25Range,
  showFormula,
  onToggleFormula,
}: EnvironmentalSavingsBoxProps) {
  return (
    <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-slate-300">Avoided Greenhouse Gas (CO2e):</span>
        <span className="font-bold text-emerald-400">
          {co2eRange[0]} – {co2eRange[1]} kg / day
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-1.5">
        <span className="text-slate-300">Avoided Fine Particulate (PM2.5):</span>
        <span className="font-bold text-teal-300">
          {pm25Range[0]} – {pm25Range[1]} grams
        </span>
      </div>
      <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
        <span>Estimated impact: based on assumptions.</span>
        <button
          type="button"
          onClick={onToggleFormula}
          className="text-emerald-400 hover:underline flex items-center gap-0.5"
          aria-expanded={showFormula}
        >
          <HelpCircle className="w-3 h-3" />
          <span>How we calculate</span>
        </button>
      </div>
    </div>
  );
}
