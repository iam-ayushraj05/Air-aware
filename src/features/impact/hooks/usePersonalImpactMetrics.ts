import { useState, useEffect } from "react";
import { loadTrackedActions } from "@/lib/storage";
import { calculatePersonalImpact, PersonalImpactSummary } from "@/lib/sustainability";
import { TrackedActionItem } from "@/lib/types";

/**
 * Custom hook calculating personal sustainability metrics from locally tracked user actions.
 */
export function usePersonalImpactMetrics() {
  const [tracked, setTracked] = useState<TrackedActionItem[]>([]);
  const [impact, setImpact] = useState<PersonalImpactSummary>(calculatePersonalImpact([]));

  useEffect(() => {
    const loaded = loadTrackedActions();
    setTracked(loaded);
    setImpact(calculatePersonalImpact(loaded));
  }, []);

  return { tracked, impact };
}
