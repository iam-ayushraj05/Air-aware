"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { US_AQI_CATEGORIES } from "@/lib/constants";
import { Search, Snowflake } from "lucide-react";
import { loadUserProfile } from "@/lib/storage";

export default function ExplorerPage() {
  const [profile] = useState(loadUserProfile());
  const [selectedPollutant, setSelectedPollutant] = useState<"pm25" | "pm10" | "no2" | "o3">("pm25");

  const pollutantData = {
    pm25: {
      name: "Fine Particulate Matter (PM2.5)",
      size: "≤ 2.5 micrometers (30x thinner than human hair)",
      sources: "Combustion of petrol & diesel fuels, power generation, wood smoke, industrial furnaces.",
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
      sources: "Automotive internal combustion engines, domestic fossil gas cooking stoves, power stations.",
      health:
        "Irritates respiratory mucous linings, heightens bronchial hypersensitivity to allergens, and exacerbates childhood asthma symptoms.",
      safeLimit: "25 µg/m³ (WHO 24-hr guideline)",
    },
    o3: {
      name: "Ground-Level Ozone (O3)",
      size: "Photochemical Secondary Pollutant",
      sources: "Formed when precursor NOx and VOCs react in the presence of strong sunlight and heat.",
      health:
        "A potent oxidant that reduces lung elasticity, triggers chest tightness during deep breathing, and worsens emphysema.",
      safeLimit: "100 µg/m³ (WHO 8-hr guideline)",
    },
  };

  return (
    <>
      <Navbar currentLocationName={profile.locationName} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Pollution Explorer
              </span>
              <span className="text-xs text-slate-500">Atmospheric Science Education</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>Understanding Urban Air Pollution</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Clear scientific explanations of atmospheric pollutants, health effects, and winter smog mechanisms.
            </p>
          </div>

          {/* Section: Why Winter Pollution Becomes Worse */}
          <Card className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 rounded-2xl border-0 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Snowflake className="w-6 h-6" aria-hidden="true" />
              <h2 className="text-lg font-bold">Why Winter Pollution Becomes Worse: Temperature Inversions</h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Under standard atmospheric conditions, air temperature decreases with altitude. Warm buoyant air near the ground naturally rises, carrying away vehicle exhaust and surface emissions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <strong className="block text-emerald-300">1. Thermal Inversion Lid</strong>
                <p className="text-slate-300">
                  On clear winter nights, the ground rapidly loses heat, chilling the surface air layer while the air aloft remains warmer. This warm layer acts like a physical lid, trapping all exhaust at street level.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <strong className="block text-teal-300">2. Low Wind Velocity (Stagnation)</strong>
                <p className="text-slate-300">
                  Winter weather systems frequently produce calm or light winds (under 10 km/h). Without horizontal ventilation, localized emissions multiply hour by hour.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <strong className="block text-amber-300">3. Cumulative Emission Sources</strong>
                <p className="text-slate-300">
                  Cold temperatures cause vehicle engines to run rich (cold starts), while increased domestic heating and regional biomass burning add dense particulates directly into the stagnant surface bowl.
                </p>
              </div>
            </div>
          </Card>

          {/* Interactive Pollutant Selector */}
          <Card className="space-y-4">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Pollutant Anatomy
              </h3>
              <p className="text-xs text-slate-500">
                Select a key atmospheric indicator to learn about size scale, sources, and biological interactions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["pm25", "pm10", "no2", "o3"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPollutant(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
                    selectedPollutant === key
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                  aria-pressed={selectedPollutant === key}
                >
                  {pollutantData[key].name}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-slate-500 block">Aerodynamic Scale:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{pollutantData[selectedPollutant].size}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">WHO Recommended Benchmark:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{pollutantData[selectedPollutant].safeLimit}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">Primary Anthropogenic Sources:</span>
                <p className="text-slate-700 dark:text-slate-300">{pollutantData[selectedPollutant].sources}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">Health Exposure Considerations:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{pollutantData[selectedPollutant].health}</p>
              </div>
            </div>
          </Card>

          {/* AQI Category Reference Guide */}
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
        </main>
      </div>
    </>
  );
}
