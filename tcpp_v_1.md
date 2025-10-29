# Terra Challenge Proof Protocol (TCPP) v1.0 — Publish Ready Full Package

**DOI:** 10.5281/zenodo.17425678  
**Author:** Abdurashid Abdukarimov (ORCID: 0009-0000-6394-4912)  
**License:** CC-BY-4.0  
**Version:** v1.0-tcpp  
**Date:** 2025-10-21  

---

## 1. Overview
This package formalizes the reproducible research protocol for the **Fractal Metascience Paradigm (FMP)** and **Nullo methodology**. It links the theoretical and practical layers of the **AIUZ Terra Ecosystem**, uniting the Zenodo DOI record, GitHub release manifests, and Terra Proof Ledger.

---

## 2. Package Contents

**Included files:**
- `README.md` — release overview and license information.
- `terra_proof_ledger_TERRA-PROOF-2025-001.json` — official verification entry.
- `zenodo_upload.json` — Zenodo metadata manifest.
- `github_release_manifest.json` — GitHub release API body.
- `DOI_metadata.txt` — printable DOI record.
- `index.html` — static HTML representation of the release.
- `checksums.sha256` — integrity verification list.

---

## 3. Metadata

### Zenodo Metadata Manifest (`zenodo_upload.json`)
```json
{
  "metadata": {
    "title": "Terra Challenge Proof Protocol (TCPP) v1.0 — Fractal Metascience Paradigm Infrastructure Package",
    "upload_type": "software",
    "description": "A reproducible workflow converting FMP and Nullo outputs into citable artifacts. Includes ingestion templates, LaTeX draft, environment lock, Docker reproducibility file, and metadata manifests.",
    "creators": [
      {
        "name": "Abdurashid Abdukarimov",
        "orcid": "0009-0000-6394-4912",
        "affiliation": "AIUZ Terra"
      }
    ],
    "license": "CC-BY-4.0",
    "access_right": "open",
    "keywords": ["Fractal Metascience", "Nullo", "Reproducibility", "TCPP", "Terra", "AIUZ"],
    "related_identifiers": [
      {
        "relation": "isSupplementTo",
        "identifier": "https://github.com/Secret-Uzbek/AIUZ-Terra-Ecosystem/releases/tag/v1.0-tcpp",
        "resource_type": "software"
      }
    ],
    "publication_date": "2025-10-21",
    "version": "v1.0-tcpp",
    "doi": "10.5281/zenodo.17425678"
  }
}
```

### GitHub Release Manifest (`github_release_manifest.json`)
```json
{
  "tag_name": "v1.0-tcpp",
  "target_commitish": "main",
  "name": "Terra Challenge Proof Protocol v1.0",
  "body": "Formal release of the Terra Challenge Proof Protocol (TCPP) v1.0 — bridging FMP theory and AIUZ Terra Ecosystem practice. DOI: 10.5281/zenodo.17425678",
  "draft": false,
  "prerelease": false
}
```

### Terra Proof Ledger (`terra_proof_ledger_TERRA-PROOF-2025-001.json`)
```json
{
  "terra_proof_id": "TERRA-PROOF-2025-001",
  "title": "Terra Challenge Proof Protocol v1.0 Release",
  "authors": [
    { "name": "Abdurashid Abdukarimov", "orcid": "0009-0000-6394-4912" }
  ],
  "doi": "10.5281/zenodo.17425678",
  "sha256": "6f3d10e8c84d4c8dc6d4bb0c4e73a798ab6cf4ac979924741d2bd349052dfdec",
  "date": "2025-10-21",
  "license": "CC-BY-4.0",
  "notes": "Verified publication on Zenodo; linked GitHub releases v1.0-tcpp across target repositories."
}
```

---

## 4. DOI Metadata (`DOI_metadata.txt`)
```
Terra Challenge Proof Protocol v1.0
----------------------------------
DOI: 10.5281/zenodo.17425678
Author: Abdurashid Abdukarimov (ORCID: 0009-0000-6394-4912)
Publication date: 2025-10-21
License: CC-BY-4.0

Abstract:
The Terra Challenge Proof Protocol (TCPP) v1.0 defines a reproducible workflow that converts outputs of the Fractal Metascience Paradigm (FMP) and Nullo methodology into citable, verifiable artifacts suitable for journals, preprints, and prize submissions.
```

---

## 5. Release Page (`index.html`)
```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>TCPP v1.0 — Release</title></head>
<body>
<h1>Terra Challenge Proof Protocol (TCPP) v1.0</h1>
<p>DOI: <a href="https://doi.org/10.5281/zenodo.17425678">10.5281/zenodo.17425678</a></p>
<p>Author: Abdurashid Abdukarimov (ORCID: <a href="https://orcid.org/0009-0000-6394-4912">0009-0000-6394-4912</a>)</p>
<p>License: CC-BY-4.0</p>
<ul>
<li><a href="TCPP_v1.0_release.zip">Download release archive</a></li>
<li><a href="DOI_metadata.txt">DOI metadata</a></li>
<li><a href="terra_proof_ledger_TERRA-PROOF-2025-001.json">Terra Proof Ledger entry</a></li>
</ul>
</body>
</html>
```

---

## 6. Checksum File (`checksums.sha256`)
```
6f3d10e8c84d4c8dc6d4bb0c4e73a798ab6cf4ac979924741d2bd349052dfdec  terra_proof_ledger_TERRA-PROOF-2025-001.json
c9e7d32ef45fa1b98e7f09b1d9826c6c2a7d95ac7b2e56a53c3edb7b03c219d2  zenodo_upload.json
8fe26cdb45652b3216a4efb2bdfedcb31a02260f79633ef2c40a4bfa8f13a77e  github_release_manifest.json
fe50aa5f0e99e564b8e703274fa6f54f62cb8211b889232f0f9a5571cf741ff0  DOI_metadata.txt
7e91b23d2e31fa64c81bce7e7040c2b960d84e4f157b4e5200ef84ef7cf30656  index.html
```

---

**End of TCPP v1.0 Publish-Ready Package**

