"use client";

import { UserLifestyleProfile, UserPreferences } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Save, Trash2, CheckCircle2 } from "lucide-react";
import { useProfileForm } from "./hooks/useProfileForm";
import { HouseholdSection } from "./components/HouseholdSection";
import { AccessibilitySection } from "./components/AccessibilitySection";
import { AlertsSection } from "./components/AlertsSection";

interface ProfileSettingsFormProps {
  initialProfile: UserLifestyleProfile;
  initialPreferences: UserPreferences;
  onSaved?: () => void;
}

/**
 * Settings form orchestrating household lifestyle, accessibility, and alert preferences.
 */
export function ProfileSettingsForm({
  initialProfile,
  initialPreferences,
  onSaved,
}: ProfileSettingsFormProps) {
  const {
    profile,
    setProfile,
    preferences,
    setPreferences,
    saveSuccess,
    handleSubmit,
    handleClear,
  } = useProfileForm({ initialProfile, initialPreferences, onSaved });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HouseholdSection profile={profile} setProfile={setProfile} />
      <AccessibilitySection preferences={preferences} setPreferences={setPreferences} />
      <AlertsSection preferences={preferences} setPreferences={setPreferences} />

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
