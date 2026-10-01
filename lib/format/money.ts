const currencyDisplays: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export function formatNightlyPrice(amount: number | null, currency: string) {
  if (amount == null) return "—";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    const symbol = currencyDisplays[currency] ?? `${currency} `;
    return `${symbol}${Math.round(amount)}`;
  }
}

export function formatRating(rating: number | null) {
  if (rating == null) return null;
  return rating.toFixed(2);
}
