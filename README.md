# mvo (Mob Voice Over)

Mob Voice Over is a minimal browser wizard that records your voice for mobs and exports a Minecraft Java resource pack zip.

## Simplified UX

- No setup screen.
- Pack name is fixed to `Mob Voice Over`.
- `pack.mcmeta` is generated from `public/mob_config.json` `versionPresets[0]` (`packFormat` + optional `supportedFormats` range).
- You press and hold to record one sound per mob, then release to stop.
- Review playback, then use `Next` / `Done` as the accept action.
- That one recording is used for all configured mob sound variants (ambient/hurt/death plus mob-specific variants like primed, scream, celebrate, etc.).

## Mob Images

Mob prompt images are stored locally in `public/assets/mobs/` and referenced from `public/mob_config.json`.

## Quick Start

1. Start a static server from repo root:

```bash
python3 -m http.server 8080
```

2. Open:

```text
http://localhost:8080
```

3. Use the two sections:
- `Record`: capture and accept each mob voice, or import a raw recordings zip to skip straight to review/export
- `Export`: download the resource pack zip, download raw recordings, or import raw recordings from a previous session

4. Drop the zip into Minecraft Java `resourcepacks/`, then enable it in-game.

## Configuration

Edit `public/mob_config.json`.

Each mob entry includes:

- `id`: exported file path key (`mobvoices/<id>/voice.ogg`)
- `mob`: display name
- `image`: local mob image path
- `promptText`, `lengthHintMs`, `styleHints`
- `soundEventKeys`: event keys that all map to the same recording

Version compatibility preset includes:

- `versionPresets[0].packFormat`: exported `pack.pack_format`
- `versionPresets[0].supportedFormats.min/max` (optional): exported as `pack.min_format/max_format` and `pack.supported_formats.min_inclusive/max_inclusive`

## Output Structure

- `pack.mcmeta`
- `pack.png` (placeholder icon)
- `assets/minecraft/sounds.json`
- `assets/minecraft/sounds/mobvoices/<mob-id>/voice.ogg`
- `MobVoiceOver_raw_recordings.zip` contains:
- `raw/<mob-id>.ogg` for each accepted recording
- `raw/manifest.json` with clip metadata for re-import

## Notes

- First export loads `ffmpeg.wasm` from CDN and can take several seconds.
- Recordings are auto-mastered on conversion/export (compression + loudness normalization + limiting) to keep levels more consistent in-game.
- Chrome/Chromium is the MVP target browser.
