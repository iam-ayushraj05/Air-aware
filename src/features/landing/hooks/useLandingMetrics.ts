import { useState, useEffect } from "react";

/**
 * Custom hook providing animated metrics for the landing hero section.
 */
export function useLandingMetrics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return { isVisible };
}
