# Changelog

All dates Asia/Taipei. Commit hashes refer to this repository.

## v3.2 — 2026-11-15 (2f2613b)
- Field-checked scenarios table: each scenario links a public NASA source, says what Calm Signal does, and states its limits.
- Validation status block: what is verified (software checks) and what is not (clinical validation, real crew/sensors, FHIR IG conformance, device certification).
- Live in-browser self-test (panel QA-01), run on load and on demand, with pass / fail / skip and a UTC timestamp:
  - T1 rule engine on 16 known inputs (each threshold edge), T1b rule text present
  - T2 FHIR R4 Bundle structure, six LOINC vital-sign codes, UCUM units, subject references, 3 recovery Communications, SIMULATED tag
  - T3 RadLab daily table (14 consecutive UTC days, 16,802 readings); T3b equals `data/radlab/iss_dostel1_daily.json`; T3c raw CSV SHA-256 equals the value in `data/radlab/SOURCES.md`
  - T4 no third-party scripts, styles or network requests
  - T5 CSV import accepts a valid file and rejects a malformed one
- `tests/run-tests.mjs`: the same suite in Node (no dependencies). Verified it fails when a threshold, a LOINC code, or the raw data file is altered.
- Build label, changelog link and data provenance line in the app.
- Pain point → innovation map (PX-00) with public NASA / IOM sources, plus a one-line strip on the first screen.
- Roadmap / path to flight panel (FX-01), labeled FUTURE: analogs → LEO → Artemis → Mars, planned capabilities, Earth spin-off. No partnerships implied.
- Deploy it today panel (DX-01): offline single file, 3-step how to run, pilot-ready (not deployed) line.

## v3.1 — 2026-11-15 (df8d6c7)
Flight-deck visual identity: graphite / phosphor teal / sodium amber, monospaced telemetry, panel IDs, SVG wordmark and icons, instrument ticks.

## v3 — 2026-11-15 (26a6abf)
Judge-first bento story, signal-delay orbit, comms-blackout toggle, simulated live feed, health radar, FHIR flow animation, judge tour, `?demo=1` scripted walkthrough.

## v2 — 2026-11-15 (22357ab)
On-device AI and crew medical emphasis, explainable rule detail, status ribbon, simulated FHIR recovery handoff, team note.

## v1 — 2026-11-15 (9c91b3f)
First submission: crew check-in dashboard, illustrative flag rules, NASA OSDR RadLab radiation context, optional local AI summary.
