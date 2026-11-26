"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wind, MapPin, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  currentLocationName?: string;
  onOpenLocationSearch?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function Navbar({
  currentLocationName = "New Delhi",
  onOpenLocationSearch,
  onRefresh,
  isRefreshing,
}: NavbarProps) {
  const [hasAlert] = useState(true);

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Wind className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              AirAware
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                AI Urban
              </span>
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">Breathe Smarter, Live Safer</span>
          </div>
        </Link>

        {/* Location selector and controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenLocationSearch}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium"
            aria-label={`Current location: ${currentLocationName}. Click to change.`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span className="max-w-[120px] sm:max-w-[160px] truncate">{currentLocationName}</span>
          </Button>

          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              isLoading={isRefreshing}
              aria-label="Refresh live air quality data"
              title="Refresh live data"
            >
              Refresh
            </Button>
          )}

          <Link href="/advisor">
            <Button size="sm" className="hidden md:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>AI Advisor</span>
            </Button>
          </Link>

          <Link href="/settings" aria-label="Notifications and settings">
            <div className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700">
              <Bell className="w-5 h-5" aria-hidden="true" />
              {hasAlert && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
