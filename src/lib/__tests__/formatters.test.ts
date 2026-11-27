import { describe, it, expect } from "vitest";
import { formatTimeOnly, formatHumanDate, formatPercentage, formatMetric } from "../formatters";

describe("formatters library", () => {
  it("formats time correctly or returns empty string on invalid/empty input", () => {
    expect(formatTimeOnly(undefined)).toBe("");
    expect(formatTimeOnly("invalid-date")).toBe("");
    const valid = formatTimeOnly("2026-11-27T10:30:00Z");
    expect(valid).toBeTruthy();
  });

  it("formats human-readable date or handles invalid dates", () => {
    const formatted = formatHumanDate(new Date(2026, 10, 27));
    expect(formatted).toContain("2026");
    expect(formatHumanDate("invalid-date")).toBe("");
  });

  it("formats percentages correctly", () => {
    expect(formatPercentage(0.85)).toBe("85%");
    expect(formatPercentage(0.1234)).toBe("12%");
  });

  it("formats metric numbers with units", () => {
    expect(formatMetric(42.345, "µg/m³", 1)).toBe("42.3 µg/m³");
    expect(formatMetric(100, "ppm", 0)).toBe("100 ppm");
  });
});
