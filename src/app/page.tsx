import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LandingCityHotspots } from "@/features/air-quality/LandingCityHotspots";
import { HeroExposureCard } from "@/features/air-quality/HeroExposureCard";
import {
  Sparkles,
  ArrowRight,
  Home,
  HeartHandshake,
  CheckCircle2,
  Leaf,
} from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <Navbar currentLocationName="Global Explorer" />
      <main id="main-content" className="flex-1">
        {/* Hero Section with City Air Quality Transition Visual */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & CTA */}
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
                  Severe winter smog and urban pollution trap toxic particles where your loved ones breathe. AirAware provides real-time meteorological intelligence, personalized clean-air routines, indoor filtration hacks, and measurable low-emission alternatives.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/dashboard" aria-label="Check my air quality on dashboard">
                    <Button size="lg" className="w-full sm:w-auto shadow-md gap-2">
                      <span>Check My Air Quality</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </Link>

                  <Link href="/advisor" aria-label="Explore AI Assistant conversational tool">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-emerald-600 text-emerald-800 bg-white hover:bg-emerald-50">
                      <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span>Explore AI Assistant</span>
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
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

              {/* Right Column: Atmospheric Transition Illustration */}
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

                    {/* Before / After Smog Card */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {/* Polluted Winter Smog */}
                      <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-800/80 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-amber-400 block">
                          Without Mitigation
                        </span>
                        <div className="text-2xl font-black text-rose-400">AQI 268</div>
                        <p className="text-slate-300 text-[11px] leading-snug">
                          Nocturnal temperature inversion traps vehicular fine PM2.5 at breathing height.
                        </p>
                      </div>

                      {/* Clean Air Zone */}
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

                    {/* Grounded Insight Bar with Assumption Range & How We Calculate */}
                    <HeroExposureCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live AQI Preview Section */}
        <section className="py-16 bg-white border-b border-slate-200/60" aria-labelledby="hotspots-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                Real-Time Urban Intelligence
              </span>
              <h2 id="hotspots-heading" className="text-3xl font-bold text-slate-900">
                Explore Current Urban Hotspots
              </h2>
              <p className="text-slate-600 text-sm">
                Real atmospheric meteorological data from Open-Meteo, with automatic fallback protection.
              </p>
            </div>

            {/* Dynamic Live Hotspots Grid */}
            <LandingCityHotspots />
          </div>
        </section>

        {/* How AirAware Works */}
        <section className="py-20 bg-slate-50 border-b border-slate-200/60" aria-labelledby="methodology-heading">
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
                  Retrieves real-time PM2.5, PM10, Ozone, NO2, temperature, and wind speed from Open-Meteo with SSRF protection.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-bold text-base text-slate-900">Inversion Detection</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Detects thermal inversion conditions (cold surface air + low wind) and immediately flags winter smog hazards.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-bold text-base text-slate-900">Grounded AI Advisor</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pairs current atmospheric measurements with your family profile to generate morning-to-night personalized action plans.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-bold text-base text-slate-900">Transparent Impact</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tracks avoided emissions and particulate matter with clear mathematical formulas from DEFRA and EPA models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-20 bg-white" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                Full-Featured Ecosystem
              </span>
              <h2 id="features-heading" className="text-3xl font-bold text-slate-900">
                Engineered for Families, Commuters & Communities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
                  <Home className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Indoor Air Quality Lab</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Room-by-room risk scoring, True HEPA filter sizing guidelines, ducted kitchen exhaust advice, and honest facts about houseplants.
                </p>
                <Link
                  href="/indoor-lab"
                  className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  aria-label="Open Indoor Air Quality Lab"
                >
                  <span>Open Indoor Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </Card>

              <Card className="space-y-3">
                <div className="p-3 rounded-xl bg-teal-50 text-teal-700 w-fit">
                  <Leaf className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Sustainable Alternatives</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calculated emissions savings comparing solo driving vs transit, anti-idling pledges, and induction cooking transitions.
                </p>
                <Link
                  href="/alternatives"
                  className="text-xs font-semibold text-teal-700 hover:underline inline-flex items-center gap-1"
                  aria-label="Explore Sustainable Alternatives"
                >
                  <span>Explore Alternatives</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </Card>

              <Card className="space-y-3">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-700 w-fit">
                  <HeartHandshake className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Family Protection Checklist</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tailored safeguards for young children with developing respiratory tracts and elderly family members with cardiopulmonary vulnerabilities.
                </p>
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-blue-700 hover:underline inline-flex items-center gap-1"
                  aria-label="View Family Protection Checklist on Dashboard"
                >
                  <span>View Checklist</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
