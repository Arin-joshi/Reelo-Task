import { createClient } from "@supabase/supabase-js";
import type { Listing, ListingInput } from "@/lib/types";

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getListings(): Promise<Listing[]> {
  const { data, error } = await supabase()
    .from("listings")
    .select("*")
    .order("collected_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    ...row,
    price: row.price == null ? null : Number(row.price),
    rating: row.rating == null ? null : Number(row.rating),
    review_count: row.review_count == null ? null : Number(row.review_count),
  })) as Listing[];
}

export async function saveListings(listings: ListingInput[]) {
  const client = supabase();

  const { data: existing, error: readError } = await client
    .from("listings")
    .select("airbnb_id");

  if (readError) throw new Error(readError.message);

  const already = new Set((existing ?? []).map((row) => row.airbnb_id));
  const inserted = listings.filter((row) => !already.has(row.airbnb_id)).length;

  const { error } = await client
    .from("listings")
    .upsert(listings, { onConflict: "airbnb_id" });

  if (error) throw new Error(error.message);

  return { inserted, updated: listings.length - inserted };
}
