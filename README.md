# Jobboard

> A lightweight job application pipeline for thoughtful searches.

[![Quality checks](https://github.com/bhargav-del/jobboard/actions/workflows/quality.yml/badge.svg)](https://github.com/bhargav-del/jobboard/actions/workflows/quality.yml)
[![Latest release](https://img.shields.io/github/v/release/bhargav-del/jobboard?display_name=tag&sort=semver)](https://github.com/bhargav-del/jobboard/releases)
[![License](https://img.shields.io/github/license/bhargav-del/jobboard)](https://github.com/bhargav-del/jobboard/blob/main/LICENSE)

A lightweight job application pipeline for thoughtful searches. Built as a local-first, dependency-light product experience with a self-contained Windows desktop app, a portable Windows build, and a scheduled Android APK release.

## What it demonstrates

- Saved → Applied → Interview → Offer pipeline
- Add applications with follow-up context
- Move opportunities between stages
- Response-rate metrics and JSON export

## Run locally

This is a zero-build static app for the browser:

```bash
git clone https://github.com/bhargav-del/jobboard.git
cd jobboard
python3 -m http.server 4173
```

Open <http://localhost:4173>.

For syntax and metadata checks:

```bash
node --check app.js
```

## Project structure

```text
├── index.html                 Product UI
├── styles.css                 Responsive visual system
├── app.js                    Product interactions
├── desktop/main.cjs           Windows Electron shell
├── capacitor.config.json      Android shell configuration
├── .github/workflows/         Quality, Pages, Windows, and Android automation
└── CHANGELOG.md               Release history
```

## Releases

The Windows release is fully self-contained: download either the portable `.exe` or the guided `Setup.exe` installer. The app bundles its HTML, CSS, JavaScript, and runtime inside the executable package, so users do not need separate web files.

- [Windows downloads](https://github.com/bhargav-del/jobboard/releases/tag/v1.0.5)
- Portable: `Jobboard-Portable-1.0.5.exe`
- Installer: `Jobboard-Setup-1.0.5.exe`
- Android 7+ (API 24+) `v1.0.0` APK remains scheduled for **September 16, 2026 at 08:00 IST**.

## Privacy and security

The core experience runs locally in the browser. No credentials are required. See [SECURITY.md](SECURITY.md) for responsible disclosure guidance.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, testing, and pull-request expectations.

## Roadmap

- Add richer empty and error states
- Expand keyboard navigation
- Add end-to-end browser coverage for the highest-value flows
- Keep the product lightweight before adding network dependencies

## License

MIT © 2026 Yuin
