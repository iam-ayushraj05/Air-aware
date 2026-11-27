import { z } from "zod";
import { TrackedActionItem, UserLifestyleProfile, UserPreferences } from "./types";
import { tryCatch } from "./result";

const STORAGE_VERSION = 1;

/**
 * Zod validation schema for persisted user lifestyle profile.
 */
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

/**
 * Zod validation schema for user preferences and accessibility settings.
 */
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

/**
 * Schema for an individual logged sustainable action.
 */
export const TrackedActionItemSchema = z.object({
  id: z.string(),
  actionId: z.string(),
  title: z.string(),
  timestamp: z.string(),
  emissionsSavedKg: z.number(),
  pmAvoidedGrams: z.number(),
  category: z.string(),
});

/**
 * Schema for array of tracked action items.
 */
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

/**
 * Generic helper to safely parse JSON from localStorage with a Zod schema.
 */
function readStorageItem<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const result = tryCatch(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    const validated = schema.safeParse(parsed);
    return validated.success ? validated.data : fallback;
  });
  return result.success ? result.data : fallback;
}

/**
 * Generic helper to safely write JSON into localStorage.
 */
function writeStorageItem(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  tryCatch(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

/**
 * Loads persisted user lifestyle profile from localStorage with schema validation.
 *
 * @returns UserLifestyleProfile object or default profile
 */
export function loadUserProfile(): UserLifestyleProfile {
  const data = readStorageItem(PROFILE_KEY, UserProfileSchema, {
    ...DEFAULT_PROFILE,
    version: STORAGE_VERSION,
  });
  const { version: _v, ...profile } = data;
  return profile;
}

/**
 * Persists user lifestyle profile into localStorage with coordinate rounding.
 *
 * @param profile UserLifestyleProfile to store
 */
export function saveUserProfile(profile: UserLifestyleProfile): void {
  const payload = {
    ...profile,
    version: STORAGE_VERSION,
    latitude: Math.round(profile.latitude * 100) / 100,
    longitude: Math.round(profile.longitude * 100) / 100,
  };
  writeStorageItem(PROFILE_KEY, payload);
}

/**
 * Loads user preferences and accessibility settings with validation.
 *
 * @returns UserPreferences object or default preferences
 */
export function loadUserPreferences(): UserPreferences {
  const data = readStorageItem(PREFS_KEY, UserPreferencesSchema, {
    ...DEFAULT_PREFERENCES,
    version: STORAGE_VERSION,
  });
  const { version: _v, ...prefs } = data;
  return prefs;
}

/**
 * Persists user preferences into localStorage.
 *
 * @param prefs UserPreferences object
 */
export function saveUserPreferences(prefs: UserPreferences): void {
  writeStorageItem(PREFS_KEY, { ...prefs, version: STORAGE_VERSION });
}

/**
 * Loads logged sustainable actions from localStorage.
 *
 * @returns Array of TrackedActionItem
 */
export function loadTrackedActions(): TrackedActionItem[] {
  const data = readStorageItem(ACTIONS_KEY, TrackedActionsListSchema, {
    version: STORAGE_VERSION,
    items: [],
  });
  return data.items;
}

/**
 * Persists logged sustainable actions into localStorage.
 *
 * @param items List of TrackedActionItem
 */
export function saveTrackedActions(items: TrackedActionItem[]): void {
  writeStorageItem(ACTIONS_KEY, { version: STORAGE_VERSION, items });
}

/**
 * Removes all AirAware keys from localStorage for privacy reset.
 */
export function clearAllSavedData(): void {
  if (typeof window === "undefined") return;
  tryCatch(() => {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(PREFS_KEY);
    localStorage.removeItem(ACTIONS_KEY);
  });
}
