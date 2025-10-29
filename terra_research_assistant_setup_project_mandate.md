# Research Assistant Setup & Project Mandate

**Project:** AIUZ Terra — Fractal Metascience Paradigm (FMP) / Terra LLM Ecosystem

**Owner / Author:** Abdurashid Abdukarimov

**Primary contacts & IDs**
- Email: a.a.abdukarimov@tutamail.com
- Phone: +998950833850
- ORCID: https://orcid.org/0009-0000-6394-4912
- Zotero library: https://www.zotero.org/abdurashid_abdukarimov
- Overleaf projects: https://ru.overleaf.com/project/6899ff8433954ab2e93cd703 , https://ru.overleaf.com/read/xhqwqqbcfxqb#7e60bf
- f6s / project page: https://www.f6s.com/aiuz-terra-codex-ecosystem
- arXiv account username (noted): Sectet.Uzbek
- Personal / portfolio links: (add as needed)

---

## Purpose of this document
This textdoc records a single, authoritative **Research Assistant Setup & Project Mandate** for the Terra ecosystem. It consolidates the tasks, inputs, priorities, available materials, and an explicit step‑by‑step plan for the assistant (human and/or AI) to follow when performing: code revision, semantic detoxification, integration of modules, and production of publication‑grade academic deliverables based on your existing corpus.

This document is intentionally self-contained so you can hand it to other agents or restore it when sessions expire.

---

## High-level goals (what we must deliver now)
1. **Systematic revision** of all provided modules and code (Detox Engine, FMP Engine, LLM integration components, Database Importers, Archive Manager, dashboards, etc.).
2. **Detoxification and safety review**: Apply Terra detox protocol to textual modules, UI strings, metadata, and any public outputs.
3. **Integration**: Produce a single coherent project structure (Terra Monorepo / Archive) that wires components together with clear interfaces and manifests.
4. **Scientific documentation and publications**: Produce at least one finalized, submission‑ready article in English (IMRaD, APA7/BibTeX) about "Fundamental Artifacts of the Fractal Metascience Paradigm" (EUO & PLT) based solely on your sources and public literature (each claim supported by ≥3 scholarly sources where required). Provide Russian and Uzbek (Latin) translations after approval.
5. **Deliverables**: Code repo tree, README, LaTeX source and PDF of paper, data/archives (Terra archive JSON), integration demo pages (React), and a Research Assistant brief for future sessions.

---

## Available inputs (already provided by you)
- LaTeX / manuscript fragments: `part-i-introduction-and-literature-review.md`, `part-iv-practical-applications.md`, `part-v-validation-and-critical-perspectives.md` (uploaded to the working environment).
- Multiple manuscript drafts and article fragments you pasted in chat (FMP overview, AIUZ Terra Ecosystem, Article 0: EUO & PLT, Fractal Metascience foundations).
- Frontend components and example React code: `TerraCodexDashboard`, `Terra FMP Engine`, `Terra LLM Integration Engine`, Terra Database Importers HTML/JS, Detox Engine React component, Detox core algorithm.
- Overleaf projects and Zotero library links for references.
- A zipped archive uploaded: `terra-archive-manager-2.0-ultimate-...zip` (NOTE: file currently available in conversation but may require extraction in working environment).
- Public web traces, profile links, Telegram channels, news articles and CV/resume text.

> **Assumption (explicit):** You confirm these materials are canonical and exhaustive copies of your working materials across GitHub / Overleaf / Zotero / ArXiv / personal backup. The assistant will not attempt to fetch private accounts or protected files behind corporate firewalls.

---

## Non‑functional constraints
- Work and deliverables must be reproducible without external internet access to blocked resources. Where online sources are needed for citations, use Zotero collection you provided and the included reference links in the repository.
- All scholarly claims in the primary article must be supported by at least three scholarly sources (from your Zotero + public literature). If a claim cannot be supported with ≥3 sources, mark it as **author‑asserted** and flag for empirical validation in Terra.
- Preserve authorship metadata (your name, DID, affiliation) in generated artifacts and headers.
- Maintain child's safety, privacy, and ethical constraints for any module that interacts with minors (Terra educational modules). Run ethical checks.

---

## Immediate plan: Step‑by‑step (1 → 5) — do all in parallel, integrated & iterative

### Step 1 — Ingest & Inventory (complete now)
- Unpack provided archive(s) and list all files by type (README, .md, .tex, .bib, .py, .js, .html, .yaml, images, sample data).
- Produce a manifest: `manifest.json` with `path`, `type`, `size`, `sha256`, `brief_description` and `module_tag` (e.g., detox, importer, llm, archive, ui, paper).
- Identify fragments already suitable for publication (manuscript drafts, article fragments), and tag them.

**Output:** `manifest.json`, `file_index.md`.

---

### Step 2 — Module Review & Detoxification (iterative per module)
For each module (ordered priority: Detox Engine, FMP Engine, LLM Integration, Database Importers, Archive Manager, Dashboards, LaTeX manuscripts):

- Run static review of code (JS/React/HTML/Python): syntax checks, obvious runtime errors, missing imports, insecure patterns (eval, remote script injection), privacy leaks (hardcoded credentials), and unsafe third‑party links.
- Run semantic detoxification on all human‑facing strings and generated content using Terra Detox protocol (L0–L3). Save original and cleaned versions with diff metadata.
- Generate a short technical audit: `audit/<module>-audit.md` listing issues, fixes applied, unit tests to write, and recommended next steps.

**Output per module:** `module-name/` containing `audit.md`, `cleaned/` (clean code/text), `tests/` (starter tests), `changelog.txt`.

---

### Step 3 — Integration & Interface Contracts
- Define simple, explicit interfaces between components (e.g., FMP Engine API, Detox service API, Archive Manager ingest API, Importer result format). Use JSON Schema for each contract.
- Implement lightweight adapters where necessary (example: wrapper that accepts TerraImporter output and creates Terra Archive JSON). Add `adapters/` code in repo.
- Create a top-level `terra-monorepo/README.md` documenting how to run each component locally (no cloud required). Include `demo/` pages that wire React components together (Terra Codex Dashboard -> call FMP Engine -> persist to Archive Manager).
- Ensure export capability: all outputs can be exported as JSON, PDF (for manuscripts), and LaTeX source.

**Output:** `integration/` with `json-schemas/`, `adapters/`, and `demo/` web pages.

---

### Step 4 — Scholarly Article Preparation (English first)
- Use the provided manuscript fragments as primary material for the article: "Fundamental Artifacts of the Fractal Metascience Paradigm: Emergent Universal Organization and Post Lingua Trace".
- Expand the article to IMRaD where applicable. For theoretical / conceptual papers, maintain rigorous structure: Abstract, Keywords, Introduction, Theory, Formalization/Methodology, Case/Empirical evidence (Terra prototypes, detox results, importer audit), Discussion, Conclusion, References.
- For each major assertion, attach at least three citations drawn from your Zotero collection and supplementary reputable sources (Mandelbrot, Falconer, recent AI/ontology papers). If web lookups are needed for up‑to‑date refs, these will be listed and flagged.
- Prepare LaTeX (APA7 / `apa7` class as you provided), BibTeX (`BibTeX_References.bib`) consistent with Zotero export.
- Produce: `article_en/` containing `article.tex`, `article.pdf`, `article.docx` (if requested), `figures/`, `data/` (supporting empirical logs), and `submission_ready.md` with journal candidate list (Springer, Frontier journals, Fractals, etc.) and formatting checklist.

**Output:** `article_en/article.pdf` + LaTeX sources + `submission_ready.md`.

---

### Step 5 — Translation, Localization, and Packaging
- After you confirm the English draft, produce Russian and Uzbek (Latin) translations preserving academic style.
- Localize UI and module strings for RU/UZ; ensure detox rules adapt cultural filters appropriately.
- Package everything in a single `terra-release-v1.0.zip` with a clear `LICENSE` (you choose — recommend CC BY‑SA for docs and MIT for code), contributor list, and a `HOWTO` for reviewers and collaborators.

**Output:** `terra-release-v1.0.zip` plus individual language variants.

---

## Quality, validation, and evidence tracking
- Every change is recorded in a local change log and a small git history (if git available). Each artifact will include provenance metadata: `created_by`, `timestamp`, `source_file`, `checksum`.
- For empirical claims, attach experiment logs (Detox runs, importer test runs) and small reproducible scripts to re-run tests.
- Provide a short independent validation checklist for reviewers (repro steps, required dataset, expected results).

---

## Immediate next actions I will perform *right now* (this session)
1. Create `manifest.json` and `file_index.md` from the uploaded files available in the environment. (Inventory)
2. Run a passive static review of the Detox Engine, FMP Engine, and Database Importers code snippets you pasted; produce a short `audit` note per each and a cleaned copy for Detox Engine (apply the detox patch you specified).
3. Create the top‑level Research Assistant brief (this document — done) and produce the initial structure for the monorepo (folders and README placeholders).

> Note: I will operate only on files accessible in the current working environment. If additional files live on remote private repositories not accessible due to firewall, please upload them here or grant access.

---

## Deliverable checklist (what you will get on completion)
- [ ] `manifest.json` + `file_index.md`
- [ ] Audits & cleaned versions for Detox Engine, FMP Engine, LLM Integration, Importers, Archive Manager
- [ ] `integration/` adapters + JSON Schemas + demo pages
- [ ] `article_en/` (LaTeX, PDF, BibTeX) — submission ready
- [ ] `article_ru/` and `article_uz/` translations (after approval)
- [ ] `terra-release-v1.0.zip` with LICENSE and HOWTO
- [ ] Research Assistant brief (this doc) and step logs

---

## How I will present results to you
- I will update this canvas (textdoc) with progress entries.
- For code/artifacts I create, I will put them in clear folders and provide explicit file names to download.
- I will not perform actions without your signoff for major deliverables (e.g., final PDF submission) but will produce draft outputs for immediate review.

---

## Governance and next steps (your decisions required)
- **License choice:** please indicate preferred license for code and documents (MIT / Apache2 / CC BY‑SA / All rights reserved).
- **Journal preferences:** which journals do you prefer first (Springer, Fractals, Frontiers, Nature Human Behaviour, regional VAK journals)? Provide priority list.
- **Data sharing policy:** public, restricted, embargoed? Any personal data that must be redacted from public artifacts?

---

_End of mandate. Additions and updates will be appended to this document as progress is made._

