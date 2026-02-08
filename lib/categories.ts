export function parseCategoryCsv(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function normalizeCategoryCsv(value: string): string {
  return parseCategoryCsv(value).join(",");
}
