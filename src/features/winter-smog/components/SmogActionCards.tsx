/**
 * Three essential safeguards during surface thermal inversion.
 */
export function SmogActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
      <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
        <strong className="block text-amber-300 mb-0.5">1. Keep Morning Windows Sealed</strong>
        <span className="text-slate-300">
          Cold surface air traps vehicular exhaust at ground level until afternoon solar warming.
        </span>
      </div>
      <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
        <strong className="block text-amber-300 mb-0.5">2. Eliminate Unnecessary Idling</strong>
        <span className="text-slate-300">
          Zero-idling prevents localized toxic micro-clouds where children and commuters breathe.
        </span>
      </div>
      <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
        <strong className="block text-amber-300 mb-0.5">3. Avoid Any Biomass Burning</strong>
        <span className="text-slate-300">
          Leaves and waste combustion release concentrated polycyclic aromatic hydrocarbons.
        </span>
      </div>
    </div>
  );
}
