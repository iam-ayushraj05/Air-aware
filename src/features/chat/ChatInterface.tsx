"use client";

import React, { useState, useRef, useEffect } from "react";
import { AirQualitySnapshot, UserLifestyleProfile } from "@/lib/types";
import { AiAdvisorResponse } from "@/server/ai-provider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Send,
  Trash2,
  Bot,
  User,
  Lightbulb,
} from "lucide-react";
import { clsx } from "clsx";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  isFallback?: boolean;
  actionItems?: Array<{
    action: string;
    reason: string;
    evidence: string;
    expectedBenefit: string;
  }>;
  timestamp: string;
}

interface ChatInterfaceProps {
  airQuality: AirQualitySnapshot;
  profile?: Partial<UserLifestyleProfile>;
}

const SUGGESTED_PROMPTS = [
  "Is it safe to go jogging outside today?",
  "What should my family do during severe smog?",
  "How can I reduce indoor PM2.5 without a purifier?",
  "What is the best commute strategy today?",
  "Explain today's AQI in simple words for children.",
];

export function ChatInterface({ airQuality, profile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "ai",
      text: `Hello! I am AirAware AI, your environmental wellness advisor. Today in ${airQuality.location.name}, the ambient AQI is ${airQuality.aqi} (${airQuality.category.toUpperCase()}). How can I help protect your family or optimize your routine today?`,
      isFallback: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText: string) => {
    const textToSend = messageText.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          airQuality,
          profile,
        }),
      });

      if (!res.ok) {
        throw new Error("Chat request failed");
      }

      const json = await res.json();
      const aiData: AiAdvisorResponse = json.data;

      const fullAiText = `${aiData.summary}\n\n${aiData.routineAdvice}\n\n${aiData.indoorGuidance}`;

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: fullAiText,
        isFallback: aiData.isDemoFallback,
        actionItems: aiData.actionItems,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "I encountered a network issue communicating with the AI service. Please verify your connection or try again.",
        isFallback: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: "ai",
        text: `Conversation cleared. Ask me anything about current air quality (AQI ${airQuality.aqi}) in ${airQuality.location.name}.`,
        isFallback: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <Card className="flex flex-col h-[650px] p-0 overflow-hidden border shadow-md">
      {/* Chat Header */}
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
              Context: {airQuality.location.name} • AQI {airQuality.aqi} • PM2.5 {airQuality.pollutants.pm2_5.value} µg/m³
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1"
          aria-label="Clear chat conversation"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Clear Chat</span>
        </Button>
      </div>

      {/* Suggested Questions Pills */}
      <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 ml-1" aria-hidden="true" />
        <span className="text-slate-500 shrink-0 text-[11px] font-semibold">Suggested:</span>
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(prompt)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-[11px] text-slate-700 dark:text-slate-300 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message History */}
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

                  {/* Render grounded action items if available */}
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

                {/* Sub-label: fallback badge & timestamp */}
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

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
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
    </Card>
  );
}
