import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getLiveAirQuality } from "@/server/api-client";
import { checkRateLimit } from "@/server/rate-limiter";
import { logger } from "@/lib/logger";

const AirQualityQuerySchema = z
  .object({
    lat: z.coerce.number().min(-90).max(90),
    lon: z.coerce.number().min(-180).max(180),
    name: z.string().max(100).optional(),
  })
  .strict();

export async function GET(request: NextRequest) {
  // Rate limiting (60 requests/min per IP)
  const clientIp = request.headers.get("x-forwarded-for") || "local_client";
  const rateLimit = checkRateLimit(`aq_${clientIp}`, 60, 60000);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before retrying." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetSeconds),
        },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = AirQualityQuerySchema.safeParse({
    lat: searchParams.get("lat"),
    lon: searchParams.get("lon"),
    name: searchParams.get("name") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Invalid query parameters: latitude (-90 to 90) and longitude (-180 to 180) are required.",
      },
      { status: 400 }
    );
  }

  try {
    const { lat, lon, name } = parsed.data;
    const airQualityData = await getLiveAirQuality(lat, lon, name || "Selected Location");

    return NextResponse.json(
      { success: true, data: airQualityData },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=300",
        },
      }
    );
  } catch (err: unknown) {
    logger.error("Air quality route error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to retrieve air quality data. Please try again." },
      { status: 502 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed. Use GET." }, { status: 405 });
}
