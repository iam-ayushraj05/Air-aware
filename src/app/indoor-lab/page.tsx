"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { RoomAssessment } from "@/features/indoor/RoomAssessment";
import { Card } from "@/components/ui/Card";
import { Home, Wind, Filter, Droplets, Flame } from "lucide-react";
import { loadUserProfile } from "@/lib/storage";

export default function IndoorLabPage() {
  const [profile] = useState(loadUserProfile());

  return (
    <>
      <Navbar currentLocationName={profile.locationName} />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Indoor Air Quality Lab
              </span>
              <span className="text-xs text-slate-500">Heuristic Risk Scoring</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Home className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>Make Your Home a Cleaner-Air Zone</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Interactive room assessments, True HEPA air cleaner guidelines, and evidence-based
              indoor emission controls.
            </p>
          </div>

          {/* Interactive Room Assessment & Heuristic Score */}
          <RoomAssessment />

          {/* Educational Modules: Cooking, Ventilation, Dust, Filtration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Module 1: Cooking & Combustion */}
            <Card className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Flame className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Cooking & Combustion Control
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Stove-top frying and boiling in unventilated kitchens easily causes indoor PM2.5 to
                exceed 200 µg/m³. Always run kitchen exhaust fans before turning on the heat, and
                cover pots to prevent oil aerosol dispersion.
              </p>
            </Card>

            {/* Module 2: True HEPA Filtration Guidelines */}
            <Card className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Filter className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  HEPA Filter Sizing & Maintenance
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose purifiers certified for True HEPA (H13/H14) with a Clean Air Delivery Rate
                (CADR) sufficient to exchange the room volume 4–5 times per hour. Avoid
                ozone-generating ionizers which can irritate sensitive airways.
              </p>
            </Card>

            {/* Module 3: Ventilation Timing */}
            <Card className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Wind className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Smart Ventilation Timing
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Never keep windows permanently open during heavy smog or temperature inversion
                mornings. Instead, create a 15-minute cross-breeze during the warmest afternoon
                hours when vertical wind mixing has dispersed ground-level particulates.
              </p>
            </Card>

            {/* Module 4: Dust Cleaning Techniques */}
            <Card className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Droplets className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Microfiber Damp Mopping
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dry brooming causes fine settled dust to become airborne in the breathing zone for
                up to two hours. Use damp microfiber cloths and vacuum cleaners with sealed HEPA
                exhaust filtration.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
