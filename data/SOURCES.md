# Data sources

Fetched 2026-11-14 (Asia/Taipei). Challenge page: https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/

## Official (quoted in the prototype, with links)

- NASA Human Research Program, 5 Hazards of Human Spaceflight: https://www.nasa.gov/hrp/hazards/
- NASA HRP, Risks of Human Spaceflight: https://www.nasa.gov/hrp/risks/
- NASA HRP, Ongoing HRP Research: https://www.nasa.gov/hrp/ongoing-hrp-research/
- Canadian Space Agency, Monitoring radiation for astronaut health (2026-02-26): https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp
- Canadian Space Agency, Why do we conduct science experiments in space?: https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp

Local copies of those pages were saved during preparation for offline reference only. They are not a public source and must not be treated as NASA results.

The built-in 14-day indicator table and `sample-session.csv` are **simulated demo values**. They are not NASA measurements and must not be presented as official results.

Indicator types (blood pressure, heart rate, blood sugar, body temperature, daily sleep hours, mood) follow examples named on the official challenge page. Review flags are illustrative local rules for the demo, not NASA or clinical diagnostic thresholds.


## NASA OSDR RadLab instrument data (used in the Mission radiation exposure panel)

See `data/radlab/SOURCES.md` for the dataset name, instrument ID, query window, API URL, SHA-256 of the raw file, daily aggregation method, citation, and license notes.

This is public ISS instrument telemetry (DosTel1 absorbed dose rate), not a personal medical record.
