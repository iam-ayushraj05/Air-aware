export function isWinterInversionRisk(tempC: number, windSpeedKmH: number): boolean {
  return tempC < 16 && windSpeedKmH < 12;
}
