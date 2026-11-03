import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Bottle, Snapshot, WINE_FIELDS, locationText, windowText, wineTitle } from "./types";
import { sharedStyles } from "./styles";
import { renderWineForm } from "./add-dialog";
import { BOTTLE_DEFS, bottleSvg } from "./bottle";
import { ratingText, renderStars } from "./rating";

interface Label {
  code: string;
  png_base64: string;
  label_format: "qr" | "qr30" | "full";
  width_mm: number;
  height_mm: number;
}

@customElement("tb-bottle-dialog")
export class BottleDialog extends LitElement {
  @property({ attribute: false }) card: any;
  @property({ attribute: false }) data!: Snapshot;
  @property({ attribute: false }) bottle!: Bottle;
  @state() private _label: Label | null = null;
  @state() private _editing = false;
  @state() private _values: Record<string, any> = {};
  @state() private _sameWine = true;
  @state() private _otherReason = false;
  @state() private _busy = false;
  @state() private _rating = false;
  @state() private _stars: number | null = null;
  @state() private _tasting = "";

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("data") && this._label && this.data.settings.label_format !== this._label.label_format) {
      this._label = null;
      this._loadLabel();
    }
    if (changed.has("bottle")) {
      const previous = changed.get("bottle") as Bottle | undefined;
      if (previous?.id !== this.bottle.id) {
        this._label = null;
        this._editing = false;
        this._rating = false;
        this._loadLabel();
      }
    }
  }

  private async _loadLabel() {
    const id = this.bottle.id;
    try {
      const label = await this.card.hass.callWS({ type: "taponbon/get_label", bottle_id: id });
      if (this.bottle.id === id) this._label = label;
    } catch {
      /* the label is a nicety; the dialog works without it */
    }
  }

  private _close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private _sameWineCount() {
    const key = (b: Bottle) => `${(b.name || "").trim().toLowerCase()}|${(b.producer || "").trim().toLowerCase()}|${b.vintage || ""}`;
    return this.data.bottles.filter((b) => key(b) === key(this.bottle)).length;
  }

  private async _remove(reason: string, rated = false) {
    this._busy = true;
    try {
      const msg: Record<string, unknown> = { type: "taponbon/remove_bottle", bottle_id: this.bottle.id, reason };
      if (rated) {
        if (this._stars) msg.rating = this._stars;
        if (this._tasting.trim()) msg.tasting_notes = this._tasting.trim();
      }
      await this.card.ws(msg);
      this.card.toast(rated && this._stars
        ? `${wineTitle(this.bottle)}: bevuta, voto ${this._stars}/5. Salute!`
        : `${wineTitle(this.bottle)}: ${this.data.reasons[reason]?.toLowerCase() || "tolta"}. La trovi nello storico.`);
      this._close();
    } finally {
      this._busy = false;
    }
  }

  private async _saveEdit() {
    this._busy = true;
    try {
      const res = await this.card.ws({
        type: "taponbon/update_bottle",
        bottle_id: this.bottle.id,
        changes: this._values,
        same_wine: this._sameWine,
      });
      this.card.toast(res.updated > 1 ? `Aggiornate ${res.updated} bottiglie` : "Bottiglia aggiornata");
      this._editing = false;
      this._label = null;
      this._loadLabel();
    } finally {
      this._busy = false;
    }
  }

  private async _printOnPrinter() {
    const res = await this.card.ws({ type: "taponbon/request_label", bottle_id: this.bottle.id });
    this.card.toast(res.printed ? "Etichetta stampata" : this.data.printer
      ? "Stampa non riuscita: guarda le notifiche di Home Assistant"
      : "Richiesta inviata. Per stampare da solo, scegli la stampante nelle opzioni di TaponBon.");
  }

  private _printInBrowser() {
    if (!this._label) return;
    const win = window.open("", "_blank", "width=480,height=360");
    if (!win) {
      this.card.toast("Il browser ha bloccato la finestra di stampa");
      return;
    }
    const { width_mm: w, height_mm: h } = this._label;
    win.document.write(`<!doctype html><html><head><title>Etichetta ${this._label.code}</title>
      <style>@page{size:${w}mm ${h}mm;margin:0}html,body{margin:0}img{width:${w}mm;height:${h}mm;display:block}</style></head>
      <body><img src="data:image/png;base64,${this._label.png_base64}"
      onload="setTimeout(function(){window.print();window.close();},150)"></body></html>`);
    win.document.close();
  }

  render() {
    const b = this.bottle;
    const t = this.data.types[b.type];
    return html`
      ${BOTTLE_DEFS}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="hero">
            <div class="hero-bottle">${bottleSvg(b.type, b.alert)}</div>
            <div class="hero-text">
              <div class="eyebrow">${t?.label || ""}${b.region ? ` · ${b.region}` : ""}</div>
              <div class="dialog-title">${b.name || "Vino"}</div>
              ${b.producer ? html`<div class="producer">${b.producer}</div>` : nothing}
              <div class="vintage">${b.vintage || "s.a."}</div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._rating ? this._renderRate() : this._editing ? this._renderEdit() : this._renderView(b, t)}
          </div>
          ${this._rating ? this._renderRateFoot() : this._editing ? this._renderEditFoot() : this._renderViewFoot()}
        </div>
      </div>
    `;
  }

  private _renderView(b: Bottle, t?: { label: string; color: string }) {
    const win = windowText(b);
    return html`
      <div class="badges">
        ${b.alert === "closing" ? html`<span class="badge warn">Da bere presto</span>` : nothing}
        ${b.alert === "past" ? html`<span class="badge bad">Oltre la finestra</span>` : nothing}
        <span class="where">📍 ${locationText(b, this.data.racks)}</span>
      </div>
      ${b.past_count || b.past_notes
        ? html`<div class="past">
            <span class="past-head">Già bevuto${b.past_count ? html` ${b.past_count === 1 ? "una volta" : `${b.past_count} volte`}` : nothing}</span>
            ${b.past_rating ? html`${renderStars(b.past_rating)} <b>${ratingText(b.past_rating)}</b>` : nothing}
            ${b.past_notes ? html`<div class="past-notes">«${b.past_notes}»</div>` : nothing}
          </div>`
        : nothing}
      <dl class="facts">
        ${WINE_FIELDS.filter((f) => !["name", "producer", "vintage", "drink_from", "drink_until"].includes(f.key as string)).map((f) => {
          const v = b[f.key];
          if (v == null || v === "") return nothing;
          return html`<dt>${f.label}</dt><dd>${f.key === "price" ? `${Number(v).toFixed(2)} €` : v}</dd>`;
        })}
        ${win ? html`<dt>Finestra di beva</dt><dd>${win}</dd>` : nothing}
      </dl>
      <div class="label-box">
        ${this._label
          ? html`<img class="label ${this._label.label_format}" alt="Etichetta QR" src="data:image/png;base64,${this._label.png_base64}" />`
          : html`<div class="note">Preparo l'etichetta…</div>`}
        <div class="note">Inquadra il QR con l'app Home Assistant quando prendi la bottiglia: verrà tolta dalla cantina.</div>
        <div class="row">
          <button class="btn small" @click=${this._printOnPrinter}>🖨️ Stampante etichette</button>
          <button class="btn small" ?disabled=${!this._label} @click=${this._printInBrowser}>Stampa dal browser</button>
        </div>
      </div>
      ${this._otherReason
        ? html`<div class="reasons">
            ${Object.entries(this.data.reasons).filter(([k]) => k !== "drank").map(
              ([key, label]) => html`<button class="btn small ${key === "deleted" ? "danger" : ""}" ?disabled=${this._busy}
                @click=${() => this._remove(key)}>${label}</button>`,
            )}
          </div>`
        : nothing}
    `;
  }

  private _renderViewFoot() {
    return html`<div class="dialog-foot">
      <button class="btn" @click=${() => this.dispatchEvent(new CustomEvent("move", { detail: { bottle: this.bottle } }))}>↔ Sposta</button>
      <button class="btn" @click=${() => {
        this._values = Object.fromEntries(["type", ...WINE_FIELDS.map((f) => f.key)].map((k) => [k, (this.bottle as any)[k] ?? ""]));
        this._sameWine = true;
        this._editing = true;
      }}>✏️ Modifica</button>
      <button class="btn" @click=${() => (this._otherReason = !this._otherReason)}>Altro…</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${() => {
        this._stars = null;
        this._tasting = "";
        this._rating = true;
      }}>🍷 Bevuta</button>
    </div>`;
  }

  private _renderRate() {
    return html`<div class="rate">
      <div class="rate-q">Com'era?</div>
      ${renderStars(this._stars, (v) => (this._stars = v), true)}
      <div class="rate-hint">${["Tocca le stelle per votarla", "Deludente", "Così così", "Buono", "Molto buono", "Eccezionale"][this._stars || 0]}</div>
      <textarea class="tasting" rows="3" maxlength="1000"
        placeholder="Note di degustazione (facoltative): profumi, con cosa l'avete bevuta, se ricomprarla…"
        .value=${this._tasting} @input=${(e: Event) => (this._tasting = (e.target as HTMLTextAreaElement).value)}></textarea>
      <div class="note">Il voto resta nello storico e aiuta gli abbinamenti a proporti i vini che ti sono piaciuti di più.</div>
    </div>`;
  }

  private _renderRateFoot() {
    const empty = !this._stars && !this._tasting.trim();
    return html`<div class="dialog-foot">
      <button class="btn" ?disabled=${this._busy} @click=${() => (this._rating = false)}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${() => this._remove("drank", true)}>
        ${empty ? "Togli senza voto" : "🍷 Salva e togli"}
      </button>
    </div>`;
  }

  private _renderEdit() {
    const count = this._sameWineCount();
    return html`
      ${renderWineForm(this.data, this._values, (k, v) => (this._values = { ...this._values, [k]: v }))}
      ${count > 1
        ? html`<label class="check"><input type="checkbox" .checked=${this._sameWine}
            @change=${(e: Event) => (this._sameWine = (e.target as HTMLInputElement).checked)} />
            Applica a tutte le ${count} bottiglie di questo vino</label>`
        : nothing}
    `;
  }

  private _renderEditFoot() {
    return html`<div class="dialog-foot">
      <button class="btn" @click=${() => (this._editing = false)}>Annulla</button>
      <button class="btn primary" ?disabled=${this._busy} @click=${this._saveEdit}>Salva</button>
    </div>`;
  }

  static styles = [
    sharedStyles,
    css`
      .past {
        margin: 2px 0 14px;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(227, 179, 65, 0.08);
        border: 1px solid rgba(227, 179, 65, 0.22);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        font-size: 0.92em;
      }
      .past-head {
        color: var(--secondary-text-color);
      }
      .past-notes {
        width: 100%;
        font-style: italic;
        color: var(--secondary-text-color);
      }
      .rate {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        text-align: center;
        padding: 4px 0;
      }
      .rate-q {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 1.35em;
      }
      .rate-hint {
        min-height: 1.2em;
        color: #e3b341;
        font-size: 0.9em;
      }
      .tasting {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid var(--tb-line, var(--divider-color));
        background: rgba(255, 255, 255, 0.04);
        color: var(--primary-text-color);
        font: inherit;
        resize: vertical;
      }
      .hero {
        display: flex;
        gap: 18px;
        align-items: flex-end;
        padding: 26px 24px 18px;
        background:
          radial-gradient(90% 120% at 15% 100%, rgba(155, 44, 63, 0.25), transparent 60%),
          radial-gradient(60% 80% at 100% 0%, rgba(216, 180, 106, 0.08), transparent 60%);
        border-bottom: 1px solid var(--tb-line);
        position: relative;
      }
      .hero .close {
        position: absolute;
        top: 16px;
        right: 16px;
      }
      .hero-bottle {
        width: 62px;
        flex: none;
        filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.6));
      }
      .hero-bottle svg {
        width: 100%;
        display: block;
        overflow: visible;
      }
      .hero-text {
        min-width: 0;
        padding-bottom: 6px;
      }
      .producer {
        color: var(--tb-ink-2);
        margin-top: 4px;
      }
      .vintage {
        font-family: var(--tb-serif);
        font-size: 2.1em;
        color: var(--tb-gold);
        line-height: 1;
        margin-top: 10px;
      }
      .badges {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;
      }
      .badge {
        border-radius: 10px;
        padding: 2px 9px;
        font-size: 0.8em;
        color: #111;
        font-weight: 600;
      }
      .badge.warn {
        background: #ffa000;
      }
      .badge.bad {
        background: #e53935;
        color: #fff;
      }
      .where {
        font-size: 0.85em;
        color: var(--tb-ink-2);
      }
      .facts {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 4px 12px;
        margin: 0 0 12px;
        font-size: 0.92em;
      }
      dt {
        color: var(--tb-ink-2);
        font-size: 0.85em;
        letter-spacing: 0.04em;
      }
      dd {
        margin: 0;
        white-space: pre-wrap;
      }
      .label-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border-radius: 16px;
        border: 1px solid var(--tb-line);
        background: rgba(255, 255, 255, 0.025);
        text-align: center;
      }
      .label.qr,
      .label.qr30 {
        max-width: 140px;
        padding: 6px;
      }
      .label {
        width: 100%;
        max-width: 300px;
        background: #fff;
        border-radius: 4px;
        image-rendering: pixelated;
      }
      .row,
      .reasons {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .reasons {
        margin-top: 12px;
      }
      .check {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-top: 12px;
        font-size: 0.9em;
      }
    `,
  ];
}
