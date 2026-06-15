# Atlas v2 Handoff Brief

## Purpose

This brief summarizes what Bokhyllan's recent infrastructure and data-foundation work now enables, and which product and recommendation decisions must be made before Atlas v2 or Recommendation Engine v2 implementation begins.

It is documentation only. It does not change code, book data, UI, routing, scripts, external services, design, copy, typography, spacing, or layout.

## Current Infrastructure State

### Library Foundation

`lib/library/book.ts` defines a foundation `Book` shape with identity, metadata, classification, affiliate-target, and enrichment workflow fields.

This model is broader than the current runtime book shape. It is ready to support future Atlas v2 reasoning, but it is not yet the live recommendation data contract.

### Validation

`lib/library/validation.ts` can validate foundation `Book[]` data for:

- missing required fields
- duplicate IDs
- duplicate ISBN13 values
- duplicate title/author combinations
- malformed ISBN13
- empty required arrays
- missing affiliate metadata

The validation layer is local, deterministic, and not wired into runtime UI.

### Runtime Mapper

`lib/library/runtime-book-mapper.ts` maps current runtime books into foundation `Book` objects.

This gives Atlas v2 a bridge from the existing curated corpus into the new foundation vocabulary, but the mapper also shows an important gap: some foundation fields are currently inferred from older runtime fields rather than authored directly.

### Enrichment Scaffold

`lib/library/enrichment.ts` and `lib/library/enrichment-pipeline.ts` define `EnrichmentDraft` and helper functions for pending drafts, batch draft creation, and immutable status transitions.

This prepares the workflow for future enrichment, including manual or future AI-assisted drafts, but no AI enrichment is implemented and no draft content is used by runtime recommendations.

### Curator Scaffold

`lib/library/curator.ts` and `lib/library/curator-system.ts` define curator types, simple curator/book scoring, and functional recommendation reasons.

This is a scaffold for future curator-based matching. It does not generate curator voice and does not replace the current deterministic resolver.

### Affiliate Bridge

`lib/library/affiliate-provider.ts` and `lib/affiliate/affiliateBridge.ts` provide a provider-based affiliate boundary.

Real outbound affiliate links remain disabled by default. The bridge forces provider selection to `none` unless a future phase explicitly opts into provider URLs. Atlas v2 should treat affiliate availability as operational metadata, not as recommendation value.

### Saved Shelf Bridge

`lib/library/saved-shelf.ts` defines future saved-shelf state, and `lib/savedBooks.ts` contains compatibility helpers for the current runtime saved-books shape.

Runtime storage has not migrated. Saved behavior remains localStorage-based and unchanged.

### Analytics Foundation

`lib/analytics/*` contains typed local analytics event scaffolding and a no-op tracker.

No external analytics service exists. No runtime flow emits events. Any Atlas v2 learning loop would need a separate privacy and analytics governance phase.

### Taxonomy Docs

Controlled documentation now exists for:

- genres: `docs/GENRE_TAXONOMY_V1.md`
- themes: `docs/THEME_TAXONOMY_V1.md`
- moods: `docs/MOOD_TAXONOMY_V1.md`
- normalization rules: `docs/METADATA_NORMALIZATION_RULES.md`

These documents are ready to inform Atlas v2, but themes and moods are not approved runtime book fields yet.

### Corpus Growth Docs

Corpus growth and intake documentation now exists for:

- core dataset tiers
- 12 to 50 / 100 / 500 / 1000 growth
- 50-book sample strategy
- candidate pipeline stages
- import error taxonomy
- ISBN verification
- affiliate enablement

This makes corpus expansion operationally possible without implying that Atlas v2 logic is ready.

## What Atlas v2 Should Solve

The current recommendation flow mostly asks: who is the reader, or what kind of reader situation are we interpreting?

Atlas v2 likely needs to shift the center of gravity toward: what is the user seeking right now?

That means moving from broad person/profile matching toward a more situational model:

- What kind of relief, company, challenge, beauty, clarity, or depth is wanted?
- Is this for the user or for a gift recipient?
- Is the reader asking for emotional regulation, perspective, immersion, recovery, or momentum?
- How much reading energy is available?
- How much surprise or difficulty is welcome?
- Should the recommendation soothe, open, sharpen, accompany, or gently move the reader?

Atlas v2 should not merely add more questions or more labels. It should clarify the relationship between user intent, book metadata, enrichment notes, and final reveal copy.

## Key Product Decisions Needed Before Implementation

### Question Count

Decide how many questions Atlas v2 should ask for self and gift flows.

Questions:

- Should Atlas v2 keep the current four-question shape?
- Should self and gift flows have different lengths?
- Should there be a shorter fallback path for low-energy users?
- Should optional refinement questions exist after the first recommendation?

### Question Purpose

Decide what the questions classify.

Possible dimensions:

- reader identity
- current situation
- gift intent
- emotional need
- desired mood
- reading energy
- difficulty tolerance
- openness to surprise
- relationship to reading
- desired outcome

Atlas v2 should avoid collecting raw personal detail unless governance explicitly allows it.

### Recommendation Mechanism

Decide whether Atlas v2 should:

- rank all books
- choose one of several deterministic paths
- produce candidate sets for a final selector
- use curator profiles as filters
- use enrichment reasons as scoring signals
- combine hard exclusions with soft scoring

This decision should be made before changing `recommendationResolver.ts`.

### Explanation Source

Decide how much explanation comes from structured data versus curator voice.

Options:

- structured reason derived from matched fields
- curated runtime copy from book data
- enrichment draft summaries
- curator notes
- templated reveal copy

Atlas v2 should preserve Bokhyllan's voice, but it should not hide unreviewed generated text inside runtime recommendations.

### Saved Books Influence

Decide whether saved books should influence future recommendations.

Questions:

- Does a saved book indicate preference, intent, or only temporary interest?
- Should saved books diversify future recommendations or reinforce similar matches?
- Should removed or dismissed books count as negative signals?
- Should saved-shelf data remain local-only?

No saved-book influence should be implemented until storage, privacy, and interpretation rules are decided.

### Affiliate Availability

Decide how affiliate availability should relate to recommendations.

Recommended rule:

- Affiliate availability should not determine which book is best for the reader.

Possible allowed uses:

- hide or disable unavailable outbound links
- prefer clean links only after a book is already selected
- warn internally about missing metadata

Forbidden by default:

- ranking books higher because affiliate metadata is available
- excluding good recommendations because affiliate links are missing
- using retailer availability as a proxy for literary fit

## Data Model Implications

### Genres

Genres should remain broad operational categories. Atlas v2 can use them for balance, coarse filtering, and corpus coverage, but genres should not carry mood, theme, gift intent, or reader state.

### Themes

Themes are likely central to Atlas v2 because they describe what a book explores or helps a reader sit with.

Product must decide whether themes become:

- foundation-only enrichment metadata
- runtime book metadata
- draft-only review suggestions
- scoring inputs
- reveal explanation inputs

### Moods

Moods describe reader-facing atmosphere. Atlas v2 can use them for "what do you want this to feel like?" matching, but mood should not become a quality judgment or marketing label.

Product must decide whether the foundation `BookMood` union should be aligned with the broader mood taxonomy before implementation.

### Tags

Tags should capture operational descriptors such as form, accessibility, length/use case, or reading texture.

Atlas v2 should not use free-form tags until a controlled tag taxonomy exists.

### Enrichment Drafts

`EnrichmentDraft` can support future recommendation angles, reader needs, and gift use cases.

Atlas v2 must decide when draft data becomes trustworthy enough for runtime:

- pending draft: never runtime
- enriched draft: review-only
- approved draft: possible runtime input
- rejected or failed draft: excluded

### Recommendation Reasons

`RecommendationReason` is functional and plain today. Atlas v2 can use it as an internal explanation contract, but final Bokhyllan reveal copy should still have a separate voice contract.

### Curator Notes

Current runtime books already include `curatorConnection`, `voiceNote`, and `emotionalDescription`.

Atlas v2 should decide whether these remain book-authored copy, become enrichment outputs, or are bridged into a new reveal-copy contract.

## Non-Goals For Atlas v2

Atlas v2 should not assume:

- UI redesign by default
- routing changes by default
- affiliate-driven ranking
- real affiliate enablement
- uncontrolled AI generation in runtime
- storing raw personal answers without governance
- external analytics or learning loops
- saved-books personalization without privacy rules
- replacing curated voice with generated copy
- a recommendation rewrite before product rules are decided

## Suggested Atlas v2 Design Questions For Claude/Product Work

### User Intent

- What is the primary thing Bokhyllan should infer: reader type, current need, desired feeling, gift intent, or reading energy?
- Should Atlas v2 prioritize what the user wants to feel, what they want the book to do, or what kind of book they can handle?
- How should the model represent uncertainty when the user does not know the recipient well?

### Flow Shape

- Should self and gift flows share one underlying model or separate models?
- Should the current four-question structure remain?
- Should any question be optional or adaptive?
- What is the maximum acceptable friction before the experience stops feeling gentle?

### Matching Logic

- Should Atlas v2 score every book or route through curated paths?
- Which fields are hard filters?
- Which fields are soft scoring signals?
- Should diversity be added after scoring?
- How should the engine avoid recommending the same few books too often?

### Book Data

- Which fields are required before a book can participate in Atlas v2?
- Are `themes`, `mood`, and `tags` required for Atlas v2, or can it launch with current runtime fields?
- Should current runtime `readingState`, `emotionalTone`, `emotionalEffects`, and `atmosphere` be mapped into the new taxonomies or retired gradually?

### Reveal Copy

- What should the user see as the reason for a recommendation?
- Which parts should be deterministic?
- Which parts should be curator-authored?
- Should explanation mention matched needs directly, or stay literary and gentle?
- How should gift recommendations explain fit without feeling invasive?

### Saved Shelf

- Should saved books influence future recommendations immediately, later, or never?
- Does saving mean preference, curiosity, gift intent, or "maybe later"?
- Should dismissed books reduce future similarity?
- Should all saved-shelf interpretation remain local?

### Affiliate Boundary

- Should recommendation quality be independent from link availability?
- Should missing affiliate metadata ever affect eligibility?
- Should affiliate links appear only after recommendation selection?
- What disclosure or copy rules are needed before real links?

### Governance

- What personal data is never stored?
- Are raw answers stored, summarized, or discarded?
- Are analytics events needed for Atlas v2?
- Who approves new taxonomy values?
- Who approves enrichment content before runtime use?

## Recommended Implementation Path After Product Decisions

### Phase 1: Atlas v2 Product Spec

Define the product behavior:

- flow purpose
- question count
- user-intent dimensions
- self versus gift differences
- explanation style
- non-goals

### Phase 2: Atlas v2 Data Contract

Define the typed data inputs and outputs:

- answer model
- interpretation model
- book match fields
- candidate set shape
- recommendation reason shape
- reveal copy shape

### Phase 3: Atlas v2 Mapper

Bridge current runtime data into the approved Atlas v2 contract.

This should be a compatibility layer first, not a migration of all book data.

### Phase 4: Atlas v2 Deterministic Resolver

Implement a deterministic resolver after the data contract is approved.

Initial resolver should avoid:

- AI calls
- affiliate ranking
- analytics-dependent behavior
- external data

### Phase 5: Atlas v2 Reveal Copy Contract

Define how recommendation reasons, curator notes, book copy, and final reveal text fit together.

This should prevent internal scoring reasons from leaking into user-facing copy.

### Phase 6: Atlas v2 Test Fixtures

Create test fixtures for:

- self flow
- gift flow
- low-energy reader
- uncertain gift recipient
- high-attention reader
- saved-book edge cases if included
- affiliate-unavailable recommendations

## Stop Condition

Codex should not implement Atlas v2 logic until both of the following are approved:

- Atlas v2 Product Spec
- Atlas v2 Data Contract

Until then, Codex work should remain limited to documentation, audits, data quality, controlled taxonomy work, and safe compatibility scaffolds.
