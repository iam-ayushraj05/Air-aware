import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { HourlyForecastItem } from "@/lib/types";
import { TrendChartTooltip } from "./TrendChartTooltip";

interface TrendChartVisualProps {
  items: HourlyForecastItem[];
  minAqi: number;
  maxAqi: number;
}

/**
 * Recharts area visualization of 24-hour diurnal air pollution trend.
 */
export function TrendChartVisual({ items, minAqi, maxAqi }: TrendChartVisualProps) {
  return (
    <div
      className="h-64 w-full"
      aria-describedby="trend-chart-desc"
      role="img"
      aria-label={`24-hour AQI graph showing values from ${minAqi} to ${maxAqi}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={items} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} interval={3} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={[0, "auto"]} />
          <Tooltip content={<TrendChartTooltip />} />
          <Area
            type="monotone"
            dataKey="aqi"
            stroke="#15803d"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#aqiGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
