"""Constants for TaponBon."""

DOMAIN = "taponbon"
NAME = "TaponBon"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1

# Card: served from the integration folder and loaded on every dashboard.
CARD_URL = "/taponbon/taponbon-card.js"
CARD_VERSION = "20261102i"  # bump with every frontend build to bust the cache

# Wine types: key -> (Italian label, colour used on the rack).
WINE_TYPES: dict[str, tuple[str, str]] = {
    "red": ("Rosso", "#7b1e2b"),
    "white": ("Bianco", "#e9dca4"),
    "rose": ("Rosato", "#e79bb3"),
    "sparkling": ("Bollicine", "#c9d97a"),
    "dessert": ("Dolce", "#d9a03a"),
}

REMOVAL_REASONS: dict[str, str] = {
    "drank": "Bevuta",
    "gifted": "Regalata",
    "broken": "Rotta",
    "spoiled": "Andata a male",
    "deleted": "Eliminata",
    "other": "Altro",
}

DEFAULT_RACK = {"name": "Scaffale", "rows": 7, "cols": 10}
MAX_RACK_SIDE = 30

# Settings (stored with the data, editable from the card).
CONF_AUTO_LABELS = "auto_labels"
DEFAULT_AUTO_LABELS = True
CONF_ALERT_DAYS = "alert_days"
DEFAULT_ALERT_DAYS = 180
CONF_NOTIFIED = "notified_alerts"  # bookkeeping, not user-editable

# Events.
EVENT_UPDATED = f"{DOMAIN}_updated"
EVENT_BOTTLE_TAKEN = f"{DOMAIN}_bottle_taken"
EVENT_SCAN_UNMATCHED = f"{DOMAIN}_scan_unmatched"
EVENT_LABEL_REQUESTED = f"{DOMAIN}_label_requested"
EVENT_DRINK_ALERT = f"{DOMAIN}_drink_alert"

ALERT_HOUR = 10
SCAN_DEBOUNCE_SECONDS = 15

# Options (config entry): Gemini.
CONF_GEMINI_KEY = "gemini_api_key"
CONF_GEMINI_MODEL = "gemini_model"
