import { CollectButton } from "@/components/CollectButton";

export function EmptyState({
  collecting,
  onCollect,
  filtered = false,
}: {
  collecting: boolean;
  onCollect: () => void;
  filtered?: boolean;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
      <h2 className="text-[22px] font-semibold">
        {filtered ? "No matches" : "No listings yet"}
      </h2>
      <p className="mt-2 text-[15px] text-muted">
        {filtered
          ? "Try a different search or category."
          : "Click Collect Data to pull listings from Airbnb."}
      </p>
      {!filtered ? (
        <div className="mt-6">
          <CollectButton loading={collecting} onClick={onCollect} />
        </div>
      ) : null}
    </div>
  );
}
