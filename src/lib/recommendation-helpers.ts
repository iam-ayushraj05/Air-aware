import { StructuredRecommendation, UserLifestyleProfile } from "./types";

/**
 * Builds targeted safeguards for households with vulnerable children or seniors.
 */
export function buildVulnerableRecommendation(
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
 * Builds commute-specific exposure mitigation recommendations.
 */
export function buildCommuteRecommendation(
  commute: UserLifestyleProfile["commuteMethod"],
  aqi: number
): StructuredRecommendation | null {
  if (commute === "car_solo") {
    return {
      id: "rec-commute-recirculate",
      category: "commute",
      action:
        "Switch vehicle AC to internal recirculation mode and consider carpooling or transit twice weekly",
      reason:
        "Vehicle cabin air without recirculation draws in direct tailpipe emissions from surrounding traffic.",
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
