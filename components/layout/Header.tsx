"use client";

import Link from "next/link";
import { CollectButton } from "@/components/collect/CollectButton";
import {
  AirbnbMark,
  GlobeIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";

type HeaderProps = {
  where: string;
  onWhereChange: (value: string) => void;
  collecting: boolean;
  onCollect: () => void;
};

export function Header({
  where,
  onWhereChange,
  collecting,
  onCollect,
}: HeaderProps) {
  return (
    <header className="border-b border-line bg-page">
      <div className="flex items-center justify-between gap-4 px-6 py-[14px] lg:px-12 xl:px-20">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 text-rausch">
          <AirbnbMark className="h-8 w-8" />
          <span className="hidden text-[22px] font-bold leading-none tracking-[-0.06em] lg:inline">
            airbnb
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
          <label className="flex h-[52px] w-full max-w-[720px] items-center rounded-full border border-line bg-white shadow-[0_3px_12px_rgba(0,0,0,0.10)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)]">
            <span className="flex min-w-0 flex-1 flex-col justify-center rounded-full px-5 py-1.5 hover:bg-fog">
              <span className="text-[11px] font-semibold leading-4">Where</span>
              <input
                value={where}
                onChange={(event) => onWhereChange(event.target.value)}
                placeholder="Search destinations"
                className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
              />
            </span>
            <span className="hidden h-7 w-px bg-line lg:block" />
            <span className="hidden min-w-[108px] flex-col justify-center rounded-full px-4 py-1.5 hover:bg-fog lg:flex">
              <span className="text-[11px] font-semibold leading-4">Check in</span>
              <span className="text-[13px] text-muted">Add dates</span>
            </span>
            <span className="hidden h-7 w-px bg-line lg:block" />
            <span className="hidden min-w-[108px] flex-col justify-center rounded-full px-4 py-1.5 hover:bg-fog lg:flex">
              <span className="text-[11px] font-semibold leading-4">
                Check out
              </span>
              <span className="text-[13px] text-muted">Add dates</span>
            </span>
            <span className="hidden h-7 w-px bg-line xl:block" />
            <span className="flex items-center gap-3 rounded-full py-1 pl-4 pr-1.5 hover:bg-fog">
              <span className="hidden flex-col justify-center xl:flex">
                <span className="text-[11px] font-semibold leading-4">Who</span>
                <span className="text-[13px] text-muted">Add guests</span>
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rausch text-white shadow-[0_2px_6px_rgba(255,56,92,0.35)]">
                <SearchIcon className="h-3.5 w-3.5" />
              </span>
            </span>
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <CollectButton loading={collecting} onClick={onCollect} />
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-fog lg:inline-flex"
            aria-label="Language"
          >
            <GlobeIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line pl-3 pr-1.5 transition hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            aria-label="Account menu"
          >
            <MenuIcon className="h-4 w-4 text-ink" />
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#222] text-white">
              <UserIcon className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-3 md:hidden">
        <label className="flex h-12 items-center gap-3 rounded-full border border-line bg-white px-4 shadow-[0_3px_12px_rgba(0,0,0,0.10)]">
          <SearchIcon className="h-4 w-4 text-ink" />
          <input
            value={where}
            onChange={(event) => onWhereChange(event.target.value)}
            placeholder="Start your search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
      </div>
    </header>
  );
}
