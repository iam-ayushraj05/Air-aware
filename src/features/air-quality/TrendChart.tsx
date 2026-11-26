"use client";

import React, { useState } from "react";
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
import { Card } from "@/components/ui/Card";
import { Table, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TrendChartProps {
  data: HourlyForecastItem[];
}

export function TrendChart({ data }: TrendChartProps) {
  const [showTable, setShowTable] = useState(false);

  // Compute peak and average for screen reader text summary
  const validItems = data.filter((d) => d && typeof d.aqi === "number");
  const aqiValues = validItems.map((d) => d.aqi);
  const maxAqi = Math.max(...aqiValues, 0);
  const minAqi = Math.min(...aqiValues, 0);
  const avgAqi = Math.round(
    aqiValues.reduce((acc, v) => acc + v, 0) / (aqiValues.length || 1)
  );

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div>
          <h3
            id="trend-chart-title"
            className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200"
          >
            24-Hour Pollution & AQI Forecast Trend
          </h3>
          <p
            id="trend-chart-desc"
            className="text-xs text-slate-500 mt-0.5"
          >
            Projected AQI trajectory across today and tomorrow. Peak AQI is {maxAqi}, minimum is {minAqi}, average is {avgAqi}.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTable(!showTable)}
          className="text-xs flex items-center gap-1.5 self-start sm:self-auto"
          aria-expanded={showTable}
          aria-controls="trend-data-table"
        >
          {showTable ? (
            <>
              <BarChart2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Show Chart</span>
            </>
          ) : (
            <>
              <Table className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View Data Table</span>
            </>
          )}
        </Button>
      </div>

      {showTable ? (
        <div id="trend-data-table" className="overflow-x-auto max-h-64">
          <table
            className="w-full text-xs text-left text-slate-700 dark:text-slate-300 border-collapse"
            aria-describedby="trend-chart-desc"
          >
            <caption className="sr-only">24-hour hourly AQI and PM2.5 forecast</caption>
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-semibold">
              <tr>
                <th scope="col" className="p-2 border">Hour</th>
                <th scope="col" className="p-2 border">AQI</th>
                <th scope="col" className="p-2 border">PM2.5 (µg/m³)</th>
                <th scope="col" className="p-2 border">PM10 (µg/m³)</th>
              </tr>
            </thead>
            <tbody>
              {validItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2 border font-medium">{item.time}</td>
                  <td className="p-2 border">{item.aqi}</td>
                  <td className="p-2 border">{item.pm2_5}</td>
                  <td className="p-2 border">{item.pm10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="h-64 w-full"
          aria-describedby="trend-chart-desc"
          role="img"
          aria-label={`24-hour AQI graph showing values from ${minAqi} to ${maxAqi}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={validItems} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} interval={3} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={[0, "auto"]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0]?.payload as HourlyForecastItem;
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1">
                        <div className="font-bold">{d.time}</div>
                        <div>AQI: <span className="font-semibold text-emerald-400">{d.aqi}</span></div>
                        <div>PM2.5: {d.pm2_5} µg/m³</div>
                        <div>PM10: {d.pm10} µg/m³</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
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
      )}
    </Card>
  );
}
