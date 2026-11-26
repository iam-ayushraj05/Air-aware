import React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm focus-visible:outline-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700",
      secondary:
        "bg-emerald-100 text-emerald-900 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-200",
      outline:
        "border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white focus-visible:outline-rose-500",
      ghost:
        "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    };

    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5 min-h-[36px]",
      md: "text-sm px-4 py-2 min-h-[44px]", // 44px min touch target
      lg: "text-base px-5 py-2.5 min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
