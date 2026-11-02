import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Rack, Snapshot } from "./types";
import { sharedStyles } from "./styles";

/** Racks (name and size) plus the few settings. */
@customElement("tb-racks-dialog")
export class RacksDialog extends LitElement {
  @property({ attribute: false }) card: any;
  @property({ attribute: false }) data!: Snapshot;
  @state() private _drafts: Record<string, Partial<Rack>> = {};

  private _close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private _draft(rack: Rack): Rack {
    return { ...rack, ...this._drafts[rack.id] } as Rack;
  }

  private _set(id: string, key: keyof Rack, value: any) {
    this._drafts = { ...this._drafts, [id]: { ...this._drafts[id], [key]: value } };
  }

  private _count(rackId: string) {
    return this.data.bottles.filter((b) => b.rack_id === rackId).length;
  }

  private async _save(rack: Rack) {
    const draft = this._draft(rack);
    const res = await this.card.ws({ type: "taponbon/save_rack", rack: draft });
    const copy = { ...this._drafts };
    delete copy[rack.id];
    this._drafts = copy;
    this.card.toast(res.displaced ? `Salvato. ${res.displaced} bottiglie sono finite in "Da sistemare".` : "Scaffale salvato");
  }

  private async _delete(rack: Rack) {
    const n = this._count(rack.id);
    if (!confirm(`Eliminare "${rack.name}"?${n ? ` Le sue ${n} bottiglie restano in cantina, in "Da sistemare".` : ""}`)) return;
    await this.card.ws({ type: "taponbon/delete_rack", rack_id: rack.id });
    this.card.toast("Scaffale eliminato");
  }

  private async _add() {
    await this.card.ws({ type: "taponbon/save_rack", rack: { name: `Scaffale ${this.data.racks.length + 1}`, rows: 7, cols: 10 } });
  }

  private async _setting(key: string, value: unknown) {
    await this.card.ws({ type: "taponbon/update_settings", [key]: value });
  }

  render() {
    const s = this.data.settings;
    return html`
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-head">
            <div class="dialog-title">Scaffali e impostazioni</div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this.data.racks.map((rack) => {
              const d = this._draft(rack);
              const dirty = !!this._drafts[rack.id];
              return html`<div class="rack">
                <label class="field name">Nome
                  <input .value=${d.name} @input=${(e: Event) => this._set(rack.id, "name", (e.target as HTMLInputElement).value)} />
                </label>
                <label class="field">File
                  <input type="number" min="1" max="30" .value=${String(d.rows)}
                    @input=${(e: Event) => this._set(rack.id, "rows", Number((e.target as HTMLInputElement).value))} />
                </label>
                <label class="field">Posti per fila
                  <input type="number" min="1" max="30" .value=${String(d.cols)}
                    @input=${(e: Event) => this._set(rack.id, "cols", Number((e.target as HTMLInputElement).value))} />
                </label>
                <div class="rack-foot">
                  <span class="note">${this._count(rack.id)} bottiglie · ${d.rows * d.cols} posti</span>
                  <span>
                    <button class="btn small danger" @click=${() => this._delete(rack)}>Elimina</button>
                    <button class="btn small primary" ?disabled=${!dirty} @click=${() => this._save(rack)}>Salva</button>
                  </span>
                </div>
              </div>`;
            })}
            <button class="btn" @click=${this._add}>＋ Nuovo scaffale</button>

            <h3>Impostazioni</h3>
            <label class="check">
              <input type="checkbox" .checked=${s.auto_labels}
                @change=${(e: Event) => this._setting("auto_labels", (e.target as HTMLInputElement).checked)} />
              Stampa l'etichetta QR quando aggiungo una bottiglia
            </label>
            <div class="field">Avvisami prima che la finestra di beva si chiuda
              <div class="types">
                ${[[90, "3 mesi"], [180, "6 mesi"], [365, "1 anno"]].map(
                  ([days, label]) => html`<button class="chip ${s.alert_days === days ? "active" : ""}"
                    @click=${() => this._setting("alert_days", days)}>${label}</button>`,
                )}
              </div>
            </div>
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .rack {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 8px;
        padding: 12px;
        border-radius: 12px;
        background: rgba(127, 127, 127, 0.08);
        margin-bottom: 10px;
      }
      .rack-foot {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      h3 {
        margin: 20px 0 8px;
        font-size: 1em;
      }
      .check {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 12px;
      }
      @media (max-width: 480px) {
        .rack {
          grid-template-columns: 1fr 1fr;
        }
        .name {
          grid-column: 1 / -1;
        }
      }
    `,
  ];
}
