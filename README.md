# Mob Voice Over

Browser-based recorder for generating a Minecraft Java resource pack that replaces mob sounds with voice recordings.

## What This Repo Is

- Single-page app with no build step.
- Static assets + vanilla JavaScript module (`src/app.js`).
- Uses `MediaRecorder` for capture, `@ffmpeg/*` (WASM loaded from CDN) for OGG conversion/mastering, and `JSZip` for zip generation.

## Project Layout

```text
.
├── index.html                    # App entrypoint
├── styles.css                    # UI styling
├── src/app.js                    # Main app logic
├── public/mob_config.json        # Mob/version config (primary data contract)
├── public/assets/                # Mob images + pack icon
└── .github/workflows/pages.yml   # GitHub Pages deploy workflow
```

Current mob image assets in `public/assets/mobs`:
- Total files: 117
- PNG files: 80
- GIF files: 37

## Local Development

Requirements:
- Modern Chromium-based browser (recommended).
- Python 3 (or any static file server).

Run:

```bash
cd ~/dev/mob-voice-over
python3 -m http.server 8080
```

Open `http://localhost:8080`.

Notes:
- Do not open with `file://`; the app fetches JSON/assets and needs HTTP.
- First conversion/export may be slow because ffmpeg WASM is loaded on demand from CDN.

## How The App Works

1. `src/app.js` loads `public/mob_config.json`.
2. Record flow:
   - User holds button to record (`MediaRecorder`).
   - Recording is previewable and marked accepted via `Next/Done` or `Skip`.
   - Non-OGG input is converted to OGG immediately after recording.
3. Export flow:
   - Builds `pack.mcmeta` from `versionPresets[0]`.
   - Builds `assets/minecraft/sounds.json` from each mob `soundEventKeys`.
   - Writes one audio file per mob to `assets/minecraft/sounds/mobvoices/<mob-id>/voice.ogg`.
   - Downloads final pack zip (`Mob_Voice_Over.zip`).

## Configuration Contract (`public/mob_config.json`)

Top-level fields used by code:
- `versionPresets[0].packFormat` -> `pack.pack_format`
- optional `versionPresets[0].supportedFormats.min/max` -> `pack.min_format`, `pack.max_format`, and `pack.supported_formats`
- app currently resolves `mobSets.basic`
- each mob entry fields:
  - `id`
  - `mob`
  - `image`
  - `lengthHintMs` (present for authoring; app currently enforces a fixed 5s max)
  - `styleHints`
  - `soundEventKeys` (all mapped to the same recorded clip)

## Raw Recording Import/Export

The app can export/import raw clips to speed iteration:
- Zip name: `MobVoiceOver_raw_recordings.zip`
- Contents:
  - `raw/<mob-id>.ogg`
  - `raw/manifest.json` with clip metadata

Import behavior:
- Prefers `raw/manifest.json` when present.
- Falls back to scanning `raw/*.ext`.
- Ignores clips whose `mob-id` does not exist in current config.

## Deployment (GitHub Pages)

Workflow is already included at `.github/workflows/pages.yml`.

Publish model:
- Push to `main` triggers Pages deployment via GitHub Actions.
- In GitHub repo settings, ensure `Pages -> Source` is set to `GitHub Actions`.

Expected URL:
- `https://actualpugbot.github.io/mob-voice-over/`

## Troubleshooting

- Microphone blocked: enable browser mic permission and retry.
- Export fails with ffmpeg load errors: confirm network access to jsDelivr/unpkg CDNs and run via local HTTP server (not `file://`).
- No recordings found on raw import: check zip structure includes `raw/` and filenames like `raw/cow.ogg`.

## Contributing

Repo Git identity (local):

```bash
git config user.name "actualpug"
git config user.email "actualpug@gmail.com"
```

Recommended flow:

```bash
git add .
git commit -m "Describe change"
git push origin main
```
