import { IndoorAssessmentData } from "@/lib/types";

interface VentilationHabitInputsProps {
  data: Partial<IndoorAssessmentData>;
  setData: (
    updater: (prev: Partial<IndoorAssessmentData>) => Partial<IndoorAssessmentData>
  ) => void;
}

/**
 * Dropdowns for ventilation strategy during smog and dust cleaning technique.
 */
export function VentilationHabitInputs({ data, setData }: VentilationHabitInputsProps) {
  return (
    <>
      <div>
        <label
          htmlFor="ventilation-select"
          className="font-semibold text-slate-700 dark:text-slate-300 block mb-1"
        >
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
          <option value="smart_timing">
            Smart Timing (Ventilate during afternoon clean windows)
          </option>
          <option value="always_closed">Always Closed (Sealed windows)</option>
          <option value="always_open">Always Open (Unfiltered natural draft)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="cleaning-method-select"
          className="font-semibold text-slate-700 dark:text-slate-300 block mb-1"
        >
          Dust Cleaning Technique
        </label>
        <select
          id="cleaning-method-select"
          value={data.dustCleaningFrequency}
          onChange={(e) =>
            setData((p) => ({
              ...p,
              dustCleaningFrequency: e.target
                .value as IndoorAssessmentData["dustCleaningFrequency"],
            }))
          }
          className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
        >
          <option value="daily_damp">Daily Microfiber Damp Mopping (Traps Dust)</option>
          <option value="weekly_vacuum">HEPA-Filtered Vacuum</option>
          <option value="dry_brooming">Dry Brooming (Resuspends Particles)</option>
        </select>
      </div>
    </>
  );
}
