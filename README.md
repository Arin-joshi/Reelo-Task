# Airbnb listings

Scrape cards from airbnb.com, save them in Supabase, show them in the UI.

The browser only talks to this app (`POST /api/collect`, `GET /api/listings`). Collect writes. The page reads.

## Setup

1. Run `supabase/schema.sql` in the Supabase SQL editor
2. Copy `.env.example` to `.env` and add your keys
3. `npm install`
4. `npm run dev`

`npm run scrape` does the same thing as the Collect Data button, from the terminal.
