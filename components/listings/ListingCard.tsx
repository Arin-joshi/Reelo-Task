"use client";

import Image from "next/image";
import { useState } from "react";
import { HeartIcon, StarIcon } from "@/components/icons";
import { formatNightlyPrice, formatRating } from "@/lib/format/money";
import type { Listing } from "@/lib/supabase/types";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);
  const rating = formatRating(listing.rating);
  const imageSrc = listing.image_url;
  const showImage = Boolean(imageSrc) && !imageBroken;

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
            {showImage ? (
              <Image
                src={imageSrc as string}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                onError={() => setImageBroken(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#d9d9d9] via-[#ececec] to-[#cfcfcf]" />
            )}
          </div>
        </a>

        {listing.is_guest_favorite ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-[6px] text-[12px] font-semibold tracking-[-0.01em] text-ink shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            Guest favorite
          </span>
        ) : null}

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => setSaved((value) => !value)}
          className="absolute right-3 top-3 rounded-full p-1 transition hover:scale-110"
        >
          <HeartIcon filled={saved} className="h-7 w-7" />
        </button>
      </div>

      <a
        href={listing.listing_url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 block"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 truncate text-[15px] font-semibold leading-5 tracking-[-0.01em]">
            {listing.location || "Airbnb listing"}
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
            {formatNightlyPrice(listing.price, listing.currency)}
          </span>{" "}
          <span className="font-normal text-ink">night</span>
        </p>
      </a>
    </article>
  );
}
