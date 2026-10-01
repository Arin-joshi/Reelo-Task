import type { Listing } from "@/lib/supabase/types";

export function filterListings(
  listings: Listing[],
  query: string,
  category: string,
) {
  const needle = query.trim().toLowerCase();

  return listings.filter((listing) => {
    const categoryMatch =
      category === "all" || listing.category === category;
    if (!categoryMatch) return false;
    if (!needle) return true;

    const haystack = `${listing.name} ${listing.location ?? ""}`.toLowerCase();
    return haystack.includes(needle);
  });
}
