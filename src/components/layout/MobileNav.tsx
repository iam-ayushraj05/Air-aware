"use client";

import { useState } from "react";
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
import { MobileNavDrawer } from "./components/MobileNavDrawer";

const MAIN_TABS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/advisor", label: "AI Advisor", icon: Sparkles },
  { href: "/planner", label: "Planner", icon: CalendarDays },
  { href: "/impact", label: "Impact", icon: Award },
];

const SECONDARY_TABS = [
  { href: "/indoor-lab", label: "Indoor Air Lab", icon: Home },
  { href: "/alternatives", label: "Sustainable Choices", icon: RefreshCw },
  { href: "/community", label: "Community Challenges", icon: Users },
  { href: "/explorer", label: "Pollution Explorer", icon: Search },
  { href: "/settings", label: "Settings & Profile", icon: Settings },
];

/**
 * Mobile-responsive bottom navigation bar with responsive drawer sheet.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800"
        aria-label="Mobile Navigation Bar"
      >
        <div className="grid grid-cols-5 h-16 items-center">
          {MAIN_TABS.map((tab) => {
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

      <MobileNavDrawer
        isOpen={drawerOpen}
        pathname={pathname}
        tabs={SECONDARY_TABS}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
