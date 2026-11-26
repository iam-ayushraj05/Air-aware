import { EPA_PM25_BREAKPOINTS, EPA_PM10_BREAKPOINTS, US_AQI_CATEGORIES } from "./constants";
import { AQICategory, AQICategoryInfo, AQIStandard } from "./types";

/**
 * Calculates the US EPA sub-index for a single pollutant concentration using linear interpolation.
 * Equation: I = ((I_high - I_low) / (C_high - C_low)) * (C - C_low) + I_low
 *
 * @param concentration Raw pollutant concentration
 * @param breakpoints Breakpoint table
 * @returns AQI integer (0-500)
 */
export function calculateSubIndex(
  concentration: number,
  breakpoints: Array<{ cLow: number; cHigh: number; iLow: number; iHigh: number }>
): number {
  if (isNaN(concentration) || concentration < 0) {
    return 0;
  }

  // Cap at maximum known breakpoint
  const highest = breakpoints[breakpoints.length - 1];
  if (highest && concentration > highest.cHigh) {
    return 500;
  }

  for (const bp of breakpoints) {
    if (concentration >= bp.cLow && concentration <= bp.cHigh) {
      const aqi =
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (concentration - bp.cLow) + bp.iLow;
      return Math.round(aqi);
    }
  }

  return 0;
}

/**
 * Calculates US EPA AQI from PM2.5 (µg/m³).
 */
export function calculatePm25Aqi(pm25: number): number {
  if (isNaN(pm25) || pm25 <= 0) return 0;
  // Truncate to 1 decimal place as per EPA standard
  const truncated = Math.floor(pm25 * 10) / 10;
  return calculateSubIndex(truncated, EPA_PM25_BREAKPOINTS);
}

/**
 * Calculates US EPA AQI from PM10 (µg/m³).
 */
export function calculatePm10Aqi(pm10: number): number {
  if (isNaN(pm10) || pm10 <= 0) return 0;
  // Truncate to integer as per EPA standard
  const truncated = Math.floor(pm10);
  return calculateSubIndex(truncated, EPA_PM10_BREAKPOINTS);
}

/**
 * Maps any AQI value to its standard category key.
 * Guaranteed to return exactly one category for any number.
 */
export function getAQICategory(aqi: number): AQICategory {
  if (isNaN(aqi) || aqi <= 0) {
    return "good";
  }
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "sensitive";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "very_unhealthy";
  return "hazardous";
}

/**
 * Returns full metadata for a given AQI value and standard.
 */
export function getAQICategoryInfo(
  aqi: number,
  standard: AQIStandard = "US_AQI"
): AQICategoryInfo {
  const cat = getAQICategory(aqi);
  const info = US_AQI_CATEGORIES[cat];

  if (standard === "EU_AQI") {
    // European scale representation
    return {
      ...info,
      label:
        cat === "good"
          ? "Good (EU)"
          : cat === "moderate"
          ? "Fair (EU)"
          : cat === "sensitive"
          ? "Moderate (EU)"
          : cat === "unhealthy"
          ? "Poor (EU)"
          : "Very Poor (EU)",
    };
  }

  return info;
}

/**
 * Assesses whether winter smog conditions are present based on AQI, particulate levels,
 * low wind speed, and low surface temperature (thermal inversion indicator).
 */
export function checkWinterSmogConditions(params: {
  aqi: number;
  pm25: number;
  windSpeedKmH: number;
  temperatureC: number;
}): {
  isActive: boolean;
  severity: "none" | "moderate" | "severe";
  inversionLikely: boolean;
  stagnationReason: string;
} {
  const { aqi, pm25, windSpeedKmH, temperatureC } = params;

  // Stagnant cold air: low wind (< 12 km/h) and low temperature (< 16°C)
  const isStagnant = windSpeedKmH <= 12;
  const isCold = temperatureC <= 16;
  const isElevated = aqi >= 130 || pm25 >= 55;

  const inversionLikely = isStagnant && isCold && isElevated;

  if (inversionLikely && (aqi >= 200 || pm25 >= 120)) {
    return {
      isActive: true,
      severity: "severe",
      inversionLikely: true,
      stagnationReason:
        "Cold dense surface air trapped beneath a warmer layer (temperature inversion) combined with near-zero surface wind prevents vertical dispersion of fine particulates.",
    };
  }

  if (inversionLikely || (isElevated && isStagnant)) {
    return {
      isActive: true,
      severity: "moderate",
      inversionLikely,
      stagnationReason:
        "Low wind velocity creates atmospheric stagnation, allowing traffic emissions and domestic heating particulates to accumulate near ground level.",
    };
  }

  return {
    isActive: false,
    severity: "none",
    inversionLikely: false,
    stagnationReason:
      "Atmospheric conditions allow normal air mixing and particulate dispersion.",
  };
}
