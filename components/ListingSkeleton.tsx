export function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[20/19] rounded-xl bg-[#EBEBEB]" />
          <div className="mt-3 h-4 w-3/4 rounded bg-[#EBEBEB]" />
          <div className="mt-2 h-4 w-1/2 rounded bg-[#EBEBEB]" />
          <div className="mt-2 h-4 w-1/3 rounded bg-[#EBEBEB]" />
        </div>
      ))}
    </div>
  );
}
