import { CheckSquare, Square } from "lucide-react";
import { clsx } from "clsx";
import { FamilyChecklistItemModel } from "../lib/familyChecklistData";

interface FamilyChecklistItemProps {
  item: FamilyChecklistItemModel;
  isDone: boolean;
  onToggle: (id: string) => void;
}

/**
 * Individual checklist button showing item title, demographic target, and rationale.
 */
export function FamilyChecklistItem({ item, isDone, onToggle }: FamilyChecklistItemProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      className={clsx(
        "w-full text-left p-3 rounded-xl border transition-colors flex items-start gap-3 min-h-[44px]",
        isDone
          ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
      )}
      aria-pressed={isDone}
    >
      {isDone ? (
        <CheckSquare className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
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
}
