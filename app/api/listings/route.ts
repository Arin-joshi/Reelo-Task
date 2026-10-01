import { NextResponse } from "next/server";
import { fetchSavedListings } from "@/lib/listings/repository";

export const runtime = "nodejs";

export async function GET() {
  try {
    const listings = await fetchSavedListings();
    return NextResponse.json({ listings });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load listings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
