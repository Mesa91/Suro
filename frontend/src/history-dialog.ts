import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HistoryEntry, Snapshot, wineTitle } from "./types";
import { sharedStyles } from "./styles";
import { BOTTLE_DEFS, bottleSvg } from "./bottle";

@customElement("tb-history-dialog")
export class HistoryDialog extends LitElement {
  @property({ attribute: false }) card: any;
  @property({ attribute: false }) data!: Snapshot;
  @state() private _items: HistoryEntry[] | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  private async _load() {
    const res = await this.card.ws({ type: "taponbon/get_history" });
    this._items = res.history;
  }

  private _close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private async _restore(item: HistoryEntry) {
    const res = await this.card.ws({ type: "taponbon/restore", history_id: item.history_id });
    this.card.toast(res.bottle.rack_id ? "Rimessa al suo posto" : "Rimessa in cantina, in \"Da sistemare\"");
    this._load();
  }

  render() {
    return html`
      ${BOTTLE_DEFS}
      <div class="overlay" @click=${this._close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-head">
            <div><div class="eyebrow">Bottiglie stappate e non solo</div><div class="dialog-title">Storico</div></div>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="dialog-body">
            ${this._items === null
              ? html`<div class="note">Carico…</div>`
              : !this._items.length
                ? html`<div class="note">Ancora nessuna bottiglia tolta dalla cantina.</div>`
                : this._items.map((h) => html`<div class="item">
                    <span class="mini">${bottleSvg(h.type)}</span>
                    <div class="text">
                      <div>${wineTitle(h)}</div>
                      <div class="note">${this.data.reasons[h.reason] || h.reason} · ${new Date(h.removed_at).toLocaleDateString("it-IT")}
                        ${h.producer ? html` · ${h.producer}` : nothing}</div>
                    </div>
                    <button class="btn small" @click=${() => this._restore(h)}>Rimetti</button>
                  </div>`)}
          </div>
          <div class="dialog-foot"><button class="btn" @click=${this._close}>Chiudi</button></div>
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }
      .text {
        flex: 1;
      }
      .mini {
        width: 14px;
        flex: none;
      }
      .mini svg {
        width: 100%;
        display: block;
        overflow: visible;
      }
      .item {
        border-bottom-color: var(--tb-line) !important;
      }
    `,
  ];
}
