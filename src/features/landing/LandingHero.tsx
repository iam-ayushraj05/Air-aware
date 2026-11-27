import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroExposureCard } from "@/features/air-quality/HeroExposureCard";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * Landing page hero section highlighting atmospheric temperature inversion mitigation
 * and primary calls to action.
 */
export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Urban Air Quality Assistant &bull; Prompt Wars Challenge 6</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Know Your Air. <br />
              <span className="text-emerald-700">Protect Your Family.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Severe winter smog and urban pollution trap toxic particles where your loved ones
              breathe. AirAware provides real-time meteorological intelligence, personalized
              clean-air routines, indoor filtration hacks, and measurable low-emission alternatives.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/dashboard" aria-label="Check my air quality on dashboard">
                <Button size="lg" className="w-full sm:w-auto shadow-md gap-2">
                  <span>Check My Air Quality</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>

              <Link href="/advisor" aria-label="Explore AI Assistant conversational tool">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 border-emerald-600 text-emerald-800 bg-white hover:bg-emerald-50"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>Explore AI Assistant</span>
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Open-Meteo Real-Time Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>US AQI via Open-Meteo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>No Sensitive Data Stored</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 bg-slate-900 text-white shadow-2xl border border-slate-800 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Atmospheric Inversion Transition
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800">
                    Live Simulation
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-800/80 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block">
                      Without Mitigation
                    </span>
                    <div className="text-2xl font-black text-rose-400">AQI 268</div>
                    <p className="text-slate-300 text-[11px] leading-snug">
                      Nocturnal temperature inversion traps vehicular fine PM2.5 at breathing
                      height.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-700/80 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                      AirAware Safe Sanctuary
                    </span>
                    <div className="text-2xl font-black text-emerald-400">AQI 38</div>
                    <p className="text-slate-300 text-[11px] leading-snug">
                      True HEPA filtration, smart ventilation timing, and zero idle routine.
                    </p>
                  </div>
                </div>

                <HeroExposureCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
