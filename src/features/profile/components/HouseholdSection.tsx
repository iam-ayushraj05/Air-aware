import { UserLifestyleProfile } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Settings } from "lucide-react";
import { VulnerabilityCheckboxes } from "./VulnerabilityCheckboxes";
import { LifestyleDropdowns } from "./LifestyleDropdowns";

interface HouseholdSectionProps {
  profile: UserLifestyleProfile;
  setProfile: (updater: (prev: UserLifestyleProfile) => UserLifestyleProfile) => void;
}

/**
 * Renders household demographics, commute options, and cooking habit controls.
 */
export function HouseholdSection({ profile, setProfile }: HouseholdSectionProps) {
  return (
    <Card className="space-y-4">
      <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <span>Household & Lifestyle Profile</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Personalizes clean-air routines and vulnerability warnings. No medical data or exact
          addresses are stored.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label
            htmlFor="family-size-input"
            className="block font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            Family Size (people in home)
          </label>
          <input
            id="family-size-input"
            type="number"
            min="1"
            max="20"
            value={profile.familySize}
            onChange={(e) => setProfile((p) => ({ ...p, familySize: Number(e.target.value) || 1 }))}
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <LifestyleDropdowns profile={profile} setProfile={setProfile} />
      </div>

      <VulnerabilityCheckboxes profile={profile} setProfile={setProfile} />
    </Card>
  );
}
