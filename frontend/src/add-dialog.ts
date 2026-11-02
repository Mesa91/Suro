import { LitElement, html, css, nothing } from "lit";
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
  @state() private _reading = "";

  static styles = [
    sharedStyles,
    css`
      .ai {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
        align-items: center;
        padding: 14px;
        margin-bottom: 16px;
        border-radius: 16px;
        border: 1px solid rgba(216, 180, 106, 0.25);
        background:
          radial-gradient(120% 140% at 0% 0%, rgba(216, 180, 106, 0.12), transparent 55%),
          rgba(255, 255, 255, 0.025);
      }
      .ai-title {
        font-weight: 600;
      }
      .ai .note {
        margin-top: 2px;
      }
      .ai-buttons {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .reading {
        grid-column: 1 / -1;
        height: 3px;
        border-radius: 2px;
        background: linear-gradient(90deg, transparent, var(--tb-gold), transparent);
        background-size: 40% 100%;
        background-repeat: no-repeat;
        animation: tb-scan 1.1s linear infinite;
      }
      @keyframes tb-scan {
        from { background-position: -40% 0; }
        to { background-position: 140% 0; }
      }
      input[type="file"] {
        display: none;
      }
    `,
  ];

  private _merge(wine: Record<string, any>, overwrite: boolean) {
    const next = { ...this._values };
    for (const [k, v] of Object.entries(wine)) {
      if (v === null || v === undefined || v === "") continue;
      if (overwrite || next[k] === undefined || next[k] === null || String(next[k]).trim() === "") next[k] = v;
    }
    this._values = next;
  }

  private async _photo(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    this._reading = "Leggo l'etichetta…";
    try {
      const image = await shrink(file);
      const res = await this.card.ws({ type: "taponbon/ai_recognize", image });
      this._merge(res.wine, true);
      this.card.toast("Etichetta letta: controlla i dati e aggiungi");
    } catch {
      /* the card already showed the error */
    } finally {
      this._reading = "";
    }
  }

  private async _fill() {
    if (!String(this._values.name || "").trim()) {
      this.card.toast("Scrivi almeno il nome del vino");
      return;
    }
    this._reading = "Completo i dati…";
    try {
      const res = await this.card.ws({ type: "taponbon/ai_fill", wine: this._values });
      this._merge(res.wine, false);
      this.card.toast("Dati completati");
    } catch {
      /* shown by the card */
    } finally {
      this._reading = "";
    }
  }

  private _renderAI() {
    if (!this.data.ai) {
      return html`<div class="ai"><div>
        <div class="ai-title">✨ Compilazione automatica</div>
        <div class="note">Aggiungi una chiave Gemini (gratuita) in Impostazioni → Dispositivi e servizi → TaponBon → Configura per leggere le etichette con una foto.</div>
      </div></div>`;
    }
    return html`<div class="ai">
      <div>
        <div class="ai-title">✨ Compilazione automatica</div>
        <div class="note">${this._reading || "Fotografa l'etichetta, oppure scrivi il nome e lascia fare all'AI."}</div>
      </div>
      <div class="ai-buttons">
        <label class="btn primary small" style="cursor:pointer">
          📷 Foto etichetta
          <input type="file" accept="image/*" capture="environment" ?disabled=${!!this._reading} @change=${this._photo} />
        </label>
        <button class="btn small" ?disabled=${!!this._reading} @click=${this._fill}>Completa dal nome</button>
      </div>
      ${this._reading ? html`<div class="reading"></div>` : nothing}
    </div>`;
  }

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
            ${this._renderAI()}
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

/** Downscale a photo to keep the upload small (Gemini reads 1280 px fine). */
async function shrink(file: File, max = 1280): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}
