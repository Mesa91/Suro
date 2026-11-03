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
  alcohol?: string;
  description?: string;
  food_pairings?: string;
  rack_id: string | null;
  row: number | null;
  col: number | null;
  added_at: string;
  alert?: "closing" | "past" | null;
  /** Average vote of bottles of the same wine already drunk. */
  past_rating?: number | null;
  past_count?: number;
  past_notes?: string;
  /** Set aside for an occasion: excluded from pairings. */
  reserved_for?: string;
  reserved_until?: string;
}

export interface Wish extends Partial<Bottle> {
  id: string;
  name: string;
  type: string;
  added_at: string;
  source: "manual" | "rebuy";
  where?: string;
  wish_notes?: string;
  rating?: number;
}

export interface InventoryReport {
  started_at: string;
  rack_id: string | null;
  total: number;
  seen: number;
  unknown: number;
  last: { code: string; name: string | null; vintage: number | null; result: string } | null;
  missing: string[];
  misplaced: string[];
  found_taken: string[];
}

export interface HistoryEntry extends Bottle {
  history_id: string;
  removed_at: string;
  reason: string;
  rating?: number | null;
  tasting_notes?: string;
}

export interface Snapshot {
  racks: Rack[];
  bottles: Bottle[];
  settings: { auto_labels: boolean; alert_days: number; label_format: "qr" | "qr30" | "full" };
  types: Record<string, { label: string; color: string }>;
  reasons: Record<string, string>;
  history_count: number;
  value?: { total: number; priced: number; bottles: number };
  wishlist?: Wish[];
  inventory?: InventoryReport | null;
  highlight?: Highlight | null;
  ai: boolean;
  printer: boolean;
  climate: {
    temperature_entity: string | null;
    humidity_entity: string | null;
    temperature_min: number;
    temperature_max: number;
    humidity_min: number;
    humidity_max: number;
  };
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
  { key: "alcohol", label: "Gradazione", kind: "text" },
  { key: "price", label: "Prezzo (€)", kind: "number" },
  { key: "food_pairings", label: "Abbinamenti", kind: "area" },
  { key: "description", label: "Descrizione", kind: "area" },
  { key: "notes", label: "Note personali", kind: "area" },
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

export interface Highlight {
  source: "search" | "pair" | "menu";
  query: string;
  started_at: string;
  groups: { label: string; color: string; bottle_ids: string[] }[];
}

/** Warm white for a plain search; one colour per course of a menu (same on the shelf LEDs). */
export const SEARCH_COLOR = "#ffe2b0";
export const COURSE_COLORS = ["#4fc3f7", "#81c784", "#e0525f", "#ffb74d", "#ba68c8", "#f48fb1", "#4db6ac", "#fff176"];
