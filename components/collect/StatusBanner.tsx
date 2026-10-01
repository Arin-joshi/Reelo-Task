"use client";

type StatusBannerProps =
  | { kind: "loading" }
  | { kind: "success"; inserted: number; updated: number }
  | { kind: "error"; message: string; onRetry?: () => void };

export function StatusBanner(props: StatusBannerProps) {
  if (props.kind === "loading") {
    return (
      <div className="border-b border-line bg-fog">
        <p className="px-6 py-2.5 text-[13px] text-ink lg:px-12 xl:px-20">
          Collecting listings...
        </p>
      </div>
    );
  }

  if (props.kind === "error") {
    return (
      <div className="border-b border-line bg-[#FFF8F6]">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2.5 text-[13px] lg:px-12 xl:px-20">
          <p className="text-ink">{props.message || "Something went wrong."}</p>
          {props.onRetry ? (
            <button
              type="button"
              onClick={props.onRetry}
              className="font-semibold text-rausch underline-offset-2 hover:underline"
            >
              Try again
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-line bg-fog">
      <p className="px-6 py-2.5 text-[13px] text-ink lg:px-12 xl:px-20">
        {props.inserted} new, {props.updated} already saved
      </p>
    </div>
  );
}
