# Table Model & Atlas Direction Review

A decision document. It resolves the conflict between `ATLAS_V2_PRODUCT_SPEC_DRAFT.md` (which recommended **Intent + Capacity + Fit scoring**) and `ATLAS_V2_PHILOSOPHY_REVIEW.md` (which argued Bokhyllan is a bookseller, not an engine, and proposed **The Bookseller's Table**).

This is not an implementation task. No code, no UI, no data contract, no schema, no API. The output is a direction and the documents that must precede any build.

---

## 1. Executive Summary

The two prior documents do not actually disagree about how Bokhyllan should *read a reader*. They agree on the front door: a few quiet questions establishing **intent** (what the reader is seeking) and **capacity** (what they can take on), ending in one confident book and a literary reveal. Both keep the privacy and affiliate walls.

They disagree about **who chooses the book.**

- The **Product Spec** says a *property-based scoring engine* should choose: filter by capacity, score by intent over the whole corpus, break ties with a fit layer. Selection authority lives in the algorithm and its weights.
- The **Philosophy Review** says a *human curator* should choose, in advance, by composing small hand-built collections ("tables"); the system only routes a reader to the right table and hands over the curator's lead book. Selection authority stays human; the machine is a faithful usher.

The stakes are not accuracy — both can be made to "work" at 1000 books. The stakes are **identity**. Scoring optimizes *fit* and trends, over time, toward competent, mood-congruent, schema-legible, weight-tuned results that compete with every other matcher. Tables optimize *judgment* and trend toward a curator's repertoire — surprising, defensible, and the reason a reader returns to a person instead of a search box.

The current code (`recommendationResolver.ts`) is, revealingly, *neither* — it is a frozen table-of-one: `preferredBookForContext` hard-codes a single book ID per life moment. That is a degenerate table model (tables with one book each, no curator able to extend them) and it is the source of the recommendation-collapse problem. The choice ahead is whether to fix that by **scaling the engine** or by **scaling the curation**.

This document recommends the latter, decisively (§10).

---

## 2. What Is Bokhyllan Actually?

**Options:** A. Recommendation Engine · B. Digital Bookseller · C. Literary Guide · D. Something else.

**Answer: B — a Digital Bookseller** — with C (Literary Guide) as its register and A (engine) as a tool it may use but is not.

### Reasoning

Look at what the product *refuses* to do, because identity is clearest in the refusals. Per `RECOMMENDATION_INTELLIGENCE.md` and the product structure docs, Bokhyllan rejects ratings, percentages, "customers also bought," ranked lists, collaborative filtering, popularity, and stored taste profiles. A recommendation *engine* is defined by exactly those mechanisms. A product that throws them all out is not an engine with the features turned off; it is a different kind of thing wearing an engine's silhouette.

Now look at what it insists on. It presents **one** book "as a confident choice." It speaks in a curator's voice. `BOOK_ATLAS_FOUNDATION.md` states flatly that curator voice "is the product" and "is not a matching dimension." The reveal is authored, gentle, and vouches for the book. That is the behavior of a bookseller: a person who knows books, has taste, and hands you one.

Why not **A (engine)?** Because an engine's authority is its fit score, and Bokhyllan's authority is a person's judgment. An engine that perfectly matches a query is interchangeable with every other engine that matches the same query; it has no reason to be *Bokhyllan*. The thing that cannot be commoditized is taste.

Why not pure **C (Literary Guide)?** A guide educates and contextualizes ("here is why this matters, here is the canon"). Bokhyllan does some of this in its copy, but it does not primarily teach — it *gives*. C is the **voice** Bokhyllan speaks in (literary, attentive, unhurried), but the **act** is bookselling: meeting a person in a moment and putting the right book in their hands. So C describes the register; B describes the job.

Why not **D (something else)?** One could call it "emotional triage" or "a calm decision-remover," and those describe the *user benefit*. But the mechanism that delivers that benefit — knowing books, having taste, recommending one — is bookselling. D collapses into B.

**Conclusion:** Bokhyllan is a digital bookseller that speaks as a literary guide. Any architecture that locates *selection authority* somewhere other than human judgment is fighting the product's nature. This single conclusion drives everything below.

---

## 3. Evaluate The Bookseller's Table

Treated as a serious proposal, not a romantic one.

**Strengths**
- **Selection authority stays human** — directly aligned with §2 and with the Atlas foundation's claim that curator judgment is the product.
- **Serendipity becomes designable**, not emergent: a table can deliberately hold a "wrong-on-paper, right-in-the-room" book, which scoring structurally cannot produce.
- **Auditable in human terms.** "What's on the sleepless table, and is the lead book still right?" is answerable by a person; "are the weights tuned?" is not.
- **Fixes recommendation collapse honestly.** A table holds many books and a book lives on many tables, so corpus growth widens what surfaces — without hard-coded IDs.
- **The new taxonomies find their true role** (§4, §8): instruments curators use to *build and audit* tables, exactly as `THEME_TAXONOMY_V1.md` / `MOOD_TAXONOMY_V1.md` describe them — vocabularies for curators to reason with, not a scoring substrate.

**Weaknesses**
- **Coverage gaps are possible.** A reader-moment with no good table yields a weak result. Needs a default/overflow table and gap-auditing.
- **Cold-start cost.** Tables must exist before the model is good; you cannot launch on an empty set of tables the way you can launch a thin scorer.
- **Curator dependency is a single point of failure** if there is only one curator and they leave.
- **Risk of stale tables** — a table set and forgotten ages worse than a weight that at least re-evaluates the live corpus.

**Scalability** — Scales via *more and better-stocked tables and richer overlap*, not via algorithmic sophistication. The corpus can grow large under a bounded number of tables (see §5). The binding constraint is curatorial bandwidth, not compute.

**Maintainability** — High *legibility*, real *labor*. Each artifact is readable and correctable, but someone must read and correct it. Maintenance is concrete and chunked (per table) rather than diffuse (per weight), which is healthier for a small team.

**Curator workload** — The honest cost. Composing and re-balancing tables is ongoing work. But it is the *same kind* of ~10-min-per-book judgment the Atlas foundation already budgets, redirected from "author scoring fields" to "compose a row." It front-loads at launch and amortizes: a book authored once appears on several tables.

**Recommendation quality** — Higher *ceiling* (a curator's best hand-off beats any score), more variable *floor* (an unbuilt table is worse than a mediocre score). Quality tracks curatorial investment, which is the right thing for it to track.

**User trust** — Highest of any model. The reveal can honestly carry "a person chose this," which is precisely the trust a bookseller earns and an engine cannot fake.

**Literary quality** — Strongest. Judgment sits at composition and placement — the literary moments — instead of at scoring, the least literary step.

**Verdict on §3:** the table model is not nostalgia. It is the operating model of an actual bookseller, made durable. Its weaknesses are bandwidth and cold-start, both manageable; its strengths are exactly Bokhyllan's stated identity.

---

## 4. What Is A Table?

A table is **a curator's standing answer to a recognizable human moment, expressed as a small, ordered, hand-composed set of books.** It is not any single existing concept:

- **Is it a category?** No. A category is defined by a property of the *books* (all crime novels). A table is defined by a *reader-moment* and is filled by *judgment*, including books that share no property.
- **Is it a mood?** No. A mood (`melancholic`) is one felt quality. A table may deliberately mix moods — a "sleepless" table might hold something still *and* something absorbing, because the curator knows either could be right.
- **Is it a life situation?** Closest, but no. A life situation (grief, burnout) is a *fact about the reader*. A table is a *response* to such a moment — and the same situation may warrant several tables (grief-that-wants-company vs grief-that-wants-solitude).
- **Is it a recommendation path?** Partly — it is the *destination* of a path, but it is more than routing: it carries ordering, a lead book, and an intentional outlier.
- **Is it a literary shelf?** In spirit, yes — it is the physical bookseller's table near the door, the one with a handwritten card. That is the truest single analogy.
- **Can books belong to multiple tables?** **Yes, essentially.** Overlap is the mechanism that lets a bounded number of tables cover a large corpus, and it mirrors reality: one book is the right gift for several different moments.

**Table vs genre:** genre describes *what kind of book this is* (operational, book-intrinsic). A table describes *who this is for, right now* (relational, reader-facing). A book has one genre and belongs to many tables.

**Table vs theme:** a theme is *what the book explores* (`grief`, `solitude`) — an attribute. A table is *a judgment about which books, in which company, serve a moment* — a composition. Theme is an ingredient a curator uses to find table candidates; the table is the dish.

**Table vs mood:** mood is *one felt register* of a book. A table is *a curated experience* that may span registers on purpose. Mood is a property; a table is a decision.

The crisp formulation: **genre, theme, and mood are attributes of books; a table is an act of curation.** That distinction is the whole argument of this document in one line.

---

## 5. How Many Tables Exist?

The right framing is not "how many books per table" but "how many *recognizable moments* does Bokhyllan serve, and how richly is each stocked." Table *count* should track the diversity of human moments (which is bounded); book *count* per table grows with the corpus.

- **5 tables** — too coarse. Collapses distinct moments ("grief that wants company" and "grief that wants solitude") into one. Under-serves the product's emotional precision.
- **10–15 tables** — the sweet spot for launch and for a long time. Enough to honor the real distinctions Bokhyllan already models (the v1 life-moments + emotion-profiles span roughly this many), few enough for one curator to hold in mind and keep fresh. **Recommended operating range.**
- **20 tables** — viable at 500+ books, as moments get finer (gift sub-cases, returning readers, seasonal). Reachable by *splitting* existing tables as evidence warrants, not by inventing speculative ones.
- **50 tables** — a warning line, not a goal. Fifty hand-maintained, well-stocked tables likely exceeds single-curator bandwidth and risks the same sprawl the taxonomy docs warn about for tags. Reaching 50 should require either multiple curators or strong evidence of 50 genuinely distinct moments.

**At corpus scale:**
- **100 books** — ~10–15 tables, each with ~6–12 books, heavy overlap. Comfortable; this is roughly where the Core 100 in `CORE_LIBRARY_DATASET_SPEC.md` lands.
- **500 books** — ~15–20 tables, deeper stocking, more overlap, occasional table splits. The taxonomies become essential *tooling* to find candidates and audit coverage. Still single-curator-feasible with discipline.
- **1000 books** — ~20 tables, richly stocked, with explicit anti-staleness review cadence. The constraint is review cadence, not table count. This matches the Atlas foundation's conclusion that 1000 books is a *curation-discipline* problem, not a structural one.

**Can it scale?** Yes — because the thing that grows (books) is decoupled from the thing that must stay human-sized (tables). A bounded set of tables over a growing, overlapping corpus is exactly how a real bookshop scales a few front tables over thousands of titles. What does *not* scale is treating every new book as needing its own destination; overlap solves that.

---

## 6. Atlas + Table Hybrid: `Atlas → Table → Book`

Evaluated as a serious candidate architecture: Atlas reads the moment and selects a *table*; the table (curator-ordered) supplies the *book*.

**Advantages**
- Clean separation of concerns: **Atlas understands the human; the table embodies the judgment; the curator owns the books.**
- Keeps the strong, working front door from the Product Spec (intent + capacity) and the strong selection philosophy from the Philosophy Review.
- Atlas's job shrinks to something it can do *well and auditably* — classify a moment into one of ~15 tables — instead of something it does fragilely (score a whole corpus).
- Corpus growth never requires Atlas changes; it requires table stocking. The two evolve independently.

**Disadvantages**
- Two artifacts to maintain (the routing logic *and* the tables), though each is simpler than a tuned scorer.
- Mis-routing risk: if Atlas picks the wrong table, even a perfect table can't recover. Routing quality must be auditable and correctable.
- Tempting to let Atlas "also score within the table," which would smuggle the engine back in through the side door (see §7's boundary).

**Curator authority** — Strong and correctly located: the curator owns *which books, in what order, on which table*. Atlas never overrides this; it only decides which table to open.

**Serendipity** — Preserved and *designed*: the outlier lives in the table by the curator's choice. Atlas does not generate surprise; it delivers the curator's.

**Recommendation quality** — High ceiling (curated tables) with a guardrail floor (capacity can gently reorder within a table so a depleted reader gets the table's lighter lead). Better floor than pure tables, same ceiling.

**Scalability** — Best of the three models. Atlas stays small (bounded tables to classify into); tables scale by stocking; corpus scales freely.

This `Atlas → Table → Book` shape is the serious candidate. The remaining question is what, precisely, Atlas is allowed to do — §7.

---

## 7. The Real Role Of Atlas

If tables exist, Atlas is **not** choosing books, ranking books, or scoring books. Evaluating each candidate role:

- **Choosing a book** — No. That is the table's (curator's) job. If Atlas chooses books, tables are decorative.
- **Ranking books** — No. Ranking is the engine behavior the product refuses (§2).
- **Filtering books** — Only in one narrow, legitimate sense: **capacity as a safety filter / reorder within the chosen table** (never hand a depleted reader the demanding lead). This is a hard constraint, not a ranking.
- **Choosing a table** — **Yes. This is Atlas's primary job.**
- **Understanding intent** — Yes, as the *input* to choosing a table.
- **Understanding capacity** — Yes, as the *input* to the safety reorder within a table.

**Therefore Atlas's role is: read the reader's present moment (intent + capacity) and route to the curator's table best suited to it; then apply capacity as a gentle within-table safeguard. Nothing more.**

This is a demotion of Atlas from *decider* to *usher*, and that demotion is the point. It relocates Atlas's effort to the task it can perform reliably and transparently (moment → table classification, ~15 outcomes) and away from the task that made v1 brittle and would make Model B soulless (corpus-wide book selection). The intelligence that mattered in the Product Spec — interpreting answers into intent and capacity — is fully preserved; only the *final authority* moves from algorithm to curator.

---

## 8. Data Contract Implications

Not designing the contract — only what each architecture would *require*, and how the requirements differ.

**A. If Atlas chooses books directly** (pure scoring / Product Spec)
- Demands **deep, complete, normalized per-book signal**: every book needs reliable `themes`, `moods`, `emotionalEffects`, energy, difficulty — at near-total coverage, or scoring is unfair to under-tagged books.
- The legacy emotional taxonomy and the new `themes`/`moods` vocabularies **must be reconciled into one** before launch (the unresolved blocker from the Product Spec §11).
- *More important:* exhaustive, consistent book metadata; weight governance. *Less important:* any human-authored grouping.
- **Heaviest data burden, and it falls on every book equally.**

**B. If Atlas chooses tables** (table-led / recommended)
- Demands a rich **moment→table mapping** (Atlas's classification inputs) and **curated table definitions** (membership + ordering + the designated outlier + the capacity-aware lead). The judgment lives in the *table artifact*, authored once per table.
- Per-book metadata can be **lighter and incremental**: taxonomies are needed as *curator tooling* to find candidates and audit coverage, not as a complete scoring substrate. A book with thin tags can still sit on a table because a human put it there.
- *More important:* the table artifacts and the intent/capacity classification vocabulary. *Less important:* exhaustive per-book scoring fields and taxonomy reconciliation (helpful, no longer blocking).
- **Lightest per-book burden; judgment concentrated in ~15 artifacts.**

**C. If Atlas chooses candidate sets** (engine produces a pool, then something selects)
- Sits between A and B: needs enough per-book signal to *form* a pool, plus a defined rule for final pick. This is essentially Model B reframed, or the Product Spec's bridge to Model C.
- *More important:* candidate-formation signals + a non-arbitrary final selector (the part v1 botched with `?? candidates[0]`). *Less important:* nothing is clearly relaxed; it inherits A's tagging needs.
- **Useful mainly as a *transitional* shape, not a destination.**

**Key difference:** A and C push the burden onto **every book's metadata** (and force taxonomy reconciliation up front); B pushes it onto **a small set of curated artifacts** and lets per-book metadata mature gradually. For a small team with a growing corpus, B's burden is bounded and front-loadable; A/C's burden grows linearly with the corpus and blocks on a taxonomy decision that isn't ready.

---

## 9. Risks

**Pure Atlas (scoring engine)**
- *Recommendation collapse:* lower than v1 (property-based) **but** re-emerges as "same few high-scoring books win" without an explicit diversity term.
- *Maintenance burden:* diffuse and opaque — weight-tuning no one can audit.
- *Over-automation:* **its native failure mode.** Trends toward fit-maximizing, mood-congruent, schema-legible results (Philosophy Review §3).
- *Loss of curator voice:* curator demoted to data-entry; taste averaged away.
- *Literary flattening:* books that resist tagging sink; the most bookseller-ish inventory is handled worst.
- *Metadata complexity:* **highest** — needs near-complete tags + taxonomy reconciliation before it's even fair.
- *Scaling:* compute scales; *meaning* degrades.

**Pure Table (no Atlas routing — e.g. user picks a table)**
- *Recommendation collapse:* low; overlap spreads exposure.
- *Maintenance burden:* real but legible (per-table).
- *Over-automation:* none — opposite risk.
- *Loss of curator voice:* none.
- *Literary flattening:* none.
- *Metadata complexity:* low.
- *Scaling:* table-count bounded; **but** without Atlas, the burden of finding the right table shifts to the *reader*, which breaks the gentle, low-friction promise (the reader came precisely because they don't know what they want).

**Atlas + Table Hybrid (recommended)**
- *Recommendation collapse:* low — tables overlap, corpus growth widens stocking.
- *Maintenance burden:* moderate, legible, front-loadable; two artifacts but both human-readable.
- *Over-automation:* contained — Atlas can't select books, only tables; the boundary in §7 is the guardrail.
- *Loss of curator voice:* none — authority stays at table composition.
- *Literary flattening:* none — untaggable books still belong via human placement.
- *Metadata complexity:* moderate — taxonomies as tooling, not blocking substrate.
- *Scaling:* best of the three (Atlas bounded, tables bounded, corpus free).
- *New risks specific to it:* (a) mis-routing — needs auditable, correctable routing; (b) stale tables — needs a review cadence; (c) boundary creep — the standing temptation to let Atlas score *within* a table, which must be refused.

---

## 10. Final Recommendation

**Bokhyllan should pursue the `Atlas → Table → Book` architecture, table-led: curated tables are the spine and hold all book-selection authority; Atlas is demoted to reading the reader's present moment and routing to the right table, with capacity as a within-table safeguard only.**

This is a single, decisive direction — not a 50/50 compromise. The compromise would be "score sometimes, curate sometimes." This is not that. **Selection authority is unambiguously human; Atlas is unambiguously a router.** There is one boss (the curator's table) and one usher (Atlas). The Product Spec's scoring engine is rejected as the *selector*; its genuinely good contribution — interpreting answers into intent and capacity — is retained, but pointed at choosing a table instead of a book.

**Why this and not pure scoring (Product Spec):** §2 settles it. Bokhyllan is a bookseller, and a bookseller's authority is judgment, not a fit score. Scoring is competent and commoditized; it manufactures the exact slopes (affiliate creep, mood-congruence, schema-flattening) that the product's own non-goals exist to block. Building the engine means spending the most effort on the least literary step.

**Why this and not pure tables:** the reader arrives *not knowing what they want* — that is the whole premise of the calm front door. Making them pick a table breaks the gentleness. Atlas's moment-reading is genuinely valuable and worth keeping; it just shouldn't be the one making the final literary call.

**Why table-led rather than engine-led hybrid:** in any hybrid there is a question of who wins ties. Here the curator wins, always. That keeps the product honest to its identity. An engine-led hybrid (score, then maybe consult a table) would drift back into §9's over-automation failure within a release or two, because the objective function is always there to be optimized.

**Why it's also the pragmatic choice:** it has the **lowest and most bounded data burden** (§8B), it does **not block on the unresolved taxonomy reconciliation** (taxonomies become tooling, not a launch gate), it **fixes recommendation collapse** the way the corpus docs assume (overlapping curated sets over a growing library), and its maintenance is **legible and chunked** for a small team. It turns the v1 defect — a frozen table-of-one per life-moment — into its strength by letting a curator actually stock and extend those tables.

The success metric changes accordingly, and this is the real reason to choose it: not "did the score converge" but **"would the curator vouch for this hand-off?"** That is the metric of a bookseller, and Bokhyllan is a bookseller.

---

## 11. If We Choose That Direction — Documents To Create First

Before any implementation, code, schema, or screen. In dependency order:

1. **`TABLE_SYSTEM_DEFINITION.md`** — What a table *is* as a product object: anatomy (lead book, members, ordering principle, the designated outlier, the capacity-aware alternative lead), what makes a good vs bad table, and the table-vs-genre/theme/mood boundaries from §4 made canonical. The conceptual foundation everything else rests on.

2. **`TABLE_SET_V1.md`** — The actual launch set of ~10–15 tables: each table's name, the human moment it answers, its intended reader intent + capacity profile, and its relationship to the existing v1 life-moments and emotion-profiles (what's preserved, merged, split). This is the curatorial heart of the product and must be authored, not generated.

3. **`ATLAS_ROUTING_PHILOSOPHY.md`** — How Atlas maps a read moment (intent + capacity) to a table, how ambiguity and uncertainty are handled (especially gift-recipient uncertainty), what the default/overflow table is, and the **hard boundary** that Atlas never selects or scores books within a table. Codifies §7.

4. **`TABLE_CURATION_WORKFLOW.md`** — How a curator composes, orders, reviews, and *retires* tables; the anti-staleness review cadence; how the genre/theme/mood taxonomies are used as *candidate-finding and coverage-audit tooling*; how books are added to tables as the corpus grows. Addresses the §3/§9 workload and staleness risks.

5. **`TABLE_COVERAGE_AND_GAP_MODEL.md`** — How to detect a reader-moment with no good table, how overlap is intended to work, and how coverage is audited as the corpus moves through Core 100 / 500 / 1000. Connects the table model to `CORE_LIBRARY_DATASET_SPEC.md` and `CORPUS_GROWTH_ROADMAP.md`.

6. **`REVEAL_VOICE_UNDER_TABLES.md`** — How the reveal copy honestly carries "a person chose this" without exposing routing internals; how the table's intent shapes (but does not template into) the curator voice; the wall between any internal routing reason and authored copy. Carries forward the voice discipline from the Product Spec §8 and the Atlas foundation.

Only after 1–6 are approved should an **Atlas v2 Data Contract** be drafted — and per the stop condition in `ATLAS_V2_HANDOFF_BRIEF.md`, no Atlas v2 logic is implemented until that contract and these product documents are approved.

---

*End of review. Decision: `Atlas → Table → Book`, table-led, curator-authoritative, Atlas as intent/capacity router. The goal was never the best match — it is the hand-off a reader trusts because a person stands behind it.*
