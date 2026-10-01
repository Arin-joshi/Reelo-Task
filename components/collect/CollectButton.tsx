"use client";

import { SpinnerIcon } from "@/components/icons";

type CollectButtonProps = {
  loading: boolean;
  onClick: () => void;
  className?: string;
};

export function CollectButton({
  loading,
  onClick,
  className = "",
}: CollectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-rausch px-5 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-[0_2px_8px_rgba(255,56,92,0.28)] transition hover:bg-rausch-hover disabled:cursor-not-allowed disabled:opacity-75 ${className}`}
    >
      {loading ? (
        <SpinnerIcon className="h-4 w-4 animate-spin" />
      ) : null}
      {loading ? "Collecting" : "Collect Data"}
    </button>
  );
}
