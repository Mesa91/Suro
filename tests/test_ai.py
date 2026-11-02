import json

import pytest

from tb import ai


def _payload(obj):
    return {"candidates": [{"content": {"parts": [{"text": json.dumps(obj) if not isinstance(obj, str) else obj}]}}]}


def test_parse_and_normalize():
    wine = ai.parse_response(_payload({
        "name": "Barolo Cannubi", "producer": "Brezza", "vintage": "2016", "type": "Rosso",
        "region": "Barolo DOCG", "country": "Italia", "grape": "Nebbiolo", "alcohol": "14,5",
        "drink_from": 2034, "drink_until": "2022", "description": "Elegante.",
        "food_pairings": ["brasato", "tartufo"], "extra": "ignored", "producer_note": None,
    }))
    assert wine["vintage"] == 2016 and wine["type"] == "red"
    assert (wine["drink_from"], wine["drink_until"]) == (2022, 2034)
    assert wine["alcohol"] == "14,5%" and wine["food_pairings"] == "brasato, tartufo"
    assert "extra" not in wine


def test_parse_fenced_json_and_types():
    text = '```json\n{"name": "Franciacorta", "type": "spumante", "vintage": null}\n```'
    wine = ai.parse_response(_payload(text))
    assert wine == {"name": "Franciacorta", "type": "sparkling"}


def test_empty_answer_is_a_readable_error():
    with pytest.raises(ai.AIError):
        ai.parse_response({"promptFeedback": {"blockReason": "SAFETY"}})


def test_prompts_mention_fields():
    assert '"drink_until"' in ai.label_prompt()
    assert "Barolo" in ai.fill_prompt({"name": "Barolo", "notes": "x"})


def test_choose_model_prefers_newest_stable_flash():
    gen = ["generateContent"]
    models = [
        {"name": "models/gemini-2.5-flash", "supportedGenerationMethods": gen},
        {"name": "models/gemini-3.6-flash", "supportedGenerationMethods": gen},
        {"name": "models/gemini-3.8-flash-preview", "supportedGenerationMethods": gen},
        {"name": "models/gemini-3.5-flash-lite", "supportedGenerationMethods": gen},
        {"name": "models/gemini-3.8-flash-tts", "supportedGenerationMethods": gen},
        {"name": "models/gemini-3.1-flash-image", "supportedGenerationMethods": gen},
        {"name": "models/gemini-embedding-2", "supportedGenerationMethods": ["embedContent"]},
        {"name": "models/gemini-flash-latest", "supportedGenerationMethods": gen},
    ]
    assert ai.choose_model(models) == "gemini-3.6-flash"
    assert ai.choose_model([]) is None
