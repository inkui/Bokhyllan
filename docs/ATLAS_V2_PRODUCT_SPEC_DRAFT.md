# Atlas v2 Product Spec — Draft

Status: draft for decision. This document determines *what Atlas v2 should be*, not how to build it. It does not propose code, screens, routing, data migrations, or new features. It is input to the "Phase 1: Atlas v2 Product Spec" gate described in `ATLAS_V2_HANDOFF_BRIEF.md`. Nothing here should be implemented until this spec and a separate data contract are approved.

---

## 1. Executive Summary

Bokhyllan's recommendation engine (Atlas v1) already works and already feels like Bokhyllan: a few quiet questions produce one confident, gently-worded book. The instinct driving the Atlas v2 conversation — that the product should shift from "who is the reader" toward "what is the reader seeking right now" — is **directionally right but imprecisely stated**. The self flow in v1 *already* asks situational, present-moment questions. The actual problems are structural, and they live below the questions:

1. **A lossy persona layer.** v1 collapses rich answers into one of fifteen `lifeMoment` labels (grief, burnout, loneliness…), then hard-codes a single book ID per life moment in `preferredBookForContext`. This is a reconstructed persona, and it is the part that will not scale.
2. **Recommendation collapse is already built in.** Because life moments map to fixed book IDs, growing the corpus from 12 to 100 to 1000 books does **not** widen what gets recommended. A grief answer returns `dora-bruder` whether the library has 12 books or 1000.
3. **Brittle matching.** `matchesProfile` requires a book to match on energy *and* pacing *and* tone *and* effect simultaneously. At 12 books this is tuned by hand; at scale it will either over-restrict (no candidates) or, via the `?? candidates[0]` fallback, return near-arbitrary books.
4. **Two disconnected vocabularies.** The live matching taxonomy (`emotionalTone`, `readingState`, `emotionalEffects`, `pacing`, `readingEnergy`) is separate from the newer controlled `genres` / `themes` / `moods` taxonomies, which are documented but not wired into recommendation.

**Recommended direction:** a **hybrid model with a present-moment center of gravity** — what we will call **Intent-first matching with capacity constraints and a curated fit layer**. The user's *current seeking* (what they want the book to do, and how much they can take on) is the primary signal. A small set of *capacity* constraints (reading energy, difficulty tolerance) act as filters, not rankers. "Who the reader is" is demoted to a weak prior used mainly where present-moment data is unavailable — most importantly in the **gift flow**, where the buyer genuinely cannot report the recipient's inner state and must describe the person instead.

The deliverable of Atlas v2 is not more questions or more tags. It is **a clear, auditable chain from intent → candidate set → one book → honest reveal copy**, where corpus growth actually improves recommendation variety and the engine never silently hides unreviewed generated text.

---

## 2. Diagnosis of Atlas v1

### What Atlas v1 is doing

The pipeline (`recommendationFlow.ts` → `answerInterpretation.ts` → `recommendationResolver.ts`) does the following:

1. **Asks four questions** per flow. Self flow: present mood, emotional need, reading energy, desired "room" metaphor. Gift flow: recipient nature, recipient life moment, hope for the book, recipient's reading relationship.
2. **Maps each answer to abstract signals** (`answerSignalMap`) across dimensions: energy (low/med/high), direction (toward / sitting-with / transitioning), self-vs-world, company (needs company / needs space), difficulty tolerance, surprise openness, returning-reader, and a few explicit life-moment tags.
3. **Reduces signals to two derived objects**: an ordered list of `emotionProfileId`s (comfort, perspective, companionship, wonder, meaning…) and a single `lifeMomentId`.
4. **Selects one book**: first by a hard-coded life-moment → book-ID table (`preferredBookForContext`), otherwise by `matchesProfile` (energy ∧ pacing ∧ tone ∧ effect), otherwise the first candidate.
5. **Generates reveal copy** by combining a life-moment `revealNote`, the book's authored `curatorConnection` / `voiceNote`, a profile-keyed opening line, and a pacing-keyed placement line.

### What it does well

- **It produces one confident answer.** No ranking UI, no percentages, no "you might also like." This is the core product promise and it is intact.
- **The self flow is already seeking-oriented.** "Vad behöver du mest av en bok just nu?" and "Hur ser din läsning ut just nu?" are present-tense, intent-and-capacity questions — not identity questions. The premise that v1 is built around *who the reader is* is **only true of the gift flow** and of the internal `lifeMoment` abstraction.
- **Capacity is handled honestly.** Reading energy and difficulty tolerance are first-class, and the placement copy adapts to them ("Läs den i korta stunder"). This is a genuine strength worth preserving.
- **Reveal copy stays literary.** Internal reasons (profiles, signals) never leak to the user; the user sees a calm note, not a match score. The separation of internal reasoning from voice is already correct in spirit.
- **It is deterministic and auditable.** A curator can read the rules. This is a real asset and Atlas v2 must not trade it away for opacity.

### What limitations it has

- **The `lifeMoment` layer is a persona reconstruction.** Answers about the present are compressed into a named human situation, which is closer to "who/what kind of person/season" than "what is wanted." This is the layer that quietly reintroduces the persona problem the v2 conversation is reacting to.
- **Hard-coded book IDs.** `preferredBookForContext` returns literal IDs (`"gilead"`, `"stoner"`, `"dora-bruder"`). The mapping is authored for a 12-book shelf and encodes the corpus into the resolver.
- **AND-based matching is fragile.** Requiring four simultaneous matches has no graceful degradation except "return candidates[0]," which is silent and arbitrary.
- **Vocabulary fork.** The matching taxonomy and the controlled `genres`/`themes`/`moods` taxonomies are not connected. Theme — arguably the richest "what am I seeking" signal — is not used at all.
- **`uncertain_*` answers collapse to noise.** `uncertain_not_close` maps to `[]` signals; uncertainty produces a weak default rather than being modeled as a real, common state (especially in gifting).

### What problems appear as the library grows

| Corpus size | Symptom |
|---|---|
| ~12 (today) | Works; tuned by hand. |
| ~50–100 | New books are added but **rarely surfaced** — life-moment IDs still point at the original ~9 books. The library grows; the recommendations don't. This is **recommendation collapse**. |
| ~500 | `matchesProfile` AND-logic returns large undifferentiated candidate sets; selection falls through to `candidates[0]`, which is effectively corpus-order-dependent (arbitrary). |
| ~1000 | The resolver's hard-coded knowledge is now a tiny, stale island inside a large library. Quality depends entirely on a mapping no one maintains per-book. |

**The core scaling defect is not the questions. It is that selection is hard-wired to specific books rather than to book *properties*.** Atlas v2 must move selection logic from "this situation → this book" to "this intent + this capacity → this *kind* of book → choose among many."

---

## 3. Core Product Question

**Should Bokhyllan optimize for (A) who the reader is, (B) what the reader is seeking right now, or (C) a hybrid?**

### Reframing the question

The dichotomy is slightly false, and saying so is part of the deliverable. "Who the reader is" and "what they are seeking" are not symmetric options:

- **"Who the reader is"** (taste, history, persona, demographic) is *stable* but (a) Bokhyllan does not and should not collect it, (b) it correlates weakly with what a person needs on a given evening, and (c) it pushes toward profiling and behavioral tracking, which the product principles explicitly resist.
- **"What the reader is seeking right now"** is *volatile* but it is exactly what a thoughtful bookseller asks. It is answerable in the moment, requires no stored history, and maps naturally onto the book's emotional effect and themes.

There is also a **third axis the binary hides: what the reader can take on right now** — reading energy, difficulty tolerance, time. This is neither identity nor desire; it is *capacity*, and v1 already treats it well. Any honest model has to keep it.

### The answer: C, a hybrid — but a specifically weighted one

Not a 50/50 hybrid. The recommended weighting:

1. **Primary signal — present-moment intent.** What does the reader want the book to *do*? (soothe, accompany, open, sharpen, move gently, give beauty). This is the center of gravity. It maps to the book's `emotionalEffects` and `themes`.
2. **Hard constraints — capacity.** Reading energy and difficulty tolerance act as **filters/exclusions**, never as quality rankers. A depleted reader should never be handed a demanding book, regardless of intent fit.
3. **Weak prior — reader relationship/identity.** Used sparingly: returning reader, regular vs occasional reader, "not close to the recipient." This breaks ties and shapes tone, but does not drive selection on its own.

### Why this weighting (detailed reasoning)

- **It matches the bookseller metaphor in `RECOMMENDATION_INTELLIGENCE.md`.** A good bookseller asks "what are you in the mood for / what do you need" before "what kind of reader are you."
- **It fixes recommendation collapse the right way.** Intent + capacity are *properties* that any number of books can satisfy, so corpus growth directly widens the candidate set. Identity-as-persona (the `lifeMoment` table) is what froze the corpus; demoting it is the structural fix.
- **It respects the privacy posture.** Present-moment intent is ephemeral and need not be stored. Identity/taste profiles are exactly what the analytics-governance and product-structure docs warn against accumulating.
- **It preserves what already works.** v1's self flow and its capacity handling are already intent-first; this direction is less a pivot than a *correction and a generalization* — remove the frozen persona layer, keep and strengthen the seeking + capacity signals.
- **It handles gifting honestly (see §7).** Gifting is the one place where present-moment intent is partly unavailable, so the gift flow legitimately leans more on recipient description. A pure intent-only model would break gifting; the hybrid accommodates it by design.

**Decision:** Optimize primarily for *what the reader is seeking right now*, gate on *what they can take on right now*, and use *who they are* only as a weak, mostly tone-shaping prior — with the gift flow allowed a heavier identity lean because intent data is thinner there.

---

## 4. Recommendation Philosophy

### What Bokhyllan is actually helping people do

Bokhyllan helps a person **meet the right book for this moment without having to perform taste or browse a catalog.** It is emotional triage, not discovery search. The user arrives slightly tired, slightly unsure, possibly buying for someone else, and Bokhyllan does the work of translating a vague present state into one trustworthy suggestion. It removes choice anxiety rather than expanding choice.

Stated as a sentence: *Bokhyllan turns "I don't know what I want to read / what to give" into one book the person can trust, in a voice that makes them feel understood rather than sold to.*

### What success looks like

- The reader feels **recognized** by the reveal copy ("this told the truth about what I was getting into"), per the curator-voice standard in `BOOK_ATLAS_FOUNDATION.md`.
- One book is offered with quiet confidence; the reader either takes it or asks for something else without friction.
- Over a larger corpus, **two readers in genuinely different states get genuinely different books**, and the *same* reader returning in a different state gets a different book.
- The recommendation is honest about capacity: a tired reader is never handed homework.
- Nothing in the experience feels like ecommerce, scoring, or surveillance.

### What failure looks like

- **Collapse:** the library has 1000 books but five of them are recommended 90% of the time.
- **False precision:** the reveal copy implies the engine knows the reader better than it does ("Because you're grieving, you need…").
- **Capacity violations:** a depleted reader receives a demanding 600-page novel because its themes matched.
- **Persona flattening:** every melancholy answer routes to the same "sad book," so the product feels like a horoscope.
- **Voice leakage:** internal match reasons or unreviewed generated text appear in the reveal as if they were curator voice.
- **Friction creep:** the flow grows to eight questions chasing precision and stops feeling gentle.

The philosophy gives a sharp test for every Atlas v2 decision: *does this help a person meet one trustworthy book for this moment, without making Bokhyllan feel like a store or a quiz?*

---

## 5. Candidate Atlas v2 Models

Three distinct approaches, compared. All assume the deterministic, no-LLM-at-runtime constraint from `RECOMMENDATION_INTELLIGENCE.md` and the handoff brief.

### Model A — Curated Path Routing (evolution of v1)

Keep the v1 shape: answers → a named situation → a curated route. Fix collapse by mapping each route to a **curated candidate *pool*** (criteria, not IDs) and selecting within it with light variation.

- **Strengths:** closest to today; fully auditable; preserves curator control over which kinds of books serve which situations; low conceptual risk; reveal copy can stay tightly authored per route.
- **Weaknesses:** still routes through a persona-ish "situation" abstraction; the number of routes must grow as the corpus diversifies; risk of curators maintaining many hand-tuned routes; intent and capacity remain entangled inside route definitions.
- **Scalability:** good for the corpus (pools scale), moderate for the *route table* (human-maintained, grows with nuance). Comfortable to ~500; strained beyond unless routes stay coarse.
- **Explainability:** excellent. Every recommendation traces to a named route a curator wrote.
- **Fit with Bokhyllan:** high. It is the least disruptive and most voice-preserving. But it under-delivers on the "seeking-first" reframing because the situation layer remains the spine.

### Model B — Intent + Capacity Scoring with a Fit Layer (recommended)

Separate the three axes explicitly. **Capacity** (energy, difficulty) is a hard filter producing an eligible set. **Intent** (desired effect + theme resonance + desired mood) is a soft score over the eligible set. **Fit/variation** (reader relationship, recency/diversity, curator weighting) breaks ties. One book is chosen; reveal copy is assembled from the matched intent plus authored voice.

- **Strengths:** directly implements the §3 weighting; corpus growth widens candidates automatically; capacity violations are structurally impossible (hard filter); themes/moods finally do real work; degrades gracefully (loosen soft scores before ever returning arbitrary books); diversity can be added as an explicit post-step to prevent collapse.
- **Weaknesses:** scoring weights need tuning and governance; "soft score" can drift toward opaque if not constrained; requires books to carry `themes`/`moods`/effect data, which most of the corpus lacks today (see §6); more design work than Model A.
- **Scalability:** strong to 1000. The engine is property-based; nothing is hard-wired to a book.
- **Explainability:** good *if disciplined*. The chain "eligible by capacity → top intent match → tie-break reason" is traceable, but only if weights are documented and the reveal never exposes raw scores. Slightly less self-evident than Model A's named routes.
- **Fit with Bokhyllan:** high, provided the soft layer stays small and legible and the reveal stays literary. This is the model that best matches the bookseller philosophy and the seeking-first correction.

### Model C — Two-stage: deterministic candidate set + review-gated enrichment selector

Stage 1 is Model B's capacity filter + coarse intent match to produce a small candidate set. Stage 2 chooses among the set using **approved enrichment data** (`EnrichmentDraft.recommendationAngles`, `readerNeeds`, `giftUseCases`) — curator-reviewed, never live-generated — and may, *much later and behind governance*, use an offline-prepared assist for ordering.

- **Strengths:** richest matching; leverages the enrichment pipeline the foundation already scaffolds; cleanly separates "eligible" from "best for this nuance"; gift use cases become first-class.
- **Weaknesses:** depends on enrichment coverage that does not exist yet (pending/enriched/approved states must be populated across the corpus); most complex; highest risk of the "approved draft → runtime" trust boundary being mishandled; easy to over-engineer before there is data to justify it.
- **Scalability:** strong in principle, but bottlenecked by **enrichment throughput** — the ~10-min-per-book human review cost dominates.
- **Explainability:** good at stage 1, variable at stage 2 (depends on whether the selecting signal is a human-authored angle or a derived score).
- **Fit with Bokhyllan:** high *eventually*, premature *now*. It is the right long-term shape but presumes a populated enrichment layer Bokhyllan has not built.

### Comparison summary

| | A: Path Routing | B: Intent+Capacity Scoring | C: Two-stage + Enrichment |
|---|---|---|---|
| Fixes recommendation collapse | Partially (via pools) | Yes (property-based) | Yes |
| Implements seeking-first | Weakly | Directly | Directly |
| Uses themes/moods | Optional | Yes | Yes (+ enrichment) |
| Data needed beyond today | Low | Medium | High |
| Explainability | Highest | High (if disciplined) | Medium |
| Scales to 1000 | ~500 comfortably | Yes | Yes (if enriched) |
| Disruption / risk | Lowest | Medium | Highest |
| Voice preservation | Highest | High | High |

---

## 6. Data Requirements

For each model, the role of each metadata layer. Reading these together with `GENRE_TAXONOMY_V1.md`, `THEME_TAXONOMY_V1.md`, `MOOD_TAXONOMY_V1.md`:

### Role of genres

- **All models:** genres stay **operational only** — corpus balance, coarse eligibility ("don't hand a crime thriller to someone seeking stillness"), gap auditing. Per the genre taxonomy, genres must **not** carry mood, theme, or intent. They are a coverage and sanity tool, not a primary matching signal.
- Genres are the one classification field the corpus already has at 12/12. They are necessary but never sufficient.

### Role of themes

- **Model A:** optional; can inform route definitions.
- **Models B and C:** **central.** Themes (`grief`, `solitude`, `responsibility`, `memory`…) are the best structured proxy for "what is the reader seeking to sit with." Intent like "I want perspective on responsibility" or "room for grief" matches directly to themes. This is the single most valuable field Atlas v2 would add — and it does not exist in runtime books today.
- Decision required: themes must become **approved runtime metadata** (or a runtime-readable approved-enrichment field) for B/C to function. They should be theme *keys* from the controlled vocabulary, not prose.

### Role of moods

- **All models:** moods answer "what do you want this to *feel* like." Useful as a **soft** intent signal and as reveal-copy texture. Per the mood taxonomy, mood must never become a quality judgment.
- Caution: there is overlap and a naming fork between the runtime `atmosphere`/`emotionalTone` fields and the controlled `mood` vocabulary. Atlas v2 must **reconcile these into one mood/tone vocabulary** before mood can be a reliable signal (open question in §11).

### Role of future tags

- **All models:** tags remain **deferred and governed.** Only useful once a controlled tag taxonomy exists (form, accessibility, length/use-case, texture). Tags like `short_read`, `low_energy_friendly` could *support the capacity filter*, but capacity is better served by the existing `readingEnergy` and `lengthCategory` fields. **Do not gate Atlas v2 on tags.**

### Role of enrichment data

- **Model A:** not required.
- **Model B:** optional accelerant — approved enrichment could supply themes/effects where authoring is thin, but B can launch on directly-authored fields.
- **Model C:** **load-bearing.** `recommendationAngles`, `readerNeeds`, `giftUseCases` are the stage-2 selector. The trust ladder from the handoff brief is mandatory: *pending = never runtime; enriched = review-only; approved = eligible runtime input; rejected = excluded.* No live generation.

### Cross-cutting data truth

Today's matching runs on `emotionalTone`, `readingState`, `pacing`, `emotionalEffects`, `readingEnergy`, `atmosphere`, `lengthCategory`. The controlled `genres`/`themes`/`moods` work is **parallel infrastructure not yet connected to recommendation.** Any model beyond A requires a deliberate decision (see §11) about whether the v1 emotional taxonomy is *mapped into* the new taxonomies or *retired gradually*. Until that is resolved, B and C cannot be specified as data contracts — which is exactly why this is a product-spec gate, not an implementation gate.

---

## 7. Question Strategy

### Fewer or more questions?

**Keep it at roughly four; do not add questions to chase precision.** The philosophy (§4) is anxiety-reduction; friction is the enemy. The improvement should come from asking *better-targeted* questions and from a stronger engine behind them, not from more questions. Two refinements:

- **A shorter low-energy path is worth it.** A depleted reader self-reporting low energy could be offered a 2-question express path (intent + capacity), because the very people Bokhyllan serves best are the least able to tolerate a quiz. This is a capacity-aware adaptation, not a new feature surface.
- **Optional *post*-recommendation refinement, not pre-recommendation expansion.** If the first book misses, "visa något annat" could optionally carry one refining nudge (e.g., "lighter" / "deeper") rather than re-asking. This keeps the first pass short.

### What information is actually valuable

1. **Desired effect / intent** — what the reader wants the book to do. *Highest value.* (Maps to `emotionalEffects` + themes.)
2. **Capacity** — reading energy and difficulty tolerance. *High value; must remain a hard filter.*
3. **Desired feeling/mood** — soft refinement of intent.
4. **For gifts: recipient framing + the buyer's hope for the book.** The gift "hope" question ("Vad hoppas du att boken ska göra?") is explicitly the highest-signal gift question and should be treated as the gift flow's intent proxy.

### What information is noise

- **Fine-grained identity/taste** ("favorite genre," "favorite author") — pushes toward profiling, weakly predicts present need, and is off-philosophy.
- **The "room metaphor" question, as a primary signal.** It is charming and on-brand, but it is a *re-encoding* of self-vs-world + difficulty + company that earlier questions already capture; as a matching input it is largely redundant. Keep it for tone/atmosphere flavor if desired, but do not let it carry unique matching weight it doesn't earn.
- **Anything the engine can't act on.** A question whose answer doesn't change the candidate set or the copy is friction.

### How gift scenarios differ from self-selection

This is the place the §3 hybrid earns its keep:

- In **self** flow, present-moment intent is directly reportable → lean fully intent-first.
- In **gift** flow, the buyer **cannot report the recipient's inner present state** reliably. So the gift flow legitimately collects more *recipient description* (nature, reading relationship) and, crucially, **the buyer's hope** — which is the buyer's intent *on behalf of* the recipient. Gifting is intent-first too, but the intent is the giver's.
- **Uncertainty must be a first-class answer in gifting.** "Jag vet inte riktigt" / "vi är inte så nära" is common and currently collapses to empty signals. Atlas v2 should model recipient-uncertainty explicitly and respond by **widening toward broadly-giftable, low-risk, high-quality books** rather than guessing a persona. The dataset spec's "gift suitability" selection principle exists precisely to stock this case.
- Gift recommendations must **explain fit without feeling invasive** — never "for someone who is grieving," but rather "a book that keeps quiet company." (See §8.)

---

## 8. Recommendation Reasoning

### What Atlas v2 should use internally

- Capacity filter inputs: `readingEnergy`, difficulty tolerance, `lengthCategory`.
- Intent signals: desired `emotionalEffects`, `themes`, desired `moods`.
- Tie-break/variation: reader relationship, curator weighting, anti-repetition/diversity.
- For Model C only, and only when approved: enrichment `recommendationAngles` / `readerNeeds` / `giftUseCases`.
- An internal, structured `RecommendationReason` (the foundation type) for **audit/debug**, recording *why* a book won. This is the deterministic, inspectable trail.

### What should be visible to the user

- **One book, presented with quiet confidence.** No scores, no ranked alternatives, no matched-tag list, no percentages — consistent with v1 and the product principles.
- A short recognition note, a "why this book" in curator voice, a reading-experience note, optional practical notes, a placement line, and a calm CTA. This is exactly the `CuratorRevealCopy` shape v1 already produces and should be preserved.

### How explanations should work

Three firm rules, mostly already honored by v1 and worth codifying:

1. **Internal reasons never become user copy verbatim.** The structured reason is for curators; the reveal is authored voice. Keep the wall between `RecommendationReason` and `CuratorRevealCopy` that the audit doc recommends.
2. **No unreviewed generated text in the reveal, ever.** Reveal copy is either book-authored (`curatorConnection`, `voiceNote`, `emotionalDescription`) or assembled from approved, reviewed fragments. This is a hard line from the handoff brief and the enrichment philosophy.
3. **Explain the book, gently — not the reader.** Say what the book *is and does* ("en bok som håller sällskap"), not what we inferred about the reader's psyche ("eftersom du är ensam"). This avoids false precision and the horoscope failure mode, and it is what makes gift copy non-invasive.

A useful constraint: the reveal should read identically well whether the match was confident or a graceful fallback. If the copy would have to *admit* a weak match, the engine, not the prose, should have widened first.

---

## 9. Product Risks

| Risk | How it shows up in Bokhyllan | Protection in Atlas v2 |
|---|---|---|
| **Overfitting** | Matching tuned so tightly to the 12-book shelf (or to weights) that new books never fit cleanly. v1 already does this via hard-coded IDs. | Property-based matching (Model B/C); periodic gap/cluster audit per `BOOK_ATLAS_FOUNDATION.md` Part 4; weights documented and reviewed, not hand-fitted to current corpus. |
| **Recommendation collapse** | A handful of books dominate; corpus growth doesn't change outputs. **Already present in v1.** | Remove hard-coded book IDs; add an explicit diversity/anti-repetition step after scoring; audit "books per profile" so no profile routes to <2 or >5 books. |
| **False precision** | Copy or logic implies the engine knows the reader. | "Explain the book, not the reader" rule (§8); model uncertainty explicitly rather than forcing a persona; no stored history to over-interpret. |
| **AI-generated nonsense** | Hallucinated themes, fabricated curator connection, plausible-but-wrong copy reaching the reveal. | No runtime LLM; enrichment trust ladder (pending/enriched/approved/rejected); human approval gate; reveal copy only from authored or approved fragments. |
| **Metadata complexity** | Taxonomy sprawl; `genres`/`themes`/`moods`/`tags`/legacy taxonomy diverge; curators lose the plot. | Keep vocabularies small and controlled (already documented); reconcile the legacy emotional taxonomy with the new one *before* expanding (§11); defer tags; one source of truth for each dimension. |
| **Analysis paralysis** | The reader faces too many questions / too much nuance and the gentle feel is lost. | Cap at ~4 questions; low-energy express path; refinement *after* the first answer, not before; resist adding a question for every new signal. |
| **Capacity violation** (added) | Tired reader handed a demanding book because intent matched. | Capacity as a hard filter, never a soft score. |
| **Voice erosion / templating** (added) | Assembled copy starts sounding generic as fragments multiply. | Preserve book-authored voice as the primary copy; treat templated lines as scaffolding the curator reviews; the curator-voice quality bar from the Atlas foundation applies. |
| **Privacy drift** (added) | Storing answers/intent to "personalize" slides into profiling. | Intent is ephemeral by default; saved-book influence stays out until governance decides; no behavioral tracking without the analytics-governance phase. |

---

## 10. Final Recommendation

**Adopt Model B — Intent + Capacity Scoring with a Fit Layer — as the Atlas v2 direction, structured so it can grow into Model C later without rework.**

### The direction in one paragraph

Make **present-moment intent** the primary matching signal, expressed against the book's `emotionalEffects` and controlled `themes` (and softly, `moods`). Make **capacity** (reading energy, difficulty tolerance, length) a **hard filter** that defines eligibility before any scoring. Use a small, documented **fit/variation layer** (reader relationship, curator weighting, anti-repetition) only to choose among already-good candidates. Keep the flow at ~four questions with a low-energy express path, and let gifting lean on recipient description + the giver's hope, with uncertainty modeled as a real state that widens toward giftable books. Preserve the reveal exactly as a literary, one-book, no-scores experience, with a hard wall between internal reasons and authored copy.

### Why B over A and C

- **Over A:** Model A is safer and more explainable, but it keeps the persona-shaped "situation" layer as the spine and only partially honors the seeking-first correction. Its route table becomes a maintenance burden as nuance grows. A is the right *fallback* if data work stalls — and notably, **Model B can be launched in an A-flavored, coarse form** (few intent buckets, simple scores) and refined, so choosing B does not forfeit A's safety.
- **Over C:** Model C is the better long-term shape, but it presumes a populated, approved enrichment layer that does not exist. Committing to C now means committing to enrichment throughput as the critical path. **B is C without the prerequisite** — and B's outputs (candidate sets) are precisely C's stage-1, so B is a strict stepping stone, not a detour.

### What makes this defensible rather than optimistic

- It is the **smallest change that fixes the actual defect** (selection wired to books, not properties) while honoring the stated instinct (seeking-first) and keeping the parts that already work (one confident book, capacity-awareness, literary voice).
- It does **not** require new runtime features, UI redesign, AI, affiliate ranking, or stored personal data — all explicit non-goals.
- It degrades gracefully and is auditable, satisfying both the product philosophy and the engineering posture in the handoff brief.

### Hard preconditions before any implementation

B cannot be built until the data questions in §6/§11 are decided — specifically the reconciliation of the legacy emotional taxonomy with `themes`/`moods`, and the decision to make themes a runtime-readable signal. **If those decisions are not ready, ship nothing and either stay on v1 or adopt the coarse Model-A-flavored form of B.** This matches the stop condition: no Atlas v2 logic until the product spec *and* a data contract are approved.

---

## 11. Open Questions

Every unresolved product decision that must be answered before implementation:

### Taxonomy & data contract
1. **Vocabulary reconciliation:** Do the legacy runtime fields (`emotionalTone`, `atmosphere`, `emotionalEffects`, `readingState`) get *mapped into* the controlled `themes`/`moods` vocabularies, run *in parallel*, or get *retired gradually*? Nothing in B/C can be specified until this is answered.
2. **Themes as runtime signal:** Do `themes` become approved runtime book metadata, or runtime-readable only via *approved* enrichment? Which is the source of truth?
3. **Mood vs tone fork:** The runtime `atmosphere`/`emotionalTone` and the controlled `mood` taxonomy overlap. Which is canonical, and what is the mapping?
4. **Minimum data bar:** Which fields must a book have to *participate* in Atlas v2 at all? Can the engine launch on current runtime fields, or must themes/moods be backfilled across the corpus first (and to what coverage %)?
5. **Effect vocabulary:** Is the current 9-value `emotionalEffects` set the intent vocabulary, or does intent get its own controlled list?

### Matching logic
6. Which fields are **hard filters** vs **soft scores**? (Proposed: energy/difficulty/length = hard; effect/theme/mood = soft — needs sign-off.)
7. How is **diversity/anti-repetition** defined, and is it stateless (within a session) or does it require memory (which raises privacy questions)?
8. What is the **fallback behavior** when the eligible set is empty — widen which constraint first, in what order?
9. How much **curator weighting / manual override** of specific books is allowed, and how is it kept from re-introducing hard-coded collapse?

### Flow & questions
10. Keep four questions for both flows, or differentiate lengths per the handoff brief?
11. Approve the **low-energy express path**? If so, what triggers it and what's the minimum question set?
12. Approve **post-recommendation refinement** ("lighter"/"deeper")? Is it stateless?
13. Should the **"room metaphor" question** remain a matching input, become tone-only flavor, or be replaced by a more direct intent question?
14. How is **recipient uncertainty** in gifting modeled and answered (which "broadly giftable" criteria define the widened set)?

### Reveal & voice
15. Which reveal fragments are **deterministic/templated** vs **book-authored**? Where exactly is the wall?
16. For gifts, what copy conventions keep fit **non-invasive** while still feeling specific?
17. Does any **approved enrichment text** ever reach the reveal, or is the reveal restricted to book-authored copy only (until Model C)?

### Saved shelf, affiliate, governance (carried from handoff brief — must be answered, recommended defaults shown)
18. **Saved books influence:** Should saves/dismissals affect future recommendations? *Recommended default: no, until storage + privacy + interpretation rules exist.*
19. **Affiliate independence:** Confirm affiliate availability never affects eligibility or ranking. *Recommended default: confirmed; availability only toggles outbound link presentation after selection.*
20. **Answer retention:** Are raw answers stored, summarized, or discarded? *Recommended default: discarded / ephemeral; no profiling.*
21. **Analytics:** Does Atlas v2 require any events to function? *Recommended default: no; keep the no-op tracker until a governance phase.*
22. **Taxonomy & enrichment ownership:** Who approves new taxonomy values and who approves enrichment content before any runtime use?

### Scope gate
23. If the taxonomy/data-contract questions (1–5) can't be resolved soon, is the interim decision to **stay on v1** or to **ship the coarse Model-A-flavored form of B**? This should be decided explicitly, not by default.

---

*End of draft. This document answers "what should Atlas v2 be." A separate Atlas v2 Data Contract must resolve the §11 taxonomy questions before implementation begins, per the stop condition in `ATLAS_V2_HANDOFF_BRIEF.md`.*
