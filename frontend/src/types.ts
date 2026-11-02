export interface Rack {
  id: string;
  name: string;
  rows: number;
  cols: number;
  /** Bottles per shelf, top to bottom. */
  shelves: number[];
  order: number;
}

export function shelvesOf(rack: Rack): number[] {
  return rack.shelves?.length ? rack.shelves : Array(rack.rows).fill(rack.cols);
}

export function capacityOf(rack: Rack): number {
  return shelvesOf(rack).reduce((a, b) => a + b, 0);
}

export interface Bottle {
  id: string;
  code: string;
  name: string;
  producer?: string;
  vintage?: number | null;
  type: string;
  region?: string;
  country?: string;
  grape?: string;
  drink_from?: number | null;
  drink_until?: number | null;
  price?: number | null;
  notes?: string;
  rack_id: string | null;
  row: number | null;
  col: number | null;
  added_at: string;
  alert?: "closing" | "past" | null;
}

export interface HistoryEntry extends Bottle {
  history_id: string;
  removed_at: string;
  reason: string;
}

export interface Snapshot {
  racks: Rack[];
  bottles: Bottle[];
  settings: { auto_labels: boolean; alert_days: number };
  types: Record<string, { label: string; color: string }>;
  reasons: Record<string, string>;
  history_count: number;
}

export interface CardConfig {
  type: string;
  title?: string;
  /** Racks per row from tablet width up. */
  columns?: number;
}

export const WINE_FIELDS: { key: keyof Bottle; label: string; kind: "text" | "number" | "year" | "area" }[] = [
  { key: "name", label: "Nome del vino", kind: "text" },
  { key: "producer", label: "Produttore", kind: "text" },
  { key: "vintage", label: "Annata", kind: "year" },
  { key: "region", label: "Regione / denominazione", kind: "text" },
  { key: "country", label: "Paese", kind: "text" },
  { key: "grape", label: "Vitigno", kind: "text" },
  { key: "drink_from", label: "Da bere dal", kind: "year" },
  { key: "drink_until", label: "Da bere entro il", kind: "year" },
  { key: "price", label: "Prezzo (€)", kind: "number" },
  { key: "notes", label: "Note", kind: "area" },
];

export function wineTitle(b: { name?: string; vintage?: number | null }): string {
  return `${b.name || "Vino"}${b.vintage ? ` ${b.vintage}` : ""}`;
}

export function locationText(b: Bottle, racks: Rack[]): string {
  const rack = racks.find((r) => r.id === b.rack_id);
  if (!rack || b.row == null || b.col == null) return "Da sistemare";
  return `${rack.name} · mensola ${b.row + 1}, posto ${b.col + 1}`;
}

export function windowText(b: Bottle): string {
  if (b.drink_from && b.drink_until) return `${b.drink_from}–${b.drink_until}`;
  if (b.drink_until) return `entro il ${b.drink_until}`;
  if (b.drink_from) return `dal ${b.drink_from}`;
  return "";
}

export function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function matches(b: Bottle, query: string): boolean {
  if (!query) return true;
  const hay = normalize(
    [b.name, b.producer, b.vintage, b.region, b.country, b.grape, b.notes, b.code].filter(Boolean).join(" "),
  );
  return normalize(query).split(/\s+/).every((word) => hay.includes(word));
}
