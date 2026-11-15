# NASA OSDR RadLab — ISS DosTel1 absorbed dose rate

Fetched: 2026-11-14 (Asia/Taipei). Downloaded once and cached.

## What this is (and is not)

This is **public radiation-environment telemetry** from the **DosTel1** instrument on the **International Space Station**, retrieved through the NASA Open Science Data Repository (OSDR) **RadLab** public API. It is **not** a personal medical record, **not** an individual crew dosimeter file, and **not** a diagnosis. Ground or animal studies were not used.

Values shown in the app are daily mean, median, minimum, and maximum of the API field `absorbed_dose_rate`. The official API documents that field as absorbed radiation dose rate in **µGy/hour**.

## Identifier and links

- Source portal: NASA OSDR RadLab — https://visualization.osdr.nasa.gov/radlab/gui/overview/
- Data API: https://visualization.osdr.nasa.gov/radlab/api
- API guide: https://visualization.osdr.nasa.gov/radlab/gui/data-api/
- Instrument ID (case-sensitive): `DosTel1` (DORELI project family, ISS)
- Spacecraft: ISS
- Query window: `timestamp >= 2022-03-19T00:00` and `timestamp < 2022-04-02T00:00` (UTC)
- Requested field: `absorbed_dose_rate`
- Exact request URL:

https://visualization.osdr.nasa.gov/radlab/api/?spacecraft=ISS&instrument=DosTel1&timestamp>=2022-03-19T00:00&timestamp<2022-04-02T00:00&absorbed_dose_rate&format=csv

- Raw file: `iss_dostel1_20220319_20220402.csv` (16802 data rows plus a header)
- SHA-256 of the raw file: `785e526aee3b07f71ffb235f9f7d22bc686765c0eab9ff6f6fc043c00929c57c`
- Derived daily table: `iss_dostel1_daily.csv` (one row per UTC calendar date; `demo_day` 1 = 2022-03-19, `demo_day` 14 = 2022-04-01)

## How daily numbers were computed

For each UTC calendar date in the raw file, all rows with that date were kept. Then:

- `n_samples`: number of API rows
- `mean_uGy_per_h`: arithmetic mean of `absorbed_dose_rate`
- `median_uGy_per_h`: median of `absorbed_dose_rate`
- `min_uGy_per_h` / `max_uGy_per_h`: minimum and maximum
- `first_timestamp` / `last_timestamp`: first and last raw timestamps that day

The daily mean is often higher than the median because short periods (for example passage through the South Atlantic Anomaly) can record much higher instantaneous rates. Both statistics are shown. No health threshold is applied.

## Citation and terms (official wording retrieved 2026-11-14)

OSDR FAQ, “How to cite visualizations from OSDR?” — if using RadLab: “Data and visualizations are courtesy of the RadLab Portal (https://visualization.osdr.nasa.gov/radlab/gui/overview/), Version #.” The RadLab version number was **not stated** on the FAQ page, and the instrument knowledgebase page returned HTTP 500 at the time of retrieval, so no version number is invented here.

To cite OSDR itself, the same FAQ points to: Gebre S G, Scott R T, Saravia-Butler A M, Lopez D K, Sanders L M, and Costes S V, (2024). “NASA Open Science Data Repository: Open Science for Life in Space.” Nucleic Acids Research, 53(D1): D1697-D1710. https://doi.org/10.1093/nar/gkae1116

FAQ page: https://science.nasa.gov/reference/osdr-faq/

RadLab combines radiation telemetry from multiple databases maintained by multiple space agencies (OSDR FAQ, “What is RadLab?”). NASA Science Data Licenses (https://science.data.nasa.gov/about/license) state that, unless a file is marked with a restrictive notice or license, data from a NASA-led mission are licensed as Creative Commons Zero (CC0). The CSV returned by this public API did not include a license field. Users should consult the OSDR terms (https://science.nasa.gov/reference/osdr-help-terms-and-conditions/) and the RadLab portal. This project does not claim NASA endorsement.

## Row counts

See the derived daily table for per-day sample counts. The raw CSV SHA-256 above identifies the exact download used for those rows.
