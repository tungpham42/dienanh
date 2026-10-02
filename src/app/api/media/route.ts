import { NextRequest, NextResponse } from "next/server";
import { listMedia } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const type = sp.get("type") === "tv" ? "tv" : "movie";
  const page = Math.min(Math.max(Number(sp.get("page")) || 1, 1), 500);
  const language = (sp.get("language") ?? "").slice(0, 5);
  const query = (sp.get("query") ?? "").slice(0, 100);

  try {
    const data = await listMedia({ type, page, language, query });
    return NextResponse.json(data);
  } catch (err) {
    console.error("TMDB list error:", err);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
