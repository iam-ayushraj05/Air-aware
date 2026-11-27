export interface OpenMeteoAQResponse {
  current?: {
    pm2_5?: number;
    pm10?: number;
    nitrogen_dioxide?: number;
    ozone?: number;
    sulphur_dioxide?: number;
    carbon_monoxide?: number;
    us_aqi?: number;
    european_aqi?: number;
  };
  hourly?: {
    time: string[];
    pm2_5?: number[];
    pm10?: number[];
    us_aqi?: number[];
    nitrogen_dioxide?: number[];
    ozone?: number[];
  };
}

export interface OpenMeteoWeatherResponse {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    weather_code?: number;
  };
}

export interface OpenMeteoGeocodingResponse {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
  }>;
}
