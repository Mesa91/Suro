import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Bottle, Snapshot, WINE_FIELDS } from "./types";
import { sharedStyles } from "./styles";
import { BOTTLE_DEFS, bottleSvg } from "./bottle";

/** Form for a wine: used to add bottles and to edit one. */
export function renderWineForm(
  data: Snapshot,
  values: Record<string, any>,
  onChange: (key: string, value: any) => void,
) {
  return html`
    <div class="form">
      <label class="field wide">
        Tipo
        <div class="types">
          ${Object.entries(data.types).map(
            ([key, t]) => html`<button type="button" class="chip ${values.type === key ? "active" : ""}"
              @click=${() => onChange("type", key)}><span class="dot" style="background:${t.color}"></span>${t.label}</button>`,
          )}
        </div>
      </label>
      ${WINE_FIELDS.map((f) => {
        const wide = f.key === "name" || f.kind === "area";
        const value = values[f.key as string] ?? "";
        const input = (e: Event) => onChange(f.key as string, (e.target as HTMLInputElement).value);
        return html`<label class="field ${wide ? "wide" : ""}">
          ${f.label}
          ${f.kind === "area"
            ? html`<textarea rows="2" .value=${value} @input=${input}></textarea>`
            : html`<input
                type=${f.kind === "text" ? "text" : "number"}
                inputmode=${f.kind === "text" ? "text" : "numeric"}
                step=${f.kind === "number" ? "0.01" : "1"}
                .value=${String(value)}
                @input=${input}
              />`}
        </label>`;
      })}
    </div>
  `;
}

@customElement("tb-add-dialog")
export class AddDialog extends LitElement {
  @property({ attribute: false }) card: any;
  @property({ attribute: false }) data!: Snapshot;
  @property({ attribute: false }) rackId: string | null = null;
  @property({ attribute: false }) row: number | null = null;
  @property({ attribute: false }) col: number | null = null;
  @state() private _values: Record<string, any> = { type: "red" };
  @state() private _quantity = 1;
  @state() private _busy = false;

  static styles = sharedStyles;

  private _close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private async _save() {
    if (!String(this._values.name || "").trim()) {
      this.card.toast("Scrivi almeno il nome del vino");
      return;
    }
    this._busy = true;
    try {
      const res = await this.card.ws({
        type: "taponbon/add_bottles",
        wine: this._values,
        quantity: this._quantity,
        rack_id: this.rackId,
        row: this.row,
        col: this.col,
      });
      const added: Bottle[] = res.bottles;
      const unplaced = added.filter((b) => !b.rack_id).length;
      this.card.toast(
        unplaced
          ? `Aggiunte ${added.length} bottiglie, ${unplaced} da sistemare: scaffale pieno`
          : added.length > 1 ? `Aggiunte ${added.length} bottiglie` : "Bottiglia aggiunta",
      );
      this._close();
    } finally {
      this._busy = false;
    }
  }

  render() {
    const rack = this.data.racks.find((r) => r.id === this.rackId);
    const where =
      rack && this.row != null && this.col != null
        ? `${rack.name}, mensola ${this.row + 1}, posto ${this.col + 1}`
        : "nel primo posto libero";
    return html`
      ${BOTTLE_DEFS}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-head">
            <div style="display:flex;gap:16px;align-items:flex-end">
              <div style="width:34px;flex:none;filter:drop-shadow(0 8px 10px rgba(0,0,0,.55))">${bottleSvg(this._values.type || "red")}</div>
              <div>
                <div class="eyebrow">Nuovo in cantina</div>
                <div class="dialog-title">${String(this._values.name || "").trim() || "Aggiungi vino"}</div>
              </div>
            </div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${renderWineForm(this.data, this._values, (k, v) => (this._values = { ...this._values, [k]: v }))}
            <div class="form" style="margin-top:10px">
              <label class="field">
                Quante bottiglie
                <input type="number" min="1" max="100" .value=${String(this._quantity)}
                  @input=${(e: Event) => (this._quantity = Math.max(1, Math.min(100, Number((e.target as HTMLInputElement).value) || 1)))} />
              </label>
              <div class="field">Dove<span style="color:var(--tb-ink);text-transform:none;letter-spacing:normal;font-size:1.3em">${where}${this._quantity > 1 ? " e i successivi" : ""}</span></div>
            </div>
            ${this.data.settings.auto_labels
              ? html`<p class="note">Per ogni bottiglia verrà richiesta la stampa dell'etichetta QR.</p>`
              : nothing}
          </div>
          <div class="dialog-foot">
            <button class="btn" @click=${this._close}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy} @click=${this._save}>
              ${this._busy ? "Salvo…" : `Aggiungi ${this._quantity > 1 ? `${this._quantity} bottiglie` : "bottiglia"}`}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
