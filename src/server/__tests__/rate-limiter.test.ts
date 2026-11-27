import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit, resetRateLimitStore } from "../rate-limiter";

describe("Sliding Window Rate Limiter", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("permits requests within specified limit", () => {
    const key = "test_ip_1";
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(key, 5, 10000);
      expect(res.success).toBe(true);
      expect(res.remaining).toBe(4 - i);
    }
  });

  it("rejects requests exceeding limit with proper resetSeconds", () => {
    const key = "test_ip_blocked";
    for (let i = 0; i < 3; i++) {
      checkRateLimit(key, 3, 5000);
    }

    const blocked = checkRateLimit(key, 3, 5000);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetSeconds).toBeGreaterThan(0);
  });

  it("purges old timestamps after cleanup interval passes", () => {
    const key = "test_ip_cleanup";
    checkRateLimit(key, 10, 1000);

    // Advance time past CLEANUP_INTERVAL_MS (5 mins)
    const nowSpy = vi.spyOn(Date, "now");
    nowSpy.mockReturnValue(Date.now() + 6 * 60 * 1000);

    const fresh = checkRateLimit(key, 10, 1000);
    expect(fresh.success).toBe(true);
    expect(fresh.remaining).toBe(9);

    nowSpy.mockRestore();
  });

  it("deletes empty record keys during purgeOldEntries cleanup", () => {
    const expiredKey = "test_ip_expired";
    checkRateLimit(expiredKey, 5, 500);

    // Spy forward past 5 mins cleanup interval
    const nowSpy = vi.spyOn(Date, "now");
    const futureTime = Date.now() + 10 * 60 * 1000;
    nowSpy.mockReturnValue(futureTime);

    // Trigger cleanup with another key
    checkRateLimit("trigger_key", 5, 500);

    // Now expiredKey is completely wiped from map
    const recheck = checkRateLimit(expiredKey, 5, 500);
    expect(recheck.remaining).toBe(4);

    nowSpy.mockRestore();
  });

  it("handles limit of 0 or immediate block fallback correctly", () => {
    const res = checkRateLimit("zero_limit_ip", 0, 5000);
    expect(res.success).toBe(false);
    expect(res.remaining).toBe(0);
    expect(res.resetSeconds).toBeGreaterThanOrEqual(1);
  });
});
