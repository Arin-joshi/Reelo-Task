import { CollectButton } from "@/components/collect/CollectButton";

type EmptyStateProps = {
  collecting: boolean;
  onCollect: () => void;
  filtered?: boolean;
};

export function EmptyState({
  collecting,
  onCollect,
  filtered = false,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[52vh] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-7 flex h-28 w-28 items-center justify-center rounded-3xl bg-fog">
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-muted" fill="none">
          <path
            d="M8 22.5 24 10l16 12.5V38a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V22.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M20 40V28h8v12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="text-[26px] font-semibold tracking-[-0.03em]">
        {filtered ? "No matches" : "No listings yet"}
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-6 text-muted">
        {filtered
          ? "Try a different search or category."
          : "Click Collect Data to pull listings."}
      </p>
      {!filtered ? (
        <div className="mt-7">
          <CollectButton loading={collecting} onClick={onCollect} />
        </div>
      ) : null}
    </div>
  );
}
