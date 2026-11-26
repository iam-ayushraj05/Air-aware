import React from "react";
import Link from "next/link";
import { MEDICAL_DISCLAIMER } from "@/lib/constants";
import { ShieldCheck, Wind } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Medical and Health Disclaimer Banner */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-200">Public Health & Medical Disclaimer</span>
            <p className="text-slate-400 text-xs leading-relaxed">{MEDICAL_DISCLAIMER}</p>
          </div>
        </div>

        {/* Footer Links & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Wind className="w-4 h-4 text-emerald-400" />
              AirAware Platform
            </div>
            <p className="text-slate-400 leading-relaxed">
              Breathe Smarter, Live Safer. Providing transparent real-time urban environmental intelligence and sustainable lifestyle planning.
            </p>
          </div>

          <div>
            <span className="font-semibold text-slate-200 block mb-3">Core Modules</span>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Air Intelligence Dashboard</Link></li>
              <li><Link href="/advisor" className="hover:text-emerald-400 transition-colors">Clean-Air AI Advisor</Link></li>
              <li><Link href="/planner" className="hover:text-emerald-400 transition-colors">Daily Routine Planner</Link></li>
              <li><Link href="/indoor-lab" className="hover:text-emerald-400 transition-colors">Indoor Air Quality Lab</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-slate-200 block mb-3">Community & Action</span>
            <ul className="space-y-2">
              <li><Link href="/alternatives" className="hover:text-emerald-400 transition-colors">Sustainable Alternatives</Link></li>
              <li><Link href="/impact" className="hover:text-emerald-400 transition-colors">Personal Impact Tracker</Link></li>
              <li><Link href="/community" className="hover:text-emerald-400 transition-colors">7-Day Commute Challenge</Link></li>
              <li><Link href="/explorer" className="hover:text-emerald-400 transition-colors">Winter Smog Inversion Explainer</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-slate-200 block mb-3">Data Sources & Standards</span>
            <p className="text-slate-400 leading-relaxed">
              Real-time atmospheric modeling powered by <a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline">Open-Meteo</a>. AQI calculations calibrated against US EPA 2024 PM NAAQS standards and European EEA indexes.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} AirAware. Built for Clean Urban Living.</span>
          <div className="flex gap-4">
            <Link href="/settings" className="hover:text-emerald-400">Accessibility & Privacy</Link>
            <span>•</span>
            <Link href="/explorer" className="hover:text-emerald-400">Methodology</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
