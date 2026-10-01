"use client";

import { useRef, useState } from "react";
import { StatusBanner } from "@/components/collect/StatusBanner";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { EmptyState } from "@/components/listings/EmptyState";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { ListingSkeleton } from "@/components/listings/ListingSkeleton";
import { filterListings } from "@/lib/listings/filter";
import type { CollectResponse, Listing } from "@/lib/supabase/types";

type PageStatus =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; inserted: number; updated: number }
  | { kind: "error"; message: string };

type HomePageProps = {
  initialListings: Listing[];
  initialError: string | null;
};

export function HomePage({ initialListings, initialError }: HomePageProps) {
  const [listings, setListings] = useState(initialListings);
  const [where, setWhere] = useState("");
  const [category, setCategory] = useState("all");
  const [collecting, setCollecting] = useState(false);
  const [status, setStatus] = useState<PageStatus>(
    initialError
      ? { kind: "error", message: initialError }
      : { kind: "idle" },
  );
  const inFlight = useRef(false);

  async function loadListings() {
    const response = await fetch("/api/listings");
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Could not load listings");
    }

    setListings(payload.listings ?? []);
  }

  async function handleCollect() {
    if (inFlight.current) return;
    inFlight.current = true;
    setCollecting(true);
    setStatus({ kind: "loading" });

    try {
      const response = await fetch("/api/collect", { method: "POST" });
      const payload = (await response.json()) as CollectResponse;

      if (!response.ok) {
        throw new Error(payload.error || "Collection failed");
      }

      await loadListings();
      setStatus({
        kind: "success",
        inserted: payload.inserted,
        updated: payload.updated,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Collection failed";
      setStatus({ kind: "error", message });
    } finally {
      inFlight.current = false;
      setCollecting(false);
    }
  }

  const visible = filterListings(listings, where, category);
  const showSkeletons = collecting && listings.length === 0;

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-40 bg-page">
        <Header
          where={where}
          onWhereChange={setWhere}
          collecting={collecting}
          onCollect={handleCollect}
        />
        <CategoryNav active={category} onChange={setCategory} />
        {status.kind === "loading" ? <StatusBanner kind="loading" /> : null}
        {status.kind === "success" ? (
          <StatusBanner
            kind="success"
            inserted={status.inserted}
            updated={status.updated}
          />
        ) : null}
        {status.kind === "error" ? (
          <StatusBanner
            kind="error"
            message={status.message}
            onRetry={handleCollect}
          />
        ) : null}
      </div>

      <main className="flex-1 px-6 py-7 lg:px-12 lg:py-8 xl:px-20">
        <div className="mb-6">
          <h1 className="text-[22px] font-semibold tracking-[-0.03em]">
            Homes
          </h1>
          <p className="mt-1 text-[14px] text-muted">
            {visible.length} stay{visible.length === 1 ? "" : "s"}
          </p>
        </div>

        {showSkeletons ? (
          <ListingSkeleton />
        ) : visible.length > 0 ? (
          <ListingGrid listings={visible} />
        ) : (
          <EmptyState
            collecting={collecting}
            onCollect={handleCollect}
            filtered={listings.length > 0}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
