import { UserLifestyleProfile } from "@/lib/types";

interface LifestyleDropdownsProps {
  profile: UserLifestyleProfile;
  setProfile: (updater: (prev: UserLifestyleProfile) => UserLifestyleProfile) => void;
}

/**
 * Dropdowns for user commute method, outdoor physical activity, and home cooking habits.
 */
export function LifestyleDropdowns({ profile, setProfile }: LifestyleDropdownsProps) {
  return (
    <>
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
              outdoorActivityLevel: e.target.value as UserLifestyleProfile["outdoorActivityLevel"],
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
    </>
  );
}
