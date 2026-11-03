# 🍷 TaponBon

La cantina dei vini dentro Home Assistant: scaffali disegnati come quelli veri,
un QR per ogni bottiglia che la toglie dalla cantina quando la inquadri, avvisi
quando un vino va bevuto.

## Cosa fa

- **Scaffali** su misura: quante mensole e quante bottiglie su ciascuna, con le bottiglie colorate per tipo:
  rosso, bianco, rosato, bollicine, dolce.
- **Aggiungi** un vino toccando un posto libero (o dal pulsante): con più
  bottiglie riempie i posti successivi.
- **QR per ogni bottiglia**: inquadrandolo con l'app Home Assistant la bottiglia
  viene tolta dalla cantina e finisce nello storico. Funziona anche con un tag
  NFC attaccato a una posizione dello scaffale o con un lettore fisso.
- **Etichette**: solo QR 23 × 23 mm (predefinita) oppure 50 × 30 mm con nome,
  annata, tipo, produttore e posizione; dalla stampante etichette o dal browser.
- **Finestra di beva**: le bottiglie da bere presto o oltre la finestra sono
  evidenziate; ogni mattina alle 10 arriva una notifica per quelle nuove.
- **Etichette lette con l'AI** (Gemini, chiave gratuita): fotografi l'etichetta e
  si compilano nome, produttore, annata, tipo, zona, vitigno, finestra di beva,
  descrizione e abbinamenti; oppure scrivi il nome e "Completa dal nome".
- **Clima della cantina**: temperatura e umidità in testa alla card, con un
  avviso se restano fuori dai limiti (predefiniti 10–16 °C, 60–80 %) per 30 minuti.
- **Storico** di bottiglie bevute, regalate, rotte… con "Rimetti" per gli errori.

## Installazione (HACS)

1. HACS → ⋮ → **Repository personalizzati** → `https://github.com/Mesa91/TaponBon`,
   tipo **Integrazione**.
2. Scarica **TaponBon** e **riavvia Home Assistant**.
3. **Impostazioni → Dispositivi e servizi → Aggiungi integrazione → TaponBon**.
4. Facoltativo: **Configura** → incolla la chiave Gemini (gratis su aistudio.google.com).
5. In una dashboard aggiungi la scheda:

   ```yaml
   type: custom:taponbon-card
   columns: 3   # facoltativo: scaffali per riga su schermi larghi
   ```

## Entità, servizi, eventi

| | |
|---|---|
| `sensor.taponbon_bottiglie` | bottiglie in cantina (attributi: quante per tipo) |
| `sensor.taponbon_posti_liberi` | posti liberi sugli scaffali |
| `sensor.taponbon_da_bere_presto` | bottiglie con la finestra in chiusura o chiusa |
| `taponbon.take_bottle` | toglie la bottiglia di un codice letto (lettore fisso) |
| `taponbon.print_label` | richiede la stampa dell'etichetta di una bottiglia |
| `taponbon.check_drink_alerts` | lancia subito il controllo delle finestre di beva |
| evento `taponbon_label_requested` | per la stampante: `qr_payload`, `name`, `vintage`, `type_label`, `producer`, `location`, `lines`, `label_path` |
| evento `taponbon_bottle_taken` | bottiglia prelevata: `name`, `vintage`, `location`, `remaining` |
| evento `taponbon_drink_alert` | `closing`, `past`, `message` |
| evento `taponbon_climate_alert` | `measure`, `status` (`low`/`high`/`ok`), `value`, `message` |

### Stampante Niimbot

Con l'integrazione [`hass-niimbot`](https://github.com/eigger/hass-niimbot) installata,
scegli la stampante in **Configura → Stampante di etichette**: TaponBon stampa da
solo l'etichetta di ogni bottiglia aggiunta (e dal pulsante 🖨️ della scheda),
nel formato scelto in ⚙︎ → Etichette (consigliato *Solo QR · 30 × 30 mm* con
rotoli 30 × 30).

Per altre stampanti c'è sempre l'evento `taponbon_label_requested`, con
`qr_payload`, `lines` e `label_path` (PNG pronto).

### Notifica sul telefono quando prelevi una bottiglia

```yaml
alias: TaponBon - bottiglia prelevata
triggers:
  - trigger: event
    event_type: taponbon_bottle_taken
actions:
  - action: notify.mobile_app_<il_tuo_telefono>
    data:
      title: "🍷 {{ trigger.event.data.name }} {{ trigger.event.data.vintage or '' }}"
      message: "Prelevata. Ne restano {{ trigger.event.data.remaining }}."
```

## Sviluppo

- Integrazione: `custom_components/taponbon/` (logica pura in `logic.py`, testata in `tests/`).
- Card: `frontend/src/` (Lit + TypeScript). Ogni push su `main` che tocca
  `frontend/` la ricompila con GitHub Actions in
  `custom_components/taponbon/frontend/taponbon-card.js`.
- Anteprima senza Home Assistant: `python3 -m http.server` nella cartella del
  progetto, poi `http://localhost:8000/frontend/preview/`.
- Test: `pip install pytest segno pillow && python -m pytest -q`.
