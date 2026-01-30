export function confidenceLabel(confidence?: number): string {
  if (confidence === undefined || confidence === null) return "Estimated";

  if (confidence >= 0.75) return "High confidence";
  if (confidence >= 0.55) return "Medium confidence";
  return "Low confidence";
}
