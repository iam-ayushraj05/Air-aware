import { IndoorAssessmentData } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";
import { VentilationHabitInputs } from "./VentilationHabitInputs";

interface AssessmentControlsProps {
  data: Partial<IndoorAssessmentData>;
  setData: (
    updater: (prev: Partial<IndoorAssessmentData>) => Partial<IndoorAssessmentData>
  ) => void;
}

/**
 * Interactive input controls for room filtration, cooking fuel, exhaust, and cleaning.
 */
export function AssessmentControls({ data, setData }: AssessmentControlsProps) {
  return (
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
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <strong className="block text-slate-800 dark:text-slate-200">
              Air Purifier in Room
            </strong>
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

        <div>
          <label
            htmlFor="cooking-fuel-select"
            className="font-semibold text-slate-700 dark:text-slate-300 block mb-1"
          >
            Primary Cooking Method
          </label>
          <select
            id="cooking-fuel-select"
            value={data.cookingFuel}
            onChange={(e) =>
              setData((p) => ({
                ...p,
                cookingFuel: e.target.value as IndoorAssessmentData["cookingFuel"],
              }))
            }
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
          >
            <option value="electric_induction">Electric Induction (Zero Combustion)</option>
            <option value="piped_gas">Piped Fossil Gas (NO2 emissions)</option>
            <option value="lpg">LPG Cylinder</option>
            <option value="biomass">Biomass / Charcoal (High PM2.5 Risk)</option>
          </select>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <strong className="block text-slate-800 dark:text-slate-200">
              Operational Kitchen Exhaust
            </strong>
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

        <VentilationHabitInputs data={data} setData={setData} />

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <strong className="block text-slate-800 dark:text-slate-200">
              Incense Sticks or Scented Candles
            </strong>
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
      </div>
    </Card>
  );
}
