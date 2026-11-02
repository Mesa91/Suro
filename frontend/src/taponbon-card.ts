import { LitElement, html, svg, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Bottle, CardConfig, HistoryEntry, Rack, Snapshot, matches, wineTitle } from "./types";
import { sharedStyles } from "./styles";
import "./bottle-dialog";
import "./add-dialog";
import "./racks-dialog";
import "./history-dialog";

type Dialog =
  | { kind: "add"; rackId: string | null; row: number | null; col: number | null }
  | { kind: "bottle"; bottleId: string }
  | { kind: "racks" }
  | { kind: "history" }
  | null;

// A standing Bordeaux bottle. Colour comes from --bottle; light and shade
// are shared gradients (defined once in SHARED_DEFS), so every bottle gets
// the same glass look whatever its colour.
const BOTTLE_SVG = svg`<svg viewBox="0 0 24 64" aria-hidden="true">
  <path class="glass" d="M9.6 6h4.8v12.5c0 3.2 6.6 4.6 6.6 11.5V60.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 60.5V30c0-6.9 6.6-8.3 6.6-11.5z"/>
  <path class="shade" d="M9.6 6h4.8v12.5c0 3.2 6.6 4.6 6.6 11.5V60.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 60.5V30c0-6.9 6.6-8.3 6.6-11.5z"/>
  <path class="capsule" d="M9.3 1.2c0-.7.5-1.2 1.2-1.2h3c.7 0 1.2.5 1.2 1.2v12.3H9.3z"/>
  <rect class="capsule-ring" x="9.3" y="11.6" width="5.4" height="1.2"/>
  <rect class="label" x="4.6" y="36" width="14.8" height="15" rx="0.8"/>
  <rect class="label-ink" x="7.5" y="40" width="9" height="1.4" rx="0.7"/>
  <rect class="label-ink thin" x="8.5" y="43.4" width="7" height="0.8" rx="0.4"/>
  <rect class="label-ink thin" x="9.5" y="46" width="5" height="0.8" rx="0.4"/>
  <path class="gloss" d="M5.6 31c.4-3.4 2.6-5 3.6-6v34.5H5.6z"/>
</svg>`;

const SHARED_DEFS = svg`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="tb-shade" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity=".55"/>
    <stop offset=".22" stop-color="#fff" stop-opacity=".18"/>
    <stop offset=".42" stop-color="#000" stop-opacity="0"/>
    <stop offset=".78" stop-color="#000" stop-opacity=".25"/>
    <stop offset="1" stop-color="#000" stop-opacity=".6"/>
  </linearGradient>
  <linearGradient id="tb-capsule" x1="0" x2="1">
    <stop offset="0" stop-color="#1b1412"/><stop offset=".35" stop-color="#5a4a42"/>
    <stop offset=".55" stop-color="#2a201c"/><stop offset="1" stop-color="#120c0a"/>
  </linearGradient>
  <linearGradient id="tb-capsule-warn" x1="0" x2="1">
    <stop offset="0" stop-color="#8a5300"/><stop offset=".35" stop-color="#ffcf6b"/>
    <stop offset=".55" stop-color="#d98a00"/><stop offset="1" stop-color="#6b3f00"/>
  </linearGradient>
  <linearGradient id="tb-capsule-past" x1="0" x2="1">
    <stop offset="0" stop-color="#6b0f12"/><stop offset=".35" stop-color="#ff7b72"/>
    <stop offset=".55" stop-color="#c62828"/><stop offset="1" stop-color="#4a0a0c"/>
  </linearGradient>
  <linearGradient id="tb-label" x1="0" x2="1">
    <stop offset="0" stop-color="#cfc2a8"/><stop offset=".3" stop-color="#f7f0e1"/>
    <stop offset=".75" stop-color="#ece2cc"/><stop offset="1" stop-color="#b9ab90"/>
  </linearGradient>
</defs></svg>`;

@customElement("taponbon-card")
export class TaponBonCard extends LitElement {
  @property({ attribute: false }) hass: any;
  @state() private _config: CardConfig = { type: "custom:taponbon-card" };
  @state() private _data: Snapshot | null = null;
  @state() private _error = "";
  @state() private _typeFilter = "";
  @state() private _query = "";
  @state() private _dialog: Dialog = null;
  @state() private _moving: Bottle | null = null;
  @state() private _toast = "";
  private _unsub?: () => void;
  private _subscribing = false;
  private _toastTimer?: number;

  setConfig(config: CardConfig) {
    this._config = { ...config };
  }

  static getStubConfig() {
    return { type: "custom:taponbon-card" };
  }

  getCardSize() {
    return 8;
  }

  getGridOptions() {
    return { columns: "full", min_columns: 6 };
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hass) this._subscribe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsub?.();
    this._unsub = undefined;
  }

  protected updated(changed: PropertyValues) {
    if (changed.has("hass") && this.hass && !this._unsub && !this._subscribing) this._subscribe();
  }

  private async _subscribe() {
    if (this._unsub || this._subscribing || !this.hass?.connection) return;
    this._subscribing = true;
    try {
      this._unsub = await this.hass.connection.subscribeMessage(
        (data: Snapshot) => {
          this._data = data;
          this._error = "";
        },
        { type: "taponbon/subscribe" },
      );
    } catch (err: any) {
      this._error =
        err?.code === "unknown_command"
          ? "L'integrazione TaponBon non è installata: aggiungila da Impostazioni → Dispositivi e servizi."
          : `Impossibile caricare la cantina: ${err?.message || err}`;
    } finally {
      this._subscribing = false;
    }
  }

  async ws(msg: Record<string, unknown>): Promise<any> {
    try {
      return await this.hass.callWS(msg);
    } catch (err: any) {
      this.toast(err?.message || "Operazione non riuscita");
      throw err;
    }
  }

  toast(text: string) {
    this._toast = text;
    clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => (this._toast = ""), 3500);
  }

  // ── interactions ─────────────────────────────────────────────────────────

  private _onCell(rack: Rack, row: number, col: number, bottle?: Bottle) {
    if (this._moving) {
      const moving = this._moving;
      this._moving = null;
      if (bottle?.id === moving.id) return;
      this.ws({ type: "taponbon/move_bottle", bottle_id: moving.id, rack_id: rack.id, row, col }).then(() =>
        this.toast(bottle ? "Bottiglie scambiate di posto" : "Bottiglia spostata"),
      );
      return;
    }
    this._dialog = bottle
      ? { kind: "bottle", bottleId: bottle.id }
      : { kind: "add", rackId: rack.id, row, col };
  }

  private _startMove = (e: CustomEvent) => {
    this._moving = e.detail.bottle;
    this._dialog = null;
  };

  // ── render ───────────────────────────────────────────────────────────────

  render() {
    const d = this._data;
    return html`
      <ha-card>
        ${SHARED_DEFS}
        ${this._error ? html`<div class="empty">${this._error}</div>` : !d ? html`<div class="empty">Carico la cantina…</div>` : this._renderBody(d)}
        ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
      </ha-card>
      ${d ? this._renderDialog(d) : nothing}
    `;
  }

  private _renderBody(d: Snapshot) {
    const total = d.bottles.length;
    const capacity = d.racks.reduce((s, r) => s + r.rows * r.cols, 0);
    const closing = d.bottles.filter((b) => b.alert === "closing").length;
    const past = d.bottles.filter((b) => b.alert === "past").length;
    const unplaced = d.bottles.filter((b) => !b.rack_id);
    const counts = Object.fromEntries(Object.keys(d.types).map((t) => [t, d.bottles.filter((b) => b.type === t).length]));
    const columns = Math.max(1, Math.min(6, Math.round(Number(this._config.columns)) || 0));

    return html`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title || "TaponBon"}</div>
            <div class="sub">${total} bottiglie · ${capacity - d.racks.reduce((s, r) => s + this._inRack(d, r).length, 0)} posti liberi</div>
          </div>
        </div>
        <div class="actions">
          <button class="btn primary" @click=${() => (this._dialog = { kind: "add", rackId: null, row: null, col: null })}>
            ＋ Aggiungi
          </button>
          <button class="btn" title="Storico" @click=${() => (this._dialog = { kind: "history" })}>🕓 Storico</button>
          <button class="btn" title="Scaffali e impostazioni" @click=${() => (this._dialog = { kind: "racks" })}>⚙︎</button>
        </div>
      </div>

      ${closing || past
        ? html`<div class="banner">
            ${closing ? html`<span>🍷 <b>${closing}</b> da bere presto</span>` : nothing}
            ${past ? html`<span>⚠️ <b>${past}</b> oltre la finestra di beva</span>` : nothing}
            <span class="hint">capsula dorata: da bere presto · capsula rossa: oltre la finestra</span>
          </div>`
        : nothing}

      ${this._moving
        ? html`<div class="banner moving">
            Tocca la nuova posizione per <b>${wineTitle(this._moving)}</b>
            <button class="btn small" @click=${() => (this._moving = null)}>Annulla</button>
          </div>`
        : nothing}

      <div class="filters">
        <button class="chip ${this._typeFilter ? "" : "active"}" @click=${() => (this._typeFilter = "")}>Tutti ${total}</button>
        ${Object.entries(d.types).map(
          ([key, t]) => html`<button
            class="chip ${this._typeFilter === key ? "active" : ""}"
            @click=${() => (this._typeFilter = this._typeFilter === key ? "" : key)}
          ><span class="dot" style="background:${t.color}"></span>${t.label} ${counts[key] || 0}</button>`,
        )}
        <input class="search" type="search" placeholder="Cerca vino, produttore, annata…"
          .value=${this._query} @input=${(e: Event) => (this._query = (e.target as HTMLInputElement).value)} />
      </div>

      <div class="racks ${columns ? "fixed" : ""}" style=${columns ? `--tb-columns:${columns}` : ""}>
        ${d.racks.map((rack) => this._renderRack(d, rack))}
      </div>

      ${unplaced.length
        ? html`<div class="unplaced">
            <div class="section-title">Da sistemare (${unplaced.length})</div>
            <div class="list">
              ${unplaced.map((b) => html`<button class="list-item ${this._dims(b) ? "dim" : ""}"
                  @click=${() => (this._dialog = { kind: "bottle", bottleId: b.id })}>
                  <span class="dot" style="background:${d.types[b.type]?.color}"></span>${wineTitle(b)}
                </button>`)}
            </div>
          </div>`
        : nothing}
      ${!d.racks.length ? html`<div class="empty">Nessuno scaffale: creane uno da ⚙︎.</div>` : nothing}
    `;
  }

  private _inRack(d: Snapshot, rack: Rack) {
    return d.bottles.filter((b) => b.rack_id === rack.id && b.row != null && b.col != null);
  }

  private _dims(b: Bottle) {
    return (this._typeFilter && b.type !== this._typeFilter) || !matches(b, this._query);
  }

  private _renderRack(d: Snapshot, rack: Rack) {
    const inRack = this._inRack(d, rack);
    const at = new Map(inRack.map((b) => [`${b.row}:${b.col}`, b]));
    const cells = [];
    for (let r = 0; r < rack.rows; r++) {
      for (let c = 0; c < rack.cols; c++) {
        const b = at.get(`${r}:${c}`);
        const color = b ? d.types[b.type]?.color || "#888" : "";
        cells.push(html`<button
          class="cell ${b ? "full" : "free"} ${b && this._dims(b) ? "dim" : ""} ${b?.alert || ""} ${this._moving?.id === b?.id && b ? "moving" : ""}"
          style=${b ? `--bottle:${color}` : ""}
          title=${b ? `${wineTitle(b)}${b.producer ? ` · ${b.producer}` : ""}` : `Fila ${r + 1}, posto ${c + 1}: libero`}
          @click=${() => this._onCell(rack, r, c, b)}
        >${BOTTLE_SVG}</button>`);
      }
    }
    return html`
      <div class="rack">
        <div class="rack-head"><span>${rack.name}</span><span class="muted">${inRack.length}/${rack.rows * rack.cols}</span></div>
        <div class="grid" style="grid-template-columns: repeat(${rack.cols}, minmax(0, 30px))">${cells}</div>
      </div>
    `;
  }

  private _renderDialog(d: Snapshot) {
    const dlg = this._dialog;
    if (!dlg) return nothing;
    const close = () => (this._dialog = null);
    switch (dlg.kind) {
      case "add":
        return html`<tb-add-dialog .card=${this} .data=${d} .rackId=${dlg.rackId} .row=${dlg.row} .col=${dlg.col} @close=${close}></tb-add-dialog>`;
      case "bottle": {
        const bottle = d.bottles.find((b) => b.id === dlg.bottleId);
        if (!bottle) return nothing;
        return html`<tb-bottle-dialog .card=${this} .data=${d} .bottle=${bottle} @close=${close} @move=${this._startMove}></tb-bottle-dialog>`;
      }
      case "racks":
        return html`<tb-racks-dialog .card=${this} .data=${d} @close=${close}></tb-racks-dialog>`;
      case "history":
        return html`<tb-history-dialog .card=${this} .data=${d} @close=${close}></tb-history-dialog>`;
    }
  }

  static styles = [
    sharedStyles,
    css`
      ha-card {
        overflow: hidden;
        position: relative;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 16px 16px 8px;
        flex-wrap: wrap;
      }
      .title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .logo {
        font-size: 1.8em;
      }
      .name {
        font-size: 1.3em;
        font-weight: 600;
      }
      .sub,
      .muted {
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .actions {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .banner {
        margin: 4px 16px 8px;
        padding: 8px 12px;
        border-radius: 10px;
        background: rgba(255, 152, 0, 0.12);
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        align-items: center;
        font-size: 0.9em;
      }
      .banner.moving {
        background: rgba(33, 150, 243, 0.15);
        justify-content: space-between;
      }
      .hint {
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .filters {
        display: flex;
        gap: 6px;
        padding: 4px 16px 10px;
        flex-wrap: wrap;
        align-items: center;
      }
      .search {
        flex: 1 1 180px;
        min-width: 150px;
        padding: 7px 10px;
        border-radius: 18px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font: inherit;
      }
      .racks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 14px;
        padding: 4px 16px 16px;
      }
      @media (min-width: 600px) {
        .racks.fixed {
          grid-template-columns: repeat(var(--tb-columns), minmax(0, 1fr));
        }
      }
      .rack {
        border-radius: 18px;
        padding: 14px 14px 18px;
        background:
          radial-gradient(120% 60% at 50% 0%, rgba(255, 255, 255, 0.06), transparent 60%),
          linear-gradient(180deg, #1d1a1a, #121011);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.35);
      }
      .rack-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        color: #f1e9df;
        font-weight: 600;
        letter-spacing: 0.02em;
        padding: 0 2px 14px;
      }
      .rack-head .muted {
        color: #9b928a;
        font-variant-numeric: tabular-nums;
      }
      .grid {
        display: grid;
        gap: 14px 7px;
        justify-content: center;
      }
      .cell {
        aspect-ratio: 24 / 64;
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        transition: transform 0.18s ease, opacity 0.2s, filter 0.2s;
      }
      .cell::before {
        /* the shelf the bottle stands on */
        content: "";
        position: absolute;
        left: -4px;
        right: -4px;
        bottom: -7px;
        height: 3px;
        border-radius: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
      }
      .cell svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }
      .cell .shade { fill: url(#tb-shade); }
      .cell .capsule, .cell .capsule-ring { fill: url(#tb-capsule); }
      .cell .capsule-ring { opacity: 0.6; }
      .cell .label { fill: url(#tb-label); }
      .cell .label-ink { fill: rgba(60, 30, 20, 0.55); }
      .cell .label-ink.thin { fill: rgba(60, 30, 20, 0.35); }
      .cell .gloss { fill: rgba(255, 255, 255, 0.22); }
      .cell.full .glass { fill: var(--bottle); }
      .cell.full {
        filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.55));
      }
      .cell.full:hover {
        transform: translateY(-4px);
        filter: drop-shadow(0 8px 6px rgba(0, 0, 0, 0.6));
      }
      .cell.free .glass {
        fill: rgba(255, 255, 255, 0.035);
        stroke: rgba(255, 255, 255, 0.14);
        stroke-width: 0.5;
        stroke-dasharray: 1.6 1.4;
      }
      .cell.free .shade, .cell.free .capsule, .cell.free .capsule-ring,
      .cell.free .label, .cell.free .label-ink, .cell.free .gloss { display: none; }
      .cell.free:hover .glass {
        fill: rgba(255, 255, 255, 0.1);
        stroke: rgba(255, 255, 255, 0.4);
      }
      .cell.closing .capsule, .cell.closing .capsule-ring { fill: url(#tb-capsule-warn); }
      .cell.past .capsule, .cell.past .capsule-ring { fill: url(#tb-capsule-past); }
      .cell.closing { filter: drop-shadow(0 0 5px rgba(255, 190, 70, 0.55)) drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5)); }
      .cell.past { filter: drop-shadow(0 0 5px rgba(255, 90, 80, 0.55)) drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5)); }
      .cell.dim {
        opacity: 0.15;
        filter: grayscale(0.6);
      }
      .cell.moving {
        outline: 2px solid #2196f3;
        outline-offset: 2px;
        border-radius: 4px;
      }
      .unplaced {
        padding: 0 16px 16px;
      }
      .section-title {
        font-weight: 600;
        margin-bottom: 6px;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .list-item {
        display: flex;
        align-items: center;
        gap: 6px;
        border: 1px solid var(--divider-color);
        background: none;
        color: inherit;
        border-radius: 16px;
        padding: 5px 10px;
        cursor: pointer;
        font: inherit;
      }
      .list-item.dim {
        opacity: 0.3;
      }
      .empty {
        padding: 24px 16px;
        text-align: center;
        color: var(--secondary-text-color);
      }
      .toast {
        position: absolute;
        left: 50%;
        bottom: 14px;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.85);
        color: #fff;
        padding: 8px 14px;
        border-radius: 18px;
        font-size: 0.9em;
        z-index: 2;
      }
    `,
  ];
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "taponbon-card",
  name: "TaponBon",
  description: "La tua cantina: scaffali, bottiglie, QR e finestre di beva",
  preview: false,
});

export type { HistoryEntry };
