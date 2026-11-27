import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  formattedDate: string;
  residentCity: string;
}

/**
 * Top header component displaying current date, resident greeting, and link to AI advisor.
 */
export function DashboardHeader({ formattedDate, residentCity }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          {formattedDate} &bull; Urban Environmental Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Good day, {residentCity} Resident
        </h1>
      </div>

      <Link href="/advisor" aria-label="Open AirAware AI assistant">
        <Button
          size="sm"
          className="gap-1.5 self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Ask AirAware AI</span>
        </Button>
      </Link>
    </div>
  );
}
