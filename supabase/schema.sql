create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  airbnb_id text not null unique,
  name text not null,
  price numeric,
  currency text not null default 'USD',
  location text,
  rating numeric,
  review_count int,
  image_url text,
  listing_url text not null,
  category text,
  is_guest_favorite boolean not null default false,
  collected_at timestamptz not null default now()
);

create index if not exists listings_collected_at_idx
  on public.listings (collected_at desc);

alter table public.listings enable row level security;

drop policy if exists "Public can read listings" on public.listings;
create policy "Public can read listings"
  on public.listings
  for select
  to anon, authenticated
  using (true);

grant select on public.listings to anon, authenticated;
grant select, insert, update, delete on public.listings to service_role;
