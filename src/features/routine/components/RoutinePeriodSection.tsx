import { LucideIcon } from "lucide-react";
import { StructuredRecommendation } from "@/lib/types";
import { RecommendationCard } from "@/features/air-quality/RecommendationCard";

interface RoutinePeriodSectionProps {
  title: string;
  time: string;
  icon: LucideIcon;
  color: string;
  items: StructuredRecommendation[];
  onToggleComplete: (id: string) => void;
}

/**
 * Time-block card group (Morning, Afternoon, Evening, Night) containing actions.
 */
export function RoutinePeriodSection({
  title,
  time,
  icon: Icon,
  color,
  items,
  onToggleComplete,
}: RoutinePeriodSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
          <span className="text-xs text-slate-500">{time}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <RecommendationCard
            key={item.id}
            recommendation={item}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
