/**
 * 4-step methodology breakdown explaining data ingestion, inversion checks, AI, and impact formulas.
 */
export function LandingMethodology() {
  return (
    <section
      className="py-20 bg-slate-50 border-b border-slate-200/60"
      aria-labelledby="methodology-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
            Step-by-Step Methodology
          </span>
          <h2 id="methodology-heading" className="text-3xl font-bold text-slate-900">
            How AirAware Empowers Your Daily Decisions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Live Data Ingestion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Retrieves real-time PM2.5, PM10, Ozone, NO2, temperature, and wind speed from
              Open-Meteo with SSRF protection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Inversion Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detects thermal inversion conditions (cold surface air + low wind) and immediately
              flags winter smog hazards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Grounded AI Advisor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pairs current atmospheric measurements with your family profile to generate
              morning-to-night personalized action plans.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-base text-slate-900">Transparent Impact</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tracks avoided emissions and particulate matter with clear mathematical formulas from
              DEFRA and EPA models.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
