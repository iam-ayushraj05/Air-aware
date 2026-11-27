import { useState } from "react";
import { IndoorAssessmentData } from "@/lib/types";

export const DEFAULT_INDOOR_ASSESSMENT: IndoorAssessmentData = {
  roomType: "living_room",
  hasPurifier: false,
  purifierHepa: false,
  cookingFuel: "piped_gas",
  exhaustFanWorking: true,
  ventilationMethod: "smart_timing",
  hasIncenseOrCandles: false,
  dustCleaningFrequency: "weekly_vacuum",
  indoorPlantsCount: 2,
  petsCount: 0,
};

/**
 * Custom hook managing the interactive indoor assessment inputs.
 */
export function useIndoorAssessmentForm(initialData = DEFAULT_INDOOR_ASSESSMENT) {
  const [data, setData] = useState<IndoorAssessmentData>(initialData);
  return { data, setData };
}
