import { html, nothing } from "lit";

/** Five stars; clickable when onChange is given (clicking the current value clears it). */
export function renderStars(value: number | null | undefined, onChange?: (v: number | null) => void, big = false) {
  const v = Number(value) || 0;
  return html`<span class="stars ${big ? "big" : ""} ${onChange ? "edit" : ""}" role=${onChange ? "radiogroup" : nothing}
    aria-label=${v ? `${v} su 5` : "Nessun voto"}>
    ${[1, 2, 3, 4, 5].map((n) => {
      const cls = v >= n ? "on" : v >= n - 0.5 ? "half" : "";
      return onChange
        ? html`<button type="button" class="star ${cls}" title="${n} su 5" @click=${() => onChange(v === n ? null : n)}>★</button>`
        : html`<span class="star ${cls}">★</span>`;
    })}
  </span>`;
}

export function ratingText(v: number | null | undefined): string {
  return v ? v.toLocaleString("it-IT", { maximumFractionDigits: 1 }) : "";
}
