import {
  calculatePm25Aqi,
  calculatePm10Aqi,
  checkWinterSmogConditions,
  getAQICategory,
} from "@/lib/aqi";
import { AirQualitySnapshot, HourlyForecastItem, LocationInfo, PollutantDetail } from "@/lib/types";
import { getFallbackDemoData } from "./demo-data";
import { logger } from "@/lib/logger";

import { resilientFetch } from "./http-client";

export { assertSafeUrl } from "./http-client";

import {
  OpenMeteoAQResponse,
  OpenMeteoWeatherResponse,
  OpenMeteoGeocodingResponse,
} from "./open-meteo-types";

/**
 * Converts WMO atmospheric weather codes to human-readable descriptors.
 *
 * @param code WMO weather numeric code
 * @returns Standard atmospheric description
 */
export function getWeatherConditionText(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy / Smog Layer";
  if (code >= 51 && code <= 67) return "Light Rain / Drizzle";
  if (code >= 71 && code <= 77) return "Snow Flurries";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 95) return "Thunderstorm";
  return "Stable Atmosphere";
}

/**
 * Searches for global locations using Open-Meteo Geocoding API with 24-hr cache.
 *
 * @param query Search string
 * @returns List of geocoded locations matching query
 */
export async function searchLocations(query: string): Promise<LocationInfo[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=5&language=en&format=json`;

  try {
    const data = await resilientFetch<OpenMeteoGeocodingResponse>(url, 86400);
    if (!data.results || data.results.length === 0) return [];

    return data.results.map((r) => ({
      name: r.name,
      country: r.country,
      admin1: r.admin1,
      latitude: r.latitude,
      longitude: r.longitude,
    }));
  } catch (err) {
    logger.warn("Geocoding API unavailable, using fallback search:", err);
    const lower = trimmed.toLowerCase();
    const demoMatches: LocationInfo[] = [
      { name: "New Delhi", country: "India", latitude: 28.61, longitude: 77.21 },
      { name: "London", country: "United Kingdom", latitude: 51.51, longitude: -0.13 },
      { name: "New York", country: "United States", latitude: 40.71, longitude: -74.01 },
      { name: "Beijing", country: "China", latitude: 39.9, longitude: 116.4 },
      { name: "Los Angeles", country: "United States", latitude: 34.05, longitude: -118.24 },
    ].filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        (c.country && c.country.toLowerCase().includes(lower))
    );
    return demoMatches;
  }
}

/**
 * Formats individual pollutant readings with safety status tiers.
 */
function createPollutantDetail(
  val: number | undefined,
  label: string,
  unit: string,
  safeLimit: number
): PollutantDetail {
  const v = val ?? 0;
  let status: "good" | "moderate" | "unhealthy" | "severe" = "good";
  if (v > safeLimit * 3) status = "severe";
  else if (v > safeLimit * 1.5) status = "unhealthy";
  else if (v > safeLimit) status = "moderate";

  return {
    value: Math.round(v * 10) / 10,
    label,
    unit,
    safeLimit,
    status,
  };
}

/**
 * Maps raw Open-Meteo hourly response to 24-hour forecast array.
 */
function extractHourlyForecast(aqData: OpenMeteoAQResponse): HourlyForecastItem[] {
  const hourlyItems: HourlyForecastItem[] = [];
  if (!aqData.hourly || !aqData.hourly.time) return hourlyItems;

  const limit = Math.min(24, aqData.hourly.time.length);
  for (let i = 0; i < limit; i++) {
    const timeStr = aqData.hourly.time[i] ?? "";
    const formattedHour = timeStr.includes("T")
      ? (timeStr.split("T")[1]?.slice(0, 5) ?? timeStr)
      : timeStr;
    const hPm25 = aqData.hourly.pm2_5?.[i] ?? 10;
    const hAqi = aqData.hourly.us_aqi?.[i] ?? calculatePm25Aqi(hPm25);

    hourlyItems.push({
      time: formattedHour,
      aqi: hAqi,
      pm2_5: hPm25,
      pm10: aqData.hourly.pm10?.[i] ?? 20,
      no2: aqData.hourly.nitrogen_dioxide?.[i],
      ozone: aqData.hourly.ozone?.[i],
    });
  }
  return hourlyItems;
}

/**
 * Normalizes Open-Meteo current air quality and weather responses into an AirQualitySnapshot.
 */
function mapOpenMeteoToSnapshot(
  lat: number,
  lon: number,
  locationName: string,
  aqData: OpenMeteoAQResponse,
  weatherData: OpenMeteoWeatherResponse
): AirQualitySnapshot {
  const currentAQ = aqData.current;
  const currentW = weatherData.current;

  const pm25Val = currentAQ?.pm2_5 ?? 15;
  const pm10Val = currentAQ?.pm10 ?? 30;
  const computedAqi =
    currentAQ?.us_aqi ?? Math.max(calculatePm25Aqi(pm25Val), calculatePm10Aqi(pm10Val));
  const category = getAQICategory(computedAqi);

  const tempC = currentW?.temperature_2m ?? 18;
  const windKmH = currentW?.wind_speed_10m ?? 12;
  const humidity = currentW?.relative_humidity_2m ?? 50;
  const wCode = currentW?.weather_code ?? 0;

  const winterSmog = checkWinterSmogConditions({
    aqi: computedAqi,
    pm25: pm25Val,
    windSpeedKmH: windKmH,
    temperatureC: tempC,
  });

  const hourly = extractHourlyForecast(aqData);

  return {
    aqi: computedAqi,
    category,
    standard: "US_AQI",
    pollutants: {
      pm2_5: createPollutantDetail(currentAQ?.pm2_5, "PM2.5", "µg/m³", 15.0),
      pm10: createPollutantDetail(currentAQ?.pm10, "PM10", "µg/m³", 45.0),
      no2: createPollutantDetail(
        currentAQ?.nitrogen_dioxide,
        "Nitrogen Dioxide (NO2)",
        "µg/m³",
        25.0
      ),
      ozone: createPollutantDetail(currentAQ?.ozone, "Ozone (O3)", "µg/m³", 100.0),
      so2: createPollutantDetail(
        currentAQ?.sulphur_dioxide,
        "Sulphur Dioxide (SO2)",
        "µg/m³",
        40.0
      ),
      co: createPollutantDetail(
        currentAQ?.carbon_monoxide,
        "Carbon Monoxide (CO)",
        "µg/m³",
        4000.0
      ),
    },
    weather: {
      temperature: tempC,
      humidity,
      windSpeed: windKmH,
      windDirection: currentW?.wind_direction_10m,
      weatherCode: wCode,
      conditionText: getWeatherConditionText(wCode),
      isTemperatureInversionLikely: winterSmog.inversionLikely,
    },
    hourly: hourly.length > 0 ? hourly : getFallbackDemoData().hourly,
    location: { name: locationName, latitude: lat, longitude: lon },
    dataSource: "live",
    updatedAt: new Date().toISOString(),
    isWinterSmogActive: winterSmog.isActive,
  };
}

/**
 * Fetches combined real-time Air Quality and Weather data from Open-Meteo.
 * Degrades gracefully to marked DEMO data if network or service is unreachable.
 *
 * @param lat Latitude coordinates
 * @param lon Longitude coordinates
 * @param locationName Display name of the city
 * @returns AirQualitySnapshot with live or fallback data
 */
export async function getLiveAirQuality(
  lat: number,
  lon: number,
  locationName: string = "Current Location"
): Promise<AirQualitySnapshot> {
  const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=pm10,pm2_5,us_aqi,nitrogen_dioxide,ozone&forecast_days=2`;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m`;

  try {
    const [aqData, weatherData] = await Promise.all([
      resilientFetch<OpenMeteoAQResponse>(aqUrl, 900),
      resilientFetch<OpenMeteoWeatherResponse>(weatherUrl, 900),
    ]);
    return mapOpenMeteoToSnapshot(lat, lon, locationName, aqData, weatherData);
  } catch (error) {
    logger.warn("Real-time Open-Meteo request failed, using clearly marked DEMO fallback:", error);
    return getFallbackDemoData(locationName, lat, lon);
  }
}
