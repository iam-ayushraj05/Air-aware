import { useState } from "react";
import { INITIAL_PLEDGES } from "../lib/communityPledges";
import { CommunityPledgeItem } from "../types";

/**
 * Custom hook managing community clean-air pledges feed state.
 */
export function useCommunityPledges() {
  const [pledges, setPledges] = useState<CommunityPledgeItem[]>(INITIAL_PLEDGES);

  const addPledge = (name: string, action: string, avoidedKg: number) => {
    const newPledge: CommunityPledgeItem = {
      id: `p-${Date.now()}`,
      name,
      action,
      timeAgo: "Just now",
      avoidedKg,
    };
    setPledges((prev) => [newPledge, ...prev]);
  };

  return { pledges, addPledge };
}
