"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  Home,
  RefreshCw,
  Award,
  Users,
  Search,
  Settings,
  Flame,
} from "lucide-react";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/advisor", label: "AI Advisor", icon: Sparkles, badge: "AI" },
  { href: "/planner", label: "Daily Planner", icon: CalendarDays },
  { href: "/indoor-lab", label: "Indoor Air Lab", icon: Home },
  { href: "/alternatives", label: "Sustainable Choices", icon: RefreshCw },
  { href: "/impact", label: "Impact Tracker", icon: Award },
  { href: "/community", label: "Community", icon: Users },
  { href: "/explorer", label: "Pollution Explorer", icon: Search },
  { href: "/settings", label: "Settings & Profile", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 min-h-[calc(100vh-4rem)]"
      aria-label="Main Navigation"
    >
      <div className="space-y-1 mb-6">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Platform Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]",
                isActive
                  ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 font-semibold"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={clsx(
                    "w-5 h-5",
                    isActive ? "text-emerald-700 dark:text-emerald-400" : "text-slate-500"
                  )}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-3.5 border border-emerald-200 dark:border-emerald-900/60 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-900 dark:text-emerald-200 mb-1">
            <Flame className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Winter Smog Active?</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            Automatic inversion detection alerts trigger when cold air and low wind trap surface PM2.5.
          </p>
        </div>
      </div>
    </aside>
  );
}
