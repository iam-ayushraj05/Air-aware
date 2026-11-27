import { UserLifestyleProfile } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Settings } from "lucide-react";
import { VulnerabilityCheckboxes } from "./VulnerabilityCheckboxes";

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

        <div>
          <label
            htmlFor="commute-select"
            className="block font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            Primary Commute Method
          </label>
          <select
            id="commute-select"
            value={profile.commuteMethod}
            onChange={(e) =>
              setProfile((p) => ({
                ...p,
                commuteMethod: e.target.value as UserLifestyleProfile["commuteMethod"],
              }))
            }
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="car_solo">Solo Car (Petrol / Diesel)</option>
            <option value="public_transit">Public Transit (Metro / Bus)</option>
            <option value="carpool">Carpool / Rideshare</option>
            <option value="walk_bike">Walking / Cycling</option>
            <option value="remote">Work / Study from Home</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="activity-select"
            className="block font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            Outdoor Physical Activity
          </label>
          <select
            id="activity-select"
            value={profile.outdoorActivityLevel}
            onChange={(e) =>
              setProfile((p) => ({
                ...p,
                outdoorActivityLevel: e.target
                  .value as UserLifestyleProfile["outdoorActivityLevel"],
              }))
            }
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="low">Sedentary / Mostly Indoors</option>
            <option value="moderate">Moderate (Daily walks, regular commute)</option>
            <option value="high">High (Outdoor running, sports, endurance training)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="cooking-select"
            className="block font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            Cooking Habits
          </label>
          <select
            id="cooking-select"
            value={profile.cookingHabits}
            onChange={(e) =>
              setProfile((p) => ({
                ...p,
                cookingHabits: e.target.value as UserLifestyleProfile["cookingHabits"],
              }))
            }
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="mixed">Mixed Cooking Styles</option>
            <option value="frequent_frying">Frequent High-Heat Frying / Searing</option>
            <option value="simmering_baking">Simmering / Boiling / Baking</option>
            <option value="low_cooking">Minimal Cooking (Prepared Meals)</option>
          </select>
        </div>
      </div>

      <VulnerabilityCheckboxes profile={profile} setProfile={setProfile} />
    </Card>
  );
}
