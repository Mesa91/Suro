import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Bottle, CardConfig, HistoryEntry, Rack, Snapshot, capacityOf, matches, shelvesOf, wineTitle } from "./types";
import { sharedStyles } from "./styles";
import { BOTTLE_DEFS, EMPTY_SVG, bottleSvg } from "./bottle";
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
        ${BOTTLE_DEFS}
        ${this._error ? html`<div class="empty">${this._error}</div>` : !d ? html`<div class="empty">Carico la cantina…</div>` : this._renderBody(d)}
        ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
      </ha-card>
      ${d ? this._renderDialog(d) : nothing}
    `;
  }

  private _renderBody(d: Snapshot) {
    const total = d.bottles.length;
    const capacity = d.racks.reduce((s, r) => s + capacityOf(r), 0);
    const closing = d.bottles.filter((b) => b.alert === "closing").length;
    const past = d.bottles.filter((b) => b.alert === "past").length;
    const unplaced = d.bottles.filter((b) => !b.rack_id);
    const counts = Object.fromEntries(Object.keys(d.types).map((t) => [t, d.bottles.filter((b) => b.type === t).length]));
    // Never more columns than racks: one rack should use the whole width.
    const wanted = Math.round(Number(this._config.columns)) || 0;
    const columns = wanted ? Math.max(1, Math.min(6, wanted, d.racks.length || 1)) : 0;

    return html`
      <div class="header">
        <div class="title">
          <span class="logo">🍷</span>
          <div>
            <div class="name">${this._config.title || "TaponBon"}</div>
            <div class="sub">${total} bottiglie · ${capacity - d.racks.reduce((s, r) => s + this._inRack(d, r).length, 0)} posti liberi</div>
          </div>
        </div>
        ${this._renderClimate(d)}
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
            <span class="hint">cartellino dorato: da bere presto · rosso: oltre la finestra</span>
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

  private _renderClimate(d: Snapshot) {
    const c = d.climate;
    if (!c || (!c.temperature_entity && !c.humidity_entity)) return nothing;
    const chip = (entity: string | null, icon: string, unit: string, lo: number, hi: number, label: string) => {
      if (!entity) return nothing;
      const st = this.hass?.states?.[entity];
      const value = st ? Number(st.state) : NaN;
      const ok = !isNaN(value);
      const status = !ok ? "na" : value < lo ? "low" : value > hi ? "high" : "ok";
      const shown = ok ? value.toLocaleString("it-IT", { maximumFractionDigits: 1 }) : "—";
      const hint = status === "ok" ? `${label} ideale (${lo}–${hi} ${unit})`
        : status === "na" ? `${label} non disponibile`
        : `${label} troppo ${status === "low" ? "bassa" : "alta"}: ideale ${lo}–${hi} ${unit}`;
      return html`<button class="climate ${status}" title=${hint}
        @click=${() => this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true }))}>
        <span class="ci">${icon}</span><b>${shown}</b><span class="cu">${unit}</span>
      </button>`;
    };
    return html`<div class="climates">
      ${chip(c.temperature_entity, "🌡", "°C", c.temperature_min, c.temperature_max, "Temperatura")}
      ${chip(c.humidity_entity, "💧", "%", c.humidity_min, c.humidity_max, "Umidità")}
    </div>`;
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
    const shelves = shelvesOf(rack);
    return html`
      <div class="rack">
        <div class="rack-head"><span>${rack.name}</span><span class="muted">${inRack.length}/${capacityOf(rack)}</span></div>
        <div class="shelves">
          ${shelves.map((n, r) => html`<div class="shelf">
            <div class="grid" style="grid-template-columns: repeat(${n}, minmax(0, 34px))">
              ${Array.from({ length: n }, (_, c) => {
                const b = at.get(`${r}:${c}`);
                return html`<button
                  class="cell ${b ? "full" : "free"} ${b && this._dims(b) ? "dim" : ""} ${b && this._moving?.id === b.id ? "moving" : ""}"
                  title=${b ? `${wineTitle(b)}${b.producer ? ` · ${b.producer}` : ""}` : `Mensola ${r + 1}, posto ${c + 1}: libero`}
                  @click=${() => this._onCell(rack, r, c, b)}
                >${b ? bottleSvg(b.type, b.alert) : EMPTY_SVG}</button>`;
              })}
            </div>
            <div class="board"></div>
          </div>`)}
        </div>
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
        font-family: "Playfair Display", "Cormorant Garamond", Georgia, "Times New Roman", serif;
        font-size: 1.55em;
        font-weight: 600;
        letter-spacing: 0.01em;
      }
      .sub,
      .muted {
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .climates {
        display: flex;
        gap: 6px;
        margin-left: auto;
        margin-right: 6px;
      }
      .climate {
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
        padding: 7px 12px;
        border-radius: 999px;
        border: 1px solid var(--tb-line);
        background: rgba(255, 255, 255, 0.04);
        color: var(--tb-ink, var(--primary-text-color));
        font: inherit;
        cursor: pointer;
      }
      .climate b {
        font-size: 1.05em;
        font-variant-numeric: tabular-nums;
      }
      .climate .cu,
      .climate .ci {
        font-size: 0.8em;
        color: var(--tb-ink-2);
      }
      .climate.low,
      .climate.high {
        border-color: rgba(255, 160, 0, 0.6);
        background: rgba(255, 160, 0, 0.12);
      }
      .climate.na {
        opacity: 0.5;
      }
      @media (max-width: 599px) {
        .climates {
          margin-left: 0;
          order: 3;
          width: 100%;
        }
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
      .shelves {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .shelf {
        position: relative;
      }
      .board {
        height: 5px;
        margin: 2px -6px 0;
        border-radius: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04) 60%, rgba(0, 0, 0, 0.4));
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35);
      }
      .grid {
        display: grid;
        gap: 7px;
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
      .cell svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }
      .cell.full {
        filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));
      }
      .cell.full:hover {
        transform: translateY(-5px);
        filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.6));
      }
      .cell.free:hover svg path {
        fill: rgba(255, 255, 255, 0.08);
        stroke: rgba(255, 255, 255, 0.45);
      }
      .cell .tag {
        transform-box: fill-box;
        transform-origin: 0 0;
        animation: tb-sway 4s ease-in-out infinite;
      }
      @keyframes tb-sway {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-4deg); }
      }
      .cell.dim {
        opacity: 0.15;
        filter: grayscale(0.7);
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
        position: fixed;
        left: 50%;
        bottom: 28px;
        max-width: min(520px, 90vw);
        text-align: center;
        transform: translateX(-50%);
        background: rgba(20, 16, 17, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        color: #f2ebe3;
        padding: 10px 18px;
        border-radius: 999px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 1001;
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
