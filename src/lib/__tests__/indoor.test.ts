import { describe, it, expect } from "vitest";
import { calculateIndoorScore } from "../indoor";

describe("Indoor Air Quality Heuristic Score", () => {
  it("calculates high score for well-mitigated induction & HEPA room", () => {
    const res = calculateIndoorScore(
      {
        cookingFuel: "electric_induction",
        exhaustFanWorking: true,
        hasPurifier: true,
        purifierHepa: true,
        ventilationMethod: "smart_timing",
        hasIncenseOrCandles: false,
        dustCleaningFrequency: "daily_damp",
      },
      150
    );

    expect(res.score).toBeGreaterThanOrEqual(80);
    expect(res.rating).toBe("excellent");
    expect(res.heuristicDisclaimer).toContain("transparent weighted heuristic");
  });

  it("penalizes biomass fuel, incense, and dry brooming", () => {
    const res = calculateIndoorScore(
      {
        cookingFuel: "biomass",
        exhaustFanWorking: false,
        hasPurifier: false,
        hasIncenseOrCandles: true,
        dustCleaningFrequency: "dry_brooming",
        ventilationMethod: "always_open",
      },
      200
    );

    expect(res.score).toBeLessThanOrEqual(40);
    expect(res.rating).toBe("poor");
    expect(res.keyRisks.length).toBeGreaterThanOrEqual(3);
    expect(res.priorityActions.length).toBeGreaterThanOrEqual(1);
  });

  it("handles non-HEPA purifiers and weekly vacuum cleaning", () => {
    const res = calculateIndoorScore(
      {
        cookingFuel: "piped_gas",
        exhaustFanWorking: true,
        hasPurifier: true,
        purifierHepa: false,
        dustCleaningFrequency: "weekly_vacuum",
        ventilationMethod: "smart_timing",
      },
      140
    );

    expect(res.score).toBeGreaterThan(50);
    expect(res.priorityActions.some((a) => a.includes("True HEPA"))).toBe(true);
  });

  it("flags always_closed ventilation during clean outdoor conditions", () => {
    const res = calculateIndoorScore(
      {
        ventilationMethod: "always_closed",
      },
      45 // clean air
    );

    expect(res.keyRisks.some((r) => r.includes("carbon dioxide"))).toBe(true);
  });
});
