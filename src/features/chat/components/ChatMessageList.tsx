import { RefObject } from "react";
import { Bot, User } from "lucide-react";
import { clsx } from "clsx";
import { ChatMessage } from "../types";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

/**
 * Scrollable list of chat message bubbles with action cards and loading indicator.
 */
export function ChatMessageList({ messages, isLoading, messagesEndRef }: ChatMessageListProps) {
  return (
    <div
      className="flex-1 p-4 overflow-y-auto space-y-4"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {messages.map((msg) => {
        const isUser = msg.sender === "user";
        return (
          <div
            key={msg.id}
            className={clsx(
              "flex gap-3 max-w-[85%] text-xs",
              isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div
              className={clsx(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold",
                isUser ? "bg-emerald-700 text-white" : "bg-slate-800 text-emerald-400"
              )}
              aria-hidden="true"
            >
              {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className="space-y-1.5">
              <div
                className={clsx(
                  "p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap",
                  isUser
                    ? "bg-emerald-700 text-white rounded-tr-none shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700"
                )}
              >
                {msg.text}

                {msg.actionItems && msg.actionItems.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 space-y-2">
                    <strong className="block text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                      Evidence-Grounded Actions:
                    </strong>
                    {msg.actionItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 text-[11px] space-y-0.5"
                      >
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          • {item.action}
                        </div>
                        <div className="text-slate-500 text-[10px] italic">
                          Evidence: {item.evidence}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={clsx(
                  "flex items-center gap-1.5 text-[10px] text-slate-400",
                  isUser && "justify-end"
                )}
              >
                {!isUser && msg.isFallback && (
                  <span className="font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-900">
                    AI fallback mode
                  </span>
                )}
                <span>{msg.timestamp}</span>
              </div>
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex gap-3 text-xs mr-auto">
          <div className="w-7 h-7 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-none flex items-center gap-2 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Analyzing air quality metrics and tailoring response...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
