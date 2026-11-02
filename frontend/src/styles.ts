import { css } from "lit";

export const sharedStyles = css`
  :host {
    --tb-accent: #8e2437;
  }
  .btn {
    border: 1px solid var(--divider-color);
    background: var(--card-background-color, #222);
    color: var(--primary-text-color);
    border-radius: 18px;
    padding: 7px 14px;
    font: inherit;
    font-size: 0.9em;
    cursor: pointer;
    white-space: nowrap;
  }
  .btn:hover {
    filter: brightness(1.15);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .btn.primary {
    background: var(--tb-accent);
    border-color: var(--tb-accent);
    color: #fff;
  }
  .btn.danger {
    color: #e57373;
  }
  .btn.small {
    padding: 4px 10px;
    font-size: 0.8em;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--divider-color);
    background: none;
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 5px 11px;
    font: inherit;
    font-size: 0.85em;
    cursor: pointer;
  }
  .chip.active {
    background: var(--tb-accent);
    border-color: var(--tb-accent);
    color: #fff;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    flex: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  }

  /* dialogs */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 12px;
  }
  .dialog {
    background: var(--card-background-color, #1e1e1e);
    color: var(--primary-text-color);
    border-radius: 16px;
    width: min(560px, 100%);
    max-height: 92vh;
    overflow: auto;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }
  .dialog-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 18px 6px;
    gap: 10px;
  }
  .dialog-title {
    font-size: 1.15em;
    font-weight: 600;
  }
  .dialog-body {
    padding: 8px 18px 14px;
  }
  .dialog-foot {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 8px 18px 18px;
  }
  .close {
    background: none;
    border: none;
    color: var(--secondary-text-color);
    font-size: 1.4em;
    cursor: pointer;
  }
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 12px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }
  .field.wide {
    grid-column: 1 / -1;
  }
  .field input,
  .field textarea,
  .field select {
    font: inherit;
    font-size: 1.05em;
    color: var(--primary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 8px 10px;
  }
  .types {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .note {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }
  @media (max-width: 480px) {
    .form {
      grid-template-columns: 1fr;
    }
  }
`;
