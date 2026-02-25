# Mob Voice Over

Browser app for recording custom mob voices and exporting them as a Minecraft Java resource pack.

The project is intentionally build-step-free: plain HTML/CSS + one vanilla JavaScript module.

## Features

- Main challenge mode (`index.html`) with scoring and progressive recording flow.
- Advanced recorder (`advanced.html`) for direct per-mob recording control.
- Immediate local preview for original clips and user recordings.
- Automatic OGG conversion/mastering via `ffmpeg.wasm` (loaded on demand).
- Resource pack export (`pack.mcmeta`, `sounds.json`, and mob voice files).
- Raw recording import/export zip format for iteration and backup.

## Quick Start

Requirements:

- Python 3 (or any static HTTP server)
- Modern Chromium-based browser (recommended)

Run locally:

```bash
python3 -m http.server 8080
```

Then open:

- Main app: `http://localhost:8080/`
- Advanced app: `http://localhost:8080/advanced.html`

Do not run from `file://`; config and assets are fetched at runtime.

## Project Layout

```text
.
├── index.html                      # Main challenge page
├── advanced.html                   # Advanced recorder page
├── styles.css                      # Shared styling
├── src/app.js                      # App logic
├── public/mob_config.json          # Mob/version data contract
├── public/assets/                  # Images, sounds, pack icon
├── scripts/download_mob_sounds.py  # Sound library fetch tool
└── scripts/validate_repo.py        # Repository/data integrity checks
```

## Configuration Contract

`public/mob_config.json` drives mob and version behavior.

Top-level keys:

- `versionPresets`: list of export format presets
- `mobSets`: named mob sets (`basic` is the default runtime set)

Each mob entry in a set includes:

- `id`: stable mob id (snake_case)
- `mob`: display label
- `image`: image path
- `lengthHintMs`: authoring hint
- `styleHints`: free-form hint array
- `soundEventKeys`: Minecraft sound event keys to override

## Export Behavior

When exporting a pack:

1. Accepted clips are converted to OGG as needed.
2. Each included mob writes to:
   `assets/minecraft/sounds/mobvoices/<mob-id>/voice.ogg`
3. `assets/minecraft/sounds.json` maps each mob’s `soundEventKeys` to that file.
4. A final zip is downloaded as `Mob_Voice_Over.zip`.

## Raw Recording Zip Format

Raw export file: `MobVoiceOver_raw_recordings.zip`

Expected contents:

- `raw/<mob-id>.ogg`
- optional `raw/manifest.json` with clip metadata

Import prefers `raw/manifest.json` when present and falls back to scanning `raw/*`.

## Development Checks

Run local validation before pushing changes:

```bash
python3 -m py_compile scripts/*.py
python3 scripts/validate_repo.py
```

CI runs the same checks in `.github/workflows/quality.yml`.

## Deployment

GitHub Pages deployment is handled by `.github/workflows/pages.yml`.

Pushes to `main` trigger deployment (assuming repository Pages source is set to GitHub Actions).

## Troubleshooting

- Microphone blocked: enable mic permissions in browser settings.
- Microphone unsupported: use a browser with `MediaRecorder` + `getUserMedia`.
- Export conversion failures: verify network access to jsDelivr/unpkg and run via HTTP, not `file://`.
- Empty raw import: verify `raw/` exists and filenames use mob ids (for example `raw/cow.ogg`).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This repository is licensed under [MIT](LICENSE).

## Third-Party Notices

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for dependency and Minecraft asset notices.
