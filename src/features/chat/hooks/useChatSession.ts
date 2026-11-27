import { useState, useRef, useEffect, useCallback } from "react";
import { AirQualitySnapshot, UserLifestyleProfile } from "@/lib/types";
import { AiAdvisorResponse } from "@/server/ai-provider";
import { ChatMessage } from "../types";

interface UseChatSessionOptions {
  airQuality: AirQualitySnapshot;
  profile?: Partial<UserLifestyleProfile>;
}

/**
 * Custom hook managing the multi-turn conversational AI session,
 * network queries to /api/chat, and loading/scroll states.
 */
export function useChatSession({ airQuality, profile }: UseChatSessionOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([
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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = useCallback(
    async (messageText: string) => {
      const textToSend = messageText.trim();
      if (!textToSend || isLoading) return;

      const userMsg: ChatMessage = {
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

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: fullAiText,
          isFallback: aiData.isDemoFallback,
          actionItems: aiData.actionItems,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, aiMsg]);
      } catch {
        const errorMsg: ChatMessage = {
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
    },
    [airQuality, profile, isLoading]
  );

  const handleClear = useCallback(() => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: "ai",
        text: `Conversation cleared. Ask me anything about current air quality (AQI ${airQuality.aqi}) in ${airQuality.location.name}.`,
        isFallback: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [airQuality.aqi, airQuality.location.name]);

  return {
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleSend,
    handleClear,
  };
}
