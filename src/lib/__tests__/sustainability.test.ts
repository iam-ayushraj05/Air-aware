import { describe, it, expect } from "vitest";
import { calculatePersonalImpact, SUSTAINABLE_ALTERNATIVES } from "../sustainability";
import { TrackedActionItem } from "../types";

describe("Sustainability & Impact Calculations", () => {
  it("verifies all sustainable alternatives contain required metadata and formulas", () => {
    for (const item of SUSTAINABLE_ALTERNATIVES) {
      expect(item.id).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.emissionsAvoidedKgCO2ePerTripOrDay[0]).toBeGreaterThan(0);
      expect(item.emissionsAvoidedKgCO2ePerTripOrDay[1]).toBeGreaterThanOrEqual(
        item.emissionsAvoidedKgCO2ePerTripOrDay[0]
      );
      expect(item.assumptions.length).toBeGreaterThan(15);
      expect(item.formula.length).toBeGreaterThan(10);
      expect(item.sourceCitation.length).toBeGreaterThan(5);
    }
  });

  it("calculates aggregated impact from tracked actions correctly", () => {
    const actions: TrackedActionItem[] = [
      {
        id: "1",
        actionId: "transit-commute",
        title: "Metro Commute",
        timestamp: "2026-11-26T08:00:00Z",
        emissionsSavedKg: 2.1,
        pmAvoidedGrams: 0.18,
        category: "transport",
      },
      {
        id: "2",
        actionId: "anti-idling",
        title: "Zero Idling",
        timestamp: "2026-11-26T09:00:00Z",
        emissionsSavedKg: 0.45,
        pmAvoidedGrams: 0.03,
        category: "transport",
      },
    ];

    const result = calculatePersonalImpact(actions);
    expect(result.totalCompleted).toBe(2);
    expect(result.totalEmissionsSavedKg).toBe(2.55);
    expect(result.totalPmAvoidedGrams).toBe(0.21);
    expect(result.streakDays).toBe(1);
    expect(result.disclaimer).toContain("Estimated impact: based on assumptions");
  });
});
