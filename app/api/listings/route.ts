import { NextResponse } from "next/server";
import { getListings } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const listings = await getListings();
    return NextResponse.json({ listings });
  } catch (err) {
    const message = err instanceof Error ? err.message : "failed to load listings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
