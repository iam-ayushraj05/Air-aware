import { Lightbulb } from "lucide-react";

interface ChatPromptPillsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
}

/**
 * Interactive quick prompt chips for common clean-air inquiries.
 */
export function ChatPromptPills({ prompts, onSelectPrompt }: ChatPromptPillsProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
      <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 ml-1" aria-hidden="true" />
      <span className="text-slate-500 shrink-0 text-[11px] font-semibold">Suggested:</span>
      {prompts.map((prompt, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelectPrompt(prompt)}
          className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-[11px] text-slate-700 dark:text-slate-300 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
