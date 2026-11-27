import { UserLifestyleProfile, UserPreferences } from "@/lib/types";

export const DEFAULT_USER_PROFILE: UserLifestyleProfile = {
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

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: "light",
  aqiStandard: "US_AQI",
  largeText: false,
  reducedMotion: false,
  notificationsEnabled: true,
  inAppAlerts: true,
  highPollutionAlertThreshold: 150,
  demoModeOverride: false,
};
