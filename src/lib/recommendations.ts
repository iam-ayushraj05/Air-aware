import { getAQICategory } from "./aqi";
import { AirQualitySnapshot, StructuredRecommendation, UserLifestyleProfile } from "./types";
import {
  buildVulnerableRecommendation,
  buildCommuteRecommendation,
} from "./recommendation-helpers";

/**
 * Builds the outdoor activity guidance based on AQI category, PM2.5, and exertion level.
 *
 * @param category AQI category
 * @param aqi Ambient AQI value
 * @param pm25 PM2.5 concentration in µg/m³
 * @param activityLevel User self-reported outdoor exercise intensity
 * @param hasSensitiveDependents Whether children or elderly live in household
 * @returns Structured outdoor recommendation
 */
function buildOutdoorRecommendation(
  category: string,
  aqi: number,
  pm25: number,
  activityLevel: string,
  hasSensitiveDependents: boolean
): StructuredRecommendation {
  if (category === "hazardous" || category === "very_unhealthy") {
    return {
      id: "rec-outdoor-severe",
      category: "outdoor",
      action: "Suspend all outdoor endurance exercise and non-essential outdoor exposure",
      reason:
        "At hazardous particulate levels, vigorous inhalation increases deep lung deposition of fine toxic particles by up to 400%.",
      evidence: `Current AQI is ${aqi} (PM2.5: ${pm25.toFixed(1)} µg/m³), exceeding the safe 24-hr threshold.`,
      expectedBenefit:
        "Reduces microscopic particle inhalation into alveolar airways by ~90% when staying indoors.",
      confidence: 0.95,
      isGeneral: false,
    };
  }

  if (category === "unhealthy") {
    return {
      id: "rec-outdoor-unhealthy",
      action:
        activityLevel === "high"
          ? "Shift cardio sessions indoors; substitute outdoor running with indoor circuit training"
          : "Limit outdoor walking to essential errands and wear a well-fitted particulate respirator (N95/FFP2)",
      category: "outdoor",
      reason:
        "Elevated PM2.5 triggers airway inflammation and vascular constriction, particularly during cardiovascular exertion.",
      evidence: `PM2.5 concentration is ${pm25.toFixed(1)} µg/m³ with AQI ${aqi}.`,
      expectedBenefit: "Avoids acute respiratory irritation and maintains lung function integrity.",
      confidence: 0.92,
      isGeneral: false,
    };
  }

  if (category === "sensitive") {
    return {
      id: "rec-outdoor-sensitive",
      action: hasSensitiveDependents
        ? "Reschedule outdoor playtime and morning walks to midday when vertical mixing is higher"
        : "Schedule outdoor sports for late afternoon when air dispersion is optimal; avoid rush-hour roadways",
      category: "outdoor",
      reason:
        "Sensitive bronchial tissues in children and older adults react faster to moderate fine-particle concentrations.",
      evidence: `AQI is ${aqi} (Unhealthy for Sensitive Groups), PM2.5: ${pm25.toFixed(1)} µg/m³.`,
      expectedBenefit:
        "Cuts peak pollutant exposure by 35-50% compared to heavy-traffic rush hours.",
      confidence: 0.88,
      isGeneral: false,
    };
  }

  return {
    id: "rec-outdoor-good",
    action: "Air quality is favorable for outdoor athletics, park visits, and active commuting",
    category: "outdoor",
    reason:
      "Low ambient particulate and ozone levels present minimal oxidative stress on the pulmonary system.",
    evidence: `AQI is ${aqi} (Good/Moderate range), PM2.5: ${pm25.toFixed(1)} µg/m³.`,
    expectedBenefit:
      "Maximized cardiovascular health and natural vitamin D synthesis with safe air.",
    confidence: 0.95,
    isGeneral: true,
  };
}

/**
 * Generates indoor filtration or purge ventilation actions based on outdoor smog severity.
 *
 * @param category Current AQI category
 * @param hasPurifier Whether household operates a True HEPA filtration unit
 * @param pm25 Current PM2.5 level
 * @param aqi Current AQI
 * @param windSpeed Ambient surface wind speed in km/h
 * @returns Indoor recommendation
 */
function buildIndoorRecommendation(
  category: string,
  hasPurifier: boolean,
  pm25: number,
  aqi: number,
  windSpeed: number
): StructuredRecommendation {
  const isElevated =
    category === "unhealthy" || category === "very_unhealthy" || category === "hazardous";

  if (isElevated && hasPurifier) {
    return {
      id: "rec-indoor-purifier-high",
      category: "indoor",
      action:
        "Run True HEPA air purifier on medium-high in occupied rooms; seal drafty window gaps",
      reason:
        "High outdoor particulate infiltration can raise indoor PM2.5 to 70% of outdoor levels within hours without mechanical filtration.",
      evidence: `Outdoor PM2.5 is ${pm25.toFixed(1)} µg/m³. Purifier is available in household.`,
      expectedBenefit:
        "Achieves 80-95% reduction in indoor PM2.5 concentration in enclosed spaces.",
      confidence: 0.96,
      isGeneral: false,
    };
  }

  if (isElevated) {
    return {
      id: "rec-indoor-nopurifier-high",
      category: "indoor",
      action:
        "Keep windows closed, minimize indoor combustion (frying, incense), and create a designated clean-air sanctuary room",
      reason:
        "In the absence of a mechanical HEPA purifier, reducing indoor emission sources is critical to keep indoor levels below outdoor peaks.",
      evidence: `Outdoor PM2.5 is ${pm25.toFixed(1)} µg/m³; household reports no air purifier.`,
      expectedBenefit:
        "Prevents compound indoor pollution from cooking oils and outdoor infiltration.",
      confidence: 0.89,
      isGeneral: false,
    };
  }

  return {
    id: "rec-indoor-ventilation-good",
    category: "indoor",
    action: "Perform cross-ventilation: open windows on opposite sides of home for 20-30 minutes",
    reason:
      "Flushes accumulated indoor CO2, VOCs from cleaning materials, and moisture without introducing dangerous particulates.",
    evidence: `Outdoor AQI is ${aqi} and wind speed is ${windSpeed.toFixed(1)} km/h.`,
    expectedBenefit:
      "Lowers indoor carbon dioxide below 800 ppm, improving sleep quality and cognitive alertness.",
    confidence: 0.92,
    isGeneral: false,
  };
}

/**
 * Generates recommendations grounded in meteorological air quality snapshots and user profiles.
 *
 * @param airData Current air quality snapshot
 * @param profile User lifestyle profile preferences
 * @returns List of evidence-backed structured recommendations
 */
export function generateRecommendations(
  airData: AirQualitySnapshot,
  profile: Partial<UserLifestyleProfile>
): StructuredRecommendation[] {
  const recommendations: StructuredRecommendation[] = [];
  const aqi = airData.aqi;
  const category = getAQICategory(aqi);
  const pm25 = airData.pollutants.pm2_5?.value ?? 0;
  const windSpeed = airData.weather.windSpeed;
  const isStagnant = windSpeed < 10;
  const hasChildren = profile.hasChildren ?? false;
  const hasElderly = profile.hasElderly ?? false;
  const hasPurifier = profile.hasAirPurifier ?? false;
  const commute = profile.commuteMethod ?? "car_solo";
  const activityLevel = profile.outdoorActivityLevel ?? "moderate";

  recommendations.push(
    buildOutdoorRecommendation(category, aqi, pm25, activityLevel, hasChildren || hasElderly)
  );

  const vulnerableRec = buildVulnerableRecommendation(hasChildren, hasElderly, aqi);
  if (vulnerableRec) recommendations.push(vulnerableRec);

  recommendations.push(buildIndoorRecommendation(category, hasPurifier, pm25, aqi, windSpeed));

  const commuteRec = buildCommuteRecommendation(commute, aqi);
  if (commuteRec) recommendations.push(commuteRec);

  if (isStagnant && aqi >= 130) {
    recommendations.push({
      id: "rec-stagnation-community",
      category: "sustainability",
      action:
        "Zero-idling pledge: shut down engine while parked or waiting at curbs; avoid any dry sweeping or outdoor burning",
      reason:
        "Under calm atmospheric conditions (wind < 10 km/h), ground emissions do not disperse and accumulate directly around pedestrians.",
      evidence: `Wind speed is low (${windSpeed.toFixed(1)} km/h) with elevated AQI (${aqi}).`,
      expectedBenefit: "Prevents localized emission hot-spots in your immediate neighborhood.",
      confidence: 0.95,
      isGeneral: false,
    });
  }

  return recommendations;
}

export { buildDailyRoutinePlan } from "./routine-builders";
