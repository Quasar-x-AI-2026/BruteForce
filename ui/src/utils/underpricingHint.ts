export function underpricingHint(confidence?: number): string | null {
  if (confidence === undefined || confidence === null) return null;

  if (confidence >= 0.75) {
    return "Similar handmade items are often underpriced by 20–30%.";
  }

  if (confidence >= 0.55) {
    return "Similar handmade items can be underpriced by 10–18%.";
  }

  return "Handmade products are frequently undervalued in open markets.";
}
