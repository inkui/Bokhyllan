# Import Error Taxonomy

## Purpose

This document defines a controlled taxonomy of import, validation, enrichment, and approval errors for future Bokhyllan corpus growth.

It is documentation only. It does not change code, validation logic, UI, routing, scripts, data, external integrations, or runtime behavior.

The goal is to make future 50 / 100 / 500 / 1000-book expansion work auditable: every failed candidate should have a stable reason, a severity, and a clear next action.

## Error Severity Model

Future import and review tooling should use four severities.

### `info`

Meaning: A note that helps review but does not require action.

Use when:

- A field is intentionally blank.
- A candidate is waiting for a later phase.
- A warning has been accepted with a documented reason.

Expected action: Review only when relevant.

### `warning`

Meaning: The candidate can continue, but the issue should be reviewed before final approval.

Use when:

- Optional metadata is missing.
- Affiliate metadata is absent but not required for the current stage.
- A field looks incomplete but is not invalid.

Expected action: Fix before approval if practical, or document why it is safe to defer.

### `error`

Meaning: The candidate or book data is invalid for the current stage.

Use when:

- Required metadata is missing.
- A value has the wrong shape.
- Duplicate identity data creates ambiguity.
- A taxonomy key is not approved.

Expected action: Fix before the candidate can advance.

### `blocking`

Meaning: The candidate must not move forward until the issue is resolved by a human reviewer.

Use when:

- The data may contain tracking URLs, affiliate IDs, secrets, or unsafe provider details.
- Metadata confidence is too low to identify the intended book or edition.
- The candidate appears to duplicate an existing approved entry.
- Editorial approval rejects the candidate for corpus fit.

Expected action: Stop the import path. Resolve manually or reject.

## Import Errors

Import errors describe problems with candidate intake, file shape, or pre-validation structure.

Suggested future codes:

| Code | Severity | Meaning | Typical action |
| --- | --- | --- | --- |
| `import_invalid_json` | `error` | The candidate file cannot be parsed as JSON. | Fix file syntax. |
| `import_invalid_shape` | `error` | The file is neither a book object nor an accepted container shape. | Reshape to the approved template. |
| `import_missing_books_array` | `error` | A batch import object does not contain a usable `books` array. | Add or rename the array. |
| `import_unknown_field` | `warning` | The candidate contains fields outside the approved template. | Remove field or wait for a later model phase. |
| `import_template_placeholder` | `warning` | A field still contains a placeholder value. | Replace with verified metadata or leave blank if optional. |
| `import_unstable_id` | `error` | `id` does not follow stable normalized ID rules. | Rewrite as lowercase URL-safe identifier. |
| `import_candidate_not_reviewed` | `info` | Candidate is collected but not yet reviewed. | Leave in `candidate` stage. |

Import errors should be detected before a candidate is treated as runtime book data.

## Validation Errors

Validation errors align with the existing C2 validation utility in `lib/library/validation.ts`.

Current implemented issue codes:

| Code | Current severity | Meaning | Typical action |
| --- | --- | --- | --- |
| `missing_required_field` | `error` | A required field such as `id`, `title`, `author`, `language`, `genres`, `tags`, `themes`, `mood`, or `enrichmentStatus` is missing. | Add verified data or adjust mapper defaults if appropriate. |
| `duplicate_id` | `error` | Multiple books share the same normalized ID. | Assign unique stable IDs. |
| `duplicate_isbn13` | `error` | Multiple books share the same normalized ISBN13. | Confirm whether this is a duplicate edition or wrong ISBN. |
| `duplicate_title_author` | `error` | Multiple books share the same normalized title and author. | Confirm whether duplicate entries are intentional. |
| `malformed_isbn13` | `error` | ISBN13 does not contain 13 digits after removing hyphens and spaces. | Correct the ISBN13 or remove it until verified. |
| `empty_array` | `warning` | A required array such as `genres`, `tags`, `themes`, or `mood` is empty. | Add approved values when that field is required for the stage. |
| `missing_affiliate_metadata` | `warning` | Neither `bokusUrl` nor `isbn13` is present. | Add verified ISBN13 or clean Bokus URL later, or defer intentionally. |

Suggested future validation codes:

| Code | Severity | Meaning | Typical action |
| --- | --- | --- | --- |
| `invalid_language` | `error` | `language` is not a supported foundation value. | Use supported language key. |
| `invalid_year` | `error` | `firstPublishedYear` is not a plausible four-digit number. | Correct or remove the year. |
| `array_duplicate_value` | `warning` | An array repeats the same key. | Deduplicate and keep deterministic order. |
| `array_order_unclear` | `info` | Array values are valid but primary-first ordering is unclear. | Reorder during review. |
| `metadata_contains_copy` | `error` | Metadata field contains recommendation or marketing prose. | Move prose to an approved curation field or remove. |

## Taxonomy Errors

Taxonomy errors describe controlled vocabulary problems for genres and future themes, moods, and tags.

Suggested future codes:

| Code | Severity | Meaning | Typical action |
| --- | --- | --- | --- |
| `taxonomy_unknown_genre` | `error` | A genre is not in `docs/GENRE_TAXONOMY_V1.md`. | Replace with approved genre key or request taxonomy review. |
| `taxonomy_unknown_theme` | `error` | A future theme key is not in the approved theme taxonomy. | Replace with approved theme key. |
| `taxonomy_unknown_mood` | `error` | A future mood key is not in the approved mood taxonomy. | Replace with approved mood key. |
| `taxonomy_unknown_tag` | `warning` | A future tag is not approved or documented. | Remove or route to tag taxonomy review. |
| `taxonomy_mixed_language_key` | `error` | A key mixes Swedish and English or uses display text as metadata. | Use stable English `snake_case` key. |
| `taxonomy_bad_format` | `error` | A key uses spaces, uppercase, punctuation, or hyphens. | Normalize to lowercase `snake_case`. |
| `taxonomy_genre_stuffing` | `warning` | Too many genres are assigned. | Keep one primary genre and only useful secondary genres. |
| `taxonomy_theme_stuffing` | `warning` | Too many themes are assigned or incidental topics are included. | Keep central themes only. |
| `taxonomy_mood_overreach` | `warning` | Mood assignment is too subjective or quality-judging. | Use a clearer approved mood or defer. |
| `taxonomy_field_misuse` | `error` | A genre, theme, mood, or tag is used for the wrong kind of meaning. | Move to the correct field or remove. |

Taxonomy errors should prevent `taxonomy_reviewed` unless explicitly marked as an accepted deferral by a reviewer.

## Affiliate Metadata Errors

Affiliate metadata errors protect the boundary between clean book metadata and provider-specific link generation.

Suggested future codes:

| Code | Severity | Meaning | Typical action |
| --- | --- | --- | --- |
| `affiliate_missing_metadata` | `warning` | No `isbn13` or clean `bokusUrl` is available. | Add verified metadata later or accept warning. |
| `affiliate_unverified_bokus_url` | `warning` | A Bokus URL is present but has not been manually verified. | Verify or remove. |
| `affiliate_tracking_url` | `blocking` | URL appears to contain tracking, redirect, or click parameters. | Remove immediately and replace only with clean URL. |
| `affiliate_tradedoubler_url_in_book_data` | `blocking` | Book data contains a Tradedoubler or provider redirect URL. | Remove; provider logic belongs in affiliate layer. |
| `affiliate_id_in_metadata` | `blocking` | Book data contains a publisher, campaign, partner, or affiliate ID. | Remove and audit source. |
| `affiliate_secret_detected` | `blocking` | Metadata appears to contain a secret or private credential. | Remove, rotate if needed, and audit history. |
| `affiliate_wrong_retailer_host` | `error` | A URL points to an unsupported or unexpected retailer host. | Remove or route through a future provider adapter review. |
| `affiliate_search_url_used_as_product_url` | `warning` | A search URL is stored where a product URL was expected. | Replace with verified product URL or leave blank. |

Any `blocking` affiliate error should stop approval until reviewed.

## Enrichment Errors

Enrichment errors describe problems with draft recommendation-supporting content. They should not be treated as runtime UI errors.

Suggested future codes:

| Code | Severity | Meaning | Typical action |
| --- | --- | --- | --- |
| `enrichment_missing_draft` | `warning` | A book has reached enrichment stage without an `EnrichmentDraft`. | Create a pending draft. |
| `enrichment_orphan_draft` | `error` | A draft references a missing `bookId`. | Fix draft linkage or remove draft. |
| `enrichment_invalid_status` | `error` | Draft status is outside the approved status set. | Use `pending`, `enriched`, `failed`, or `rejected`. |
| `enrichment_empty_required_arrays` | `warning` | Draft arrays remain empty after enrichment is expected. | Add reviewed draft content or keep pending. |
| `enrichment_unreviewed_ai_output` | `blocking` | AI-assisted content is present without editorial review. | Review manually before approval. |
| `enrichment_contains_personal_data` | `blocking` | Draft content contains raw personal data or raw reader answers. | Remove and audit process. |
| `enrichment_voice_too_final` | `warning` | Draft copy reads like final user-facing Bokhyllan voice before review. | Convert to functional notes or route to editorial review. |
| `enrichment_failed` | `warning` | Draft is marked failed. | Record reason and retry or reject. |
| `enrichment_rejected` | `error` | Draft is marked rejected. | Return to earlier stage or reject candidate. |

Enrichment errors should be handled after metadata and taxonomy review, not during basic candidate intake.

## Editorial Approval Errors

Editorial approval errors describe human review outcomes at the final corpus gate.

Suggested future codes:

| Code | Severity | Meaning | Typical action |
| --- | --- | --- | --- |
| `approval_metadata_uncertain` | `blocking` | Metadata confidence is not high enough for approval. | Return to metadata verification or reject. |
| `approval_duplicate_candidate` | `blocking` | Candidate duplicates an existing approved book or edition. | Merge, disambiguate, or reject. |
| `approval_out_of_scope` | `blocking` | Candidate does not fit Bokhyllan's core-library purpose. | Reject or keep outside core dataset. |
| `approval_trend_dependent` | `warning` | Candidate appears too dependent on a short-lived trend. | Hold for later review or reject. |
| `approval_persona_overfit` | `warning` | Candidate narrows the corpus too much toward one reader persona. | Rebalance batch selection. |
| `approval_insufficient_gift_fit` | `info` | Candidate may be valuable but not strong for gift-oriented matching. | Keep only if it supports another corpus goal. |
| `approval_taxonomy_unresolved` | `error` | Taxonomy review has unresolved errors. | Return to taxonomy review. |
| `approval_affiliate_unsafe` | `blocking` | Affiliate metadata has unresolved safety concerns. | Remove unsafe data or reject. |
| `approval_rejected` | `blocking` | Final editorial decision rejects the candidate. | Record reason outside runtime data. |

Approval errors should be stable enough to support later reporting across batches.

## Suggested Future Error Codes

Future tooling can group codes by prefix:

- `import_*` for candidate file shape and intake problems.
- `validation_*` for structural data validation that extends the current C2 validator.
- Existing C2 codes without a prefix may remain supported for compatibility.
- `taxonomy_*` for controlled vocabulary problems.
- `affiliate_*` for clean metadata and provider-boundary risks.
- `enrichment_*` for draft enrichment workflow problems.
- `approval_*` for final human review outcomes.

Recommended code rules:

- Use lowercase `snake_case`.
- Keep codes stable after tooling depends on them.
- Prefer specific codes over vague catch-all errors.
- Keep user-facing Swedish copy separate from machine-readable codes.
- Include a severity, message, candidate or book ID when available, and field when relevant.
- Do not encode secrets, full URLs, or personal data inside error messages.

Suggested future issue shape:

```ts
type ImportIssue = {
  severity: "info" | "warning" | "error" | "blocking";
  code: string;
  message: string;
  candidateId?: string;
  bookId?: string;
  field?: string;
  stage?: string;
};
```

This shape is illustrative only and should not be implemented until a future phase explicitly adds import tooling.

## Recommended Next Phase

Recommended next phase: **Phase C32 - Sample 50-Book Expansion Strategy**.

That phase should define a controlled first expansion strategy for moving from the current 12-book baseline toward 50 books without adding actual books yet.
