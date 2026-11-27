import { IndoorAssessmentData, IndoorScoreResult } from "./types";

export type { IndoorScoreResult };

/**
 * Computes source reduction score (0-30 pts).
 */
function scoreSourceReduction(assessment: Partial<IndoorAssessmentData>): {
  score: number;
  risks: string[];
  actions: string[];
} {
  let score = 15;
  const risks: string[] = [];
  const actions: string[] = [];

  if (assessment.cookingFuel === "electric_induction") {
    score += 10;
  } else if (assessment.cookingFuel === "biomass") {
    score -= 10;
    risks.push("Biomass/wood combustion generates severe indoor PM2.5 and CO emissions.");
    actions.push(
      "Transition toward cleaner cooking fuel or cook exclusively outdoors/under high draft hood."
    );
  }

  if (assessment.exhaustFanWorking) {
    score += 5;
  } else {
    risks.push("Absence of operational kitchen exhaust traps cooking aerosol droplets indoors.");
    actions.push("Install or service an ducted exhaust hood or window-mounted exhaust fan.");
  }

  if (assessment.hasIncenseOrCandles) {
    score -= 5;
    risks.push(
      "Scented candles and incense sticks emit aromatic hydrocarbons and ultra-fine carbon black."
    );
    actions.push(
      "Cease burning indoor incense and paraffin candles; use essential oil diffusers sparingly if desired."
    );
  } else {
    score += 5;
  }

  return { score: Math.max(0, Math.min(30, score)), risks, actions };
}

/**
 * Computes active filtration score (0-30 pts).
 */
function scoreFiltration(
  assessment: Partial<IndoorAssessmentData>,
  outdoorAqi: number
): {
  score: number;
  risks: string[];
  actions: string[];
} {
  let score = 0;
  const risks: string[] = [];
  const actions: string[] = [];

  if (assessment.hasPurifier) {
    if (assessment.purifierHepa) {
      score = 30;
    } else {
      score = 18;
      actions.push(
        "Ensure your purifier utilizes a certified True HEPA (H13/H14) filter rather than electrostatic plates."
      );
    }
  } else if (outdoorAqi > 100) {
    risks.push("No mechanical air filtration during elevated ambient pollution events.");
    actions.push(
      "Acquire a True HEPA purifier sized appropriately (Clean Air Delivery Rate / CADR matching room volume)."
    );
  }

  return { score: Math.max(0, Math.min(30, score)), risks, actions };
}

/**
 * Computes ventilation timing score (0-25 pts).
 */
function scoreVentilation(
  assessment: Partial<IndoorAssessmentData>,
  outdoorAqi: number
): {
  score: number;
  risks: string[];
  actions: string[];
} {
  let score = 10;
  const risks: string[] = [];
  const actions: string[] = [];

  if (outdoorAqi > 120) {
    if (assessment.ventilationMethod === "always_open") {
      score = 5;
      risks.push(
        "Leaving windows continuously open during high smog events admits heavy outdoor particulate infiltration."
      );
      actions.push(
        "Keep windows firmly shut when outdoor AQI exceeds 100; ventilate only during cleaner afternoon windows."
      );
    } else if (assessment.ventilationMethod === "smart_timing") {
      score = 25;
    } else {
      score = 18;
    }
  } else {
    if (assessment.ventilationMethod === "always_closed") {
      score = 12;
      risks.push(
        "Keeping home sealed when outdoor air is clean leads to carbon dioxide (>1000 ppm) and VOC accumulation."
      );
      actions.push("Open windows on opposite sides for 20 minutes to purge stagnant indoor CO2.");
    } else {
      score = 25;
    }
  }

  return { score: Math.max(0, Math.min(25, score)), risks, actions };
}

/**
 * Computes cleaning & dust control score (0-15 pts).
 */
function scoreCleaning(assessment: Partial<IndoorAssessmentData>): {
  score: number;
  risks: string[];
  actions: string[];
} {
  let score = 5;
  const risks: string[] = [];
  const actions: string[] = [];

  if (assessment.dustCleaningFrequency === "daily_damp") {
    score = 15;
  } else if (assessment.dustCleaningFrequency === "weekly_vacuum") {
    score = 12;
  } else if (assessment.dustCleaningFrequency === "dry_brooming") {
    score = 5;
    risks.push(
      "Dry brooming vigorously resuspends settled floor particulates back into the breathing zone."
    );
    actions.push(
      "Adopt microfiber damp mopping or a HEPA-sealed vacuum to capture particulate dust without resuspension."
    );
  } else {
    score = 6;
  }

  return { score: Math.max(0, Math.min(15, score)), risks, actions };
}

/**
 * Determines qualitative tier from numeric score.
 */
function determineRating(score: number): "excellent" | "good" | "needs_improvement" | "poor" {
  if (score >= 85) return "excellent";
  if (score >= 65) return "good";
  if (score >= 45) return "needs_improvement";
  return "poor";
}

/**
 * Calculates a transparent heuristic indoor air quality score (0-100).
 *
 * Scored across 4 sub-domains:
 * 1. Source Reduction (30 pts)
 * 2. Active Filtration (30 pts)
 * 3. Ventilation Timing (25 pts)
 * 4. Cleaning & Dust Control (15 pts)
 *
 * @param assessment User-provided room assessment inputs
 * @param outdoorAqi Current ambient AQI
 * @returns IndoorScoreResult with numeric breakdown and actionable advice
 */
export function calculateIndoorScore(
  assessment: Partial<IndoorAssessmentData>,
  outdoorAqi: number = 80
): IndoorScoreResult {
  const source = scoreSourceReduction(assessment);
  const filtration = scoreFiltration(assessment, outdoorAqi);
  const ventilation = scoreVentilation(assessment, outdoorAqi);
  const cleaning = scoreCleaning(assessment);

  const totalScore = source.score + filtration.score + ventilation.score + cleaning.score;
  const keyRisks = [...source.risks, ...filtration.risks, ...ventilation.risks, ...cleaning.risks];
  const priorityActions = [
    ...source.actions,
    ...filtration.actions,
    ...ventilation.actions,
    ...cleaning.actions,
  ];

  return {
    score: totalScore,
    rating: determineRating(totalScore),
    breakdown: {
      sourceReductionScore: source.score,
      filtrationScore: filtration.score,
      ventilationScore: ventilation.score,
      cleaningScore: cleaning.score,
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
  summary:
    "Indoor plants enhance emotional wellness and humidity, but have negligible effect on fine particulate matter (PM2.5).",
  details:
    "While NASA's 1989 Clean Air Study demonstrated VOC reduction by plants in sealed bell jars, subsequent peer-reviewed environmental engineering studies (e.g., Cummings & Waring, 2020) demonstrated that typical natural ventilation rates dilute VOCs 100 to 1,000 times faster than potted plants can metabolize them. Houseplants do not capture PM2.5 or PM10 particulate smog. For particulate defense, True HEPA mechanical filtration remains the proven standard.",
};
