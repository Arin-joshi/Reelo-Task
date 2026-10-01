import "dotenv/config";
import { scrapeListings } from "../lib/scrape";
import { saveListings } from "../lib/db";

async function main() {
  const listings = await scrapeListings();
  const { inserted, updated } = await saveListings(listings);
  console.log(`saved ${listings.length} (${inserted} new, ${updated} updated)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
