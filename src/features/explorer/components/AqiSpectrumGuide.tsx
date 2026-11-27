import { Card } from "@/components/ui/Card";
import { US_AQI_CATEGORIES } from "@/lib/constants";

/**
 * Grid rendering all 6 US EPA AQI category bands with color coding and summaries.
 */
export function AqiSpectrumGuide() {
  return (
    <Card className="space-y-4">
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          AQI Spectrum Reference (US EPA Standard)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        {Object.values(US_AQI_CATEGORIES).map((cat) => (
          <div
            key={cat.key}
            className="p-3.5 rounded-xl border space-y-1.5"
            style={{ borderColor: `${cat.color}60` }}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">{cat.label}</span>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-extrabold text-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.min}–{cat.max}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {cat.summary}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
