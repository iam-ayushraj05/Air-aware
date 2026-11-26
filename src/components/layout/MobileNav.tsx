"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  Menu,
  X,
  Home,
  RefreshCw,
  Award,
  Users,
  Search,
  Settings,
} from "lucide-react";
import { clsx } from "clsx";

export function MobileNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/advisor", label: "AI Advisor", icon: Sparkles },
    { href: "/planner", label: "Planner", icon: CalendarDays },
    { href: "/impact", label: "Impact", icon: Award },
  ];

  const secondaryTabs = [
    { href: "/indoor-lab", label: "Indoor Air Lab", icon: Home },
    { href: "/alternatives", label: "Sustainable Choices", icon: RefreshCw },
    { href: "/community", label: "Community Challenges", icon: Users },
    { href: "/explorer", label: "Pollution Explorer", icon: Search },
    { href: "/settings", label: "Settings & Profile", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800"
        aria-label="Mobile Navigation Bar"
      >
        <div className="grid grid-cols-5 h-16 items-center">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  "flex flex-col items-center justify-center h-full min-h-[44px] text-xs font-medium transition-colors",
                  isActive
                    ? "text-emerald-700 dark:text-emerald-400 font-bold"
                    : "text-slate-600 dark:text-slate-400"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-5 h-5 mb-1" aria-hidden="true" />
                <span className="truncate text-[11px]">{tab.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="flex flex-col items-center justify-center h-full min-h-[44px] text-xs font-medium text-slate-600 dark:text-slate-400"
            aria-label="Open more navigation options"
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? (
              <X className="w-5 h-5 mb-1 text-slate-900 dark:text-white" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 mb-1" aria-hidden="true" />
            )}
            <span className="text-[11px]">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Additional Navigation Menu"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
        >
          <div className="w-72 bg-white dark:bg-slate-900 h-full p-5 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <span className="font-bold text-slate-900 dark:text-white">All Features</span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-1">
                {secondaryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname === tab.href;
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      onClick={() => setDrawerOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium min-h-[44px]",
                        isActive
                          ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                      <span>{tab.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              AirAware Urban Assistant
            </div>
          </div>
        </div>
      )}
    </>
  );
}
