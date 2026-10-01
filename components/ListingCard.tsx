"use client";

import Image from "next/image";
import { useState } from "react";
import { HeartIcon, StarIcon } from "@/components/icons";
import type { Listing } from "@/lib/types";

function priceLabel(amount: number | null, currency: string) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ListingCard({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);
  const [broken, setBroken] = useState(false);
  const src = listing.image_url && !broken ? listing.image_url : null;
  const rating = listing.rating != null ? listing.rating.toFixed(2) : null;

  return (
    <article className="group">
      <div className="relative">
        <a
          href={listing.listing_url}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-xl"
        >
          <div className="relative aspect-[20/19] bg-[#EBEBEB]">
            {src ? (
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-[1.04] transition"
                onError={() => setBroken(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-[#e8e8e8]" />
            )}
          </div>
        </a>

        {listing.is_guest_favorite ? (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-[6px] text-[12px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            Guest favorite
          </span>
        ) : null}

        <button
          type="button"
          aria-label={saved ? "Unsave" : "Save"}
          onClick={() => setSaved((v) => !v)}
          className="absolute right-3 top-3 p-1"
        >
          <HeartIcon filled={saved} className="h-7 w-7" />
        </button>
      </div>

      <a href={listing.listing_url} target="_blank" rel="noreferrer" className="mt-3 block">
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 truncate text-[15px] font-semibold leading-5">
            {listing.location || listing.name}
          </h2>
          {rating ? (
            <span className="flex shrink-0 items-center gap-1 text-[15px] leading-5">
              <StarIcon className="h-[12px] w-[12px]" />
              {rating}
            </span>
          ) : null}
        </div>
        <p className="mt-[2px] truncate text-[15px] leading-5 text-muted">
          {listing.name}
        </p>
        <p className="truncate text-[15px] leading-5 text-muted">
          {listing.review_count
            ? `${listing.review_count.toLocaleString()} reviews`
            : "New listing"}
        </p>
        <p className="mt-1.5 text-[15px] leading-5">
          <span className="font-semibold">
            {priceLabel(listing.price, listing.currency)}
          </span>{" "}
          night
        </p>
      </a>
    </article>
  );
}
