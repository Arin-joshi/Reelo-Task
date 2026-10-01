import { parseListings } from "@/lib/parse";
import { fallbackListings } from "@/lib/seed";
import type { ListingInput } from "@/lib/types";

const HOME = "https://www.airbnb.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

async function htmlFromBrowser() {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(UA);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(HOME, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector('a[href*="/rooms/"]', { timeout: 20000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1500));
    return await page.content();
  } finally {
    await browser.close().catch(() => {});
  }
}

async function htmlFromFetch() {
  const res = await fetch(HOME, {
    cache: "no-store",
    headers: {
      accept: "text/html",
      "accept-language": "en-US,en;q=0.9",
      "user-agent": UA,
    },
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) throw new Error(`airbnb.com returned ${res.status}`);
  return res.text();
}

export async function scrapeListings(): Promise<ListingInput[]> {
  try {
    let html: string;
    try {
      html = await htmlFromBrowser();
    } catch {
      html = await htmlFromFetch();
    }

    const listings = parseListings(html);
    if (listings.length) return listings;
  } catch {
    // airbnb often blocks server IPs
  }

  return fallbackListings();
}
