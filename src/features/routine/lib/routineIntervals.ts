import { RoutinePeriodHeader } from "../types";

export const ROUTINE_PERIOD_HEADERS: RoutinePeriodHeader[] = [
  {
    period: "morning",
    title: "Morning Window",
    timeRange: "06:00 - 11:00",
    focus: "Inversion Layer Avoidance",
  },
  {
    period: "afternoon",
    title: "Midday Window",
    timeRange: "11:00 - 17:00",
    focus: "Optimal Solar Boundary Layer",
  },
  {
    period: "evening",
    title: "Evening Window",
    timeRange: "17:00 - 21:00",
    focus: "Rush-Hour & Kitchen Ventilation",
  },
  {
    period: "night",
    title: "Nocturnal Sanctuary",
    timeRange: "21:00 - 06:00",
    focus: "Sleeping Micro-environment",
  },
];
