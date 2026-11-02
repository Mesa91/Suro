import { svg, nothing } from "lit";

/*
 * Realistic bottles, drawn as SVG in a 24 × 64 box (bottom at y = 63).
 *
 * Every wine type has its own bottle: red in a dark Bordeaux, white in a
 * light Burgundy with the gold wine showing through, rosé in clear glass,
 * sparkling in a Champagne bottle with gold foil, dessert in an amber half
 * bottle. Light is shared: one cylinder shading, two specular streaks, a
 * soft punt shadow. A wine near (or past) the end of its drinking window
 * gets a small hanging tag on the neck instead of a dot.
 *
 * Gradients and clip paths live once in BOTTLE_DEFS (render it once per
 * shadow root); bottles reference them by id.
 */

type Shape = "bordeaux" | "burgundy" | "champagne" | "half";

interface Style {
  shape: Shape;
  glass: string; // gradient id for the glass/wine body
  clear: boolean; // clear glass: the wine shows with an air gap in the neck
  foil: string; // gradient id for the capsule
}

const STYLES: Record<string, Style> = {
  red: { shape: "bordeaux", glass: "tb-glass-red", clear: false, foil: "tb-foil-wine" },
  white: { shape: "burgundy", glass: "tb-wine-white", clear: true, foil: "tb-foil-silver" },
  rose: { shape: "bordeaux", glass: "tb-wine-rose", clear: true, foil: "tb-foil-rose" },
  sparkling: { shape: "champagne", glass: "tb-glass-green", clear: false, foil: "tb-foil-gold" },
  dessert: { shape: "bordeaux", glass: "tb-glass-amber", clear: false, foil: "tb-foil-gold" },
};

interface Geometry {
  body: string; // whole outline
  foil: string; // capsule
  label: [number, number, number, number]; // x, y, w, h
  neckY: number; // where a hanging tag is tied
  fillY: number; // wine level for clear glass
}

const SHAPES: Record<Shape, Geometry> = {
  bordeaux: {
    body: "M9.7 1h4.6v16.5c0 3.4 6.7 4.8 6.7 11.5v31.2c0 1.5-1.2 2.8-2.8 2.8H5.8C4.2 63 3 61.7 3 60.2V29c0-6.7 6.7-8.1 6.7-11.5z",
    foil: "M9.5 1.4c0-.8.5-1.4 1.3-1.4h2.4c.8 0 1.3.6 1.3 1.4V13H9.5z",
    label: [4.4, 35, 15.2, 16.5],
    neckY: 15,
    fillY: 22,
  },
  burgundy: {
    body: "M9.8 1h4.4v13c0 5 7 9 7 18v28.2c0 1.5-1.2 2.8-2.8 2.8H5.6c-1.6 0-2.8-1.3-2.8-2.8V32c0-9 7-13 7-18z",
    foil: "M9.6 1.4c0-.8.5-1.4 1.3-1.4h2.2c.8 0 1.3.6 1.3 1.4V12H9.6z",
    label: [4.2, 36, 15.6, 16],
    neckY: 13.5,
    fillY: 19,
  },
  champagne: {
    body: "M9.4 1h5.2v11c0 6 7.6 9.5 7.6 19v29.4c0 1.4-1.2 2.6-2.6 2.6H4.4C3 63 1.8 61.8 1.8 60.4V31c0-9.5 7.6-13 7.6-19z",
    foil: "M9 1.6C9 .7 9.7 0 10.6 0h2.8c.9 0 1.6.7 1.6 1.6V12c0 2.4 2.6 4.4 4.3 6.6l-14.6.1C6.4 16.4 9 14.4 9 12z",
    label: [3.6, 37, 16.8, 13],
    neckY: 20,
    fillY: 20,
  },
  half: {
    body: "M10 20h4v9c0 2.6 5.2 3.6 5.2 8.8v22.6c0 1.4-1.1 2.6-2.5 2.6H7.3c-1.4 0-2.5-1.2-2.5-2.6V37.8c0-5.2 5.2-6.2 5.2-8.8z",
    foil: "M9.8 20.9c0-.5.4-.9.9-.9h2.6c.5 0 .9.4.9.9V28H9.8z",
    label: [6, 44, 12, 11],
    neckY: 30,
    fillY: 33,
  },
};

export function bottleSvg(type: string, alert?: string | null) {
  const st = STYLES[type] || STYLES.red;
  const g = SHAPES[st.shape];
  const [lx, ly, lw, lh] = g.label;
  const cx = lx + lw / 2;
  return svg`<svg viewBox="0 0 24 64" aria-hidden="true">
    <ellipse cx="12" cy="63.2" rx="9.5" ry="1" fill="rgba(0,0,0,.55)" filter="url(#tb-soft)"/>
    ${st.clear
      ? svg`<path d=${g.body} fill="url(#tb-glass-clear)"/>
            <path d=${g.body} fill=${`url(#${st.glass})`} clip-path=${`url(#tb-fill-${st.shape})`}/>
            <rect x="0" y=${g.fillY} width="24" height=".5" fill="rgba(255,255,255,.35)" clip-path=${`url(#tb-in-${st.shape})`}/>`
      : svg`<path d=${g.body} fill=${`url(#${st.glass})`}/>`}
    <path d=${g.body} fill="url(#tb-cylinder)"/>
    <path d=${g.body} fill="none" stroke="rgba(255,255,255,.18)" stroke-width=".35"/>
    <ellipse cx="12" cy="61.4" rx="6.5" ry="1.3" fill="rgba(0,0,0,.35)" clip-path=${`url(#tb-in-${st.shape})`}/>
    <g class="label-group">
      <rect x=${lx} y=${ly} width=${lw} height=${lh} rx=".5" fill="url(#tb-paper)"/>
      <rect x=${lx} y=${ly} width=${lw} height=${lh} rx=".5" fill="url(#tb-label-curve)"/>
      <rect x=${lx + 0.9} y=${ly + 0.9} width=${lw - 1.8} height=${lh - 1.8} rx=".3" fill="none" stroke="rgba(120,90,50,.55)" stroke-width=".25"/>
      <circle cx=${cx} cy=${ly + lh * 0.3} r=${Math.min(lw, lh) * 0.12} fill="none" stroke="rgba(120,80,30,.8)" stroke-width=".3"/>
      <rect x=${cx - lw * 0.3} y=${ly + lh * 0.55} width=${lw * 0.6} height=".9" rx=".45" fill="rgba(40,20,15,.75)"/>
      <rect x=${cx - lw * 0.22} y=${ly + lh * 0.7} width=${lw * 0.44} height=".5" rx=".25" fill="rgba(40,20,15,.45)"/>
      <rect x=${cx - lw * 0.15} y=${ly + lh * 0.8} width=${lw * 0.3} height=".5" rx=".25" fill="rgba(40,20,15,.35)"/>
    </g>
    <path d=${g.foil} fill=${`url(#${st.foil})`}/>
    <path d=${g.foil} fill="url(#tb-cylinder)" opacity=".6"/>
    <path d="M5.4 30c.6-3.8 2.6-5.6 3.6-6.8V59.5H5.4z" fill="url(#tb-spec)" clip-path=${`url(#tb-in-${st.shape})`} opacity=".9"/>
    <rect x="17.6" y="31" width=".9" height="27" rx=".45" fill="rgba(255,255,255,.18)" clip-path=${`url(#tb-in-${st.shape})`}/>
    ${alert ? hangTag(g.neckY, alert) : nothing}
  </svg>`;
}

function hangTag(y: number, alert: string) {
  const fill = alert === "past" ? "url(#tb-tag-past)" : "url(#tb-tag-soon)";
  return svg`<g class="tag">
    <path d=${`M12 ${y}c3 .2 4.6 1 5.4 2.6`} fill="none" stroke="rgba(240,230,210,.85)" stroke-width=".35"/>
    <g transform=${`translate(16.4 ${y + 2}) rotate(14)`}>
      <rect x="0" y="0" width="6.4" height="8.6" rx="1.1" fill=${fill} stroke="rgba(0,0,0,.35)" stroke-width=".25"/>
      <circle cx="3.2" cy="1.4" r=".55" fill="rgba(0,0,0,.45)"/>
      ${alert === "past"
        ? svg`<path d="M3.2 3.3v2.6M3.2 7v.1" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>`
        : svg`<circle cx="3.2" cy="5.4" r="1.9" fill="none" stroke="#3b2200" stroke-width=".45"/>
              <path d="M3.2 4.3v1.2l.8.6" fill="none" stroke="#3b2200" stroke-width=".45" stroke-linecap="round"/>`}
    </g>
  </g>`;
}

/** Empty slot: the ghost of a bottle. */
export const EMPTY_SVG = svg`<svg viewBox="0 0 24 64" aria-hidden="true">
  <path d=${SHAPES.bordeaux.body} fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.16)" stroke-width=".45" stroke-dasharray="1.4 1.2"/>
</svg>`;

const clipFor = (shape: Shape) => {
  const g = SHAPES[shape];
  return svg`
    <clipPath id=${`tb-in-${shape}`}><path d=${g.body}/></clipPath>
    <clipPath id=${`tb-fill-${shape}`}><rect x="0" y=${g.fillY} width="24" height="64"/></clipPath>`;
};

const hgrad = (id: string, stops: [number, string][]) => svg`<linearGradient id=${id} x1="0" x2="1" y1="0" y2="0">
  ${stops.map(([o, c]) => svg`<stop offset=${o} stop-color=${c}/>`)}
</linearGradient>`;

export const BOTTLE_DEFS = svg`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="tb-soft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation=".6"/></filter>
  ${(["bordeaux", "burgundy", "champagne", "half"] as Shape[]).map(clipFor)}

  <!-- glass and wine -->
  ${hgrad("tb-glass-red", [[0, "#060404"], [0.18, "#1c0a0d"], [0.42, "#3b0f18"], [0.6, "#2a0a11"], [1, "#050303"]])}
  ${hgrad("tb-glass-green", [[0, "#030603"], [0.2, "#0e2412"], [0.42, "#1d4223"], [0.62, "#12301a"], [1, "#020402"]])}
  ${hgrad("tb-glass-amber", [[0, "#160902"], [0.2, "#5a2c08"], [0.42, "#9c5714"], [0.62, "#6e3a0c"], [1, "#120701"]])}
  ${hgrad("tb-wine-white", [[0, "#5a4a12"], [0.2, "#b9a043"], [0.42, "#ecd98e"], [0.62, "#cdb158"], [1, "#4d3e0e"]])}
  ${hgrad("tb-wine-rose", [[0, "#9a6a64"], [0.2, "#e6b9ad"], [0.42, "#fbe3da"], [0.62, "#efc8bd"], [1, "#8a5c56"]])}
  ${hgrad("tb-glass-clear", [[0, "rgba(190,215,200,.30)"], [0.3, "rgba(230,245,235,.10)"], [0.7, "rgba(230,245,235,.08)"], [1, "rgba(160,190,175,.35)"]])}

  <!-- light on a cylinder -->
  <linearGradient id="tb-cylinder" x1="0" x2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".55"/>
    <stop offset=".12" stop-color="#000" stop-opacity=".1"/>
    <stop offset=".3" stop-color="#fff" stop-opacity=".1"/>
    <stop offset=".5" stop-color="#000" stop-opacity="0"/>
    <stop offset=".85" stop-color="#000" stop-opacity=".3"/>
    <stop offset="1" stop-color="#000" stop-opacity=".65"/>
  </linearGradient>
  <linearGradient id="tb-spec" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".15" stop-color="#fff" stop-opacity=".55"/>
    <stop offset=".6" stop-color="#fff" stop-opacity=".25"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>

  <!-- capsules -->
  ${hgrad("tb-foil-wine", [[0, "#1d0508"], [0.3, "#7a1d2b"], [0.45, "#c4515f"], [0.6, "#6a1523"], [1, "#150305"]])}
  ${hgrad("tb-foil-gold", [[0, "#5a3a08"], [0.3, "#c9962e"], [0.45, "#ffe7a1"], [0.6, "#b88421"], [1, "#4a2f05"]])}
  ${hgrad("tb-foil-silver", [[0, "#3c3c3c"], [0.3, "#a9a9a9"], [0.45, "#f2f2f2"], [0.6, "#9a9a9a"], [1, "#2e2e2e"]])}
  ${hgrad("tb-foil-rose", [[0, "#5e2d24"], [0.3, "#c47e6c"], [0.45, "#f6cdbd"], [0.6, "#b46e5d"], [1, "#4d241c"]])}

  <!-- label paper -->
  <linearGradient id="tb-paper" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0" stop-color="#f8f2e4"/><stop offset="1" stop-color="#e8dcc2"/>
  </linearGradient>
  <linearGradient id="tb-label-curve" x1="0" x2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".4"/>
    <stop offset=".18" stop-color="#000" stop-opacity="0"/>
    <stop offset=".35" stop-color="#fff" stop-opacity=".25"/>
    <stop offset=".55" stop-color="#000" stop-opacity="0"/>
    <stop offset=".88" stop-color="#000" stop-opacity=".18"/>
    <stop offset="1" stop-color="#000" stop-opacity=".45"/>
  </linearGradient>

  <!-- hanging tags -->
  <linearGradient id="tb-tag-soon" x1="0" x2="1" y1="0" y2="1">
    <stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#e09a1a"/>
  </linearGradient>
  <linearGradient id="tb-tag-past" x1="0" x2="1" y1="0" y2="1">
    <stop offset="0" stop-color="#ff7a6e"/><stop offset="1" stop-color="#b3201f"/>
  </linearGradient>
</defs></svg>`;
