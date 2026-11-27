/**
 * Standard formatting helpers for timestamps, percentages, and pollutant units.
 * Eliminates duplicate inline toLocaleString / toLocaleTimeString formatting calls.
 */

/**
 * Formats an ISO date string into a localized time string (e.g., "10:30 AM").
 *
 * @param dateStr ISO date string or undefined
 * @returns Localized time string or empty string
 */
export function formatTimeOnly(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

/**
 * Formats an ISO date or Date instance into a user-friendly human date.
 * (e.g., "Wednesday, Nov 27, 2026")
 *
 * @param date Date instance or ISO string
 * @returns Formatted date string
 */
export function formatHumanDate(date: Date | string = new Date()): string {
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  } catch {
    return "";
  }
}

/**
 * Formats a decimal number into a rounded percentage string (e.g. 0.85 -> "85%").
 *
 * @param decimal Value between 0 and 1
 * @returns Percentage string
 */
export function formatPercentage(decimal: number): string {
  const clamped = Math.max(0, Math.min(1, decimal));
  return `${Math.round(clamped * 100)}%`;
}

/**
 * Formats a metric value with its unit and optional decimal precision.
 *
 * @param val Numeric value
 * @param unit Unit label (e.g. "µg/m³", "kg")
 * @param decimals Number of decimal digits (default 1)
 * @returns String representation
 */
export function formatMetric(val: number, unit: string, decimals = 1): string {
  const rounded = Number(val.toFixed(decimals));
  return `${rounded} ${unit}`;
}
