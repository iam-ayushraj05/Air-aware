import { describe, it, expect } from "vitest";
import { generateRecommendations, buildDailyRoutinePlan } from "../recommendations";
import { AirQualitySnapshot } from "../types";

function createMockSnapshot(overrides: Partial<AirQualitySnapshot> = {}): AirQualitySnapshot {
  return {
    aqi: 160,
    category: "unhealthy",
    standard: "US_AQI",
    pollutants: {
      pm2_5: { value: 72.5, unit: "µg/m³", label: "PM2.5", safeLimit: 15, status: "unhealthy" },
      pm10: { value: 120, unit: "µg/m³", label: "PM10", safeLimit: 45, status: "unhealthy" },
    },
    weather: {
      temperature: 14,
      humidity: 70,
      windSpeed: 6,
      weatherCode: 71,
      conditionText: "Smog",
      isTemperatureInversionLikely: true,
    },
    hourly: [],
    location: { name: "Test City", latitude: 28.6, longitude: 77.2 },
    dataSource: "live",
    updatedAt: new Date().toISOString(),
    isWinterSmogActive: true,
    ...overrides,
  };
}

describe("Recommendation Engine Matrix", () => {
  it("verifies structured schema on every recommendation object", () => {
    const snap = createMockSnapshot();
    const recs = generateRecommendations(snap, { hasChildren: true, hasAirPurifier: true });

    expect(recs.length).toBeGreaterThan(0);
    for (const r of recs) {
      expect(r.id).toBeTypeOf("string");
      expect(r.category).toBeTypeOf("string");
      expect(r.action.length).toBeGreaterThan(10);
      expect(r.reason.length).toBeGreaterThan(10);
      expect(r.evidence.length).toBeGreaterThan(5);
      expect(r.expectedBenefit.length).toBeGreaterThan(5);
      expect(r.confidence).toBeGreaterThanOrEqual(0.8);
      expect(r.confidence).toBeLessThanOrEqual(1.0);
      expect(typeof r.isGeneral).toBe("boolean");
    }
  });

  it("handles Hazardous / Very Unhealthy band (AQI > 200)", () => {
    const snap = createMockSnapshot({ aqi: 240, category: "very_unhealthy" });
    const recs = generateRecommendations(snap, { outdoorActivityLevel: "high" });

    const outdoorRec = recs.find((r) => r.category === "outdoor");
    expect(outdoorRec?.action).toContain("Suspend all outdoor endurance exercise");
    expect(outdoorRec?.expectedBenefit).toContain("alveolar airways");
  });

  it("handles Good / Moderate band (AQI < 50)", () => {
    const snap = createMockSnapshot({
      aqi: 35,
      category: "good",
      weather: { temperature: 20, humidity: 50, windSpeed: 18, weatherCode: 1, conditionText: "Clear" },
    });
    const recs = generateRecommendations(snap, {});

    const outdoorRec = recs.find((r) => r.category === "outdoor");
    expect(outdoorRec?.action).toContain("Air quality is favorable");
    expect(outdoorRec?.isGeneral).toBe(true);

    const ventRec = recs.find((r) => r.category === "indoor");
    expect(ventRec?.action).toContain("cross-ventilation");
  });

  it("triggers vulnerable group protections when children or elderly are in household", () => {
    const snap = createMockSnapshot({ aqi: 140, category: "sensitive" });

    const recsWithKids = generateRecommendations(snap, { hasChildren: true });
    const vulnRec = recsWithKids.find((r) => r.category === "vulnerable");
    expect(vulnRec).toBeDefined();
    expect(vulnRec?.action).toContain("vulnerable family members");

    const recsNoKids = generateRecommendations(snap, { hasChildren: false, hasElderly: false });
    expect(recsNoKids.find((r) => r.category === "vulnerable")).toBeUndefined();
  });

  it("differentiates indoor guidance with purifier vs no purifier during smog", () => {
    const snap = createMockSnapshot({ aqi: 180, category: "unhealthy" });

    const withPurifier = generateRecommendations(snap, { hasAirPurifier: true });
    const pRec = withPurifier.find((r) => r.category === "indoor");
    expect(pRec?.action).toContain("True HEPA");

    const withoutPurifier = generateRecommendations(snap, { hasAirPurifier: false });
    const noPRec = withoutPurifier.find((r) => r.category === "indoor");
    expect(noPRec?.action).toContain("clean-air sanctuary");
  });

  it("handles active commuter (walk_bike) during unhealthy air", () => {
    const snap = createMockSnapshot({ aqi: 165, category: "unhealthy" });
    const recs = generateRecommendations(snap, { commuteMethod: "walk_bike" });

    const commuteRec = recs.find((r) => r.category === "commute");
    expect(commuteRec?.action).toContain("electric public transit");
  });

  it("handles sensitive AQI band with moderate activity", () => {
    const snap = createMockSnapshot({ aqi: 120, category: "sensitive" });
    const recs = generateRecommendations(snap, { outdoorActivityLevel: "moderate" });

    const outdoorRec = recs.find((r) => r.category === "outdoor");
    expect(outdoorRec).toBeDefined();
  });

  it("generates anti-idling community guidance during low-wind stagnation", () => {
    const snap = createMockSnapshot({
      aqi: 170,
      weather: { temperature: 12, humidity: 80, windSpeed: 4, weatherCode: 71, conditionText: "Stagnant" },
    });
    const recs = generateRecommendations(snap, {});

    const stagRec = recs.find((r) => r.category === "sustainability");
    expect(stagRec?.action).toContain("Zero-idling pledge");
  });

  it("builds a full 4-part daily routine plan", () => {
    const snap = createMockSnapshot();
    const plan = buildDailyRoutinePlan(snap, { commuteMethod: "car_solo", hasAirPurifier: true });

    expect(plan.morning.length).toBeGreaterThanOrEqual(2);
    expect(plan.afternoon.length).toBeGreaterThanOrEqual(2);
    expect(plan.evening.length).toBeGreaterThanOrEqual(2);
    expect(plan.night.length).toBeGreaterThanOrEqual(2);
    expect(plan.summary).toContain("Personalized Clean-Air Routine");
  });
});
