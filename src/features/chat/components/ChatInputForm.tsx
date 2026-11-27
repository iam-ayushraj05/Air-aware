import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSubmit: (text: string) => void;
}

/**
 * Text entry form for querying the AI assistant.
 */
export function ChatInputForm({ input, setInput, isLoading, onSubmit }: ChatInputFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input);
      }}
      className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AirAware about jogging, kids' recess, indoor tips, commute..."
        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 min-h-[44px]"
        aria-label="Ask AirAware assistant a question"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="px-4 min-h-[44px]"
        aria-label="Send message"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
