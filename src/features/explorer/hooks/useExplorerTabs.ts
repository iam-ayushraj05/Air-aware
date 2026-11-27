import { useState } from "react";

export type ExplorerTab = "inversion" | "anatomy" | "spectrum";

/**
 * Custom hook managing active educational module tab selection.
 */
export function useExplorerTabs(initialTab: ExplorerTab = "inversion") {
  const [activeTab, setActiveTab] = useState<ExplorerTab>(initialTab);
  return { activeTab, setActiveTab };
}
