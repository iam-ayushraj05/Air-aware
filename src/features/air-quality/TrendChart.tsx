"use client";

import { useState } from "react";
import { HourlyForecastItem } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Table, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrendDataTable } from "./components/TrendDataTable";
import { TrendChartVisual } from "./components/TrendChartVisual";

interface TrendChartProps {
  data: HourlyForecastItem[];
}

/**
 * Visual 24-hour pollution trajectory chart with interactive accessible tabular toggle.
 */
export function TrendChart({ data }: TrendChartProps) {
  const [showTable, setShowTable] = useState(false);

  const validItems = data.filter((d) => d && typeof d.aqi === "number");
  const aqiValues = validItems.map((d) => d.aqi);
  const maxAqi = Math.max(...aqiValues, 0);
  const minAqi = Math.min(...aqiValues, 0);
  const avgAqi = Math.round(aqiValues.reduce((acc, v) => acc + v, 0) / (aqiValues.length || 1));

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
          <p id="trend-chart-desc" className="text-xs text-slate-500 mt-0.5">
            Projected AQI trajectory across today and tomorrow. Peak AQI is {maxAqi}, minimum is{" "}
            {minAqi}, average is {avgAqi}.
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
        <TrendDataTable items={validItems} />
      ) : (
        <TrendChartVisual items={validItems} minAqi={minAqi} maxAqi={maxAqi} />
      )}
    </Card>
  );
}
