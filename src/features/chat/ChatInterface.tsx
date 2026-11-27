"use client";

import { AirQualitySnapshot, UserLifestyleProfile } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { useChatSession } from "./hooks/useChatSession";
import { ChatHeader } from "./components/ChatHeader";
import { ChatPromptPills } from "./components/ChatPromptPills";
import { ChatMessageList } from "./components/ChatMessageList";
import { ChatInputForm } from "./components/ChatInputForm";

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

/**
 * AirAware conversational AI assistant component with ground truth ambient air quality context.
 */
export function ChatInterface({ airQuality, profile }: ChatInterfaceProps) {
  const { messages, input, setInput, isLoading, messagesEndRef, handleSend, handleClear } =
    useChatSession({ airQuality, profile });

  return (
    <Card className="flex flex-col h-[650px] p-0 overflow-hidden border shadow-md">
      <ChatHeader airQuality={airQuality} onClear={handleClear} />
      <ChatPromptPills prompts={SUGGESTED_PROMPTS} onSelectPrompt={handleSend} />
      <ChatMessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
      <ChatInputForm
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSubmit={handleSend}
      />
    </Card>
  );
}
