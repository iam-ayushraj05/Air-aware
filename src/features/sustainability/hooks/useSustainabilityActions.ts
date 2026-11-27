import { useState } from "react";
import { SustainabilityCategoryFilter } from "../types";

/**
 * Custom hook managing active category filter for sustainable lifestyle alternatives.
 */
export function useSustainabilityActions() {
  const [filter, setFilter] = useState<SustainabilityCategoryFilter>("all");
  return { filter, setFilter };
}
