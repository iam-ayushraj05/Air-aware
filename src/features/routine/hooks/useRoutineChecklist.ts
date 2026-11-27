import { useState } from "react";

/**
 * Custom hook managing daily routine completion checkboxes.
 */
export function useRoutineChecklist(initialCompleted: Record<string, boolean> = {}) {
  const [completed, setCompleted] = useState<Record<string, boolean>>(initialCompleted);

  const toggleAction = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return { completed, toggleAction };
}
