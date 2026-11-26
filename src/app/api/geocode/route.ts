import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchLocations } from "@/server/api-client";
import { checkRateLimit } from "@/server/rate-limiter";

const GeocodeQuerySchema = z
  .object({
    q: z.string().min(2).max(80),
  })
  .strict();

export async function GET(request: NextRequest) {
  const clientIp = request.headers.get("x-forwarded-for") || "local_client";
  const rateLimit = checkRateLimit(`geo_${clientIp}`, 60, 60000);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many location search requests." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.resetSeconds) },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = GeocodeQuerySchema.safeParse({
    q: searchParams.get("q") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query. Minimum 2 characters required." },
      { status: 400 }
    );
  }

  try {
    const results = await searchLocations(parsed.data.q);
    return NextResponse.json(
      { success: true, results },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err: unknown) {
    console.error("Geocoding route error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Location search failed." }, { status: 502 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed. Use GET." }, { status: 405 });
}
