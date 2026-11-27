import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  calculatePm25Aqi,
  calculatePm10Aqi,
  getAQICategory,
  getAQICategoryInfo,
  checkWinterSmogConditions,
} from "../aqi";

describe("AQI Calculation & Categorization", () => {
  it("computes PM2.5 AQI accurately across EPA breakpoints", () => {
    expect(calculatePm25Aqi(0)).toBe(0);
    expect(calculatePm25Aqi(4.5)).toBeGreaterThanOrEqual(20);
    expect(calculatePm25Aqi(9.0)).toBe(50);
    expect(calculatePm25Aqi(35.4)).toBe(100);
    expect(calculatePm25Aqi(55.4)).toBe(150);
    expect(calculatePm25Aqi(125.4)).toBe(200);
    expect(calculatePm25Aqi(225.4)).toBe(300);
    expect(calculatePm25Aqi(600)).toBe(500); // capped
  });

  it("handles negative and NaN inputs safely", () => {
    expect(calculatePm25Aqi(-15)).toBe(0);
    expect(calculatePm25Aqi(NaN)).toBe(0);
    expect(calculatePm10Aqi(-50)).toBe(0);
    expect(calculatePm10Aqi(NaN)).toBe(0);
  });

  it("evaluates boundary AQI values correctly", () => {
    // 0, 50, 51, 100, 101, 150, 151, 200, 201, 300, 301
    expect(getAQICategory(0)).toBe("good");
    expect(getAQICategory(50)).toBe("good");
    expect(getAQICategory(51)).toBe("moderate");
    expect(getAQICategory(100)).toBe("moderate");
    expect(getAQICategory(101)).toBe("sensitive");
    expect(getAQICategory(150)).toBe("sensitive");
    expect(getAQICategory(151)).toBe("unhealthy");
    expect(getAQICategory(200)).toBe("unhealthy");
    expect(getAQICategory(201)).toBe("very_unhealthy");
    expect(getAQICategory(300)).toBe("very_unhealthy");
    expect(getAQICategory(301)).toBe("hazardous");
    expect(getAQICategory(500)).toBe("hazardous");
    expect(getAQICategory(999)).toBe("hazardous");
    expect(getAQICategory(-1)).toBe("good");
    expect(getAQICategory(NaN)).toBe("good");
  });

  it("property test: every integer 0-500 maps to exactly one category", () => {
    const validCategories = new Set([
      "good",
      "moderate",
      "sensitive",
      "unhealthy",
      "very_unhealthy",
      "hazardous",
    ]);

    fc.assert(
      fc.property(fc.integer({ min: 0, max: 500 }), (aqi) => {
        const cat = getAQICategory(aqi);
        return validCategories.has(cat);
      })
    );
  });

  it("property test: AQI categories are strictly monotonic", () => {
    const rank: Record<string, number> = {
      good: 1,
      moderate: 2,
      sensitive: 3,
      unhealthy: 4,
      very_unhealthy: 5,
      hazardous: 6,
    };

    fc.assert(
      fc.property(fc.integer({ min: 0, max: 500 }), fc.integer({ min: 0, max: 500 }), (a, b) => {
        const catA = getAQICategory(a);
        const catB = getAQICategory(b);
        if (a <= b) {
          return (rank[catA] ?? 0) <= (rank[catB] ?? 0);
        } else {
          return (rank[catA] ?? 0) >= (rank[catB] ?? 0);
        }
      })
    );
  });

  it("provides full metadata for US and EU standards", () => {
    const usInfo = getAQICategoryInfo(45, "US_AQI");
    expect(usInfo.key).toBe("good");
    expect(usInfo.label).toBe("Good");

    const euInfo = getAQICategoryInfo(45, "EU_AQI");
    expect(euInfo.label).toBe("Good (EU)");
  });

  it("accurately detects winter smog and thermal inversion conditions", () => {
    const severeInversion = checkWinterSmogConditions({
      aqi: 220,
      pm25: 140,
      windSpeedKmH: 5,
      temperatureC: 11,
    });
    expect(severeInversion.isActive).toBe(true);
    expect(severeInversion.severity).toBe("severe");
    expect(severeInversion.inversionLikely).toBe(true);

    const cleanWindyDay = checkWinterSmogConditions({
      aqi: 40,
      pm25: 10,
      windSpeedKmH: 22,
      temperatureC: 22,
    });
    expect(cleanWindyDay.isActive).toBe(false);
    expect(cleanWindyDay.severity).toBe("none");
  });
});
