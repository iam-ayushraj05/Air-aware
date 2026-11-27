import { useState, useCallback } from "react";
import { UserLifestyleProfile, UserPreferences } from "@/lib/types";
import { saveUserProfile, saveUserPreferences, clearAllSavedData } from "@/lib/storage";

interface UseProfileFormOptions {
  initialProfile: UserLifestyleProfile;
  initialPreferences: UserPreferences;
  onSaved?: () => void;
}

/**
 * Custom hook managing user lifestyle profile and preference state,
 * local storage persistence, and WCAG document attribute synchronizations.
 */
export function useProfileForm({
  initialProfile,
  initialPreferences,
  onSaved,
}: UseProfileFormOptions) {
  const [profile, setProfile] = useState<UserLifestyleProfile>(initialProfile);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const applyDomPreferences = useCallback((prefs: UserPreferences) => {
    if (typeof document === "undefined") return;

    if (prefs.theme === "high-contrast") {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }

    if (prefs.largeText) {
      document.body.classList.add("large-text");
    } else {
      document.body.classList.remove("large-text");
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      saveUserProfile(profile);
      saveUserPreferences(preferences);
      applyDomPreferences(preferences);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      if (onSaved) onSaved();
    },
    [profile, preferences, applyDomPreferences, onSaved]
  );

  const handleClear = useCallback(() => {
    if (window.confirm("Clear all locally stored preferences, routines, and impact history?")) {
      clearAllSavedData();
      window.location.reload();
    }
  }, []);

  return {
    profile,
    setProfile,
    preferences,
    setPreferences,
    saveSuccess,
    handleSubmit,
    handleClear,
  };
}
