export interface HotspotCityConfig {
  name: string;
  country: string;
  lat: number;
  lon: number;
  context: string;
}

export interface HotspotResultItem {
  snapshot: import("@/lib/types").AirQualitySnapshot;
  isError: boolean;
}

export const HOTSPOT_CITIES: HotspotCityConfig[] = [
  {
    name: "New Delhi",
    country: "India",
    lat: 28.61,
    lon: 77.21,
    context: "Winter Stagnation Season",
  },
  {
    name: "London",
    country: "United Kingdom",
    lat: 51.51,
    lon: -0.13,
    context: "Maritime Atlantic Flow",
  },
  {
    name: "New York",
    country: "United States",
    lat: 40.71,
    lon: -74.01,
    context: "Urban Corridor",
  },
];
