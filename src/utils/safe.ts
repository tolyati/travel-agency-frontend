export function safeLower(v: unknown): string {
  if (typeof v !== "string") return "guest";
  return v.toLowerCase();
}