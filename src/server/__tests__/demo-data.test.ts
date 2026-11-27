import { describe, it, expect } from "vitest";
import { getFallbackDemoData } from "../demo-data";

describe("Demo Air Quality Fallback Generator", () => {
  it("generates London demo snapshot when city is London", () => {
    const data = getFallbackDemoData("London", 51.5074, -0.1278);
    expect(data.location.name).toBe("London");
    expect(data.dataSource).toBe("demo");
    expect(data.aqi).toBeGreaterThan(0);
    expect(data.pollutants.pm2_5.value).toBeGreaterThan(0);
  });

  it("generates New York demo snapshot when city is NYC / New York", () => {
    const data = getFallbackDemoData("New York", 40.7128, -74.006);
    expect(data.location.name).toBe("New York");
    expect(data.dataSource).toBe("demo");
    expect(data.aqi).toBeGreaterThan(0);

    const nycData = getFallbackDemoData("NYC", 40.7128, -74.006);
    expect(nycData.dataSource).toBe("demo");
  });

  it("generates default New Delhi baseline for other unknown cities", () => {
    const data = getFallbackDemoData("Tokyo", 35.6762, 139.6503);
    expect(data.location.name).toBe("Tokyo");
    expect(data.dataSource).toBe("demo");
    expect(data.aqi).toBeGreaterThan(0);
  });
});
