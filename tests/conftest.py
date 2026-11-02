"""Load the integration's modules without Home Assistant installed."""

import copy
import importlib.util
import pathlib
import sys
import types

ROOT = pathlib.Path(__file__).resolve().parents[1] / "custom_components" / "taponbon"


class FakeStore:
    disk = None
    saves = 0

    def __init__(self, *args, **kwargs):
        pass

    async def async_load(self):
        return copy.deepcopy(FakeStore.disk)

    async def async_save(self, data):
        FakeStore.disk = copy.deepcopy(data)
        FakeStore.saves += 1


def _stub(name, **attrs):
    mod = types.ModuleType(name)
    mod.__dict__.update(attrs)
    sys.modules.setdefault(name, mod)
    return mod


_stub("homeassistant")
_stub("homeassistant.core", HomeAssistant=object)
_stub("homeassistant.helpers")
_stub("homeassistant.helpers.storage", Store=FakeStore)

pkg = types.ModuleType("tb")
pkg.__path__ = [str(ROOT)]
sys.modules["tb"] = pkg
for name in ("const", "logic", "labels", "store"):
    spec = importlib.util.spec_from_file_location(f"tb.{name}", ROOT / f"{name}.py")
    mod = importlib.util.module_from_spec(spec)
    sys.modules[f"tb.{name}"] = mod
    spec.loader.exec_module(mod)
