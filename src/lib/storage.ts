import { z } from "zod";
import { TrackedActionItem, UserLifestyleProfile, UserPreferences } from "./types";

const STORAGE_VERSION = 1;

export const UserProfileSchema = z.object({
  version: z.literal(STORAGE_VERSION).default(STORAGE_VERSION),
  locationName: z.string().max(100).default("New Delhi"),
  latitude: z.number().transform((val) => Math.round(val * 100) / 100),
  longitude: z.number().transform((val) => Math.round(val * 100) / 100),
  familySize: z.number().min(1).max(20).default(3),
  hasChildren: z.boolean().default(false),
  hasElderly: z.boolean().default(false),
  outdoorActivityLevel: z.enum(["low", "moderate", "high"]).default("moderate"),
  commuteMethod: z
    .enum(["public_transit", "car_solo", "carpool", "walk_bike", "remote"])
    .default("car_solo"),
  workSchedule: z.enum(["standard", "shift", "flexible", "home"]).default("standard"),
  cookingHabits: z
    .enum(["frequent_frying", "simmering_baking", "mixed", "low_cooking"])
    .default("mixed"),
  hasAirPurifier: z.boolean().default(false),
  hasIndoorPlants: z.boolean().default(false),
  sensitivityLevel: z.enum(["normal", "sensitive", "high_risk"]).default("normal"),
});

export const UserPreferencesSchema = z.object({
  version: z.literal(STORAGE_VERSION).default(STORAGE_VERSION),
  theme: z.enum(["light", "high-contrast"]).default("light"),
  aqiStandard: z.enum(["US_AQI", "EU_AQI"]).default("US_AQI"),
  largeText: z.boolean().default(false),
  reducedMotion: z.boolean().default(false),
  notificationsEnabled: z.boolean().default(false),
  inAppAlerts: z.boolean().default(true),
  highPollutionAlertThreshold: z.number().min(50).max(400).default(150),
  demoModeOverride: z.boolean().default(false),
});

export const TrackedActionItemSchema = z.object({
  id: z.string(),
  actionId: z.string(),
  title: z.string(),
  timestamp: z.string(),
  emissionsSavedKg: z.number(),
  pmAvoidedGrams: z.number(),
  category: z.string(),
});

export const TrackedActionsListSchema = z.object({
  version: z.literal(STORAGE_VERSION).default(STORAGE_VERSION),
  items: z.array(TrackedActionItemSchema).default([]),
});

const PROFILE_KEY = "airaware_user_profile_v1";
const PREFS_KEY = "airaware_preferences_v1";
const ACTIONS_KEY = "airaware_tracked_actions_v1";

export const DEFAULT_PROFILE: UserLifestyleProfile = {
  locationName: "New Delhi",
  latitude: 28.61,
  longitude: 77.21,
  familySize: 3,
  hasChildren: true,
  hasElderly: false,
  outdoorActivityLevel: "moderate",
  commuteMethod: "car_solo",
  workSchedule: "standard",
  cookingHabits: "mixed",
  hasAirPurifier: true,
  hasIndoorPlants: true,
  sensitivityLevel: "normal",
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "light",
  aqiStandard: "US_AQI",
  largeText: false,
  reducedMotion: false,
  notificationsEnabled: false,
  inAppAlerts: true,
  highPollutionAlertThreshold: 150,
  demoModeOverride: false,
};

export function loadUserProfile(): UserLifestyleProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    const result = UserProfileSchema.safeParse(parsed);
    if (result.success) {
      const { version: _v, ...profile } = result.data;
      return profile;
    }
    return DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserLifestyleProfile): void {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      ...profile,
      version: STORAGE_VERSION,
      latitude: Math.round(profile.latitude * 100) / 100,
      longitude: Math.round(profile.longitude * 100) / 100,
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(payload));
  } catch {
    // Storage quota or private mode fallback
  }
}

export function loadUserPreferences(): UserPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    const result = UserPreferencesSchema.safeParse(parsed);
    if (result.success) {
      const { version: _v, ...prefs } = result.data;
      return prefs;
    }
    return DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveUserPreferences(prefs: UserPreferences): void {
  if (typeof window === "undefined") return;
  try {
    const payload = { ...prefs, version: STORAGE_VERSION };
    localStorage.setItem(PREFS_KEY, JSON.stringify(payload));
  } catch {
    // Graceful fallback
  }
}

export function loadTrackedActions(): TrackedActionItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const result = TrackedActionsListSchema.safeParse(parsed);
    if (result.success) {
      return result.data.items;
    }
    return [];
  } catch {
    return [];
  }
}

export function saveTrackedActions(items: TrackedActionItem[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload = { version: STORAGE_VERSION, items };
    localStorage.setItem(ACTIONS_KEY, JSON.stringify(payload));
  } catch {
    // Graceful fallback
  }
}

export function clearAllSavedData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(PREFS_KEY);
    localStorage.removeItem(ACTIONS_KEY);
  } catch {
    // Graceful fallback
  }
}
