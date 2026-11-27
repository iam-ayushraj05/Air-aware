import { describe, it, expect } from "vitest";
import { ok, err, tryCatch, tryCatchAsync } from "../result";

describe("result library", () => {
  it("creates successful Result with ok()", () => {
    const res = ok(42);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data).toBe(42);
    }
  });

  it("creates failure Result with err()", () => {
    const res = err(new Error("Failure message"));
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.message).toBe("Failure message");
    }
  });

  it("safely catches synchronous exceptions with tryCatch()", () => {
    const successResult = tryCatch(() => JSON.parse('{"valid": true}'));
    expect(successResult.success).toBe(true);

    const failResult = tryCatch(() => JSON.parse("invalid-json{"));
    expect(failResult.success).toBe(false);
  });

  it("safely catches asynchronous rejections with tryCatchAsync()", async () => {
    const successResult = await tryCatchAsync(Promise.resolve("hello"));
    expect(successResult.success).toBe(true);

    const failResult = await tryCatchAsync(Promise.reject(new Error("Async fail")));
    expect(failResult.success).toBe(false);
  });
});
