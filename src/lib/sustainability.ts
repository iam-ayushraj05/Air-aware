import { SustainableAlternativeComparison, TrackedActionItem } from "./types";

/**
 * Standardized sustainable alternative catalog with honest ranges and transparent assumptions.
 */
export const SUSTAINABLE_ALTERNATIVES: SustainableAlternativeComparison[] = [
  {
    id: "transit-commute",
    title: "Switch Daily Solo Drive to Metro / Bus",
    baselineChoice: "Driving solo in petrol/diesel passenger car (15 km round trip)",
    sustainableChoice: "Public metro, light rail, or bus transit",
    emissionsAvoidedKgCO2ePerTripOrDay: [1.8, 2.4],
    pm25AvoidedGrams: [0.15, 0.22],
    assumptions:
      "Calculated for a 15 km round-trip commute. Car emissions ~0.170 kg CO2e/km vs transit average ~0.040 kg CO2e/passenger-km. Source: UK DEFRA (2023).",
    formula: "Avoided CO2 = Distance (15 km) × (Car Factor 0.170 - Transit Factor 0.040)",
    difficulty: "medium",
    costImpact: "saves_money",
    category: "transport",
    sourceCitation: "UK DEFRA Greenhouse Gas Reporting Guidelines (2023)",
  },
  {
    id: "short-trip-active",
    title: "Walk or Cycle for Short Neighborhood Errands",
    baselineChoice: "Cold-engine car drive for trips under 3 km (grocery, pharmacy)",
    sustainableChoice: "Walking, cycling, or cargo bike",
    emissionsAvoidedKgCO2ePerTripOrDay: [0.5, 0.8],
    pm25AvoidedGrams: [0.03, 0.06],
    assumptions:
      "Assumes 3 km round trip. Cold combustion engines emit 2-3x more emissions per km during first 5 minutes of operation. Source: EPA AP-42.",
    formula: "Avoided CO2 = 3 km × 0.190 kg CO2e/km (cold start penalty)",
    difficulty: "easy",
    costImpact: "saves_money",
    category: "transport",
    sourceCitation: "US EPA Emission Factors for Passenger Cars (AP-42)",
  },
  {
    id: "anti-idling",
    title: "Cut Unnecessary Vehicle Idling",
    baselineChoice: "Leaving engine idling while waiting at school pickup or curbside (>3 mins)",
    sustainableChoice: "Turn off engine when parked or waiting longer than 30 seconds",
    emissionsAvoidedKgCO2ePerTripOrDay: [0.35, 0.55],
    pm25AvoidedGrams: [0.02, 0.05],
    assumptions:
      "Assumes 10 minutes of eliminated daily idling. Idling burns 0.5-0.8 liters of fuel per hour with no catalytic converter efficiency.",
    formula: "Avoided CO2 = 10 mins × 0.038 kg CO2e/min",
    difficulty: "easy",
    costImpact: "saves_money",
    category: "transport",
    sourceCitation: "Natural Resources Canada Idle-Free Campaign & US EPA",
  },
  {
    id: "clean-cooking",
    title: "Transition from Gas/LPG to Induction Cooking",
    baselineChoice: "Piped fossil gas or LPG cooking with combustion fumes",
    sustainableChoice: "High-efficiency electric induction cooking",
    emissionsAvoidedKgCO2ePerTripOrDay: [0.4, 0.7],
    pm25AvoidedGrams: [0.08, 0.14],
    assumptions:
      "Assumes 2 prepared meals per day. Induction thermal transfer is 85-90% efficient compared to 40-50% for gas burners. Eliminates indoor NO2 spikes.",
    formula: "Avoided Emissions = Estimated cooking energy differential × Regional grid factor",
    difficulty: "hard",
    costImpact: "cost_neutral",
    category: "cooking",
    sourceCitation: "Lawrence Berkeley National Laboratory (Indoor Air Pollution from Cooking)",
  },
  {
    id: "zero-waste-bag",
    title: "Reusable Tote & Packaging Reduction",
    baselineChoice: "Single-use thin film LDPE plastic carry bags",
    sustainableChoice: "Durable organic cotton or jute bag reused 100+ times",
    emissionsAvoidedKgCO2ePerTripOrDay: [0.08, 0.15],
    pm25AvoidedGrams: [0.005, 0.01],
    assumptions:
      "Prevents open burning of plastic film in municipal waste streams (a primary contributor to toxic dioxin and fine particulate smog in developing regions).",
    formula: "Lifecycle emission differential divided across bag design lifespan",
    difficulty: "easy",
    costImpact: "cost_neutral",
    category: "consumption",
    sourceCitation: "UNEP Single-Use Plastics LCA Meta-Analysis",
  },
];

export interface PersonalImpactResult {
  totalCompleted: number;
  totalEmissionsSavedKg: number;
  totalPmAvoidedGrams: number;
  streakDays: number;
  treeEquivalents: number;
  disclaimer: string;
}

/**
 * Calculates aggregated personal impact statistics from logged actions.
 *
 * @param actions Array of user logged actions
 * @returns PersonalImpactResult metrics
 */
export function calculatePersonalImpact(actions: TrackedActionItem[]): PersonalImpactResult {
  const totalCompleted = actions.length;

  let totalEmissionsSavedKg = 0;
  let totalPmAvoidedGrams = 0;

  for (const item of actions) {
    totalEmissionsSavedKg += item.emissionsSavedKg;
    totalPmAvoidedGrams += item.pmAvoidedGrams;
  }

  const dates = new Set(actions.map((a) => a.timestamp.split("T")[0]));
  const streakDays = dates.size;
  const treeEquivalents = totalEmissionsSavedKg / 21;

  return {
    totalCompleted,
    totalEmissionsSavedKg: Math.round(totalEmissionsSavedKg * 100) / 100,
    totalPmAvoidedGrams: Math.round(totalPmAvoidedGrams * 100) / 100,
    streakDays,
    treeEquivalents: Math.round(treeEquivalents * 10) / 10,
    disclaimer:
      "Estimated impact: based on assumptions from UK DEFRA & EPA publication models. Exact real-world impact varies by vehicle model, fuel type, and local electrical grid intensity.",
  };
}

export type PersonalImpactSummary = ReturnType<typeof calculatePersonalImpact>;

/**
 * Demo community challenge metrics (Clearly labeled DEMO DATA).
 */
export const DEMO_COMMUNITY_STATS = {
  activeParticipants: 1482,
  weeklyEmissionsSavedKg: 3840,
  cleanCommutesLogged: 2190,
  currentChallenge: {
    title: "7-Day Clean Commute Challenge",
    description:
      "Join 1,400+ city neighbors in replacing at least one private motor trip per day with walking, cycling, or electric public transit.",
    goalActions: 5000,
    currentActions: 3720,
    daysRemaining: 3,
  },
  recentPledges: [
    { neighborhood: "Downtown North", action: "Switched to Metro Commute", time: "12m ago" },
    { neighborhood: "Westside Park", action: "Zero Idling at School Pickup", time: "28m ago" },
    { neighborhood: "Riverdale", action: "Purchased True HEPA for Bedroom", time: "1h ago" },
    {
      neighborhood: "East Suburbs",
      action: "Replaced 2km drive with electric bike",
      time: "2h ago",
    },
  ],
};
