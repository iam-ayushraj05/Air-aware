"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { HeartHandshake } from "lucide-react";
import { DEFAULT_FAMILY_CHECKLIST } from "./lib/familyChecklistData";
import { FamilyChecklistItem } from "./components/FamilyChecklistItem";

/**
 * Interactive family vulnerability protection checklist with persistent toggle states.
 */
export function FamilyChecklist() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    "fam-1": false,
    "fam-2": true,
    "fam-3": false,
    "fam-4": false,
    "fam-5": true,
  });

  const toggleItem = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <Card>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Family Protection Checklist</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Safeguards for children, elderly parents, and sensitive individuals
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          {completedCount} / {DEFAULT_FAMILY_CHECKLIST.length} completed
        </span>
      </div>

      <div className="space-y-2.5">
        {DEFAULT_FAMILY_CHECKLIST.map((item) => (
          <FamilyChecklistItem
            key={item.id}
            item={item}
            isDone={!!completed[item.id]}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </Card>
  );
}
