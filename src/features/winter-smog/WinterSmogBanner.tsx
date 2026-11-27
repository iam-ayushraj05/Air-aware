import { Snowflake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SmogActionCards } from "./components/SmogActionCards";
import { WinterSmogParams } from "./types";

/**
 * High-visibility banner active during cold stagnant atmospheric inversions.
 */
export function WinterSmogBanner({ isActive, tempC, windSpeed }: WinterSmogParams) {
  if (!isActive) return null;

  return (
    <div
      role="alert"
      className="bg-gradient-to-r from-amber-900/90 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-amber-500/40 space-y-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Snowflake className="w-6 h-6 animate-spin-slow" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                Winter Smog Alert Active
              </span>
              <span className="text-xs text-amber-200">Thermal Inversion Trapping</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Low Temperature ({tempC}°C) & Stagnant Air ({windSpeed} km/h) Trapping PM2.5
            </h3>
          </div>
        </div>

        <Link
          href="/explorer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors self-start sm:self-auto"
        >
          <span>Why Inversions Happen</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      <SmogActionCards />
    </div>
  );
}
