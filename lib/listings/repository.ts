import { createAdminClient } from "@/lib/supabase/admin";
import type { Listing } from "@/lib/supabase/types";

function asNumber(value: unknown): number | null {
  if (value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeListing(row: Listing): Listing {
  return {
    ...row,
    price: asNumber(row.price),
    rating: asNumber(row.rating),
    review_count: asNumber(row.review_count),
  };
}

export async function fetchSavedListings(): Promise<Listing[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("listings")
    .select("*")
    .order("collected_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as Listing[]).map(normalizeListing);
}
