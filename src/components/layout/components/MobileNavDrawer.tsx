import Link from "next/link";
import { X, LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface NavTabItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface MobileNavDrawerProps {
  isOpen: boolean;
  pathname: string;
  tabs: NavTabItem[];
  onClose: () => void;
}

/**
 * Slide-out modal drawer displaying secondary feature links on mobile devices.
 */
export function MobileNavDrawer({ isOpen, pathname, tabs, onClose }: MobileNavDrawerProps) {
  if (!isOpen) return null;

  return (
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
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={onClose}
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
  );
}
