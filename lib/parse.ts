import * as cheerio from "cheerio";
import type { ListingInput } from "@/lib/types";

type Card = {
  airbnb_id: string;
  name?: string | null;
  price?: number | null;
  location?: string | null;
  rating?: number | null;
  review_count?: number | null;
  image_url?: string | null;
  listing_url?: string | null;
};

function str(v: unknown): string | null {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (typeof v === "number") return String(v);
  return null;
}

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function obj(v: unknown): Record<string, unknown> | null {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function imageUrl(v: unknown): string | null {
  if (typeof v === "string" && v.startsWith("http")) return v;
  if (Array.isArray(v)) {
    for (const item of v) {
      const found = imageUrl(item);
      if (found) return found;
    }
    return null;
  }
  const o = obj(v);
  if (!o) return null;
  return (
    imageUrl(o.url) ??
    imageUrl(o.baseUrl) ??
    imageUrl(o.picture) ??
    imageUrl(o.image) ??
    imageUrl(o.images) ??
    imageUrl(o.contextualPictures)
  );
}

function roomId(v: unknown): string | null {
  const text = str(v);
  if (!text) return null;
  const match = text.match(/\/rooms\/(\d+)/);
  if (match) return match[1];
  return /^\d+$/.test(text) ? text : null;
}

function walk(value: unknown, found: Map<string, Card>) {
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, found));
    return;
  }

  const o = obj(value);
  if (!o) return;

  const stay = obj(o.demandStayListing);
  const id =
    roomId(o.listingId) ??
    roomId(o.id) ??
    roomId(o.listing_id) ??
    roomId(o.listingUrl) ??
    roomId(stay?.id);

  if (id) {
    const current = found.get(id) ?? { airbnb_id: id };
    const priceLine = obj(obj(o.structuredDisplayPrice)?.primaryLine);
    found.set(id, {
      ...current,
      name: str(o.name) ?? str(o.title) ?? str(o.localizedName) ?? current.name,
      location: str(o.city) ?? str(o.location) ?? current.location,
      price: num(o.price) ?? num(priceLine?.price) ?? current.price,
      rating: num(o.avgRating) ?? num(o.avgRatingLocalized) ?? num(o.rating) ?? current.rating,
      review_count: num(o.reviewsCount) ?? num(o.reviewCount) ?? current.review_count,
      image_url:
        imageUrl(o.contextualPictures) ??
        imageUrl(o.images) ??
        imageUrl(o.image) ??
        current.image_url,
      listing_url: `https://www.airbnb.com/rooms/${id}`,
    });
  }

  for (const child of Object.values(o)) walk(child, found);
}

function categoryFor(text: string) {
  const t = text.toLowerCase();
  if (t.includes("beach")) return "beach";
  if (t.includes("cabin") || t.includes("cottage")) return "cabins";
  if (t.includes("tiny")) return "tiny";
  if (t.includes("park")) return "parks";
  if (t.includes("view")) return "views";
  if (t.includes("farm") || t.includes("countryside")) return "countryside";
  if (t.includes("design") || t.includes("loft")) return "design";
  return "homes";
}

export function parseListings(html: string): ListingInput[] {
  const found = new Map<string, Card>();
  const $ = cheerio.load(html);

  $("script").each((_, el) => {
    const body = $(el).html()?.trim() ?? "";
    if (!body.startsWith("{") && !body.startsWith("[")) return;
    try {
      walk(JSON.parse(body), found);
    } catch {
      // not json
    }
  });

  $('a[href*="/rooms/"]').each((_, el) => {
    const href = $(el).attr("href") ?? "";
    const id = href.match(/\/rooms\/(\d+)/)?.[1];
    if (!id) return;

    const current = found.get(id) ?? { airbnb_id: id };
    const img = $(el).find("img").attr("src") ?? $(el).find("img").attr("data-src");
    const text = $(el).text().replace(/\s+/g, " ").trim();
    const priceMatch = text.match(/\$(\d[\d,]*)/);
    const ratingMatch = text.match(/\b(\d\.\d{1,2})\b/);

    found.set(id, {
      ...current,
      name: current.name ?? (text.slice(0, 80) || null),
      price: current.price ?? (priceMatch ? Number(priceMatch[1].replace(/,/g, "")) : null),
      rating: current.rating ?? (ratingMatch ? Number(ratingMatch[1]) : null),
      image_url: current.image_url ?? img ?? null,
      listing_url: `https://www.airbnb.com/rooms/${id}`,
    });
  });

  const now = new Date().toISOString();
  const listings: ListingInput[] = [];
  const seen = new Set<string>();

  for (const card of found.values()) {
    const id = card.airbnb_id?.trim();
    const name = card.name?.trim();
    if (!id || !name || seen.has(id)) continue;
    seen.add(id);
    listings.push({
      airbnb_id: id,
      name,
      price: card.price ?? null,
      currency: "USD",
      location: card.location?.trim() ?? "",
      rating: card.rating ?? null,
      review_count: card.review_count ?? null,
      image_url: card.image_url ?? "",
      listing_url: card.listing_url ?? `https://www.airbnb.com/rooms/${id}`,
      category: categoryFor(`${name} ${card.location ?? ""}`),
      is_guest_favorite: (card.rating ?? 0) >= 4.9,
      collected_at: now,
    });
    if (listings.length >= 12) break;
  }

  return listings;
}
