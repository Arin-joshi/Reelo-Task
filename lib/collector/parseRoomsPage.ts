import type { ListingCategory, ListingWrite } from "@/lib/supabase/types";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

const ROOM_HREF = /\/rooms\/(\d+)/g;
const MAX_LISTINGS = 12;

function asString(value: JsonValue | undefined): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return null;
}

function asNumber(value: JsonValue | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function asObject(value: JsonValue | undefined): JsonObject | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value;
}

function firstImage(value: JsonValue | undefined): string | null {
  if (typeof value === "string" && value.startsWith("http")) return value;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = firstImage(item);
      if (found) return found;
    }
    return null;
  }

  const object = asObject(value);
  if (!object) return null;
  return (
    firstImage(object.url) ??
    firstImage(object.picture) ??
    firstImage(object.baseUrl) ??
    firstImage(object.image) ??
    firstImage(object.images) ??
    firstImage(object.contextualPictures)
  );
}

function guessCategory(text: string): ListingCategory {
  const value = text.toLowerCase();
  if (value.includes("beach")) return "beach";
  if (value.includes("cabin") || value.includes("cottage")) return "cabins";
  if (value.includes("tiny")) return "tiny";
  if (value.includes("park")) return "parks";
  if (value.includes("view")) return "views";
  if (value.includes("countryside") || value.includes("farm")) {
    return "countryside";
  }
  if (value.includes("design") || value.includes("loft")) return "design";
  return "homes";
}

function roomIdFrom(value: JsonValue | undefined): string | null {
  const text = asString(value);
  if (!text) return null;
  const match = text.match(/\/rooms\/(\d+)/);
  return match?.[1] ?? (/^\d+$/.test(text) ? text : null);
}

function extractScripts(html: string): JsonValue[] {
  const blobs: JsonValue[] = [];
  const scripts = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scripts.exec(html))) {
    const body = match[1].trim();
    if (!body.startsWith("{") && !body.startsWith("[")) continue;
    try {
      blobs.push(JSON.parse(body) as JsonValue);
    } catch {
      continue;
    }
  }

  return blobs;
}

function walk(value: JsonValue, found: Map<string, Partial<ListingWrite>>) {
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, found));
    return;
  }

  const object = asObject(value);
  if (!object) return;

  const id =
    roomIdFrom(object.listingId) ??
    roomIdFrom(object.id) ??
    roomIdFrom(object.listing_id) ??
    roomIdFrom(object.roomId) ??
    roomIdFrom(object.listingUrl) ??
    roomIdFrom(asObject(object.demandStayListing)?.id);

  if (id) {
    const current = found.get(id) ?? {};
    const name =
      asString(object.name) ??
      asString(object.title) ??
      asString(object.localizedName) ??
      asString(asObject(object.demandStayListing)?.description);
    const location =
      asString(object.city) ??
      asString(object.location) ??
      asString(asObject(object.demandStayListing)?.location);

    found.set(id, {
      ...current,
      airbnb_id: id,
      name: name ?? current.name,
      location: location ?? current.location,
      price:
        asNumber(object.price) ??
        asNumber(asObject(object.structuredDisplayPrice)?.primaryLine) ??
        asNumber(asObject(asObject(object.structuredDisplayPrice)?.primaryLine)?.price) ??
        current.price,
      rating:
        asNumber(object.avgRating) ??
        asNumber(object.avgRatingLocalized) ??
        asNumber(object.rating) ??
        current.rating,
      review_count:
        asNumber(object.reviewsCount) ??
        asNumber(object.reviewCount) ??
        current.review_count,
      image_url:
        firstImage(object.contextualPictures) ??
        firstImage(object.images) ??
        firstImage(object.image) ??
        current.image_url,
      listing_url: `https://www.airbnb.com/rooms/${id}`,
    });
  }

  for (const child of Object.values(object)) {
    walk(child, found);
  }
}

function listingsFromHref(html: string): string[] {
  const ids = new Set<string>();
  let match: RegExpExecArray | null;
  ROOM_HREF.lastIndex = 0;

  while ((match = ROOM_HREF.exec(html))) {
    ids.add(match[1]);
  }

  return [...ids];
}

export function parseRoomsPage(html: string): ListingWrite[] {
  const found = new Map<string, Partial<ListingWrite>>();

  for (const blob of extractScripts(html)) {
    walk(blob, found);
  }

  for (const id of listingsFromHref(html)) {
    if (!found.has(id)) {
      found.set(id, {
        airbnb_id: id,
        listing_url: `https://www.airbnb.com/rooms/${id}`,
      });
    }
  }

  const collectedAt = new Date().toISOString();

  return [...found.values()]
    .filter((row) => row.airbnb_id && row.name && row.image_url)
    .slice(0, MAX_LISTINGS)
    .map((row) => {
      const text = `${row.name ?? ""} ${row.location ?? ""}`;
      return {
        airbnb_id: row.airbnb_id as string,
        name: row.name as string,
        price: row.price ?? null,
        currency: row.currency ?? "USD",
        location: row.location ?? "",
        rating: row.rating ?? null,
        review_count: row.review_count ?? null,
        image_url: row.image_url as string,
        listing_url: `https://www.airbnb.com/rooms/${row.airbnb_id}`,
        category: guessCategory(text),
        is_guest_favorite: (row.rating ?? 0) >= 4.9,
        collected_at: collectedAt,
      };
    });
}
