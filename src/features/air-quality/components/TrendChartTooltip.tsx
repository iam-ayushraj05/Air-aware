import { HourlyForecastItem } from "@/lib/types";

interface TrendChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: HourlyForecastItem }>;
}

/**
 * Custom accessible tooltip rendering hourly PM2.5, PM10, and AQI projection values.
 */
export function TrendChartTooltip({ active, payload }: TrendChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1">
      <div className="font-bold">{item.time}</div>
      <div>
        AQI: <span className="font-semibold text-emerald-400">{item.aqi}</span>
      </div>
      <div>PM2.5: {item.pm2_5} µg/m³</div>
      <div>PM10: {item.pm10} µg/m³</div>
    </div>
  );
}
