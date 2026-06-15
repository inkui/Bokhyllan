# Core Library Dataset Specification

## Purpose

This specification defines how Bokhyllan should grow from the current 12-book runtime corpus into a structured 100 / 500 / 1000-book core library.

It is not a book list. It does not add titles, metadata, scripts, providers, or external integrations. Its purpose is to set quality gates so future expansion stays curated, useful, and operationally maintainable.

## Current Baseline

The current runtime corpus lives in:

```text
data/library/books/books.ts
```

The current runtime type lives in:

```text
data/library/books/bookTypes.ts
```

Current corpus size:

- 12 books

Current known metadata coverage:

| Field | Coverage |
| --- | ---: |
| `title` | 12/12 |
| `author` | 12/12 |
| `genres` | 12/12 |
| `isbn13` | 3/12 |
| `bokusUrl` | 0/12 |
| `firstPublishedYear` | 4/12 |
| `originalTitle` | 1/12 |

Current limitations:

- ISBN coverage is incomplete.
- Bokus URLs are not stored.
- The current corpus is intentionally small and curation-heavy.
- Future semantic fields such as `tags`, `themes`, `mood`, `pace`, `literaryWarmth`, and `giftFit` are not approved runtime fields yet.
- The validation/report scripts are typechecked but do not have a package runner.
- Real affiliate links remain disabled.

## Dataset Tiers

### Core 100

Purpose:

The Core 100 should be Bokhyllan's first reliable operating shelf: enough books to support meaningful recommendation breadth while still being manually reviewable.

Expected quality level:

- High editorial confidence.
- Strong fit with Bokhyllan's tone and recommendation promise.
- No filler titles.

Manual verification expectations:

- Every selected book has title and author checked.
- ISBN13 is manually verified before publication into the operational dataset.
- Edition choice is documented when translation, collected editions, or market availability is ambiguous.

Metadata completeness expectations:

- `title`: required
- `author`: required
- `genres`: required
- `isbn13`: expected before publish
- `bokusUrl`: optional, only if clean and manually verified
- `firstPublishedYear`: expected when confidently verified
- `originalTitle`: expected when useful for translated/localized titles

Recommendation coverage goal:

The Core 100 should cover the most common Bokhyllan use cases: calm, depth, comfort, clarity, gift suitability, low-energy reading, and immersive literary reading.

### Core 500

Purpose:

The Core 500 should expand Bokhyllan from a curated pilot shelf into a durable recommendation library with broader reader states, languages, eras, and gift contexts.

Expected quality level:

- Consistent metadata quality.
- Strong enough curation to avoid generic catalog feel.
- Balanced coverage across Swedish originals, translated works, classics, contemporary titles, poetry, and accessible literary genre edges.

Manual verification expectations:

- ISBN13 verification remains required for operational readiness.
- Ambiguous editions should be marked for review rather than guessed.
- Genre vocabulary should remain controlled.

Metadata completeness expectations:

- `title`, `author`, and `genres`: complete.
- `isbn13`: near-complete before activation.
- `firstPublishedYear`: high coverage.
- `originalTitle`: applied where useful.
- `bokusUrl`: still optional unless an affiliate strategy chooses stored clean URLs.
- Future semantic fields should wait for Atlas v2 decisions.

Recommendation coverage goal:

The Core 500 should make repeated use feel varied and should support reluctant readers, gift buyers, returning readers, and readers with different energy levels without flattening Bokhyllan into a generic bookstore catalog.

### Core 1000

Purpose:

The Core 1000 should be the first scale-ready Bokhyllan library: large enough for deep recommendation coverage, seasonal use, gift use, reader recovery, and long-term growth.

Expected quality level:

- Dataset discipline matters more than raw size.
- Expansion should preserve Bokhyllan's editorial identity.
- Import and validation workflows should be mature before this tier is attempted.

Manual verification expectations:

- Metadata verification should be process-driven.
- ISBN and edition decisions should be auditable.
- Exceptions should be tracked, not silently filled.

Metadata completeness expectations:

- Required runtime fields complete.
- ISBN13 coverage complete or explicitly exception-reviewed.
- Bokus/link strategy resolved before affiliate activation.
- Future tags/themes/mood should be governed by Atlas v2, not ad hoc entry.

Recommendation coverage goal:

The Core 1000 should support nuanced recommendations across mood, reading energy, literary texture, language/translation context, gift fit, and reader state while keeping the UI calm and non-ecommerce-like.

## Selection Principles

### Gift Suitability

Include books that can be recommended as thoughtful gifts, especially books with clear emotional use cases, durable appeal, and manageable reading commitment.

Gift suitability does not mean generic popularity. A gift-fit book should have a clear reason it belongs in someone's hands.

### Swedish Market Relevance

The dataset should be useful for a Swedish-facing product. Swedish originals, Swedish translations, and books available or meaningful in the Swedish market should be prioritized.

### Translated And Swedish Originals

The corpus should balance translated literature with Swedish and Nordic originals. Translation context should be handled through metadata review, not guessed.

### Literary Fiction

Literary fiction remains a core category, but it should not become the only lens. The corpus should include different levels of difficulty, energy, length, and emotional register.

### Accessible Classics

Classics should be included when they remain genuinely usable for Bokhyllan readers. Avoid adding classics only because they are canonical.

### Modern Quiet Reads

Modern quiet reads are central to Bokhyllan's identity: books with stillness, clarity, tenderness, attention, or depth that do not rely on trend energy.

### Books For Reluctant Readers

Include short, clear, low-pressure books for readers who are tired, returning to reading, or intimidated by long literary works.

### Poetry As A Small But Intentional Category

Poetry should remain a small but deliberate category. It is useful for low-energy reading, gifting, and moments when a full novel is too much.

### Genre Breadth Without Generic Catalog Feel

Broaden the dataset carefully: historical fiction, speculative fiction, essays, memoir-like literary works, and other adjacent categories can belong, but only when they serve Bokhyllan's recommendation experience.

## Exclusion Principles

- Avoid unstable trend-chasing.
- Avoid duplicate editions unless edition choice is meaningful.
- Avoid books without enough metadata confidence to support future operations.
- Avoid adding books only because they are famous.
- Avoid overfitting to one reader persona.
- Avoid books that require heavy content/context handling unless Bokhyllan can represent them responsibly.
- Avoid metadata that makes the corpus feel like a retailer catalog.

## Metadata Requirements By Tier

| Field | Core 100 | Core 500 | Core 1000 |
| --- | --- | --- | --- |
| `title` | Required, manually checked | Required, manually checked | Required, manually checked |
| `author` | Required, manually checked | Required, manually checked | Required, manually checked |
| `originalTitle` | Add when useful and verified | Higher coverage for translated works | Governed by import/review workflow |
| `isbn13` | Expected before publish | Near-complete before activation | Complete or exception-reviewed |
| `bokusUrl` | Optional; clean URL only | Optional until link strategy is resolved | Strategy-dependent |
| `genres` | Required, controlled vocabulary | Required, controlled vocabulary | Required, controlled vocabulary |
| `firstPublishedYear` | Expected when verified | High coverage | High coverage with exceptions tracked |
| Future `tags` / `themes` / `mood` | Do not add ad hoc | Wait for Atlas v2 | Governed by Atlas v2 |

## Operational Workflow

### 1. Candidate List

Create candidate lists outside the runtime corpus first. A candidate is not a published runtime book.

Candidate review should ask:

- Why does this book belong in Bokhyllan?
- Which reader state or gift use case does it serve?
- Is the edition/translation choice clear?
- Is metadata likely verifiable?

### 2. Manual Metadata Verification

Before data entry:

- Check title.
- Check author.
- Check original title if translated/localized.
- Check first publication year if available.
- Verify ISBN13 for the intended edition.
- Decide whether Bokus URL should remain blank or be cleanly verified.

### 3. Data Entry

Enter only approved fields:

- `title`
- `author`
- `originalTitle`
- `isbn13`
- `bokusUrl`
- `genres`
- `firstPublishedYear`

Do not add unapproved semantic fields to runtime books.

### 4. Validation

Run the existing project checks:

- `npm.cmd run lint`
- `npm.cmd run build`

When a runnable validation report exists, run it before review.

### 5. Review

Review should check:

- no guessed ISBNs
- no tracking URLs
- genre vocabulary consistency
- no duplicate title/author combinations
- no duplicate ISBN13 values
- no change to recommendation behavior unless explicitly scoped

### 6. Acceptance

Accept a book only when it meets the tier's metadata and curation expectations. If a field cannot be verified, leave it blank and track the gap rather than inventing a value.

## Acceptance Criteria

A dataset tier is ready when:

- The intended count is reached without filler.
- Required runtime fields are complete.
- Metadata coverage matches the tier expectation.
- ISBN gaps are manually reviewed.
- Genre values stay broad and consistent.
- No affiliate tracking URLs are stored in book data.
- No unapproved runtime fields are added.
- The corpus remains aligned with Bokhyllan's recommendation identity.
- Lint and build pass.

## Recommended Next Phase

Recommended next phase: **Phase C24 - Book Import Template**.

That phase should define a local template for proposing/importing new books into review without adding books to the runtime corpus yet.
