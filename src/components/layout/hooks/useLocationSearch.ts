import { useState, useCallback } from "react";
import { LocationInfo } from "@/lib/types";

interface UseLocationSearchOptions {
  onSelectLocation: (loc: LocationInfo) => void;
  onClose: () => void;
}

/**
 * Custom hook handling location geocoding API searches and browser GPS geolocation requests.
 */
export function useLocationSearch({ onSelectLocation, onClose }: UseLocationSearchOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim().length < 2) return;

      setIsSearching(true);
      setErrorMsg(null);

      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(searchQuery.trim())}`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
          setErrorMsg("No locations found for that search query.");
        }
      } catch {
        setErrorMsg("Failed to query location service.");
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery]
  );

  const handleUseGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const loc: LocationInfo = {
          name: "My GPS Location",
          latitude: Math.round(pos.coords.latitude * 100) / 100,
          longitude: Math.round(pos.coords.longitude * 100) / 100,
        };
        onSelectLocation(loc);
        onClose();
      },
      (_err) => {
        setIsLocating(false);
        setErrorMsg("Location access was denied or timed out. Please search manually.");
      },
      { timeout: 8000 }
    );
  }, [onSelectLocation, onClose]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    isLocating,
    errorMsg,
    handleSearch,
    handleUseGeolocation,
  };
}
