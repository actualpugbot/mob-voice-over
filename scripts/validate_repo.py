#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "public" / "mob_config.json"
SOUND_LIBRARY_PATH = ROOT / "public" / "assets" / "mob_sounds" / "index.json"
DEFAULT_SET_ID = "basic"
ID_PATTERN = re.compile(r"^[a-z0-9_]+$")


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def ensure_path_exists(path_value: str, context: str, errors: list[str]) -> None:
    path_text = str(path_value or "").strip()
    if not path_text:
        errors.append(f"{context}: missing path value")
        return
    target = ROOT / path_text
    if not target.exists():
        errors.append(f"{context}: path does not exist -> {path_text}")


def normalize_mob_id(value: str) -> str:
    return str(value or "").strip().lower()


def validate_config(errors: list[str]) -> dict:
    if not CONFIG_PATH.exists():
        errors.append("Missing public/mob_config.json")
        return {}

    try:
        config = load_json(CONFIG_PATH)
    except Exception as exc:  # noqa: BLE001
        errors.append(f"Failed to parse public/mob_config.json: {exc}")
        return {}

    presets = config.get("versionPresets")
    if not isinstance(presets, list) or not presets:
        errors.append("versionPresets must be a non-empty array")
    else:
        for index, preset in enumerate(presets):
            pack_format = preset.get("packFormat")
            if not isinstance(pack_format, int) or pack_format <= 0:
                errors.append(f"versionPresets[{index}].packFormat must be a positive integer")

    mob_sets = config.get("mobSets")
    if not isinstance(mob_sets, dict) or not mob_sets:
        errors.append("mobSets must be a non-empty object")
        return config
    if DEFAULT_SET_ID not in mob_sets:
        errors.append(f'mobSets must include "{DEFAULT_SET_ID}"')

    resolving: set[str] = set()
    resolved_cache: dict[str, list[dict]] = {}

    def resolve_set(set_id: str) -> list[dict]:
        if set_id in resolved_cache:
            return resolved_cache[set_id]
        if set_id in resolving:
            errors.append(f'Cycle detected in mob set inheritance at "{set_id}"')
            return []
        set_def = mob_sets.get(set_id)
        if not isinstance(set_def, dict):
            errors.append(f'Mob set "{set_id}" is missing or not an object')
            return []

        resolving.add(set_id)
        base: list[dict] = []
        extends_id = set_def.get("extends")
        if extends_id:
            if extends_id not in mob_sets:
                errors.append(f'Mob set "{set_id}" extends unknown set "{extends_id}"')
            else:
                base = resolve_set(str(extends_id))

        own_mobs = set_def.get("mobs", [])
        if not isinstance(own_mobs, list):
            errors.append(f'Mob set "{set_id}" has non-array "mobs" value')
            own_mobs = []
        resolved = [*base, *own_mobs]
        resolved_cache[set_id] = resolved
        resolving.discard(set_id)
        return resolved

    for set_id, set_def in mob_sets.items():
        if not isinstance(set_def, dict):
            errors.append(f'Mob set "{set_id}" must be an object')
            continue
        resolved_mobs = resolve_set(set_id)
        seen_ids: set[str] = set()
        for idx, mob in enumerate(resolved_mobs):
            if not isinstance(mob, dict):
                errors.append(f'Mob set "{set_id}" contains a non-object mob entry at index {idx}')
                continue
            mob_id = normalize_mob_id(mob.get("id"))
            if not ID_PATTERN.match(mob_id):
                errors.append(f'Mob set "{set_id}" has invalid mob id "{mob.get("id")}"')
                continue
            if mob_id in seen_ids:
                errors.append(f'Mob set "{set_id}" has duplicate mob id "{mob_id}" after inheritance')
            seen_ids.add(mob_id)

            mob_name = str(mob.get("mob", "")).strip()
            if not mob_name:
                errors.append(f'Mob set "{set_id}" mob "{mob_id}" is missing "mob" label')

            ensure_path_exists(str(mob.get("image", "")).strip(), f'mobSets.{set_id}.mobs[{mob_id}].image', errors)

            sound_event_keys = mob.get("soundEventKeys")
            if not isinstance(sound_event_keys, list) or not sound_event_keys:
                errors.append(f'mobSets.{set_id}.mobs[{mob_id}].soundEventKeys must be a non-empty array')
            else:
                for key in sound_event_keys:
                    if not str(key or "").strip():
                        errors.append(f'mobSets.{set_id}.mobs[{mob_id}].soundEventKeys contains an empty key')

            length_hint_ms = mob.get("lengthHintMs")
            if not isinstance(length_hint_ms, (int, float)) or length_hint_ms <= 0:
                errors.append(f'mobSets.{set_id}.mobs[{mob_id}].lengthHintMs must be > 0')

            style_hints = mob.get("styleHints")
            if not isinstance(style_hints, list):
                errors.append(f'mobSets.{set_id}.mobs[{mob_id}].styleHints must be an array')

    return config


def validate_sound_library(errors: list[str]) -> None:
    if not SOUND_LIBRARY_PATH.exists():
        return
    try:
        library = load_json(SOUND_LIBRARY_PATH)
    except Exception as exc:  # noqa: BLE001
        errors.append(f"Failed to parse {SOUND_LIBRARY_PATH.relative_to(ROOT)}: {exc}")
        return

    mobs = library.get("mobs")
    if not isinstance(mobs, dict):
        errors.append("public/assets/mob_sounds/index.json must include an object at key 'mobs'")
        return

    for mob_id, entry in mobs.items():
        if not ID_PATTERN.match(normalize_mob_id(mob_id)):
            errors.append(f"Sound library has invalid mob id key: {mob_id}")
            continue
        if not isinstance(entry, dict):
            errors.append(f"Sound library entry for {mob_id} must be an object")
            continue
        default_path = str(entry.get("default", "")).strip()
        if not default_path:
            errors.append(f"soundLibrary.{mob_id}.default must be a non-empty path")
        files = entry.get("files")
        if not isinstance(files, list):
            errors.append(f"soundLibrary.{mob_id}.files must be an array")
            continue
        if not files:
            errors.append(f"soundLibrary.{mob_id}.files must include at least one file path")
            continue
        existing_file_count = 0
        for path_value in files:
            if (ROOT / str(path_value)).exists():
                existing_file_count += 1
        if existing_file_count == 0:
            errors.append(f"soundLibrary.{mob_id}.files does not reference any existing local audio files")


def validate_generated_artifacts(errors: list[str]) -> None:
    try:
        result = subprocess.run(
            ["git", "ls-files"],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
        )
    except Exception as exc:  # noqa: BLE001
        errors.append(f"Failed to read tracked file list from git: {exc}")
        return

    tracked_paths = [line.strip() for line in result.stdout.splitlines() if line.strip()]
    for tracked_path in tracked_paths:
        if tracked_path.endswith(".pyc") or "__pycache__/" in tracked_path:
            errors.append(f"Generated Python cache files should not be tracked: {tracked_path}")


def main() -> int:
    errors: list[str] = []
    validate_config(errors)
    validate_sound_library(errors)
    validate_generated_artifacts(errors)

    if errors:
        print("Repository validation failed:\n")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Repository validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
