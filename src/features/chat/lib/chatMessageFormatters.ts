import { AiAdvisorResponse } from "@/server/ai-provider";
import { ChatMessage } from "../types";

/**
 * Formats an external AI response into a structured ChatMessage model.
 */
export function formatAiChatMessage(aiData: AiAdvisorResponse): ChatMessage {
  const fullAiText = `${aiData.summary}\n\n${aiData.routineAdvice}\n\n${aiData.indoorGuidance}`;
  return {
    id: `ai-${Date.now()}`,
    sender: "ai",
    text: fullAiText,
    isFallback: aiData.isDemoFallback,
    actionItems: aiData.actionItems,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

/**
 * Creates the initial welcome AI message populated with city and current air quality context.
 */
export function createInitialChatMessage(city: string, aqi: number, category: string): ChatMessage {
  return {
    id: "initial",
    sender: "ai",
    text: `Hello! I am AirAware AI, your environmental wellness advisor. Today in ${city}, the ambient AQI is ${aqi} (${category.toUpperCase()}). How can I help protect your family or optimize your routine today?`,
    isFallback: true,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}
