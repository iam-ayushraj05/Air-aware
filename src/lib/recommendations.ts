import { getAQICategory } from "./aqi";
import {
  AirQualitySnapshot,
  DailyRoutinePlan,
  StructuredRecommendation,
  UserLifestyleProfile,
} from "./types";

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
 * Builds targeted safeguards for households with vulnerable children or seniors.
 *
 * @param hasChildren Whether children reside in household
 * @param hasElderly Whether elderly individuals reside in household
 * @param aqi Current ambient AQI
 * @returns Vulnerable guidance or null if not applicable
 */
function buildVulnerableRecommendation(
  hasChildren: boolean,
  hasElderly: boolean,
  aqi: number
): StructuredRecommendation | null {
  if (!(hasChildren || hasElderly) || aqi < 101) return null;

  return {
    id: "rec-vulnerable-protection",
    category: "vulnerable",
    action:
      "Keep vulnerable family members inside during peak smog hours; close school and bedroom windows facing roadways",
    reason:
      "Children possess smaller airway calibers and higher ventilation rates per kilogram of body weight, increasing toxic absorption.",
    evidence: `Sensitive group alert active (AQI: ${aqi}). Household contains children/elderly.`,
    expectedBenefit: "Significantly lowers incidence of cough episodes and bronchial spasms.",
    confidence: 0.94,
    isGeneral: false,
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
 * Builds commute advice tailored to active commuting vs vehicular travel.
 *
 * @param commute Commute method enum string
 * @param aqi Current AQI
 * @returns Commute recommendation or null
 */
function buildCommuteRecommendation(commute: string, aqi: number): StructuredRecommendation | null {
  if (commute === "car_solo" && aqi >= 120) {
    return {
      id: "rec-commute-car-solo",
      category: "commute",
      action:
        "Switch car air conditioning to internal recirculation mode; consider carpooling or transit to curb emissions",
      reason:
        "Tailpipe exhaust in traffic jams contains ultra-fine particles (PM0.1) and NO2 up to 5x higher than ambient monitors.",
      evidence: `User commutes solo by car. Ambient AQI is ${aqi}.`,
      expectedBenefit:
        "Reduces cabin toxic exposure by ~65% via recirculation; avoids ~4.2 kg CO2e daily if carpooling.",
      confidence: 0.91,
      isGeneral: false,
    };
  }

  if (commute === "walk_bike" && aqi >= 150) {
    return {
      id: "rec-commute-active-caution",
      category: "commute",
      action:
        "Temporarily switch from cycling/walking to electric public transit, or wear an N95 respirator along low-traffic green corridors",
      reason:
        "Deep breathing during uphill cycling increases particle ingestion into the bloodstream.",
      evidence: `Active commuter in AQI ${aqi} environment.`,
      expectedBenefit: "Cuts particle deposition while still supporting urban mobility.",
      confidence: 0.93,
      isGeneral: false,
    };
  }

  return null;
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

function buildMorningRoutine(aqi: number, commuteMethod: string): StructuredRecommendation[] {
  return [
    {
      id: "routine-m1",
      category: "routine",
      action:
        aqi > 130
          ? "Check morning smog readings; keep bedroom windows sealed until midday thermal mixing"
          : "Open windows for a brisk 20-minute morning air purge before rush hour",
      reason: "Early morning inversion layers often trap nocturnal emissions near the ground.",
      evidence: `Morning AQI: ${aqi}`,
      expectedBenefit:
        aqi > 130
          ? "Prevents high early morning particulate infiltration."
          : "Refreshes oxygen levels safely.",
      confidence: 0.9,
      isGeneral: false,
      timeOfDay: "morning",
      completed: false,
    },
    {
      id: "routine-m2",
      category: "commute",
      action:
        commuteMethod === "car_solo"
          ? "Enable internal cabin recirculation on your commute; avoid idling in school drop-off zones"
          : "Plan your transit route along tree-lined corridors; carry water to soothe respiratory tract",
      reason: "Peak commute hours coincide with maximum traffic density and particulate spikes.",
      evidence: `Commute mode: ${commuteMethod}`,
      expectedBenefit: "Reduces peak commute toxic inhalation by 40-70%.",
      confidence: 0.92,
      isGeneral: false,
      timeOfDay: "morning",
      completed: false,
    },
  ];
}

function buildAfternoonRoutine(aqi: number): StructuredRecommendation[] {
  return [
    {
      id: "routine-a1",
      category: "indoor",
      action:
        "Maintain indoor humidity between 40-50%; stay hydrated with warm fluids to support mucous membranes",
      reason:
        "Optimal indoor humidity prevents aerosolization of dust and keeps nasal cilia functioning effectively.",
      evidence: `Indoor environment control during AQI ${aqi}`,
      expectedBenefit: "Strengthens primary physical barrier against fine particulates.",
      confidence: 0.88,
      isGeneral: false,
      timeOfDay: "afternoon",
      completed: false,
    },
    {
      id: "routine-a2",
      category: "outdoor",
      action:
        aqi > 150
          ? "Keep lunch breaks indoors or in filtered spaces; avoid outdoor perimeter walks near traffic"
          : "Take a 15-minute lunchtime walk in a city park away from arterial corridors",
      reason:
        "Solar heating in the afternoon helps elevate the boundary layer, dispersing local stagnation.",
      evidence: `Midday AQI: ${aqi}`,
      expectedBenefit: "Balances mental rejuvenation with reduced toxic exposure.",
      confidence: 0.9,
      isGeneral: false,
      timeOfDay: "afternoon",
      completed: false,
    },
  ];
}

function buildEveningRoutine(aqi: number): StructuredRecommendation[] {
  return [
    {
      id: "routine-e1",
      category: "outdoor",
      action:
        aqi > 120
          ? "Conduct strength training or yoga indoors rather than running outside"
          : "Enjoy outdoor recreational sport or walking; air quality permits exercise",
      reason:
        aqi > 120
          ? "Cardiovascular exercise multiplies air intake by 8-10x, magnifying particulate dose."
          : "Evening ventilation is favorable.",
      evidence: `Evening AQI forecast: ${aqi}`,
      expectedBenefit: "Maintains athletic fitness without pulmonary inflammation.",
      confidence: 0.93,
      isGeneral: false,
      timeOfDay: "evening",
      completed: false,
    },
    {
      id: "routine-e2",
      category: "indoor",
      action:
        "Turn on kitchen exhaust fan before igniting stove; cover pans while cooking to prevent oil droplet dispersal",
      reason:
        "High-heat frying can generate localized indoor PM2.5 spikes above 300 µg/m³ within 15 minutes.",
      evidence: "Kitchen combustion risk mitigation",
      expectedBenefit: "Keeps indoor PM2.5 below 25 µg/m³ during dinner preparation.",
      confidence: 0.95,
      isGeneral: false,
      timeOfDay: "evening",
      completed: false,
    },
  ];
}

function buildNightRoutine(
  hasAirPurifier: boolean,
  locationName: string
): StructuredRecommendation[] {
  return [
    {
      id: "routine-n1",
      category: "indoor",
      action: hasAirPurifier
        ? "Set bedroom air purifier to quiet sleep mode; position it 1-2 meters from head of bed"
        : "Close bedroom windows and place a damp towel near drafts to capture settling coarse dust",
      reason:
        "Humans spend 7-8 hours continuously inhaling the immediate micro-environment of their bedroom.",
      evidence: `Night-time rest protection (Purifier: ${hasAirPurifier ? "Yes" : "No"})`,
      expectedBenefit:
        "Ensures uninterrupted restorative sleep and reduces nocturnal asthma awakenings.",
      confidence: 0.94,
      isGeneral: false,
      timeOfDay: "night",
      completed: false,
    },
    {
      id: "routine-n2",
      category: "routine",
      action: "Review tomorrow morning's clean-air forecast before setting your commute alarm",
      reason: "Allows proactive scheduling of morning errands before traffic builds.",
      evidence: `Hourly forecast projection for ${locationName}`,
      expectedBenefit: "Empowers proactive schedule adjustments to avoid worst air hours.",
      confidence: 0.91,
      isGeneral: true,
      timeOfDay: "night",
      completed: false,
    },
  ];
}

/**
 * Builds a 4-part clean-air day routine plan tailored to current air metrics.
 *
 * @param airData Current air quality snapshot
 * @param profile User lifestyle profile preferences
 * @returns Structured 4-phase diurnal schedule
 */
export function buildDailyRoutinePlan(
  airData: AirQualitySnapshot,
  profile: Partial<UserLifestyleProfile>
): DailyRoutinePlan {
  const aqi = airData.aqi;
  const morning = buildMorningRoutine(aqi, profile.commuteMethod ?? "car_solo");
  const afternoon = buildAfternoonRoutine(aqi);
  const evening = buildEveningRoutine(aqi);
  const night = buildNightRoutine(profile.hasAirPurifier ?? false, airData.location.name);

  const summary = `Personalized Clean-Air Routine for ${airData.location.name}. Current AQI is ${aqi} (${getAQICategory(aqi).toUpperCase()}). Focus today is on reducing peak commute exposure and optimizing indoor filtration.`;

  return {
    id: `plan-${Date.now()}`,
    date: new Date().toISOString().split("T")[0] ?? "today",
    aqiContext: aqi,
    locationName: airData.location.name,
    morning,
    afternoon,
    evening,
    night,
    summary,
    generatedBy: "deterministic_engine",
  };
}
