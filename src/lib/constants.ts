import { AQICategory, AQICategoryInfo } from "./types";

/**
 * Standard AQI category metadata following US EPA AQI guidelines.
 * Source: US EPA Air Quality Index Technical Assistance Document (EPA-454/B-18-007)
 */
export const US_AQI_CATEGORIES: Record<AQICategory, AQICategoryInfo> = {
  good: {
    key: "good",
    label: "Good",
    min: 0,
    max: 50,
    color: "#10B981", // Emerald 500
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    borderClass: "border-emerald-200 dark:border-emerald-800",
    summary: "Air quality is satisfactory and poses little or no health risk.",
    healthImplications: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
  },
  moderate: {
    key: "moderate",
    label: "Moderate",
    min: 51,
    max: 100,
    color: "#F59E0B", // Amber 500
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-800 dark:text-amber-300",
    borderClass: "border-amber-200 dark:border-amber-800",
    summary: "Acceptable quality; very sensitive individuals may experience minor symptoms.",
    healthImplications: "Air quality is acceptable; however, a very small number of individuals who are unusually sensitive to ozone or particulate matter may experience mild respiratory symptoms.",
  },
  sensitive: {
    key: "sensitive",
    label: "Unhealthy for Sensitive Groups",
    min: 101,
    max: 150,
    color: "#F97316", // Orange 500
    badgeBg: "bg-orange-50 dark:bg-orange-950/40",
    badgeText: "text-orange-800 dark:text-orange-300",
    borderClass: "border-orange-200 dark:border-orange-800",
    summary: "Members of sensitive groups may experience health effects. General public less affected.",
    healthImplications: "Children, older adults, and individuals with respiratory conditions (asthma) or heart disease are at greater risk of irritation and breathing difficulties.",
  },
  unhealthy: {
    key: "unhealthy",
    label: "Unhealthy",
    min: 151,
    max: 200,
    color: "#EF4444", // Red 500
    badgeBg: "bg-rose-50 dark:bg-rose-950/40",
    badgeText: "text-rose-800 dark:text-rose-300",
    borderClass: "border-rose-200 dark:border-rose-800",
    summary: "Everyone may begin to experience health effects; sensitive groups experience more serious effects.",
    healthImplications: "Increased likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease, and premature mortality in persons with cardiopulmonary disease.",
  },
  very_unhealthy: {
    key: "very_unhealthy",
    label: "Very Unhealthy",
    min: 201,
    max: 300,
    color: "#8B5CF6", // Purple 500
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeText: "text-purple-800 dark:text-purple-300",
    borderClass: "border-purple-200 dark:border-purple-800",
    summary: "Health alert: The risk of health effects is increased for everyone.",
    healthImplications: "Significant aggravation of heart or lung disease and premature mortality. Substantial increase in respiratory effects in general population.",
  },
  hazardous: {
    key: "hazardous",
    label: "Hazardous",
    min: 301,
    max: 500,
    color: "#881337", // Rose 950 / Maroon
    badgeBg: "bg-red-100 dark:bg-red-950/60",
    badgeText: "text-red-950 dark:text-red-200",
    borderClass: "border-red-400 dark:border-red-800",
    summary: "Health warning of emergency conditions: The entire population is likely to be affected.",
    healthImplications: "Serious risk of respiratory distress and cardiovascular complications across entire population. Avoid all outdoor physical activity.",
  },
};

/**
 * US EPA PM2.5 Breakpoints (µg/m³, 24-hour average)
 * Source: US EPA Final Rule for the PM NAAQS (2024 update / 40 CFR Part 58)
 */
export const EPA_PM25_BREAKPOINTS = [
  { cLow: 0.0, cHigh: 9.0, iLow: 0, iHigh: 50 },
  { cLow: 9.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
  { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
  { cLow: 55.5, cHigh: 125.4, iLow: 151, iHigh: 200 },
  { cLow: 125.5, cHigh: 225.4, iLow: 201, iHigh: 300 },
  { cLow: 225.5, cHigh: 325.4, iLow: 301, iHigh: 400 },
  { cLow: 325.5, cHigh: 500.4, iLow: 401, iHigh: 500 },
];

/**
 * US EPA PM10 Breakpoints (µg/m³, 24-hour average)
 * Source: US EPA Technical Assistance Document (EPA-454/B-18-007)
 */
export const EPA_PM10_BREAKPOINTS = [
  { cLow: 0, cHigh: 54, iLow: 0, iHigh: 50 },
  { cLow: 55, cHigh: 154, iLow: 51, iHigh: 100 },
  { cLow: 155, cHigh: 254, iLow: 101, iHigh: 150 },
  { cLow: 255, cHigh: 354, iLow: 151, iHigh: 200 },
  { cLow: 355, cHigh: 424, iLow: 201, iHigh: 300 },
  { cLow: 425, cHigh: 504, iLow: 301, iHigh: 400 },
  { cLow: 505, cHigh: 604, iLow: 401, iHigh: 500 },
];

/**
 * Winter Smog activation criteria:
 * Stagnant meteorological condition + elevated fine particulate matter.
 * Source: WMO / National Meteorological Services Urban Air Stagnation criteria
 */
export const WINTER_SMOG_THRESHOLDS = {
  pm25MinThreshold: 55.5, // µg/m³ (Unhealthy for sensitive groups or higher)
  aqiMinThreshold: 130,
  maxWindSpeedKmH: 14.0, // Stagnant or light air prevents vertical mixing
  maxTemperatureC: 18.0, // Cold surface layer favoring ground-level temperature inversion
};

/**
 * Emission Factors & Environmental Calculation Constants
 * Sources:
 * - UK DEFRA GHG Conversion Factors for Company Reporting (2023)
 * - US EPA AP-42 & Greenhouse Gas Equivalencies Calculator
 * - International Council on Clean Transportation (ICCT) Passenger Vehicle Metrics
 */
export const EMISSION_FACTORS = {
  // Average passenger petrol car emissions: ~0.170 kg CO2e per passenger-km
  // Source: UK DEFRA 2023 Passenger Vehicles - Average car
  CAR_PETROL_KG_CO2E_PER_KM: 0.17,

  // Average public transit (diesel/electric bus blend): ~0.045 kg CO2e per passenger-km
  // Source: UK DEFRA 2023 Local Bus
  BUS_TRANSIT_KG_CO2E_PER_KM: 0.045,

  // Train / Metro / Light rail: ~0.028 kg CO2e per passenger-km
  // Source: UK DEFRA 2023 Light rail and tram
  RAIL_TRANSIT_KG_CO2E_PER_KM: 0.028,

  // Typical exhaust PM2.5 per vehicle-km for euro 5/6 internal combustion engines: ~0.012 g / km
  // Source: EEA Emission Inventory Guidebook 2023
  CAR_PM25_GRAMS_PER_KM: 0.012,

  // Vehicle idling: approx 0.038 kg CO2e per minute of idle (2.3 kg CO2/hr)
  // Source: US EPA Clean School Bus Program Idle Reduction Studies
  CAR_IDLING_KG_CO2E_PER_MINUTE: 0.038,

  // Kitchen LPG cooking savings switching to induction (assuming renewables in grid mix)
  // Source: ICMR / Clean Cooking Alliance 2022
  INDUCTION_COOKING_SAVINGS_KG_CO2E_PER_DAY: 0.42,
};

/**
 * Open-Meteo Host Allowlist for SSRF Protection
 */
export const ALLOWED_API_HOSTS = [
  "air-quality-api.open-meteo.com",
  "api.open-meteo.com",
  "geocoding-api.open-meteo.com",
] as const;

/**
 * Medical Disclaimer as required by specification
 */
export const MEDICAL_DISCLAIMER =
  "AirAware provides environmental information and general wellness guidance. It is not a medical device and does not replace professional medical advice. Follow local public-health guidance.";
