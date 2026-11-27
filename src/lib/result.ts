/**
 * Standard Result<T, E> type for deterministic, type-safe functional error handling
 * without throwing unhandled exceptions across application layers.
 */
export type Result<T, E = Error> =
  { readonly success: true; readonly data: T } | { readonly success: false; readonly error: E };

/**
 * Creates a successful Result wrapping the provided value.
 *
 * @param data The payload value
 * @returns Result<T, never>
 */
export function ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Creates a failure Result wrapping the provided error.
 *
 * @param error The error value or message
 * @returns Result<never, E>
 */
export function err<E = Error>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Safely executes a synchronous function, returning a Result.
 *
 * @param fn The function to execute
 * @returns Result<T, Error>
 */
export function tryCatch<T>(fn: () => T): Result<T, Error> {
  try {
    return ok(fn());
  } catch (caught) {
    const error = caught instanceof Error ? caught : new Error(String(caught));
    return err(error);
  }
}

/**
 * Safely executes an asynchronous function, returning a Promise<Result<T, Error>>.
 *
 * @param promise The promise to execute
 * @returns Promise<Result<T, Error>>
 */
export async function tryCatchAsync<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  try {
    const data = await promise;
    return ok(data);
  } catch (caught) {
    const error = caught instanceof Error ? caught : new Error(String(caught));
    return err(error);
  }
}
