"use client";

type Category = {
  id: string;
  label: string;
};

const CATEGORIES: Category[] = [
  { id: "all", label: "All homes" },
  { id: "beach", label: "Beach" },
  { id: "cabins", label: "Cabins" },
  { id: "views", label: "Amazing views" },
  { id: "countryside", label: "Countryside" },
  { id: "tiny", label: "Tiny homes" },
  { id: "design", label: "Design" },
  { id: "parks", label: "National parks" },
];

type CategoryNavProps = {
  active: string;
  onChange: (id: string) => void;
};

export function CategoryNav({ active, onChange }: CategoryNavProps) {
  return (
    <nav className="border-b border-line bg-page">
      <div className="flex items-end gap-5 px-6 pt-2 pb-0 lg:px-12 xl:px-20">
        <div className="flex flex-1 gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((category) => {
            const isActive = category.id === active;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onChange(category.id)}
                className={`flex min-w-fit flex-col items-center gap-1.5 px-1 pb-3 text-[12px] font-semibold tracking-[-0.01em] transition ${
                  isActive
                    ? "border-b-2 border-ink text-ink"
                    : "border-b-2 border-transparent text-muted hover:border-[#dddddd] hover:text-ink"
                }`}
              >
                <CategoryGlyph name={category.id} />
                {category.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="mb-2 hidden h-11 shrink-0 items-center gap-2 rounded-xl border border-[#b0b0b0] px-4 text-sm font-semibold transition hover:border-ink hover:shadow-sm md:inline-flex"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M2 4h12M4 8h8M6 12h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Filters
        </button>
      </div>
    </nav>
  );
}

function CategoryGlyph({ name }: { name: string }) {
  const common = "h-6 w-6";

  switch (name) {
    case "beach":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M4 16c2-3 4.5-5 8-5s6 2 8 5M3 19h18M12 4v4M8 6l1.5 2M16 6l-1.5 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "cabins":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M4 18V11l8-6 8 6v7H4Zm6 0v-5h4v5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "views":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M3 16l6-7 4 4 3-3 5 6H3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "countryside":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M4 18h16M6 18V9l6-4 6 4v9M10 18v-4h4v4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tiny":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M7 18V10l5-4 5 4v8H7Zm3-3h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M5 10h14M10 10v9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "parks":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M12 20V11M7 20h10M12 11c-3 0-5-2-5-5 3 0 5 2 5 5Zm0 0c3 0 5-2 5-5-3 0-5 2-5 5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none">
          <path
            d="M4 11.5 12 5l8 6.5V19H4v-7.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
