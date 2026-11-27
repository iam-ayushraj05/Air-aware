import { describe, it, expect } from "vitest";
import { buildDailyRoutinePlan } from "../routine-builders";
import { getFallbackDemoData } from "@/server/demo-data";

describe("routine-builders", () => {
  it("builds a complete 4-period diurnal plan for clean air", () => {
    const cleanData = getFallbackDemoData("London", 51.51, -0.13);
    cleanData.aqi = 40;
    const plan = buildDailyRoutinePlan(cleanData, {
      commuteMethod: "walk_bike",
      hasAirPurifier: true,
    });

    expect(plan.id).toBeDefined();
    expect(plan.morning.length).toBeGreaterThan(0);
    expect(plan.afternoon.length).toBeGreaterThan(0);
    expect(plan.evening.length).toBeGreaterThan(0);
    expect(plan.night.length).toBeGreaterThan(0);
    expect(plan.morning[0]?.action).toContain("Open windows");
  });

  it("builds cautious sealed routine plan under severe smog conditions", () => {
    const severeData = getFallbackDemoData("New Delhi", 28.61, 77.21);
    severeData.aqi = 260;
    const plan = buildDailyRoutinePlan(severeData, {
      commuteMethod: "car_solo",
      hasAirPurifier: false,
    });

    expect(plan.morning[0]?.action).toContain("sealed");
    expect(plan.evening[0]?.action).toContain("indoors");
    expect(plan.night[0]?.action).toContain("damp towel");
  });
});
