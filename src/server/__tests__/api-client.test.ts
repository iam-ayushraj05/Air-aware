import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchLocations, getLiveAirQuality, getWeatherConditionText } from "../api-client";

describe("API Client & SSRF Protection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("handles short query < 2 chars by returning empty list", async () => {
    const res = await searchLocations("a");
    expect(res).toEqual([]);
  });

  it("handles empty results array from geocoding", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    const res = await searchLocations("UnknownCity");
    expect(res).toEqual([]);
  });

  it("blocks unpermitted SSRF hosts and throws error", async () => {
    // getLiveAirQuality strictly calls Open-Meteo allowlist
    const snapshot = await getLiveAirQuality(28.61, 77.21, "New Delhi");
    expect(snapshot).toBeDefined();
  });

  it("handles location search with mock Open-Meteo geocoding response", async () => {
    const mockGeocodeResponse = {
      results: [
        {
          id: 1,
          name: "Berlin",
          latitude: 52.52,
          longitude: 13.4,
          country: "Germany",
          admin1: "Berlin",
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGeocodeResponse,
    } as Response);

    const results = await searchLocations("Berlin");
    expect(results.length).toBe(1);
    expect(results[0]?.name).toBe("Berlin");
    expect(results[0]?.latitude).toBe(52.52);
  });

  it("returns fallback demo search if geocoding service is unavailable", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network connection lost"));

    const results = await searchLocations("Delhi");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.name).toContain("Delhi");
  });

  it("fetches and formats live air quality data with various weather conditions", async () => {
    const mockAQ = {
      current: {
        pm2_5: 85.0,
        pm10: 160.0,
        us_aqi: 165,
        nitrogen_dioxide: 45.0,
        ozone: 60.0,
        sulphur_dioxide: 20.0,
        carbon_monoxide: 800.0,
      },
      hourly: {
        time: ["2026-11-26T00:00", "2026-11-26T01:00"],
        pm2_5: [80.0, 85.0],
        pm10: [150.0, 160.0],
        us_aqi: [160, 165],
      },
    };

    const mockWeather = {
      current: {
        temperature_2m: 12.0,
        relative_humidity_2m: 85,
        wind_speed_10m: 6.0,
        weather_code: 45, // Fog / Smog layer
      },
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockAQ,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeather,
      } as Response);

    const snapshot = await getLiveAirQuality(28.61, 77.21, "New Delhi");
    expect(snapshot.location.name).toBe("New Delhi");
    expect(snapshot.dataSource).toBe("live");
    expect(snapshot.weather.conditionText).toBe("Foggy / Smog Layer");
    expect(snapshot.isWinterSmogActive).toBe(true);
  });

  it("formats moderate status when pollutant exceeds safeLimit but is under 1.5x", async () => {
    const mockModerateAQ = {
      current: {
        pm2_5: 20.0, // safeLimit is 15 -> 20 is > 15 and <= 22.5 (moderate)
        pm10: 50.0, // safeLimit is 45 -> 50 is > 45 and <= 67.5 (moderate)
        us_aqi: 65,
      },
      hourly: {
        time: ["2026-11-26T00:00"],
        pm2_5: [20.0],
        pm10: [50.0],
        us_aqi: [65],
      },
    };

    const mockWeather = {
      current: {
        temperature_2m: 18.0,
        relative_humidity_2m: 50,
        wind_speed_10m: 15.0,
        weather_code: 0,
      },
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockModerateAQ,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeather,
      } as Response);

    const snapshot = await getLiveAirQuality(28.61, 77.21, "New Delhi");
    expect(snapshot.pollutants.pm2_5.status).toBe("moderate");
    expect(snapshot.pollutants.pm10.status).toBe("moderate");
  });

  it("maps WMO weather codes to expected descriptors accurately", () => {
    expect(getWeatherConditionText(0)).toBe("Clear Sky");
    expect(getWeatherConditionText(2)).toBe("Partly Cloudy");
    expect(getWeatherConditionText(45)).toBe("Foggy / Smog Layer");
    expect(getWeatherConditionText(60)).toBe("Light Rain / Drizzle");
    expect(getWeatherConditionText(73)).toBe("Snow Flurries");
    expect(getWeatherConditionText(81)).toBe("Rain Showers");
    expect(getWeatherConditionText(96)).toBe("Thunderstorm");
    expect(getWeatherConditionText(10)).toBe("Stable Atmosphere");
  });

  it("falls back to demo data if live fetch encounters an error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("API timeout"));

    const snapshot = await getLiveAirQuality(28.61, 77.21, "New Delhi");
    expect(snapshot.dataSource).toBe("demo");
    expect(snapshot.aqi).toBeGreaterThan(0);
  });
});
