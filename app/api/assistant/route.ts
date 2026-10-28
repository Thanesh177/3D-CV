import { NextResponse } from "next/server";
import { portfolio } from "@/content/portfolio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const buckets = new Map<string, { count: number; expiresAt: number }>();

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonymous";
}

function isRateLimited(key: string) {
  const now = Date.now();
  if (buckets.size > 500) {
    for (const [bucketKey, bucketValue] of buckets) {
      if (bucketValue.expiresAt <= now) buckets.delete(bucketKey);
    }
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store, max-age=0" };
  try {
    if (isRateLimited(getClientKey(request))) {
      return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429, headers });
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Expected JSON." }, { status: 415, headers });
    }

    const body = (await request.json()) as { question?: unknown };
    const question = typeof body.question === "string" ? body.question.trim() : "";
    if (!question) return NextResponse.json({ error: "Please enter a question." }, { status: 400, headers });
    if (question.length > 500) return NextResponse.json({ error: "Keep questions under 500 characters." }, { status: 400, headers });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        answer: "The portfolio assistant is configured correctly. Add OPENAI_API_KEY on the server to enable live grounded answers.",
      }, { headers });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
          instructions: "You are a concise portfolio guide. Answer only from the supplied portfolio data. Never invent details. If information is absent, say so. Keep answers under 90 words.",
          input: `Portfolio data:\n${JSON.stringify(portfolio)}\n\nVisitor question: ${question}`,
          max_output_tokens: 180,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error("OpenAI response error", response.status);
        return NextResponse.json({ error: "The assistant is temporarily unavailable." }, { status: 502, headers });
      }

      const data = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
      const fallbackText = data.output?.flatMap((item) => item.content || []).find((content) => content.type === "output_text")?.text;
      const answer = data.output_text || fallbackText || "No answer was returned.";
      return NextResponse.json({ answer }, { headers });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json({ error: "The assistant request timed out." }, { status: 504, headers });
    }
    console.error("Assistant route error", error);
    return NextResponse.json({ error: "Unable to answer right now." }, { status: 500, headers });
  }
}
