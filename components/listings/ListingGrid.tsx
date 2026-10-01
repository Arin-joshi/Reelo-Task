import type { Listing } from "@/lib/supabase/types";
import { ListingCard } from "@/components/listings/ListingCard";

export function ListingGrid({ listings }: { listings: Listing[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {listings.map((listing) => (
        <ListingCard key={listing.airbnb_id} listing={listing} />
      ))}
    </div>
  );
}
