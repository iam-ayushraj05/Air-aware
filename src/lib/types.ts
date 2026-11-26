export type AQIStandard = "US_AQI" | "EU_AQI";

export type AQICategory =
  | "good"
  | "moderate"
  | "sensitive"
  | "unhealthy"
  | "very_unhealthy"
  | "hazardous";

export interface AQICategoryInfo {
  key: AQICategory;
  label: string;
  min: number;
  max: number;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  summary: string;
  healthImplications: string;
}

export interface PollutantDetail {
  value: number;
  unit: string;
  label: string;
  epaBreakpointIndex?: number;
  safeLimit: number;
  status: "good" | "moderate" | "unhealthy" | "severe";
}

export interface WeatherCondition {
  temperature: number; // Celsius
  humidity: number; // %
  windSpeed: number; // km/h
  windDirection?: number; // degrees
  weatherCode: number;
  conditionText: string;
  isTemperatureInversionLikely?: boolean;
}

export interface HourlyForecastItem {
  time: string;
  aqi: number;
  pm2_5: number;
  pm10: number;
  no2?: number;
  ozone?: number;
  temperature?: number;
}

export interface LocationInfo {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export type DataSourceOrigin = "live" | "cached" | "demo";

export interface AirQualitySnapshot {
  aqi: number;
  category: AQICategory;
  standard: AQIStandard;
  pollutants: {
    pm2_5: PollutantDetail;
    pm10: PollutantDetail;
    no2?: PollutantDetail;
    ozone?: PollutantDetail;
    so2?: PollutantDetail;
    co?: PollutantDetail;
  };
  weather: WeatherCondition;
  hourly: HourlyForecastItem[];
  location: LocationInfo;
  dataSource: DataSourceOrigin;
  updatedAt: string;
  isWinterSmogActive: boolean;
}

export interface UserLifestyleProfile {
  locationName: string;
  latitude: number;
  longitude: number;
  familySize: number;
  hasChildren: boolean;
  hasElderly: boolean;
  outdoorActivityLevel: "low" | "moderate" | "high";
  commuteMethod: "public_transit" | "car_solo" | "carpool" | "walk_bike" | "remote";
  workSchedule: "standard" | "shift" | "flexible" | "home";
  cookingHabits: "frequent_frying" | "simmering_baking" | "mixed" | "low_cooking";
  hasAirPurifier: boolean;
  hasIndoorPlants: boolean;
  sensitivityLevel: "normal" | "sensitive" | "high_risk";
}

export interface StructuredRecommendation {
  id: string;
  category: "outdoor" | "indoor" | "commute" | "routine" | "vulnerable" | "sustainability";
  action: string;
  reason: string;
  evidence: string;
  expectedBenefit: string;
  confidence: number;
  isGeneral: boolean;
  timeOfDay?: "morning" | "afternoon" | "evening" | "night";
  completed?: boolean;
}

export interface DailyRoutinePlan {
  id: string;
  date: string;
  aqiContext: number;
  locationName: string;
  morning: StructuredRecommendation[];
  afternoon: StructuredRecommendation[];
  evening: StructuredRecommendation[];
  night: StructuredRecommendation[];
  summary: string;
  generatedBy: "llm" | "deterministic_engine";
}

export interface IndoorAssessmentData {
  roomType: "living_room" | "kitchen" | "bedroom" | "home_office";
  hasPurifier: boolean;
  purifierHepa: boolean;
  cookingFuel: "electric_induction" | "piped_gas" | "lpg" | "biomass";
  exhaustFanWorking: boolean;
  ventilationMethod: "smart_timing" | "always_open" | "always_closed" | "filtered_ac";
  hasIncenseOrCandles: boolean;
  dustCleaningFrequency: "daily_damp" | "weekly_vacuum" | "dry_brooming" | "irregular";
  indoorPlantsCount: number;
  petsCount: number;
}

export interface IndoorScoreResult {
  score: number; // 0-100
  rating: "excellent" | "good" | "needs_improvement" | "poor";
  breakdown: {
    ventilationScore: number;
    filtrationScore: number;
    sourceReductionScore: number;
    cleaningScore: number;
  };
  keyRisks: string[];
  priorityActions: string[];
  heuristicDisclaimer: string;
}

export interface SustainableAlternativeComparison {
  id: string;
  title: string;
  baselineChoice: string;
  sustainableChoice: string;
  emissionsAvoidedKgCO2ePerTripOrDay: [number, number]; // range
  pm25AvoidedGrams: [number, number]; // range
  assumptions: string;
  formula: string;
  difficulty: "easy" | "medium" | "hard";
  costImpact: "saves_money" | "cost_neutral" | "minor_cost";
  category: "transport" | "home_energy" | "cooking" | "consumption";
  sourceCitation: string;
}

export interface TrackedActionItem {
  id: string;
  actionId: string;
  title: string;
  timestamp: string;
  emissionsSavedKg: number;
  pmAvoidedGrams: number;
  category: string;
}

export interface UserPreferences {
  theme: "light" | "high-contrast";
  aqiStandard: AQIStandard;
  largeText: boolean;
  reducedMotion: boolean;
  notificationsEnabled: boolean;
  inAppAlerts: boolean;
  highPollutionAlertThreshold: number; // e.g. 150
  demoModeOverride: boolean;
}
