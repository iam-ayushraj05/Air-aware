"use client";

import React, { useState } from "react";
import { X, Search, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LocationInfo } from "@/lib/types";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: LocationInfo) => void;
}

const POPULAR_CITIES: LocationInfo[] = [
  { name: "New Delhi", country: "India", latitude: 28.61, longitude: 77.21 },
  { name: "London", country: "United Kingdom", latitude: 51.51, longitude: -0.13 },
  { name: "New York", country: "United States", latitude: 40.71, longitude: -74.01 },
  { name: "Beijing", country: "China", latitude: 39.9, longitude: 116.4 },
  { name: "Los Angeles", country: "United States", latitude: 34.05, longitude: -118.24 },
  { name: "Tokyo", country: "Japan", latitude: 35.68, longitude: 139.69 },
];

export function LocationModal({ isOpen, onClose, onSelectLocation }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
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
  };

  const handleUseGeolocation = () => {
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
  };

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
          <h2 id="location-dialog-title" className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
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

        {/* GPS Button */}
        <Button
          variant="outline"
          onClick={handleUseGeolocation}
          isLoading={isLocating}
          className="w-full flex items-center justify-center gap-2 border-emerald-300 text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20"
        >
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span>Use Current GPS Location</span>
        </Button>

        {/* Search form */}
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
          <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-lg" role="alert">
            {errorMsg}
          </p>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Search Results
            </span>
            {searchResults.map((loc, idx) => (
              <button
                key={`${loc.name}-${idx}`}
                type="button"
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-sm flex items-center justify-between text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span className="font-medium">{loc.name}</span>
                <span className="text-xs text-slate-500">{loc.admin1 ? `${loc.admin1}, ` : ""}{loc.country}</span>
              </button>
            ))}
          </div>
        )}

        {/* Popular Locations */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Popular Cities
          </span>
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => {
                  onSelectLocation(city);
                  onClose();
                }}
                className="text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs transition-colors"
              >
                <div className="font-semibold text-slate-800 dark:text-slate-200">{city.name}</div>
                <div className="text-slate-500 text-[11px]">{city.country}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
