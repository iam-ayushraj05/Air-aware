export interface ChatActionItem {
  action: string;
  reason: string;
  evidence: string;
  expectedBenefit: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  isFallback?: boolean;
  actionItems?: ChatActionItem[];
  timestamp: string;
}
