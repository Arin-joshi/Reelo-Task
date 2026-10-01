export type Listing = {
  id: string;
  airbnb_id: string;
  name: string;
  price: number | null;
  currency: string;
  location: string | null;
  rating: number | null;
  review_count: number | null;
  image_url: string | null;
  listing_url: string;
  category: string | null;
  is_guest_favorite: boolean;
  collected_at: string;
};

export type ListingInput = Omit<Listing, "id">;
