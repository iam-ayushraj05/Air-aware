import { clsx } from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
  const variantStyles = {
    default: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
    elevated: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md",
    bordered: "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700",
  };

  return (
    <div
      className={clsx("rounded-xl p-5 md:p-6 transition-shadow", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={clsx("text-lg font-semibold text-slate-900 dark:text-slate-100", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
