import { clsx } from "clsx";

export function LoadingSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg", className)}
      aria-busy="true"
      aria-label="Loading content"
      {...props}
    />
  );
}

export function AlertBanner({
  title,
  message,
  variant = "warning",
  icon: Icon,
  className,
}: {
  title: string;
  message: string;
  variant?: "info" | "warning" | "danger" | "success";
  icon?: React.ElementType;
  className?: string;
}) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-200",
    warning:
      "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-200",
    danger:
      "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-200",
    success:
      "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-200",
  };

  return (
    <div
      role="alert"
      className={clsx("p-4 rounded-xl border flex items-start gap-3", styles[variant], className)}
    >
      {Icon && <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />}
      <div className="flex-1 text-sm">
        <strong className="block font-semibold mb-0.5">{title}</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
