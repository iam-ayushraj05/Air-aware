import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveUserProfile,
  loadUserProfile,
  saveUserPreferences,
  loadUserPreferences,
  saveTrackedActions,
  loadTrackedActions,
  clearAllSavedData,
  DEFAULT_PROFILE,
  DEFAULT_PREFERENCES,
} from "../storage";
import { TrackedActionItem } from "../types";

describe("Storage & Zod Schema Validation", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("rounds coordinates to 2 decimal places to protect user location privacy", () => {
    const raw = {
      ...DEFAULT_PROFILE,
      latitude: 28.6149281,
      longitude: 77.2090212,
    };

    saveUserProfile(raw);
    const loaded = loadUserProfile();
    expect(loaded.latitude).toBe(28.61);
    expect(loaded.longitude).toBe(77.21);
  });

  it("safely recovers and returns default profile if storage data is corrupt or tampered", () => {
    localStorage.setItem("airaware_user_profile_v1", "corrupt-json-not-valid");
    const loaded = loadUserProfile();
    expect(loaded.locationName).toBe("New Delhi");
    expect(loaded.familySize).toBe(3);
  });

  it("validates preferences schema with versioning", () => {
    saveUserPreferences({
      ...DEFAULT_PREFERENCES,
      theme: "high-contrast",
      aqiStandard: "EU_AQI",
    });

    const prefs = loadUserPreferences();
    expect(prefs.theme).toBe("high-contrast");
    expect(prefs.aqiStandard).toBe("EU_AQI");
  });

  it("saves and loads tracked actions list safely", () => {
    const items: TrackedActionItem[] = [
      {
        id: "act-1",
        actionId: "transit",
        title: "Metro Commute",
        timestamp: "2026-11-26T08:00:00Z",
        emissionsSavedKg: 2.1,
        pmAvoidedGrams: 0.18,
        category: "transport",
      },
    ];

    saveTrackedActions(items);
    const loaded = loadTrackedActions();
    expect(loaded.length).toBe(1);
    expect(loaded[0]?.title).toBe("Metro Commute");
  });

  it("clears all saved data when requested", () => {
    saveUserProfile(DEFAULT_PROFILE);
    saveUserPreferences(DEFAULT_PREFERENCES);
    clearAllSavedData();

    expect(localStorage.getItem("airaware_user_profile_v1")).toBeNull();
    expect(localStorage.getItem("airaware_preferences_v1")).toBeNull();
    expect(localStorage.getItem("airaware_tracked_actions_v1")).toBeNull();
  });

  it("handles storage exceptions gracefully when localStorage throws", () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("QuotaExceeded or SecurityError");
    });
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceeded or SecurityError");
    });

    // Should return default fallback without throwing
    const loaded = loadUserProfile();
    expect(loaded).toEqual(DEFAULT_PROFILE);

    expect(() => saveUserProfile(DEFAULT_PROFILE)).not.toThrow();

    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });
});
