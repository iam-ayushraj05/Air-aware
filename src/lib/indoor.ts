import { IndoorAssessmentData, IndoorScoreResult } from "./types";

/**
 * Calculates a transparent heuristic indoor air quality score (0-100).
 *
 * Scored across 4 sub-domains:
 * 1. Source Reduction (30 pts): Cooking fuels, exhaust fan, candle/incense avoidance
 * 2. Active Filtration (30 pts): True HEPA air cleaner presence and proper sizing
 * 3. Ventilation Timing (25 pts): Context-aware opening vs sealed during smog
 * 4. Cleaning & Dust Control (15 pts): Damp mopping vs dry brooming
 *
 * Transparent heuristic disclaimer is included in the output.
 */
export function calculateIndoorScore(
  assessment: Partial<IndoorAssessmentData>,
  outdoorAqi: number = 80
): IndoorScoreResult {
  let sourceReductionScore = 15; // baseline
  let filtrationScore = 0;
  let ventilationScore = 10;
  let cleaningScore = 5;

  const keyRisks: string[] = [];
  const priorityActions: string[] = [];

  // 1. Source Reduction
  if (assessment.cookingFuel === "electric_induction") {
    sourceReductionScore += 10;
  } else if (assessment.cookingFuel === "biomass") {
    sourceReductionScore -= 10;
    keyRisks.push("Biomass/wood combustion generates severe indoor PM2.5 and CO emissions.");
    priorityActions.push("Transition toward cleaner cooking fuel or cook exclusively outdoors/under high draft hood.");
  }

  if (assessment.exhaustFanWorking) {
    sourceReductionScore += 5;
  } else {
    keyRisks.push("Absence of operational kitchen exhaust traps cooking aerosol droplets indoors.");
    priorityActions.push("Install or service an ducted exhaust hood or window-mounted exhaust fan.");
  }

  if (assessment.hasIncenseOrCandles) {
    sourceReductionScore -= 5;
    keyRisks.push("Scented candles and incense sticks emit aromatic hydrocarbons and ultra-fine carbon black.");
    priorityActions.push("Cease burning indoor incense and paraffin candles; use essential oil diffusers sparingly if desired.");
  } else {
    sourceReductionScore += 5;
  }

  // 2. Active Filtration
  if (assessment.hasPurifier) {
    if (assessment.purifierHepa) {
      filtrationScore = 30;
    } else {
      filtrationScore = 18;
      priorityActions.push("Ensure your purifier utilizes a certified True HEPA (H13/H14) filter rather than electrostatic plates.");
    }
  } else {
    if (outdoorAqi > 100) {
      keyRisks.push("No mechanical air filtration during elevated ambient pollution events.");
      priorityActions.push("Acquire a True HEPA purifier sized appropriately (Clean Air Delivery Rate / CADR matching room volume).");
    }
  }

  // 3. Ventilation Timing
  if (outdoorAqi > 120) {
    if (assessment.ventilationMethod === "always_open") {
      ventilationScore = 5;
      keyRisks.push("Leaving windows continuously open during high smog events admits heavy outdoor particulate infiltration.");
      priorityActions.push("Keep windows firmly shut when outdoor AQI exceeds 100; ventilate only during cleaner afternoon windows.");
    } else if (assessment.ventilationMethod === "smart_timing") {
      ventilationScore = 25;
    } else {
      ventilationScore = 18;
    }
  } else {
    // Outdoor AQI is clean
    if (assessment.ventilationMethod === "always_closed") {
      ventilationScore = 12;
      keyRisks.push("Keeping home sealed when outdoor air is clean leads to carbon dioxide (>1000 ppm) and VOC accumulation.");
      priorityActions.push("Open windows on opposite sides for 20 minutes to purge stagnant indoor CO2.");
    } else {
      ventilationScore = 25;
    }
  }

  // 4. Cleaning & Dust Control
  if (assessment.dustCleaningFrequency === "daily_damp") {
    cleaningScore = 15;
  } else if (assessment.dustCleaningFrequency === "weekly_vacuum") {
    cleaningScore = 12;
  } else if (assessment.dustCleaningFrequency === "dry_brooming") {
    cleaningScore = 5;
    keyRisks.push("Dry brooming vigorously resuspends settled floor particulates back into the breathing zone.");
    priorityActions.push("Adopt microfiber damp mopping or a HEPA-sealed vacuum to capture particulate dust without resuspension.");
  } else {
    cleaningScore = 6;
  }

  // Ensure bounds
  sourceReductionScore = Math.max(0, Math.min(30, sourceReductionScore));
  filtrationScore = Math.max(0, Math.min(30, filtrationScore));
  ventilationScore = Math.max(0, Math.min(25, ventilationScore));
  cleaningScore = Math.max(0, Math.min(15, cleaningScore));

  const totalScore = sourceReductionScore + filtrationScore + ventilationScore + cleaningScore;

  let rating: "excellent" | "good" | "needs_improvement" | "poor" = "good";
  if (totalScore >= 85) rating = "excellent";
  else if (totalScore >= 65) rating = "good";
  else if (totalScore >= 45) rating = "needs_improvement";
  else rating = "poor";

  return {
    score: totalScore,
    rating,
    breakdown: {
      sourceReductionScore,
      filtrationScore,
      ventilationScore,
      cleaningScore,
    },
    keyRisks,
    priorityActions,
    heuristicDisclaimer:
      "This score is a transparent weighted heuristic based on recognized environmental health risk factors (EPA Indoor Air Quality Guidelines), not an empirical laboratory measurement.",
  };
}

/**
 * Honest, science-backed guidance regarding indoor houseplants and air purification.
 */
export const PLANT_PURIFICATION_FACTS = {
  summary: "Indoor plants enhance emotional wellness and humidity, but have negligible effect on fine particulate matter (PM2.5).",
  details:
    "While NASA's 1989 Clean Air Study demonstrated VOC reduction by plants in sealed bell jars, subsequent peer-reviewed environmental engineering studies (e.g., Cummings & Waring, 2020) demonstrated that typical natural ventilation rates dilute VOCs 100 to 1,000 times faster than potted plants can metabolize them. Houseplants do not capture PM2.5 or PM10 particulate smog. For particulate defense, True HEPA mechanical filtration remains the proven standard.",
};
