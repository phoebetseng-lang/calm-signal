# Calm Signal — Crew Health Review

A 2026 NASA Space Apps Challenge prototype for the official challenge **Create Health Monitoring Software for Astronauts on Space Missions**.

Official challenge: https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/

This is a decision-support demo, not a medical device. It does not diagnose, treat, or predict disease, and it does not report a validated accuracy. The crew member decides every next action.

## Features

- Works fully offline as a single HTML page (HTML, CSS, and JavaScript only; no CDN and no required network request for the built-in session or the radiation table, which is stored with the page).
- English interface with an optional Traditional Chinese toggle. Official submission language is English.
- Built-in 14-day **simulated** session of the indicator types named on the official challenge page: blood pressure, heart rate, blood sugar, body temperature, daily sleep hours, and self-reported mood. These numbers are not NASA measurements.
- **Mission radiation exposure** panel using a real, publicly downloaded NASA OSDR RadLab dataset: absorbed dose rate from instrument **DosTel1** on the ISS, 19 March–1 April 2022 (UTC). Daily mean, median, minimum, and maximum are computed from the raw API file (see `data/radlab/SOURCES.md`). This is ISS radiation-environment telemetry, **not** a personal medical record.
- Trend charts, illustrative “needs a closer look” flags (demo rules only), crew decision buttons, and a decision log that stays on this device.
- **Local AI Summary**: optional button that sends the selected day's simulated indicators, simple trends, and the RadLab daily radiation figures to a **user-set** OpenAI-compatible local endpoint (default `http://localhost:11434/v1`). The page does not hard-code any private host or API key. The result is plain-English draft text plus 2–3 options, labeled **AI draft – crew decides**. It is not a diagnosis.
- If the endpoint is missing or does not respond, the app automatically shows a **rule-based summary** and the label **Local AI unavailable – rule-based summary**. Opening `index.html` on any computer still works.
- Official NASA HRP hazard short descriptions and challenge-listed partner pages, quoted with links.
- Optional CSV import of another local simulated session (`data/sample-session.csv`).

## How to run

No install and no web server are required for the built-in demo.

1. Open `index.html` in a current desktop browser (Chrome, Edge, or Firefox).
2. The built-in simulated session and the RadLab daily table load immediately. Default view is day 8.
3. Optional: choose EN or 中文, move the day slider, inspect the radiation panel, click Local AI Summary if you have a local OpenAI-compatible server, or record a crew decision.

The Local AI Summary default endpoint is `http://localhost:11434/v1` (the common local port for an OpenAI-compatible server). Point it at whatever local server you run. If nothing is listening, the rule-based summary appears automatically. Some browsers may block a page opened from disk, or a page hosted on the public web, from calling `http://localhost:11434/v1`; if that happens, use the rule-based path, or open the folder through a local web server on the same computer.

## Data and sources

### Simulated indicator values (not NASA data)

The numbers in the built-in session and in `data/sample-session.csv` were written for this demo. They are **not** NASA measurements and must not be presented as official results.

CSV columns: `day,sys,dia,hr,glu,temp,sleep,mood`

- `sys` / `dia`: systolic and diastolic pressure, mm Hg
- `hr`: heart rate, bpm
- `glu`: blood sugar, mg/dL
- `temp`: body temperature, °C
- `sleep`: hours
- `mood`: self-report, 1–5 (5 = best)

### NASA OSDR RadLab — ISS DosTel1 absorbed dose rate (real public dataset)

- Portal: https://visualization.osdr.nasa.gov/radlab/gui/overview/
- Instrument ID: `DosTel1` (ISS)
- Field: `absorbed_dose_rate` (µGy/hour, as documented by the RadLab API)
- Window: 2022-03-19 00:00 UTC (inclusive) to 2022-04-02 00:00 UTC (exclusive)
- Files: `data/radlab/iss_dostel1_20220319_20220402.csv` (raw API download) and `data/radlab/iss_dostel1_daily.csv` (daily aggregates). Checksums and the exact request URL are in `data/radlab/SOURCES.md`.
- Citation (OSDR FAQ wording): Data and visualizations are courtesy of the RadLab Portal (https://visualization.osdr.nasa.gov/radlab/gui/overview/). The RadLab version number was not stated on the FAQ page retrieved for this project, so it is not invented here.
- This is instrument telemetry from the ISS, not a crew member's personal health file.

### Official NASA and partner text (quoted, with links)

- NASA Human Research Program, 5 Hazards of Human Spaceflight: https://www.nasa.gov/hrp/hazards/
- NASA HRP, Risks of Human Spaceflight: https://www.nasa.gov/hrp/risks/
- NASA HRP, Ongoing HRP Research: https://www.nasa.gov/hrp/ongoing-hrp-research/
- Canadian Space Agency, Monitoring radiation for astronaut health (26 Feb 2026): https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp
- Canadian Space Agency, Why do we conduct science experiments in space?: https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp

## Illustrative flag rules (demo only)

Flags compare the selected day's **simulated** indicators with the mean of days 1–3 in the current session, or with a simple session limit. They are not NASA or clinical diagnostic thresholds and have not been validated. Radiation figures are displayed separately and are not used as medical thresholds.

A flag is shown when any of the following is true for the simulated indicators:

- Sleep is at or below 5.0 hours, or at least 1.5 hours below the early-day mean.
- Self-reported mood is 2 or lower.
- Heart rate is at least 15 bpm above the early-day mean.
- Systolic pressure is at least 12 mm Hg above the early-day mean.
- Blood sugar differs from the early-day mean by at least 25 mg/dL.
- Body temperature is 37.5 °C or higher.

## Use of Super Intelligence

The prototype code (HTML, CSS, and JavaScript) was written with AI coding tools (a local coding assistant and Codex) and then reviewed by a person. A local on-premises large language model (`qwen3.8-flash-next`, one request at a time, temperature 0.7) is used in two ways: (1) the in-app Local AI Summary, which is sent only to the OpenAI-compatible endpoint the user sets, and (2) first drafts of documentation and submission-field wording, which a person then edited against official Space Apps, NASA, and Canadian Space Agency pages. Official numbers and study results were not invented to fill gaps. Codex was also used to check the acceptance list. No SI-generated images or NASA branding were used. Screenshots and the demo video are recordings of the real page in a browser.

The challenge idea (an offline self-assessment dashboard, labeled simulated indicators, official quotes, real instrument radiation context, and next actions decided by the crew) was chosen by the team, not proposed by a model as the solution idea.

## References (software, data, and tools)

Shipped with this folder:

- HTML, CSS, and JavaScript written for this prototype (no npm package, no CDN library).
- Fonts requested by the page are the visitor's system fonts (`Segoe UI`, `Noto Sans CJK TC`, `Noto Sans`, generic sans-serif). No font file is bundled in the page.
- NASA OSDR RadLab ISS DosTel1 absorbed-dose-rate download, as documented in `data/radlab/SOURCES.md`.
- Official NASA HRP and Canadian Space Agency web pages listed above (quoted text only).
- MIT license for this prototype's original code (see `LICENSE` in the submission folder).

Used during preparation, not required to open the page:

- A local on-premises large language model (`qwen3.8-flash-next`) and a local OpenAI-compatible HTTP interface.
- Codex, a local code-review tool.
- A local coding assistant used to draft and edit the code.
- Chromium / Playwright and ffmpeg, used to capture screenshots and to encode the demo video. Caption type used during video encoding: DejaVu Sans (system font on the machine that encoded the file). Those tools are not shipped in this folder.

## Limits

- Not a medical device. Decision support only.
- No claim of diagnostic performance or validated accuracy.
- Simulated health indicators and RadLab instrument readings must not be mixed up.
- A Local AI Summary leaves this page only for the endpoint the user sets, and only after the button is clicked. Crew decisions stay in the browser session.
- This is a hackathon demo, not a flight system, and it is not connected to any hospital or clinical product.
