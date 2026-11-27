"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { CheckSquare, Square, HeartHandshake } from "lucide-react";
import { clsx } from "clsx";

interface ChecklistItem {
  id: string;
  target: "children" | "elderly" | "household";
  title: string;
  description: string;
}

const DEFAULT_FAMILY_CHECKLIST: ChecklistItem[] = [
  {
    id: "fam-1",
    target: "children",
    title: "Relocate outdoor recess & school sports indoors",
    description:
      "Young lungs inhale more air per pound of body weight, accelerating fine particle deposition.",
  },
  {
    id: "fam-2",
    target: "elderly",
    title: "Verify rescue inhalers / cardiovascular medications are accessible",
    description:
      "PM2.5 exposure triggers systemic inflammation and vascular constriction within hours.",
  },
  {
    id: "fam-3",
    target: "children",
    title: "Ensure well-fitted pediatric N95 / KF94 respirators for transit",
    description: "Cloth masks provide under 20% filtration efficiency against sub-micron PM2.5.",
  },
  {
    id: "fam-4",
    target: "household",
    title: "Seal bedroom window cracks with weatherstripping tape",
    description: "Prevents nocturnal draft infiltration into sleeping areas.",
  },
  {
    id: "fam-5",
    target: "household",
    title: "Operate True HEPA air cleaner continuously on whisper mode",
    description: "Maintains a clean air sanctuary in the primary family living area.",
  },
];

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
        {DEFAULT_FAMILY_CHECKLIST.map((item) => {
          const isDone = !!completed[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={clsx(
                "w-full text-left p-3 rounded-xl border transition-colors flex items-start gap-3 min-h-[44px]",
                isDone
                  ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
              )}
              aria-pressed={isDone}
            >
              {isDone ? (
                <CheckSquare
                  className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <Square className="w-5 h-5 text-slate-300 mt-0.5 shrink-0" aria-hidden="true" />
              )}

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "text-xs font-semibold",
                      isDone ? "line-through text-slate-500" : "text-slate-900 dark:text-white"
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase font-bold">
                    {item.target}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
