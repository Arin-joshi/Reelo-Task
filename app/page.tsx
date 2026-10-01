"use client";

import { useEffect, useState } from "react";
import { CategoryNav } from "@/components/CategoryNav";
import { EmptyState } from "@/components/EmptyState";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListingCard } from "@/components/ListingCard";
import { ListingSkeleton } from "@/components/ListingSkeleton";
import type { Listing } from "@/lib/types";

export default function Page() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [where, setWhere] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"rating" | "price">("rating");
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ inserted: number; updated: number } | null>(
    null,
  );

  async function loadListings() {
    const res = await fetch("/api/listings");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "could not load listings");
    setListings(data.listings ?? []);
  }

  useEffect(() => {
    loadListings()
      .catch((err) => setError(err instanceof Error ? err.message : "failed"))
      .finally(() => setLoading(false));
  }, []);

  async function collect() {
    if (collecting) return;
    setCollecting(true);
    setError(null);
    setSaved(null);

    try {
      const res = await fetch("/api/collect", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "collect failed");
      await loadListings();
      setSaved({ inserted: data.inserted, updated: data.updated });
    } catch (err) {
      setError(err instanceof Error ? err.message : "collect failed");
    } finally {
      setCollecting(false);
    }
  }

  const q = where.trim().toLowerCase();
  const visible = listings
    .filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (!q) return true;
      return `${l.name} ${l.location ?? ""}`.toLowerCase().includes(q);
    })
    .sort((a, b) =>
      sort === "price"
        ? (a.price ?? 0) - (b.price ?? 0)
        : (b.rating ?? 0) - (a.rating ?? 0),
    );

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-40 bg-page">
        <Header
          where={where}
          onWhereChange={setWhere}
          collecting={collecting}
          onCollect={collect}
        />
        <CategoryNav active={category} onChange={setCategory} />
        {collecting ? (
          <p className="border-b border-line bg-fog px-6 py-2.5 text-[13px] lg:px-12 xl:px-20">
            Collecting listings...
          </p>
        ) : null}
        {saved ? (
          <p className="border-b border-line bg-fog px-6 py-2.5 text-[13px] lg:px-12 xl:px-20">
            {saved.inserted} new, {saved.updated} already saved
          </p>
        ) : null}
        {error ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-[#FFF8F6] px-6 py-2.5 text-[13px] lg:px-12 xl:px-20">
            <p>{error}</p>
            <button
              type="button"
              onClick={collect}
              className="font-semibold text-rausch hover:underline"
            >
              Try again
            </button>
          </div>
        ) : null}
      </div>

      <main className="flex-1 px-6 py-7 lg:px-12 lg:py-8 xl:px-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-semibold tracking-[-0.03em]">
              Homes
            </h1>
            <p className="mt-1 text-[14px] text-muted">
              {visible.length} stay{visible.length === 1 ? "" : "s"}
            </p>
          </div>
          <label className="flex items-center gap-2 text-[13px] text-muted">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "rating" | "price")}
              className="h-9 rounded-lg border border-line bg-white px-3 text-[13px] text-ink outline-none"
            >
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </label>
        </div>

        {loading || (collecting && listings.length === 0) ? (
          <ListingSkeleton />
        ) : visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {visible.map((listing) => (
              <ListingCard key={listing.airbnb_id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            collecting={collecting}
            onCollect={collect}
            filtered={listings.length > 0}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
