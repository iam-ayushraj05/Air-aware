"use client";

import { X, Search, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LocationInfo } from "@/lib/types";
import { useLocationSearch } from "./hooks/useLocationSearch";
import { PopularCitiesGrid } from "./components/PopularCitiesGrid";
import { LocationSearchResultsList } from "./components/LocationSearchResultsList";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: LocationInfo) => void;
}

/**
 * Modal dialog enabling users to query cities via Open-Meteo geocoding or browser GPS.
 */
export function LocationModal({ isOpen, onClose, onSelectLocation }: LocationModalProps) {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    isLocating,
    errorMsg,
    handleSearch,
    handleUseGeolocation,
  } = useLocationSearch({ onSelectLocation, onClose });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2
            id="location-dialog-title"
            className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
          >
            <MapPin className="w-5 h-5 text-emerald-600" />
            Select Your Location
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Button
          variant="outline"
          onClick={handleUseGeolocation}
          isLoading={isLocating}
          className="w-full flex items-center justify-center gap-2 border-emerald-300 text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20"
        >
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span>Use Current GPS Location</span>
        </Button>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city (e.g. Paris, Delhi, Chicago)..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600"
              aria-label="Search city name"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
          </div>
          <Button type="submit" isLoading={isSearching} size="md">
            Search
          </Button>
        </form>

        {errorMsg && (
          <p
            className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-lg"
            role="alert"
          >
            {errorMsg}
          </p>
        )}

        <LocationSearchResultsList
          searchResults={searchResults}
          onSelectLocation={onSelectLocation}
          onClose={onClose}
        />

        <PopularCitiesGrid
          onSelectCity={(city) => {
            onSelectLocation(city);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
