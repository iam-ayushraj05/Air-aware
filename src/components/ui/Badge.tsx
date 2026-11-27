import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "good" | "moderate" | "sensitive" | "unhealthy" | "severe" | "neutral" | "demo";
}

export function Badge({ children, className, variant = "neutral", ...props }: BadgeProps) {
  const styles = {
    good: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300",
    moderate: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300",
    sensitive:
      "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-300",
    unhealthy: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300",
    severe:
      "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300",
    neutral: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300",
    demo: "bg-amber-500 text-white font-bold tracking-wide border-amber-600 shadow-sm",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
