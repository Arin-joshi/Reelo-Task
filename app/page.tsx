import { fetchSavedListings } from "@/lib/listings/repository";
import { HomePage } from "@/components/home/HomePage";
import type { Listing } from "@/lib/supabase/types";

export default async function Page() {
  let initialListings: Listing[] = [];
  let initialError: string | null = null;

  try {
    initialListings = await fetchSavedListings();
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Could not load listings";
  }

  return (
    <HomePage
      initialListings={initialListings}
      initialError={initialError}
    />
  );
}
