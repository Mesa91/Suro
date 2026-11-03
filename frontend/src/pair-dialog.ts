import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Snapshot, wineTitle } from "./types";
import { sharedStyles } from "./styles";
import { BOTTLE_DEFS, bottleSvg } from "./bottle";

interface Pick {
  key: string;
  name: string;
  producer: string;
  vintage: number | null;
  type: string;
  status: string;
  bottles: number;
  bottle_ids: string[];
  locations: string[];
  reason: string;
}

interface PairResult {
  source: "ai" | "local";
  advice: string;
  picks: Pick[];
}

const QUICK = ["Brasato", "Pesce al forno", "Crudi di mare", "Pizza", "Formaggi stagionati", "Risotto ai funghi", "Dolce"];

@customElement("tb-pair-dialog")
export class PairDialog extends LitElement {
  @property({ attribute: false }) card: any;
  @property({ attribute: false }) data!: Snapshot;
  @state() private _dish = "";
  @state() private _busy = false;
  @state() private _result: PairResult | null = null;
  @state() private _asked = "";

  firstUpdated() {
    (this.renderRoot.querySelector("input") as HTMLInputElement | null)?.focus();
  }

  private _close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private async _ask(dish = this._dish) {
    dish = dish.trim();
    if (!dish || this._busy) return;
    this._dish = dish;
    this._busy = true;
    this._result = null;
    try {
      this._result = await this.card.ws({ type: "taponbon/pair", dish });
      this._asked = dish;
    } catch {
      /* toast already shown */
    } finally {
      this._busy = false;
    }
  }

  private _open(p: Pick) {
    this.dispatchEvent(new CustomEvent("open-bottle", { detail: { bottleId: p.bottle_ids[0] } }));
  }

  render() {
    const r = this._result;
    return html`
      ${BOTTLE_DEFS}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-head">
            <div><div class="eyebrow">Dalla tua cantina</div><div class="dialog-title">Cosa si mangia?</div></div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            <form class="ask" @submit=${(e: Event) => { e.preventDefault(); this._ask(); }}>
              <input class="dish" type="text" placeholder="Es. tagliata al rosmarino, spaghetti alle vongole…"
                .value=${this._dish} maxlength="300"
                @input=${(e: Event) => (this._dish = (e.target as HTMLInputElement).value)} />
              <button class="btn primary" type="submit" ?disabled=${this._busy || !this._dish.trim()}>
                ${this._busy ? "Ci penso…" : "Consiglia"}
              </button>
            </form>
            ${!r && !this._busy
              ? html`<div class="quick">
                  ${QUICK.map((q) => html`<button class="chip" @click=${() => this._ask(q)}>${q}</button>`)}
                </div>`
              : nothing}
            ${this._busy ? html`<div class="note waiting">Il sommelier sta guardando gli scaffali…</div>` : nothing}
            ${r ? this._renderResult(r) : nothing}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `;
  }

  private _renderResult(r: PairResult) {
    const status: Record<string, string> = { closing: "Da bere presto", past: "Oltre la finestra", wait: "Ancora giovane" };
    return html`
      ${!r.picks.length
        ? html`<div class="note">Nessun vino della cantina è davvero adatto a «${this._asked}».</div>`
        : html`<div class="eyebrow small">Per «${this._asked}»</div>`}
      ${r.picks.map(
        (p, i) => html`<button class="pick ${i === 0 ? "best" : ""}" @click=${() => this._open(p)}>
          <span class="mini">${bottleSvg(p.type, p.status === "closing" || p.status === "past" ? (p.status as any) : null)}</span>
          <div class="text">
            <div class="wine">
              ${i === 0 ? html`<span class="badge">Il migliore</span>` : nothing}
              ${wineTitle(p)}
              ${status[p.status] ? html`<span class="state ${p.status}">${status[p.status]}</span>` : nothing}
            </div>
            ${p.producer ? html`<div class="note">${p.producer}</div>` : nothing}
            ${p.reason ? html`<div class="reason">${p.reason}</div>` : nothing}
            <div class="where">📍 ${p.locations[0]}${p.bottles > 1 ? html` · ${p.bottles} bottiglie` : nothing}</div>
          </div>
          <span class="go">›</span>
        </button>`,
      )}
      ${r.advice ? html`<div class="advice ${r.source}">${r.source === "ai" ? "🍷 " : "ℹ️ "}${r.advice}</div>` : nothing}
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .ask {
        display: flex;
        gap: 8px;
      }
      .dish {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--tb-line, var(--divider-color));
        background: rgba(255, 255, 255, 0.04);
        color: var(--primary-text-color);
        font: inherit;
      }
      .quick {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .waiting {
        margin-top: 16px;
        animation: pulse 1.4s ease-in-out infinite;
      }
      @keyframes pulse {
        50% {
          opacity: 0.45;
        }
      }
      .eyebrow.small {
        margin: 18px 0 8px;
      }
      .pick {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
        padding: 12px 14px;
        border-radius: 14px;
        border: 1px solid var(--tb-line, var(--divider-color));
        background: rgba(255, 255, 255, 0.03);
        color: inherit;
        font: inherit;
        cursor: pointer;
      }
      .pick:hover {
        background: rgba(255, 255, 255, 0.06);
      }
      .pick.best {
        border-color: rgba(201, 162, 39, 0.55);
        background: linear-gradient(135deg, rgba(201, 162, 39, 0.1), rgba(255, 255, 255, 0.02));
      }
      .mini {
        width: 22px;
        flex: none;
      }
      .mini svg {
        width: 100%;
        display: block;
        overflow: visible;
      }
      .text {
        flex: 1;
        min-width: 0;
      }
      .wine {
        font-weight: 600;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
      }
      .badge,
      .state {
        font-size: 0.72em;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 999px;
        letter-spacing: 0.02em;
      }
      .badge {
        background: rgba(201, 162, 39, 0.22);
        color: #e8c766;
      }
      .state {
        background: rgba(255, 255, 255, 0.08);
        color: var(--secondary-text-color);
      }
      .state.closing {
        background: rgba(201, 162, 39, 0.18);
        color: #e8c766;
      }
      .state.past {
        background: rgba(229, 57, 53, 0.18);
        color: #ef7a77;
      }
      .reason {
        margin-top: 6px;
        line-height: 1.4;
      }
      .where {
        margin-top: 6px;
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }
      .go {
        font-size: 1.6em;
        color: var(--secondary-text-color);
      }
      .advice {
        margin-top: 6px;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
        font-size: 0.9em;
        line-height: 1.4;
      }
      .advice.local {
        color: var(--secondary-text-color);
      }
    `,
  ];
}
