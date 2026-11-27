import {
  AirQualitySnapshot,
  UserLifestyleProfile,
  DailyRoutinePlan,
  StructuredRecommendation,
} from "./types";
import { getAQICategory } from "./aqi";

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
