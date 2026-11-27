import { UserPreferences } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Eye } from "lucide-react";

interface AccessibilitySectionProps {
  preferences: UserPreferences;
  setPreferences: (updater: (prev: UserPreferences) => UserPreferences) => void;
}

/**
 * Renders accessibility and visual presentation toggles (high contrast, font size, reduced motion).
 */
export function AccessibilitySection({ preferences, setPreferences }: AccessibilitySectionProps) {
  return (
    <Card className="space-y-4">
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <span>Accessibility & Display Options (WCAG 2.2 AA)</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.theme === "high-contrast"}
            onChange={(e) =>
              setPreferences((p) => ({
                ...p,
                theme: e.target.checked ? "high-contrast" : "light",
              }))
            }
            className="rounded text-emerald-600 w-4 h-4"
          />
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            High Contrast Mode (≥7:1)
          </span>
        </label>

        <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.largeText}
            onChange={(e) => setPreferences((p) => ({ ...p, largeText: e.target.checked }))}
            className="rounded text-emerald-600 w-4 h-4"
          />
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            Large Text Size (112.5%)
          </span>
        </label>

        <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.reducedMotion}
            onChange={(e) => setPreferences((p) => ({ ...p, reducedMotion: e.target.checked }))}
            className="rounded text-emerald-600 w-4 h-4"
          />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Reduced Motion</span>
        </label>
      </div>
    </Card>
  );
}
