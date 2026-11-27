import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAiAdvisorResponse } from "@/server/ai-provider";
import { checkRateLimit } from "@/server/rate-limiter";
import { AirQualitySnapshot, UserLifestyleProfile } from "@/lib/types";
import { logger } from "@/lib/logger";

const MAX_BODY_BYTES = 50 * 1024; // 50 KB

const ChatPayloadSchema = z
  .object({
    message: z.string().max(1000).optional(),
    airQuality: z.record(z.string(), z.unknown()).optional(),
    profile: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get("x-forwarded-for") || "local_client";
  const rateLimit = checkRateLimit(`chat_${clientIp}`, 30, 60000);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many AI requests. Please slow down." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.resetSeconds) },
      }
    );
  }

  // Request size limit check
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request payload too large (maximum 50KB permitted)." },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON format." }, { status: 400 });
  }

  const parsed = ChatPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid chat payload parameters." }, { status: 400 });
  }

  try {
    const { message, airQuality, profile } = parsed.data;

    // Safety fallback if airQuality snapshot is missing or malformed
    const safeAQ: AirQualitySnapshot =
      airQuality && typeof airQuality["aqi"] === "number"
        ? (airQuality as unknown as AirQualitySnapshot)
        : {
            aqi: 120,
            category: "sensitive",
            standard: "US_AQI",
            pollutants: {
              pm2_5: {
                value: 43,
                unit: "µg/m³",
                label: "PM2.5",
                safeLimit: 15,
                status: "moderate",
              },
              pm10: { value: 75, unit: "µg/m³", label: "PM10", safeLimit: 45, status: "moderate" },
            },
            weather: {
              temperature: 18,
              humidity: 55,
              windSpeed: 8,
              weatherCode: 1,
              conditionText: "Mild",
            },
            hourly: [],
            location: { name: "Current City", latitude: 0, longitude: 0 },
            dataSource: "demo",
            updatedAt: new Date().toISOString(),
            isWinterSmogActive: false,
          };

    const response = await getAiAdvisorResponse({
      userQuestion: message,
      airQuality: safeAQ,
      profile: (profile as Partial<UserLifestyleProfile>) || {},
    });

    return NextResponse.json({ success: true, data: response });
  } catch (err: unknown) {
    logger.error("AI Chat route error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "AI Assistant temporarily unavailable." }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST." }, { status: 405 });
}
