import { css } from "lit";

/*
 * One visual language for the card and its dialogs: deep warm darks, a wine
 * accent, a serif for titles, quiet borders, generous radii.
 */
export const sharedStyles = css`
  :host {
    --tb-accent: #9b2c3f;
    --tb-accent-2: #6b1424;
    --tb-gold: #d8b46a;
    --tb-ink: #f2ebe3;
    --tb-ink-2: #a89d93;
    --tb-line: rgba(255, 255, 255, 0.08);
    --tb-panel: linear-gradient(180deg, #211c1d 0%, #151213 100%);
    --tb-field: rgba(255, 255, 255, 0.045);
    --tb-serif: "Playfair Display", "Cormorant Garamond", Georgia, "Times New Roman", serif;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  .btn {
    border: 1px solid var(--tb-line);
    background: rgba(255, 255, 255, 0.04);
    color: var(--tb-ink, var(--primary-text-color));
    border-radius: 999px;
    padding: 8px 16px;
    font: inherit;
    font-size: 0.9em;
    letter-spacing: 0.01em;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }
  .btn:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.16);
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .btn.primary {
    background: linear-gradient(180deg, var(--tb-accent), var(--tb-accent-2));
    border-color: rgba(255, 255, 255, 0.12);
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 6px 16px rgba(155, 44, 63, 0.35);
  }
  .btn.primary:hover {
    filter: brightness(1.1);
  }
  .btn.danger {
    color: #ff8a80;
  }
  .btn.small {
    padding: 5px 12px;
    font-size: 0.82em;
  }
  .btn.icon {
    width: 36px;
    height: 36px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid var(--tb-line);
    background: rgba(255, 255, 255, 0.03);
    color: var(--tb-ink, var(--primary-text-color));
    border-radius: 999px;
    padding: 6px 13px;
    font: inherit;
    font-size: 0.85em;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .chip:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
  .chip.active {
    background: rgba(155, 44, 63, 0.28);
    border-color: rgba(216, 120, 136, 0.55);
    color: #fff;
  }
  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
    flex: none;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
  }

  /* dialogs */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(6, 4, 5, 0.62);
    backdrop-filter: blur(10px) saturate(120%);
    -webkit-backdrop-filter: blur(10px) saturate(120%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 14px;
    animation: tb-fade 0.18s ease-out;
  }
  .dialog {
    background: var(--tb-panel);
    color: var(--tb-ink);
    border: 1px solid var(--tb-line);
    border-radius: 24px;
    width: min(580px, 100%);
    max-height: 92vh;
    overflow: auto;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    animation: tb-rise 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
    scrollbar-width: thin;
  }
  @keyframes tb-fade {
    from { opacity: 0; }
  }
  @keyframes tb-rise {
    from { opacity: 0; transform: translateY(14px) scale(0.98); }
  }
  .dialog-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 22px 24px 8px;
    gap: 12px;
  }
  .eyebrow {
    font-size: 0.7em;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--tb-gold);
    margin-bottom: 4px;
  }
  .dialog-title {
    font-family: var(--tb-serif);
    font-size: 1.55em;
    font-weight: 600;
    line-height: 1.15;
  }
  .dialog-body {
    padding: 10px 24px 16px;
  }
  .dialog-foot {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 14px 24px 22px;
    border-top: 1px solid var(--tb-line);
  }
  .close {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--tb-line);
    color: var(--tb-ink-2);
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 1em;
    cursor: pointer;
    flex: none;
  }
  .close:hover {
    color: var(--tb-ink);
    background: rgba(255, 255, 255, 0.1);
  }
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 14px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.74em;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--tb-ink-2);
  }
  .field.wide {
    grid-column: 1 / -1;
  }
  .form > *,
  .field {
    min-width: 0;
  }
  .field input,
  .field textarea {
    width: 100%;
    min-width: 0;
  }
  .field input,
  .field textarea,
  .field select {
    font: inherit;
    font-size: 1.32em;
    letter-spacing: normal;
    text-transform: none;
    color: var(--tb-ink);
    background: var(--tb-field);
    border: 1px solid var(--tb-line);
    border-radius: 12px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .field input:focus,
  .field textarea:focus {
    border-color: rgba(216, 120, 136, 0.6);
    box-shadow: 0 0 0 3px rgba(155, 44, 63, 0.25);
  }
  .types {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    text-transform: none;
    letter-spacing: normal;
  }
  .field .types {
    font-size: 1.3em;
  }
  .note {
    font-size: 0.85em;
    color: var(--tb-ink-2);
  }
  .section {
    font-size: 0.72em;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--tb-gold);
    margin: 22px 0 10px;
  }
  .stepper {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--tb-line);
    border-radius: 999px;
    background: var(--tb-field);
    overflow: hidden;
  }
  .stepper button {
    width: 34px;
    height: 32px;
    border: none;
    background: none;
    color: var(--tb-ink);
    font-size: 1.1em;
    cursor: pointer;
  }
  .stepper button:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .stepper span {
    min-width: 30px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
  @media (max-width: 480px) {
    .form {
      grid-template-columns: 1fr;
    }
    .dialog-head,
    .dialog-body,
    .dialog-foot {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
`;
