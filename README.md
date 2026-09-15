# Jobboard

A lightweight, local-first job application pipeline built for thoughtful job searches.

Jobboard keeps applications, interview loops, saved roles, and follow-ups visible in one pipeline so the process feels intentional instead of scattered across tabs and spreadsheets.

## Highlights
- Kanban-style Saved → Applied → Interview → Offer pipeline
- Add applications with company, role, and follow-up context
- Move applications forward or back between stages
- Response-rate and pipeline metrics
- Export the board as JSON
- Responsive layout and local persistence

## Run locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173.

## License
MIT © 2026 Yuin

## Desktop release

The repository includes a portable Windows desktop build. Every push to `main` runs the Windows packaging workflow and publishes a `.exe` to the repository's **Releases** section. The desktop shell loads the same app locally, so it works without an API key or server.

## Android release

An Android 7.0+ build (API 24+) is scheduled for **September 16, 2026 at 10:00 IST**. The same responsive product is packaged with Capacitor as an installable APK and published to the repository's **Releases** section as `v1.0.0`.
