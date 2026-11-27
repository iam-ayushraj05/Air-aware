import { Navbar } from "@/components/layout/Navbar";
import { LandingCityHotspots } from "@/features/air-quality/LandingCityHotspots";
import { LandingHero } from "@/features/landing/LandingHero";
import { LandingMethodology } from "@/features/landing/LandingMethodology";
import { LandingFeatures } from "@/features/landing/LandingFeatures";

/**
 * Public landing page introducing the AirAware platform, methodology, live hotspots,
 * and environmental health ecosystem.
 */
export default function LandingPage() {
  return (
    <>
      <Navbar currentLocationName="Global Explorer" />
      <main id="main-content" className="flex-1">
        <LandingHero />

        <section
          className="py-16 bg-white border-b border-slate-200/60"
          aria-labelledby="hotspots-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                Real-Time Urban Intelligence
              </span>
              <h2 id="hotspots-heading" className="text-3xl font-bold text-slate-900">
                Explore Current Urban Hotspots
              </h2>
              <p className="text-slate-600 text-sm">
                Real atmospheric meteorological data from Open-Meteo, with automatic fallback
                protection.
              </p>
            </div>

            <LandingCityHotspots />
          </div>
        </section>

        <LandingMethodology />
        <LandingFeatures />
      </main>
    </>
  );
}
