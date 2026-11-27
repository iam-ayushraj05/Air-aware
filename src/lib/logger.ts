/**
 * Safe logger utility to encapsulate environment-aware logging.
 * Prevents direct console.* calls that violate ESLint no-console while
 * retaining helpful debugging during local development and testing.
 */

const isTestOrProd = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test";

export const logger = {
  /**
   * Logs informational messages in development only.
   */
  info: (message: string, ...args: unknown[]): void => {
    if (!isTestOrProd) {
      // Allowed in development only
      process.stdout.write(`[INFO] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}\n`);
    }
  },

  /**
   * Logs warnings in development only.
   */
  warn: (message: string, ...args: unknown[]): void => {
    if (!isTestOrProd) {
      process.stderr.write(`[WARN] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}\n`);
    }
  },

  /**
   * Logs operational errors in development only.
   */
  error: (message: string, ...args: unknown[]): void => {
    if (!isTestOrProd) {
      process.stderr.write(`[ERROR] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}\n`);
    }
  },
};
