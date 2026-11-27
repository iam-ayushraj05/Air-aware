import { UserPreferences } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Bell } from "lucide-react";

interface AlertsSectionProps {
  preferences: UserPreferences;
  setPreferences: (updater: (prev: UserPreferences) => UserPreferences) => void;
}

/**
 * Renders AQI standard calibration selection and pollution alert threshold inputs.
 */
export function AlertsSection({ preferences, setPreferences }: AlertsSectionProps) {
  return (
    <Card className="space-y-4">
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <span>Alerts & Standards</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label
            htmlFor="standard-select"
            className="block font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            AQI Standard Calibration
          </label>
          <select
            id="standard-select"
            value={preferences.aqiStandard}
            onChange={(e) =>
              setPreferences((p) => ({
                ...p,
                aqiStandard: e.target.value as UserPreferences["aqiStandard"],
              }))
            }
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="US_AQI">US EPA Air Quality Index (0-500)</option>
            <option value="EU_AQI">European Air Quality Index (EEA)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="alert-threshold-input"
            className="block font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            High Pollution Alert Threshold (AQI)
          </label>
          <input
            id="alert-threshold-input"
            type="number"
            min="50"
            max="400"
            value={preferences.highPollutionAlertThreshold}
            onChange={(e) =>
              setPreferences((p) => ({
                ...p,
                highPollutionAlertThreshold: Number(e.target.value) || 150,
              }))
            }
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>
    </Card>
  );
}
