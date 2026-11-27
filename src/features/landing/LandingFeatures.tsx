import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Home, Leaf, HeartHandshake, ArrowRight } from "lucide-react";

/**
 * Ecosystem cards introducing Indoor Lab, Sustainable Alternatives, and Family Protection.
 */
export function LandingFeatures() {
  return (
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
              Room-by-room risk scoring, True HEPA filter sizing guidelines, ducted kitchen exhaust
              advice, and honest facts about houseplants.
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
              Calculated emissions savings comparing solo driving vs transit, anti-idling pledges,
              and induction cooking transitions.
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
              Tailored safeguards for young children with developing respiratory tracts and elderly
              family members with cardiopulmonary vulnerabilities.
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
  );
}
