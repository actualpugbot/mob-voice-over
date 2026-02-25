# Contributing

Thanks for helping improve Mob Voice Over.

## Development setup

1. Clone the repository.
2. Serve it over HTTP from the project root:

```bash
python3 -m http.server 8080
```

3. Open `http://localhost:8080`.

Do not run the app from `file://`; config and assets are fetched at runtime.

## Before opening a PR

Run the local checks:

```bash
python3 -m py_compile scripts/*.py
python3 scripts/validate_repo.py
```

Then manually verify in a browser:

- Main challenge flow: record, skip, accept, export.
- Advanced page flow: record/include/exclude, export/import raw zip.
- At least one non-OGG recording conversion during export.

## Project conventions

- Keep the app dependency-light and build-step-free.
- Prefer small, targeted commits with clear messages.
- Keep vanilla JS readable; avoid introducing framework/tooling overhead.
- Preserve existing asset and config paths unless intentionally migrating data.

## Pull request guidance

- Describe the behavior change and why it is needed.
- Include screenshots or short recordings for UI changes.
- Mention any backward-incompatible data/config changes.
