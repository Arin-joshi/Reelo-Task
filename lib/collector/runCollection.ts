import { fallbackFor } from "@/lib/collector/fallback";
import { fetchPublicListing } from "@/lib/collector/fetchPublicListing";
import { parseRoomsPage } from "@/lib/collector/parseRoomsPage";
import { LISTING_SOURCES, ROOMS_URL } from "@/lib/collector/sources";
import type { ListingWrite } from "@/lib/supabase/types";

export async function runCollection(): Promise<ListingWrite[]> {
  try {
    const html = await fetchPublicListing(ROOMS_URL);
    const listings = parseRoomsPage(html);
    if (listings.length > 0) return listings;
  } catch {
    // Airbnb often blocks server-side fetches
  }

  return LISTING_SOURCES.map(fallbackFor);
}
