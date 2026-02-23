#!/usr/bin/env python3
import json
import re
import subprocess
import time
import urllib.parse
from pathlib import Path

API_URL = "https://minecraft.wiki/api.php"
FILE_PATH_PREFIX = "https://minecraft.wiki/w/Special:FilePath/"
APP_JS_PATH = Path("src/app.js")
OUT_ROOT = Path("public/assets/mob_sounds")
MANIFEST_PATH = OUT_ROOT / "index.json"

CATEGORY_OVERRIDES = {
    "cave_spider": ["Spider"],
    "trader_llama": ["Trader Llama", "Llama"],
    "zombie_horse": ["Zombie Horse", "Horse"],
    "skeleton_horse": ["Skeleton Horse", "Horse"],
}

FALLBACK_SOURCE_MOBS = {
    "cod": "pufferfish",
    "salmon": "pufferfish",
    "tropical_fish": "pufferfish",
    "endermite": "silverfish",
    "mule": "donkey",
}


def to_title_case(value: str) -> str:
    return " ".join(part.capitalize() for part in value.split("_") if part)


def normalize_space(value: str) -> str:
    return " ".join(str(value or "").split()).strip().lower()


def safe_filename(file_title: str) -> str:
    clean = re.sub(r"^File:", "", file_title, flags=re.IGNORECASE).strip()
    clean = clean.replace(" ", "_")
    clean = re.sub(r"[^A-Za-z0-9._-]+", "_", clean)
    clean = re.sub(r"_+", "_", clean).strip("_")
    return clean or "unknown.ogg"


def parse_vanilla_mob_ids() -> list[str]:
    text = APP_JS_PATH.read_text(encoding="utf-8")
    match = re.search(r"const VANILLA_MOB_IDS = \[(.*?)\];", text, re.S)
    if not match:
        raise RuntimeError("Could not find VANILLA_MOB_IDS in src/app.js")
    return re.findall(r'"([a-z0-9_]+)"', match.group(1))


def fetch_json(params: dict, retries: int = 5):
    query = urllib.parse.urlencode({"format": "json", "origin": "*", **params})
    url = f"{API_URL}?{query}"
    last_err = None
    for attempt in range(retries):
        try:
            result = subprocess.run(
                ["curl", "-sS", "--fail", url],
                check=True,
                capture_output=True,
                text=True,
                timeout=45,
            )
            return json.loads(result.stdout)
        except Exception as err:  # noqa: BLE001
            last_err = err
            time.sleep(min(2 + attempt, 8))
    raise RuntimeError(f"Failed request after retries: {url}\n{last_err}")


def download_file(url: str, out_path: Path, retries: int = 5):
    last_err = None
    for attempt in range(retries):
        try:
            out_path.parent.mkdir(parents=True, exist_ok=True)
            subprocess.run(
                ["curl", "-L", "-sS", "--fail", "-o", str(out_path), url],
                check=True,
                timeout=90,
            )
            return out_path.stat().st_size
        except Exception as err:  # noqa: BLE001
            last_err = err
            time.sleep(min(2 + attempt, 8))
    raise RuntimeError(f"Failed download after retries: {url}\n{last_err}")


def score_sound_file(file_title: str, mob_label: str) -> int:
    mob_name = re.sub(r"[^a-z0-9 ]+", " ", mob_label.lower()).strip()
    mob_tokens = [token for token in mob_name.split() if token]
    text = file_title.lower()
    score = 0
    score += sum(5 for token in mob_tokens if token in text)

    if re.search(r"(^|[ _-])(ambient|idle|living|say|loop|breathe)([0-9_ -]|$)", text):
        score += 40
    if re.search(r"(^|[ _-])(angry|growl|warn|purr|meow|sniff|flop|swim|jump)([0-9_ -]|$)", text):
        score += 10
    if re.search(
        r"(^|[ _-])(death|die|hurt|damage|step|attack|explode|burn|shoot|convert|infect|remedy)([0-9_ -]|$)",
        text,
    ):
        score -= 35
    if re.search(r"(^|[ _-])(celebrate|raid_horn|imitate)([0-9_ -]|$)", text):
        score -= 10
    return score


def find_best_category(mob_id: str, mob_label: str) -> str:
    candidates = []
    candidates.extend(CATEGORY_OVERRIDES.get(mob_id, []))
    candidates.extend([mob_label, to_title_case(mob_id), mob_id.replace("_", " ")])
    unique = []
    for c in candidates:
        clean = str(c or "").strip()
        if clean and clean not in unique:
            unique.append(clean)

    best_category = ""
    best_score = -10**9
    for name in unique:
        target = normalize_space(f"{name} sounds")
        data = fetch_json(
            {
                "action": "query",
                "list": "search",
                "srnamespace": "14",
                "srlimit": "20",
                "srsearch": f"{name} sounds",
            }
        )
        results = data.get("query", {}).get("search", [])
        for idx, row in enumerate(results):
            raw_title = str(row.get("title", "")).strip()
            if not raw_title.lower().startswith("category:"):
                continue
            category = raw_title.split(":", 1)[1].strip()
            normalized = normalize_space(category)
            if not normalized.endswith(" sounds"):
                continue
            score = 0
            if normalized == target:
                score += 100
            if normalize_space(name) in normalized:
                score += 25
            score += max(0, 20 - idx)
            if score > best_score:
                best_score = score
                best_category = category
        if best_score >= 100:
            break
    return best_category


def list_category_ogg_files(category: str) -> list[str]:
    files = []
    cmcontinue = None
    while True:
        params = {
            "action": "query",
            "list": "categorymembers",
            "cmtitle": f"Category:{category}",
            "cmnamespace": "6",
            "cmlimit": "500",
        }
        if cmcontinue:
            params["cmcontinue"] = cmcontinue
        data = fetch_json(params)
        members = data.get("query", {}).get("categorymembers", [])
        for row in members:
            title = str(row.get("title", "")).strip()
            if title.lower().startswith("file:") and title.lower().endswith(".ogg"):
                files.append(title)
        cmcontinue = data.get("continue", {}).get("cmcontinue")
        if not cmcontinue:
            break
    return sorted(set(files))


def main():
    mob_ids = parse_vanilla_mob_ids()
    manifest = {
        "source": "minecraft.wiki",
        "generatedAt": int(time.time()),
        "mobs": {},
    }

    total_downloaded = 0
    total_bytes = 0
    missing = []

    OUT_ROOT.mkdir(parents=True, exist_ok=True)

    for mob_id in mob_ids:
        mob_label = to_title_case(mob_id)
        print(f"[mob] {mob_id}")
        category = find_best_category(mob_id, mob_label)
        if not category:
            missing.append(mob_id)
            manifest["mobs"][mob_id] = {"category": "", "default": "", "files": []}
            print("  - no matching wiki sound category")
            continue

        files = list_category_ogg_files(category)
        if not files:
            missing.append(mob_id)
            manifest["mobs"][mob_id] = {"category": category, "default": "", "files": []}
            print(f"  - category found but no .ogg files: {category}")
            continue

        out_dir = OUT_ROOT / mob_id
        out_dir.mkdir(parents=True, exist_ok=True)
        local_files = []
        for file_title in files:
            encoded = urllib.parse.quote(re.sub(r"^File:", "", file_title, flags=re.IGNORECASE).replace(" ", "_"))
            url = f"{FILE_PATH_PREFIX}{encoded}"
            fname = safe_filename(file_title)
            out_path = out_dir / fname
            if not out_path.exists() or out_path.stat().st_size == 0:
                size = download_file(url, out_path)
                total_downloaded += 1
                total_bytes += size
            local_files.append(f"public/assets/mob_sounds/{mob_id}/{fname}")

        default_file = max(files, key=lambda title: score_sound_file(title, mob_label))
        default_fname = safe_filename(default_file)
        manifest["mobs"][mob_id] = {
            "category": category,
            "default": f"public/assets/mob_sounds/{mob_id}/{default_fname}",
            "files": local_files,
        }
        print(f"  - {category}: {len(local_files)} files")

    for mob_id, source_mob_id in FALLBACK_SOURCE_MOBS.items():
        target = manifest["mobs"].get(mob_id) or {}
        target_files = target.get("files") if isinstance(target, dict) else []
        if target_files:
            continue
        source = manifest["mobs"].get(source_mob_id) or {}
        source_files = source.get("files") if isinstance(source, dict) else []
        if not source_files:
            continue
        manifest["mobs"][mob_id] = {
            "category": f"Fallback from {source_mob_id}",
            "default": source.get("default") or source_files[0],
            "files": source_files[:],
        }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"\nWrote manifest: {MANIFEST_PATH}")
    print(f"Downloaded files this run: {total_downloaded}")
    print(f"Downloaded bytes this run: {total_bytes}")
    if missing:
        print(f"Mobs with missing sounds: {len(missing)} -> {', '.join(missing)}")
    else:
        print("All vanilla mobs resolved with local files.")


if __name__ == "__main__":
    main()
