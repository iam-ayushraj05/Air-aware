import { useState } from "react";
import { Card } from "@/components/ui/Card";

type PollutantKey = "pm25" | "pm10" | "no2" | "o3";

const POLLUTANT_DATA: Record<
  PollutantKey,
  { name: string; size: string; sources: string; health: string; safeLimit: string }
> = {
  pm25: {
    name: "Fine Particulate Matter (PM2.5)",
    size: "≤ 2.5 micrometers (30x thinner than human hair)",
    sources:
      "Combustion of petrol & diesel fuels, power generation, wood smoke, industrial furnaces.",
    health:
      "Due to minute aerodynamic diameter, PM2.5 penetrates past nasal cilia directly into deep alveoli and enters the capillary bloodstream, increasing long-term cardiovascular and pulmonary inflammation.",
    safeLimit: "15 µg/m³ (WHO 24-hr guideline)",
  },
  pm10: {
    name: "Coarse Particulate Matter (PM10)",
    size: "≤ 10 micrometers",
    sources: "Road dust resuspension, construction activity, windblown soil, mechanical grinding.",
    health:
      "Deposits in the upper airways and bronchi. Induces coughing, asthma flare-ups, and eye/nasal passage irritation.",
    safeLimit: "45 µg/m³ (WHO 24-hr guideline)",
  },
  no2: {
    name: "Nitrogen Dioxide (NO2)",
    size: "Reactive Gas Molecule",
    sources:
      "Automotive internal combustion engines, domestic fossil gas cooking stoves, power stations.",
    health:
      "Irritates respiratory mucous linings, heightens bronchial hypersensitivity to allergens, and exacerbates childhood asthma symptoms.",
    safeLimit: "25 µg/m³ (WHO 24-hr guideline)",
  },
  o3: {
    name: "Ground-Level Ozone (O3)",
    size: "Photochemical Secondary Pollutant",
    sources:
      "Formed when precursor NOx and VOCs react in the presence of strong sunlight and heat.",
    health:
      "A potent oxidant that reduces lung elasticity, triggers chest tightness during deep breathing, and worsens emphysema.",
    safeLimit: "100 µg/m³ (WHO 8-hr guideline)",
  },
};

/**
 * Interactive pollutant inspector breaking down aerodynamic diameters, limits, and health risks.
 */
export function PollutantAnatomy() {
  const [selected, setSelected] = useState<PollutantKey>("pm25");
  const data = POLLUTANT_DATA[selected];

  return (
    <Card className="space-y-4">
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Interactive Pollutant Anatomy
        </h3>
        <p className="text-xs text-slate-500">
          Select a key atmospheric indicator to learn about size scale, sources, and biological
          interactions.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["pm25", "pm10", "no2", "o3"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelected(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
              selected === key
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
            }`}
            aria-pressed={selected === key}
          >
            {POLLUTANT_DATA[key].name}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold text-slate-500 block">Aerodynamic Scale:</span>
            <span className="font-bold text-slate-900 dark:text-white">{data.size}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">WHO Recommended Benchmark:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              {data.safeLimit}
            </span>
          </div>
        </div>

        <div>
          <span className="font-semibold text-slate-500 block mb-0.5">
            Primary Anthropogenic Sources:
          </span>
          <p className="text-slate-700 dark:text-slate-300">{data.sources}</p>
        </div>

        <div>
          <span className="font-semibold text-slate-500 block mb-0.5">
            Health Exposure Considerations:
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{data.health}</p>
        </div>
      </div>
    </Card>
  );
}
