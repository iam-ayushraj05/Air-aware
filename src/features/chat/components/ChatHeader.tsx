import { AirQualitySnapshot } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Bot, Trash2 } from "lucide-react";

interface ChatHeaderProps {
  airQuality: AirQualitySnapshot;
  onClear: () => void;
}

/**
 * Top header component displaying AI ground truth badges and clear action.
 */
export function ChatHeader({ airQuality, onClear }: ChatHeaderProps) {
  return (
    <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
          <Bot className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            AirAware AI Assistant
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 text-emerald-200">
              Ground-Truth Aware
            </span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Context: {airQuality.location.name} • AQI {airQuality.aqi} • PM2.5{" "}
            {airQuality.pollutants.pm2_5.value} µg/m³
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1"
        aria-label="Clear chat conversation"
      >
        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Clear Chat</span>
      </Button>
    </div>
  );
}
