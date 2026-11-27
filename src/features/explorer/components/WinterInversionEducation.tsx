import { Card } from "@/components/ui/Card";
import { Snowflake } from "lucide-react";

/**
 * Educational section detailing temperature inversions and winter smog atmospheric physics.
 */
export function WinterInversionEducation() {
  return (
    <Card className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 rounded-2xl border-0 shadow-lg space-y-4">
      <div className="flex items-center gap-2 text-emerald-400">
        <Snowflake className="w-6 h-6" aria-hidden="true" />
        <h2 className="text-lg font-bold">
          Why Winter Pollution Becomes Worse: Temperature Inversions
        </h2>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        Under standard atmospheric conditions, air temperature decreases with altitude. Warm buoyant
        air near the ground naturally rises, carrying away vehicle exhaust and surface emissions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
        <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
          <strong className="block text-emerald-300">1. Thermal Inversion Lid</strong>
          <p className="text-slate-300">
            On clear winter nights, the ground rapidly loses heat, chilling the surface air layer
            while the air aloft remains warmer. This warm layer acts like a physical lid, trapping
            all exhaust at street level.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
          <strong className="block text-teal-300">2. Low Wind Velocity (Stagnation)</strong>
          <p className="text-slate-300">
            Winter weather systems frequently produce calm or light winds (under 10 km/h). Without
            horizontal ventilation, localized emissions multiply hour by hour.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
          <strong className="block text-amber-300">3. Cumulative Emission Sources</strong>
          <p className="text-slate-300">
            Cold temperatures cause vehicle engines to run rich (cold starts), while increased
            domestic heating and regional biomass burning add dense particulates directly into the
            stagnant surface bowl.
          </p>
        </div>
      </div>
    </Card>
  );
}
