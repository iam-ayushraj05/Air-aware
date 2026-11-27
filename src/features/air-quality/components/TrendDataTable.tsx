import { HourlyForecastItem } from "@/lib/types";

interface TrendDataTableProps {
  items: HourlyForecastItem[];
}

/**
 * Accessible tabular representation of the 24-hour pollutant forecast.
 */
export function TrendDataTable({ items }: TrendDataTableProps) {
  return (
    <div id="trend-data-table" className="overflow-x-auto max-h-64">
      <table
        className="w-full text-xs text-left text-slate-700 dark:text-slate-300 border-collapse"
        aria-describedby="trend-chart-desc"
      >
        <caption className="sr-only">24-hour hourly AQI and PM2.5 forecast</caption>
        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-semibold">
          <tr>
            <th scope="col" className="p-2 border">
              Hour
            </th>
            <th scope="col" className="p-2 border">
              AQI
            </th>
            <th scope="col" className="p-2 border">
              PM2.5 (µg/m³)
            </th>
            <th scope="col" className="p-2 border">
              PM10 (µg/m³)
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
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
  );
}
