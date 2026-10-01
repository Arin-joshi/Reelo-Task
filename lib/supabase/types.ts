export type ListingCategory =
  | "homes"
  | "beach"
  | "cabins"
  | "views"
  | "countryside"
  | "tiny"
  | "design"
  | "parks";

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
  category: ListingCategory | string | null;
  is_guest_favorite: boolean;
  collected_at: string;
};

export type ListingWrite = {
  airbnb_id: string;
  name: string;
  price: number | null;
  currency: string;
  location: string;
  rating: number | null;
  review_count: number | null;
  image_url: string;
  listing_url: string;
  category: ListingCategory;
  is_guest_favorite: boolean;
  collected_at: string;
};

export type CollectResponse = {
  inserted: number;
  updated: number;
  error?: string;
};
