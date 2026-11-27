import { ALLOWED_API_HOSTS } from "@/lib/constants";

const REQUEST_TIMEOUT_MS = 6000;
const MAX_RETRIES = 2;

/**
 * Validates that the requested target URL strictly matches our SSRF host allowlist.
 *
 * @param urlString Target URL string
 * @returns Verified URL instance
 * @throws Error if host is disallowed
 */
export function assertSafeUrl(urlString: string): URL {
  const parsed = new URL(urlString);
  if (!ALLOWED_API_HOSTS.includes(parsed.hostname as (typeof ALLOWED_API_HOSTS)[number])) {
    throw new Error(`SSRF Prevention: Host "${parsed.hostname}" is not permitted.`);
  }
  return parsed;
}

/**
 * Performs a single HTTP GET request with abort signal and revalidation headers.
 *
 * @param urlString Safe target URL
 * @param revalidateSecs Next.js ISR revalidation duration
 * @param signal AbortController signal
 * @returns Parsed JSON body
 */
export async function fetchWithTimeout<T>(
  urlString: string,
  revalidateSecs: number,
  signal: AbortSignal
): Promise<T> {
  const response = await fetch(urlString, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": "AirAware-UrbanAssistant/1.0",
    },
    next: { revalidate: revalidateSecs },
    signal,
  });

  if (!response.ok) {
    throw new Error(`API responded with HTTP status ${response.status}`);
  }

  const json = await response.json();
  return json as T;
}

/**
 * Executes a resilient fetch with AbortController timeout and exponential backoff retry.
 *
 * @param urlString Target URL string to fetch
 * @param revalidateSecs Next.js ISR cache duration in seconds
 * @returns Parsed JSON response of type T
 */
export async function resilientFetch<T>(urlString: string, revalidateSecs: number): Promise<T> {
  assertSafeUrl(urlString);
  let attempt = 0;
  let delay = 300;

  while (attempt <= MAX_RETRIES) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const data = await fetchWithTimeout<T>(urlString, revalidateSecs, controller.signal);
      clearTimeout(timeoutId);
      return data;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      attempt++;
      if (attempt > MAX_RETRIES) throw err;
      const jitter = Math.random() * 150;
      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
      delay *= 2;
    }
  }

  throw new Error("Resilient fetch exhausted all retry attempts.");
}
