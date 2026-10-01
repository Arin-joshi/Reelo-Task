import { NextResponse } from "next/server";
import { scrapeListings } from "@/lib/scrape";
import { saveListings } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST() {
  try {
    const listings = await scrapeListings();
    const result = await saveListings(listings);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "collect failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
