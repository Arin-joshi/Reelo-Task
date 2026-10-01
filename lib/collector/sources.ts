import type { ListingCategory } from "@/lib/supabase/types";

export type ListingSource = {
  airbnbId: string;
  url: string;
  category: ListingCategory;
};

export const ROOMS_URL = "https://www.airbnb.com/rooms";

export const LISTING_SOURCES: ListingSource[] = [
  {
    airbnbId: "16795084",
    url: "https://www.airbnb.com/rooms/16795084",
    category: "homes",
  },
  {
    airbnbId: "23432574",
    url: "https://www.airbnb.com/rooms/23432574",
    category: "countryside",
  },
  {
    airbnbId: "1239952188546932513",
    url: "https://www.airbnb.com/rooms/1239952188546932513",
    category: "cabins",
  },
  {
    airbnbId: "36346103",
    url: "https://www.airbnb.com/rooms/36346103",
    category: "parks",
  },
  {
    airbnbId: "45757204",
    url: "https://www.airbnb.com/rooms/45757204",
    category: "views",
  },
  {
    airbnbId: "41576606",
    url: "https://www.airbnb.com/rooms/41576606",
    category: "design",
  },
  {
    airbnbId: "9837359",
    url: "https://www.airbnb.com/rooms/9837359",
    category: "homes",
  },
  {
    airbnbId: "31502465",
    url: "https://www.airbnb.com/rooms/31502465",
    category: "design",
  },
  {
    airbnbId: "680609811622239908",
    url: "https://www.airbnb.com/rooms/680609811622239908",
    category: "beach",
  },
  {
    airbnbId: "1669930394143293382",
    url: "https://www.airbnb.com/rooms/1669930394143293382",
    category: "beach",
  },
  {
    airbnbId: "1725029342959873853",
    url: "https://www.airbnb.com/rooms/1725029342959873853",
    category: "tiny",
  },
  {
    airbnbId: "39619332",
    url: "https://www.airbnb.com/rooms/39619332",
    category: "homes",
  },
];
