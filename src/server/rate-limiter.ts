/**
 * In-Memory Sliding-Window Rate Limiter.
 *
 * Tracks request timestamps per client IP.
 * In a distributed production environment, this should be backed by Redis / Upstash.
 */
interface RateLimitRecord {
  timestamps: number[];
}

const clientStore = new Map<string, RateLimitRecord>();

// Periodically clean up entries older than 5 minutes to prevent memory leak
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function purgeOldEntries(now: number, windowMs: number) {
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    for (const [key, record] of clientStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
      if (record.timestamps.length === 0) {
        clientStore.delete(key);
      }
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks whether an incoming request from a given client key exceeds the rate limit.
 *
 * @param key Client identifier (e.g., client IP or hash)
 * @param limit Max allowed requests within window
 * @param windowMs Window duration in milliseconds (default: 60,000ms / 1 min)
 */
export function checkRateLimit(
  key: string,
  limit: number = 30,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  purgeOldEntries(now, windowMs);

  let record = clientStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    clientStore.set(key, record);
  }

  // Filter timestamps within the current sliding window
  const windowStart = now - windowMs;
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0] ?? now;
    const resetMs = Math.max(1000, oldestTimestamp + windowMs - now);
    const resetSeconds = Math.ceil(resetMs / 1000);

    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  record.timestamps.push(now);
  const remaining = limit - record.timestamps.length;
  const oldestTimestamp = record.timestamps[0] ?? now;
  const resetSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

  return {
    success: true,
    limit,
    remaining,
    resetSeconds,
  };
}

/**
 * Reset rate limit store (useful for automated testing)
 */
export function resetRateLimitStore(): void {
  clientStore.clear();
}
