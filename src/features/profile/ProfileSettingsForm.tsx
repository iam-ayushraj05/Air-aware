"use client";

import React, { useState } from "react";
import { UserLifestyleProfile, UserPreferences } from "@/lib/types";
import { saveUserProfile, saveUserPreferences, clearAllSavedData } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Settings, Save, Trash2, CheckCircle2, Eye, Bell } from "lucide-react";

interface ProfileSettingsFormProps {
  initialProfile: UserLifestyleProfile;
  initialPreferences: UserPreferences;
  onSaved?: () => void;
}

export function ProfileSettingsForm({
  initialProfile,
  initialPreferences,
  onSaved,
}: ProfileSettingsFormProps) {
  const [profile, setProfile] = useState<UserLifestyleProfile>(initialProfile);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    saveUserPreferences(preferences);

    // Apply high contrast & large text classes to document body
    if (typeof document !== "undefined") {
      if (preferences.theme === "high-contrast") {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }

      if (preferences.largeText) {
        document.body.classList.add("large-text");
      } else {
        document.body.classList.remove("large-text");
      }
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    if (onSaved) onSaved();
  };

  const handleClear = () => {
    if (window.confirm("Clear all locally stored preferences, routines, and impact history?")) {
      clearAllSavedData();
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Lifestyle Profile Section */}
      <Card className="space-y-4">
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <span>Household & Lifestyle Profile</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Personalizes clean-air routines and vulnerability warnings. No medical data or exact addresses are stored.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Family Size */}
          <div>
            <label htmlFor="family-size-input" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Family Size (people in home)
            </label>
            <input
              id="family-size-input"
              type="number"
              min="1"
              max="20"
              value={profile.familySize}
              onChange={(e) => setProfile({ ...profile, familySize: Number(e.target.value) || 1 })}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Commute Method */}
          <div>
            <label htmlFor="commute-select" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Primary Commute Method
            </label>
            <select
              id="commute-select"
              value={profile.commuteMethod}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  commuteMethod: e.target.value as UserLifestyleProfile["commuteMethod"],
                })
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

          {/* Outdoor Activity Level */}
          <div>
            <label htmlFor="activity-select" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Outdoor Physical Activity
            </label>
            <select
              id="activity-select"
              value={profile.outdoorActivityLevel}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  outdoorActivityLevel: e.target.value as UserLifestyleProfile["outdoorActivityLevel"],
                })
              }
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="low">Sedentary / Mostly Indoors</option>
              <option value="moderate">Moderate (Daily walks, regular commute)</option>
              <option value="high">High (Outdoor running, sports, endurance training)</option>
            </select>
          </div>

          {/* Cooking Habits */}
          <div>
            <label htmlFor="cooking-select" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Cooking Habits
            </label>
            <select
              id="cooking-select"
              value={profile.cookingHabits}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  cookingHabits: e.target.value as UserLifestyleProfile["cookingHabits"],
                })
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

        {/* Checkbox Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.hasChildren}
              onChange={(e) => setProfile({ ...profile, hasChildren: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              Children in Household (Under 14)
            </span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.hasElderly}
              onChange={(e) => setProfile({ ...profile, hasElderly: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              Elderly Family Members (65+)
            </span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.hasAirPurifier}
              onChange={(e) => setProfile({ ...profile, hasAirPurifier: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              True HEPA Air Purifier Available
            </span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.hasIndoorPlants}
              onChange={(e) => setProfile({ ...profile, hasIndoorPlants: e.target.checked })}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              Indoor Houseplants
            </span>
          </label>
        </div>
      </Card>

      {/* Accessibility & Display Preferences */}
      <Card className="space-y-4">
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <span>Accessibility & Display Options (WCAG 2.2 AA)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.theme === "high-contrast"}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  theme: e.target.checked ? "high-contrast" : "light",
                })
              }
              className="rounded text-emerald-600 w-4 h-4"
            />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              High Contrast Mode (≥7:1)
            </span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.largeText}
              onChange={(e) => setPreferences({ ...preferences, largeText: e.target.checked })}
              className="rounded text-emerald-600 w-4 h-4"
            />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              Large Text Size (112.5%)
            </span>
          </label>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={(e) => setPreferences({ ...preferences, reducedMotion: e.target.checked })}
              className="rounded text-emerald-600 w-4 h-4"
            />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              Reduced Motion
            </span>
          </label>
        </div>
      </Card>

      {/* Notifications & AQI Standard */}
      <Card className="space-y-4">
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <span>Alerts & Standards</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="standard-select" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              AQI Standard Standard Calibration
            </label>
            <select
              id="standard-select"
              value={preferences.aqiStandard}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  aqiStandard: e.target.value as UserPreferences["aqiStandard"],
                })
              }
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="US_AQI">US EPA Air Quality Index (0-500)</option>
              <option value="EU_AQI">European Air Quality Index (EEA)</option>
            </select>
          </div>

          <div>
            <label htmlFor="alert-threshold-input" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              High Pollution Alert Threshold (AQI)
            </label>
            <input
              id="alert-threshold-input"
              type="number"
              min="50"
              max="400"
              value={preferences.highPollutionAlertThreshold}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  highPollutionAlertThreshold: Number(e.target.value) || 150,
                })
              }
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </Card>

      {/* Save & Reset Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2">
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>Save Preferences & Profile</span>
          </Button>

          {saveSuccess && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved locally!</span>
            </span>
          )}
        </div>

        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={handleClear}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Clear All Saved Local Data</span>
        </Button>
      </div>
    </form>
  );
}
