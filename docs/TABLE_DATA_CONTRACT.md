# Table Data Contract

**The conceptual contract for Bokhyllan's table system — the final product definition that precedes implementation.**

This document defines what a table must contain, what it must never contain, and the rules governing every decision about table composition, membership, and authority. It is written for the curator, the product architect, and the implementation team equally. It does not contain code, schemas, TypeScript, APIs, or database models. It is the agreement that Codex will later implement and that the curator will later maintain.

The authority chain this document encodes: `Atlas → Table → Book`, as decided in `TABLE_MODEL_AND_ATLAS_DIRECTION_REVIEW.md` and canonized in `TABLE_SYSTEM_DEFINITION.md`. Everything in this contract follows from that chain.

---

## 1. Purpose

This contract exists to make the table system implementable without betraying the judgment it was designed to preserve.

The central problem the table system solves — recommendation collapse, described in `TABLE_SYSTEM_DEFINITION.md` and `TABLE_MODEL_AND_ATLAS_DIRECTION_REVIEW.md` — is not primarily a technical problem. It is a product identity problem: Bokhyllan hands books to readers as a bookseller, not as a ranking engine, and the previous architecture had no place for that distinction to live. Tables are where it lives. This contract is the specification of that place.

**What this contract governs:**

- The complete and bounded information that a table must hold
- The information that must never enter a table, and why
- The relationships between tables and the library's existing taxonomic vocabulary (genre, theme, mood, tag)
- The rules by which books enter and leave tables
- The rules governing the lead book — the single most important editorial decision in the table system
- The rules governing book overlap across tables
- The rules governing capacity as a within-table safeguard
- The authority boundaries between Atlas, the table artifact, and the curator
- The concepts that any future implementation must preserve, regardless of technical approach
- The acceptance criteria that determine when a table is ready, and when the table set is ready

**What this contract does not govern:**

- How tables are stored (file format, database shape, runtime objects)
- How Atlas routes to a table (that belongs in `ATLAS_ROUTING_PHILOSOPHY.md`)
- How the reveal copy is authored (that belongs in `REVEAL_VOICE_UNDER_TABLES.md`)
- How a curator manages the workflow of maintaining tables (that belongs in `TABLE_CURATION_WORKFLOW.md`)
- How coverage gaps are detected (that belongs in `TABLE_COVERAGE_AND_GAP_MODEL.md`)

This contract is the *what*. The documents above are the *how*.

---

## 2. What Information a Table Must Contain

A table is defined by nine conceptual components. These are not fields in the technical sense — they are roles that information plays within a table, and every role must be filled before a table is considered complete.

---

### 2.1 Table Identity

A table must be uniquely and durably identifiable. Its identity must be stable across revisions to its content — a table that gains new books, changes its lead, or updates its curator intent is still the same table.

**A table's identity consists of:**

- A **stable identifier** — a unique, human-readable name that persists across all revisions. This name is not the reader-facing display name; it is the internal handle by which the system, the curator, and the routing logic refer to this table. It should be descriptive enough that a new curator can identify the table without reading its full content. Example stable identifiers from `TABLE_SET_V1.md`: `when-something-heavy-has-happened`, `finding-your-way-back`.

- A **version marker** — a signal that the table's content has been revised in a meaningful way. Version markers exist not for software versioning but to support the review cadence described in `TABLE_CURATION_WORKFLOW.md`: a curator reviewing the table set needs to know which tables have been touched since the last review. A version marker is not a score and is not surfaced to the reader.

- A **display name** — the reader-facing or curator-facing name for the table, which may change as the curator refines the framing. Display names are editorial; stable identifiers are operational.

**What identity must NOT contain:**

- A ranking or priority relative to other tables. Tables are not ordered by importance; they are selected by Atlas based on moment-matching.
- Any signal derived from recommendation frequency, click-through, or reader behavior. Identity is purely editorial.

---

### 2.2 Human Moment

The human moment is the reason the table exists. It is the single most important thing to get right because every other decision — which books belong, which book leads, what the table cannot contain — follows from it.

**A human moment is:**

- A present condition a reader is actually in — not a persona, not a taste profile, not a demographic. "I am grieving" is a moment. "Literary fiction readers" is not.
- Statable in one sentence, in plain language, from the reader's perspective. If the curator cannot state it in one sentence, the table is not ready.
- Distinct from the moments neighboring tables answer. The moment must be distinguishable enough that Atlas can choose between this table and its neighbors without ambiguity, and that a reader who arrives at this table via Atlas would recognize their own state.
- A state the reader is in *right now*, not who they generally are. Moments are situational, not characterological.

**A human moment for gift tables** is the buyer's present state, not the recipient's. "I want to give a book but I don't know this person well" is the buyer's moment. The recipient's state is handled by what the buyer reports during the Atlas flow and by how the table is stocked.

**What a human moment is NOT:**

- A genre (not "the reader likes literary fiction")
- A mood (not "the reader feels melancholic")
- A tag match (not "books with the `quiet` mood that this reader might want")
- A theme (not "books about grief for readers who like grief themes")
- A life stage or persona (not "the tired millennial reader")

The distinction matters for implementation: a moment is the *input* to the table system from Atlas; a genre/mood/theme is metadata belonging to books. These are different kinds of information and must remain separate in any implementation.

---

### 2.3 Purpose

The table's purpose is its standing answer to the human moment — the translation of the moment into a curatorial commitment.

**A purpose statement must:**

- Be articulable as a single hand-off sentence: "For someone who [moment], offer [the kind of response that meets it]."
- Name the kind of response the table makes, not just the books it holds. A grief table's purpose is not "books about grief" — it is "to meet the reader before moving them, with honesty rather than comfort."
- Be authored by the curator and reviewed against the moment. If the purpose could describe a different table, it is not specific enough.

**Purpose differs from the human moment:**

The moment is the condition Atlas reads toward. The purpose is the curatorial stance the table takes toward that condition. A reader in acute grief (moment) needs to be met rather than resolved (purpose). These are different claims and must be expressible separately.

**The purpose is internal doctrine.** It is not reader-facing copy. It is what the curator checks the table against during review, and what a future curator reads to understand why the table was composed as it was. It is the answer to "why these books?" before looking at any specific book.

---

### 2.4 Curator Intent

Curator intent is the recorded reasoning that justifies the specific composition of a table — not just what kind of response the table makes (that is purpose), but *why these books, in this company, in this order, make that response well*.

**Curator intent must:**

- Be specific enough that a future curator can distinguish a correct composition from an incorrect one by reading it. "These are good grief books" is not curator intent. "This table emphasizes witness over consolation — it does not promise recovery, and every book here knows the difference between sitting with grief and managing it" is curator intent.
- Capture the compositional logic: why the lead book was chosen over equally plausible alternatives, why the surprise book belongs despite its apparent mismatch, what register the table is deliberately spanning, what the table is deliberately not doing.
- Be stable across minor revisions. Curator intent is not updated every time a book is added or removed; it is updated when the table's fundamental judgment shifts.

**Curator intent is the most important thing to record at composition time**, because it is also the most vulnerable to being lost. When a curator changes, or when a table is reviewed months later, the intent is what distinguishes a deliberate compositional choice from an oversight. Without it, reviewers cannot tell whether a book's presence is meaningful or accidental.

---

### 2.5 Lead Book

The lead book is the curator's confident first answer to the human moment — the single book the table hands over when a reader arrives and nothing else is known about them beyond the moment Atlas identified.

**The lead book must:**

- Be the curator's genuine first choice, not a compromise or a safe default. "First choice" means: if a reader walked into a bookshop in this moment and the curator could give them one book, this is the one they would reach for.
- Be defensible in public. The curator must be able to say, to any reader in this moment, why this book is the right one — not "it scored well" or "it tags cleanly," but a human reason in the register of the hand-off.
- Be appropriate for the capacity range of readers likely to arrive at this table. The lead book should not be the table's most demanding member unless the table's moment inherently attracts high-capacity readers. If the moment typically attracts depleted readers (grief, burnout), the lead should be accessible to a depleted reader.
- Be a single book — not a list, not a rotation, not a conditional. There is one lead at any given time.

**The lead book has three roles simultaneously:**

1. It is the default recommendation — what a reader receives when Atlas routes them here.
2. It is the editorial statement — what the curator is saying the moment calls for.
3. It is the anchor — the book other members of the table are measured against in terms of register, capacity, and purpose. "Does this book belong in the company of the lead?" is a legitimate membership question.

---

### 2.6 Supporting Books

Supporting books are the "or, if not that, this" — the books standing behind the lead that the table can offer in subsequent visits, in re-routes, or when the lead is genuinely unavailable (no affiliate link, reader has already read it, etc.).

**Supporting books must:**

- Genuinely serve the same moment as the lead. Not "books adjacent to the moment" or "books that overlap thematically" — books the curator would actually hand to a reader in this moment if the lead were already in their hands.
- Be placed by the curator, not derived from metadata. A book with matching themes is a *candidate* for the supporting set; it becomes a supporting book only after curatorial judgment confirms it.
- Number enough to give the table meaningful depth. A table with one lead and one supporting book is too thin — it cannot serve a re-route and has no room for capacity variation. `TABLE_SET_V1.md` establishes 8–12 books as the working target per table at 100-book corpus; not all of these are supporting books, but most are.

**What supporting books do NOT do:**

- They do not form a ranked list. The supporting books are ordered by the curator, but their order is a compositional choice (the natural next book after the lead, not a descending-fit ranking). Position in the supporting set is not a score.
- They do not all need to serve the moment identically. Some supporting books may serve a slightly different register of the moment (grief-that-wants-company vs. grief-that-wants-honesty), which is what gives the table range. The moment remains one; the responses within it vary.

---

### 2.7 Alternative Books

Alternative books are a narrower category within the table's membership — books held specifically for *capacity variation* and *taste variation* within the same moment.

**The distinction between supporting and alternative books:**

- A **supporting book** is another curator choice for the same moment — a different path to the same response.
- An **alternative book** is held specifically because the curator knows this particular reader variation needs a different entry point. The most important case: the alternative lead for a very depleted reader, which is often shorter, simpler, or less emotionally demanding than the standard lead.

**A table should identify at minimum:**

- One alternative for readers arriving with very low capacity, even when the lead book is already accessible. This alternative may be shorter, simpler in prose, or more episodic. It is the curator's answer to "what if they truly have nothing left?"
- Where capacity significantly changes the right entry point, this should be named. The curator should be able to say, "For this moment with low capacity, start with [X]; with medium or high capacity, start with [lead]."

**Alternatives are a capacity safeguard, not a ranking.** The alternative book is not the "worse version" of the lead — it is the right book for a specific sub-condition within the moment. The curator should be able to defend the alternative with the same confidence as the lead.

---

### 2.8 Surprise Book

Every table must contain at least one surprise book — a book included specifically because it does not obviously belong, and which a scoring system could never produce.

**The surprise book is the structural guarantee that the table system is not a category.** A category contains members derivable from properties. A table contains a surprise that is not derivable from any property — it is there because a curator's judgment recognized something that the book's metadata does not capture.

**The surprise book must:**

- Be placed with a named reason — the curator must be able to say, not just "I think this works," but *why* this wrong-on-paper book is right for this moment. The reason should be something no tag or score could encode: a quality of indirection, an unexpected angle on the moment, the way a reader in this state will experience this particular book differently than any other reader would.
- Serve the moment, though not obviously. The surprise is not arbitrary — it is a defensible surprise. "I know this looks like the wrong book but here is why it is exactly right for a reader in this state" is the form of the reason.
- Be genuinely surprising relative to the table's obvious membership. If a curator cannot identify the surprise book, the table contains no bookseller's act — only the obvious choices.

**The surprise book is what makes a table a recommendation worth trusting.** A reader who receives a surprise book and feels the curator was right — that is the experience no engine can produce. It is the experience that brings a reader back to Bokhyllan specifically.

---

### 2.9 Capacity Guidance

Every table must hold a capacity profile — the curator's knowledge of how the moment's typical capacity range should affect which book is offered.

**Capacity guidance consists of:**

- A **typical capacity characterization** for readers arriving at this table. Grief and burnout tables attract depleted readers; depth-seeking tables attract high-capacity readers; most tables attract a range.
- A **low-capacity entry point** — which book or which configuration of books the table leads with for a reader who has declared very low reading energy. This is almost always a shorter, more accessible book than the standard lead.
- A **high-capacity entry point** — which book or configuration rewards full attention. Some tables have a natural high-capacity recommendation that differs meaningfully from the lead; others simply allow the lead to stand because it works at full capacity too.
- Any **capacity ceiling** — a note when certain books on the table should not be offered to very depleted readers even as alternatives, because they demand too much. Not every book on every table needs this note; it is only necessary when the gap between a book's demand and the depleted reader's capacity is large enough to cause harm (the reader abandons it and loses trust in Bokhyllan).

**Capacity guidance is a within-table safeguard.** It exists to ensure that a depleted reader does not receive a demanding book simply because that book is the table's standard lead. It never re-routes the reader to a different table — that would be Atlas's job, and Atlas has already done it. Capacity guidance only adjusts *where within the table* the reader enters.

---

## 3. What Information Does NOT Belong in a Table

Equally important to what a table must contain is what it must never contain. These exclusions are not conventional constraints — they are identity constraints. Including these things would change what a table *is*, making it something other than a curator's standing answer to a human moment.

---

### 3.1 Ranking Scores

No book on a table has a score. Books are not ranked within a table by fit, popularity, quality, or any other numeric signal. The ordering of books within a table is a curatorial choice — the curator's sense of natural sequence and compositional flow — not the output of a ranking function.

**Why:** Ranking is the engine's mechanism. Introducing scores at the table level would smuggle the engine back in through the side door that `TABLE_SYSTEM_DEFINITION.md` §11 warns against. A table with ranked books is a category with a scoring function, not a curator's composition.

---

### 3.2 AI Confidence Values

No book's placement on a table is associated with a confidence value, a match probability, or any signal derived from an AI system's assessment of fit. If a book is on a table, it is there because a curator placed it. The confidence that matters is the curator's confidence, and it is expressed by the presence of the book and the curator intent statement, not by a number.

**Why:** Confidence values create a shadow ranking — a second order of fit signal that would be impossible for the curator to review or override in practice. They also misrepresent the nature of curatorial judgment: a curator does not place a book at 87% confidence; they place it because they believe it belongs.

---

### 3.3 Recommendation Weights

No element of a table carries a weight that affects how likely a book is to be surfaced by Atlas or by any future runtime logic. Tables have no internal weighting system. Atlas routes to a table; the table's lead book is what surfaces — full stop.

**Why:** Weights are the Product Spec's scoring engine reassembled inside the table. `TABLE_MODEL_AND_ATLAS_DIRECTION_REVIEW.md` §7 makes clear that any within-table scoring smuggles the engine back and must be refused. Capacity guidance is the only within-table adjustment permitted, and it is a safety reorder, not a weight system.

---

### 3.4 Analytics Fields

Tables do not contain click-through rates, save rates, dismissal rates, recommendation frequency counts, or any behavioral signal derived from reader interactions. These signals are not inputs to table composition and are not permitted to become inputs.

**Why:** `TABLE_SYSTEM_DEFINITION.md` §8 states explicitly that behavioral metrics are not quality standards. A table that holds conversion data would eventually be revised toward conversion, which converts the curator into an optimizer and the bookseller into a funnel. This is one of the three drifts the Philosophy Review identifies as fatal to the product's identity.

A table is reviewed by asking: would the curator vouch for this hand-off? Not: did click-through rise?

---

### 3.5 Affiliate Influence

No book's presence on a table is affected by whether affiliate metadata (ISBN, Bokus URL, Tradedoubler link) is available for it. Affiliate availability is operational metadata — it determines whether a purchase link can be rendered, not whether a book belongs on a table.

**Why:** `ATLAS_V2_HANDOFF_BRIEF.md` states explicitly that affiliate availability must not determine which book is recommended. This is a hard boundary repeated in `AFFILIATE_STRATEGY.md` and the affiliate safety audit. A book that belongs on a table belongs there regardless of whether a link can be generated. If a link is unavailable, the UI handles it; the table does not.

---

### 3.6 Personalization Signals

Tables do not contain reader-specific information. A table is not customized per reader; it is composed for a moment that any reader can be in. Reader history, saved books, previous recommendations, dismissal signals — none of these are table properties.

**Why:** Personalization at the table level would require tables to become dynamic per-reader objects, which destroys their property of being auditable curator artifacts. The same table is the same hand-off for every reader who arrives at the same moment. Personalization, if it ever enters Bokhyllan, belongs in a separate governance and privacy discussion, not in the table contract.

---

### 3.7 Marketing and Commercial Labels

Tables do not contain bestseller status, award designations, availability status, price points, stock levels, publisher relationships, or any commercial signal. These are not curatorial properties and have no role in a table's composition.

**Why:** Their presence would conflate the product with a retail catalog, which is exactly the product identity Bokhyllan's refusals are designed to prevent. A book that is on a bestseller list and a book that is not are evaluated identically by the curator: does this book serve this moment?

---

## 4. Relationship Between Table, Book, Genre, Theme, Mood, and Tag

These six concepts occupy different positions in the system's conceptual architecture. Confusing them is the most common failure mode in building a system like this, and several prior documents trace specific risks back to exactly this confusion. This section establishes the relationships with precision.

---

### 4.1 The Fundamental Distinction

The entire relationship structure rests on one line from `TABLE_SYSTEM_DEFINITION.md`:

**Genre, theme, mood, and tag are attributes of books. A table is an act of curation about readers.**

This is not a stylistic distinction. It is an architectural one. Attributes belong to objects (books). Acts of curation belong to relationships (curator + moment + books). These are different kinds of things and cannot be collapsed without losing what makes tables tables.

---

### 4.2 Table → Book

The relationship between a table and a book is **membership by curatorial placement**.

A book is a member of a table because a curator judged that it serves the table's moment. Not because its attributes match the table's description. Not because a query returned it. Because a person who knows the book and knows the moment decided this book belongs in this company for this reader.

**Key properties of this relationship:**

- One book can be a member of many tables (see §7, Overlap Rules).
- The *role* a book plays differs across the tables it belongs to. A book that leads one table may support another and serve as the surprise on a third. The role is part of the relationship, not just the membership.
- Membership is a binary state: a book is on a table or it is not. There is no partial membership, no probabilistic membership, no weight of membership.

---

### 4.3 Book → Genre

The relationship between a book and its genre is **classification by intrinsic property**.

Genre answers: what broad kind of book is this? (`GENRE_TAXONOMY_V1.md`). A book has one primary genre and at most two or three in total. Genre is operational metadata — it supports corpus balance, validation, and candidate-finding. It does not determine table membership.

**Genre's role in the table system:** Genre is a *candidate-finding instrument* for curators. When stocking a new table, a curator may query by genre to find books worth considering. Genre proposes; the curator disposes. No table is a genre collection, and no genre determines table membership.

---

### 4.4 Book → Theme

The relationship between a book and its themes is **description of what the book explores** (`THEME_TAXONOMY_V1.md`).

Themes name the human subjects a book carries: grief, memory, belonging, solitude. They are deeper than genre (a genre describes form; a theme describes content) and more specific than mood (a theme is what the book is about; a mood is how it feels). A book's themes are stable across readings; they describe the book's substance.

**Theme's role in the table system:** Themes are the *primary candidate-finding instrument* for curators building tables around human moments. A grief table's curator naturally begins by querying books with the `grief` and `loss` themes. But the table is never "all books with theme: grief." A curator may include a book with no grief theme at all if it serves grieving readers better than any book that names grief directly. And they may exclude grief-themed books that name grief without understanding it.

Themes propose candidates; they never constitute tables.

---

### 4.5 Book → Mood

The relationship between a book and its mood is **description of the reading experience's felt register** (`MOOD_TAXONOMY_V1.md`).

Mood answers: what does it feel like to read this book? (`still`, `melancholic`, `luminous`, `expansive`). Mood is reader-facing and experiential — it describes the inner weather a book creates.

**Mood's role in the table system:** Mood is a *refinement and texture instrument* for curators. It helps a curator ensure a table has the right range of felt registers for its moment, and to find a book of a specific atmosphere when one is missing. When stocking a grief table, the curator may use mood to check: does this table have room for the reader who needs `comforting` as well as the reader who needs `austere`?

Mood is also a *within-table safety check* for capacity guidance: very depleted readers often cannot receive dark or austere books, so the curator uses mood awareness to identify the gentler entry points.

Mood never determines table membership independently. A book is not on a table because its mood matches the table's dominant atmosphere.

---

### 4.6 Book → Tag

The relationship between a book and its tags is **operational descriptor** — form, accessibility, length, texture, or use-case notes that do not belong in genre, theme, or mood.

Tags are the most flexible of the four taxonomy types and the most governed (they must not expand casually). As of this contract, the tag taxonomy is not yet defined; `ATLAS_V2_HANDOFF_BRIEF.md` defers tags until a controlled vocabulary exists.

**Tag's role in the table system:** Tags are a *candidate-filtering instrument* for curators — specifically useful for finding the *alternative* and capacity-entry books on a table. A curator building the low-capacity alternative slot might query for books tagged as short, accessible, or fragment-friendly.

Tags never determine table membership independently. Their primary use in the table system is practical filtering during the composition process, not selection authority.

---

### 4.7 The Curator's Use of All Four

The curator uses genre, theme, mood, and tag as *instruments for finding candidates and auditing coverage* — never as the mechanism that places a book on a table. The four types of metadata together form the curator's instrument panel: genre tells them what kind of inventory they have, themes tell them what human concerns are represented, mood tells them what registers are available, tags tell them which books are accessible.

None of the four instruments selects books for tables. The curator does.

---

## 5. Table Membership Rules

### 5.1 How Books Enter Tables

**The only way a book enters a table is through curator placement.** There is no automatic membership, no query that populates a table, no tag combination that grants membership. A curator reads the book, reads the table's purpose and curator intent, and makes a judgment: this book belongs here.

**The questions a curator must be able to answer affirmatively before placing a book:**

1. Does this book genuinely serve the moment this table answers — not adjacent to it, but the same moment?
2. Can I say why this book belongs in the company of the other books already on this table — not just that it is good, but that it fits this particular composition?
3. If this book is the lead, would I hand it to a reader in this moment and stand behind it?
4. If this book is a supporting member, would a reader who was re-routed to this book after the lead find it a fair continuation of the same hand-off?
5. If this book is the surprise, can I name the reason it belongs despite its apparent mismatch?

A book that cannot pass all applicable questions should not be placed. Passing three of five is not sufficient.

**Metadata is not a substitute for the placement judgment.** A book whose themes, moods, and genre all suggest it belongs on a table is a *candidate* for that table. It becomes a member only when a curator has confirmed the judgment by reading or deeply knowing the book.

**A book can enter a table at any stage of the table's life.** Tables are stocked as the corpus grows — a book authored at the Core 100 stage may join additional tables at the Core 500 stage. There is no time constraint on membership decisions, only a quality constraint.

### 5.2 How Books Leave Tables

Books leave tables in three circumstances:

**1. Curatorial revision.** The curator reviews the table and determines that a book no longer serves its moment as well as it once did — a better member has arrived, the book was placed in error, or the table's composition has shifted and the book no longer fits the company. This is the healthy, ordinary path of table maintenance.

**2. Book retirement from the corpus.** If a book is retired from Bokhyllan's library (for reasons unrelated to tables), it leaves all tables automatically. Its departure should trigger a table review to ensure the affected tables remain adequately stocked, particularly if the retired book was a lead or surprise.

**3. Table retirement.** If a table is retired, its books do not disappear — they remain in the corpus and may be placed on surviving or new tables. Table retirement removes the table; it does not remove the books from Bokhyllan.

**What does NOT trigger book removal:**

- Low recommendation frequency. A book that has not been recommended recently is not thereby wrong for its table.
- Poor affiliate link performance. Whether a book generates clicks or purchases has no bearing on its table membership.
- Changes to the book's metadata (themes, mood). A book's curatorial placement is independent of its metadata; metadata changes do not retroactively alter table membership.
- A new book's arrival. A new, better book for a moment may displace the lead, but it does not automatically remove existing members.

---

## 6. Lead Book Rules

The lead book is the most important editorial decision in the table system. These rules govern when it should change and when it must not.

### 6.1 When the Lead Book Should Change

**The lead should change when a better first answer to the moment has been identified.** This requires the curator to be able to say: "This book is a better first-hand-off for this moment than the current lead, for these reasons." Better means: more exactly right for the moment, more accessible to the typical reader's capacity, more honest in the hand-off, more surprising in the way the moment calls for.

**The lead should also change when:**

- The current lead has become too familiar — if Bokhyllan has been recommending it for long enough that many returning readers have already received it, a new lead ensures re-visiting readers find something fresh.
- The current lead no longer holds up against the table's composition. As supporting books are added, the table's compositional judgment evolves. Occasionally, the best first-hand-off shifts: what was the right lead at 8 books per table may not be the right lead at 15.
- The moment itself has been refined (through table splitting or the development of routing philosophy), such that the lead no longer precisely serves the refined moment.

**The lead change must be a curator decision**, stated with a reason. It is not triggered by any metric, frequency count, or automatic process.

### 6.2 When the Lead Book Must NOT Change

**The lead must not change:**

- Because of recommendation frequency data. A book that has been recommended often is not wrong because it was recommended often.
- Because of affiliate link availability. If the lead book's affiliate link breaks, the fix is to repair the link or surface an alternative; the lead itself does not change.
- Because a new book arrives and seems superficially similar. Arrival of a similar book is a reason to consider whether the new book is better; it is not itself a reason to change.
- In response to reader behavior signals (saves, dismissals, clicks). Behavioral signals are explicitly outside the quality standard for tables.
- To increase coverage of some other metric (Swedish authors, new titles, books with better metadata). These are valid curatorial concerns, but they are resolved by adding supporting books, not by changing the lead to one that fits a coverage grid.

**The lead must not change without a stated curatorial reason.** Even if the change is correct, the reason must be written down — it is what a future reviewer uses to understand the table's compositional history.

---

## 7. Overlap Rules

### 7.1 When Books May Appear on Multiple Tables

Books may — and in a healthy system, most strong books *will* — appear on multiple tables. Overlap is the mechanism that allows a bounded number of tables to serve a growing corpus. It mirrors the reality that one book can be the right answer to several genuinely different moments.

**Overlap is permitted and healthy when:**

- The curator can articulate a distinct reason the book belongs on each table it appears on. A book on three tables should have three separate curatorial reasons, each grounded in the specific moment and composition of each table.
- The book plays a different *role* on different tables. A book that leads one table, supports another, and serves as the surprise on a third is playing three genuinely different roles — that is not duplication, it is the same book being many things to many moments.
- The overlap serves the corpus-coverage function: a book appearing on multiple tables is how corpus growth reaches readers across many moments without requiring the curator to build an infinite number of distinct tables.

### 7.2 When Overlap Becomes a Problem

Overlap becomes unhealthy when:

- A book appears on many tables without distinct reasons — when the answer to "why is this on Table 7?" is "it seems generally good." That is stuffing, not overlap.
- A small number of books appear on nearly every table. A book that fits every moment fits none — the same flattening `THEME_TAXONOMY_V1.md` warns against for themes.
- The lead book on multiple tables is the same book. A single lead across many tables is either a sign that moments are not sufficiently distinct (the tables should be merged) or that the curator is defaulting to a safe choice rather than a specific one.

**The health test:** for every table a book appears on, a curator should be able to state in one sentence why it is on *this* table, in terms of *this* moment — not "it's a great book," but "for a reader in this specific state, this book serves because..."

### 7.3 Overlap and the Surprise Slot

A book that serves as the surprise on one table should generally not serve as the surprise on another. The surprise slot is by definition the wrong-on-paper choice — a book that surprises for one moment is doing so by being unexpected relative to that moment. If it appears as the surprise on a second table for a different moment, the same indirection logic may not apply, and the result may be a surprise that is merely random rather than a deliberate judgment. Curators should review cross-table surprise placements with particular care.

---

## 8. Capacity Rules

### 8.1 What Capacity Must Do

Capacity is a within-table safeguard. Its job is to ensure a reader who arrives depleted does not receive a book that demands more than they can give.

**Capacity must:**

- **Reorder within the table.** A depleted reader routes to the same table as a high-capacity reader who shares the same moment. Capacity then adjusts which book is offered first — the lower-energy alternative for the depleted reader, the standard lead (or a more demanding member) for the high-capacity reader.
- **Be acknowledged in the table's capacity guidance** (§2.9). The curator must know which books on the table are appropriate for which capacity levels.
- **Respect the moment first.** A grief reader with very low capacity still belongs on the grief table — capacity adjusts the entry point, it does not change the destination.

### 8.2 What Capacity Must Never Do

Capacity must never:

- **Re-route a reader to a different table.** If a reader's declared moment maps to the grief table and their capacity is very low, the answer is the grief table's low-capacity entry — not a re-route to the burnout table because it holds shorter books. The moment determines the table; capacity determines the entry point within it.
- **Rank books by "capacity-fit."** Capacity guidance identifies specific books for specific capacity levels, but this is a curator's named identification, not a scoring function. The system does not calculate which book has the best capacity score for this reader.
- **Override curator composition.** If the curator's lead book is demanding and a depleted reader arrives, the system offers the curator's named low-capacity alternative — but the lead remains the lead. The curator's judgment is not overridden; it is extended to cover the capacity case.
- **Become a proxy for quality.** "This book is only appropriate for high-capacity readers" is not a quality judgment. It is a recognition that the book demands attention in order to give what it gives. Short books are not lesser books.

---

## 9. Curator Authority Rules

The table system has three agents, each with distinct authority. Confusing their roles is a failure mode.

### 9.1 Atlas's Authority

**Atlas decides:** which table to route a reader to, given the reader's declared moment (intent + capacity as classified through the Atlas flow).

**Atlas also decides:** where within a table to enter, in the limited sense that Atlas applies the table's capacity guidance to select the appropriate entry point (lead or low-capacity alternative).

**Atlas does not decide:** which book the reader receives — that is the curator's decision, embodied in the table. Atlas opens the table; it does not pick the title. This boundary is the single most important boundary in the system.

**Atlas may not:** score books within a table, rank books within a table, select books from outside the table's membership, override a table's lead, or apply any signal beyond intent and capacity to the selection.

### 9.2 The Table's Authority

The table is the curator's decision made durable. Its authority is that of the curator at the moment of composition — it persists until the curator revises it.

**The table decides:** what the reader receives, via its lead book (or capacity-adjusted alternative). The table does not decide dynamically; it embodies a standing decision.

**The table's authority is complete within its domain:** given a reader Atlas has routed to it, the table's lead book is the recommendation. No other agent can override this without the curator's intervention.

### 9.3 The Curator's Authority

The curator is the ultimate authority in the system. All selection authority resides here; Atlas and the table are instruments through which curatorial judgment is exercised at scale.

**The curator decides:** everything about a table's composition — which books are members, which book leads, which book surprises, what the capacity guidance is, and what the curator intent statement says.

**The curator also decides:** when a table should be created, when it should be split, when it should be merged, and when it should be retired.

**The curator does not decide in the moment.** The curator's decisions are made in advance and embodied in the table. The recommendation happens without the curator's live involvement — which is the whole point of the table model: curator judgment at scale, without the curator being present for every recommendation.

**The curator is the final reviewer.** No behavioral signal, no metric, no automated process can override a curatorial decision without the curator's review. If a behavioral signal suggests a book is performing poorly, the curator reviews it — and either agrees (revising the placement) or disagrees (leaving the placement unchanged and concluding the signal is misleading). The signal is advisory; the curator is decisive.

### 9.4 Authority Boundaries in Summary

| Decision | Atlas | Table | Curator |
|---|---|---|---|
| Which table to route to | ✓ | — | — |
| Which book the reader receives | — | ✓ | — |
| Which books are on the table | — | — | ✓ |
| Which book leads | — | — | ✓ |
| Which book is the surprise | — | — | ✓ |
| Capacity entry point within table | ✓ (applies curator guidance) | — | ✓ (authors the guidance) |
| Table creation and retirement | — | — | ✓ |
| Table splits and merges | — | — | ✓ |
| Lead book revision | — | — | ✓ |
| Book placement and removal | — | — | ✓ |

---

## 10. Future Runtime Considerations

This section describes the concepts that any future implementation — regardless of technical approach, language, framework, or infrastructure — must preserve. These are not implementation requirements; they are identity requirements. An implementation that preserves these concepts is Bokhyllan's table system. One that violates them is something else.

---

### 10.1 Tables Are Authored, Not Generated

The runtime must treat table content as authored artifacts — data that a human created and that represents a human judgment. Tables are not generated from book metadata, not assembled by query, not computed at runtime. They are loaded, not derived.

Whatever form tables take in the runtime — files, database records, objects — they must originate from a curatorial authoring process and be carried into the runtime as the output of that process, not reconstructed within it.

### 10.2 The Lead Book Is a Named Decision

The runtime must represent the lead book as a specific, named curator decision — a field that holds one book identity, authored by a curator, which the runtime treats as the answer for this table. The lead is not the highest-scoring member; it is the designated answer.

Any future feature that would allow the runtime to "choose a better lead" based on any signal would violate this contract. The runtime does not choose leads. It delivers them.

### 10.3 Capacity Guidance Is Applied, Not Computed

When the runtime handles capacity, it applies the curator's named guidance — the curator-identified low-capacity alternative, the curator-identified demanding variant — it does not compute a capacity score for each book and select the best-scoring one. The distinction matters: applying guidance preserves curatorial judgment; computing scores replaces it.

### 10.4 Table Membership Is a Closed Set at Any Point in Time

At any point in time, a table has a specific, finite set of member books. The runtime does not expand or contract this set dynamically based on the current corpus, the reader's history, or any signal. The set is what the curator has placed. If a new book should join the table, the curator adds it; the runtime does not.

### 10.5 Atlas Never Selects Books

The runtime must enforce that Atlas's output is a table selection, not a book selection. Whatever data structure Atlas produces, it must name a table — not a book, not a ranked list of books, not a candidate set. The book surfaces from the table, and the table is what Atlas selects.

If a future implementation is tempted to have Atlas "produce a shortlist of candidates and then pick the best one from the target table," that is the Product Spec's scoring engine reassembled inside the architecture, and it violates this contract.

### 10.6 Surprise Is Preserved

The runtime must have a way to surface the curator's designated surprise book. It must not suppress the surprise because the surprise "scores lower" or "matches less well" by any within-table evaluation. The surprise is a named slot in the table; its purpose is to be offered occasionally, per the curator's intent. If the runtime never surfaces it, the table's deliberate serendipity is lost.

### 10.7 No Behavioral Signal Enters the Table Artifact

The runtime may collect behavioral signals (with appropriate privacy governance), but those signals must not write back into the table artifact. A table that has been modified by recommendation frequency or click data is no longer an authored curatorial artifact — it is a hybrid that represents some fraction of the curator's judgment and some fraction of the engine's. The table must remain purely what the curator made it.

### 10.8 Affiliate Availability Is Runtime State, Not Table State

The runtime may know which books currently have affiliate links available. This knowledge must never enter the table artifact and must never affect which book within a table is surfaced as the recommendation. Affiliate handling is a display concern — once a book has been selected from a table, the runtime checks whether a link can be provided. The selection itself is affiliate-blind.

### 10.9 The Curator's Intent Statement Is Preserved and Readable

Future implementations must preserve the curator intent statement as a readable, human-authored text associated with each table. It must be accessible to future curators during table review. It is not a user-facing field and should not be exposed in the reader-facing UI, but it must not be treated as disposable metadata that can be dropped for space efficiency or normalized into a tag.

### 10.10 The Table System Is Legible to One Person

Any future implementation must remain legible to a single curator who reads the table artifacts directly — without a dashboard, without an analytics system, without a weight-inspection tool. The curator must be able to read a table, understand why it is composed as it is, identify whether it is correct, and modify it. If the implementation makes this impossible, it has exceeded the contract's bounds.

---

## 11. Acceptance Criteria

A table is **ready** when:

- Its stable identifier is unique within the table set.
- Its human moment is stated in one sentence, from the reader's perspective, as a present condition.
- Its purpose is stated as a curator hand-off commitment.
- Its curator intent statement explains the compositional logic in enough detail that a future reviewer can tell a deliberate choice from an oversight.
- It has a designated lead book, and the curator can defend it.
- It has at least one designated surprise book, and the curator can name the reason.
- It has at least one named low-capacity alternative.
- It has at least 6 member books total (with 8–12 being the working target at Core 100 corpus).
- Every member book has been placed by curator judgment, not metadata match.
- The curator can state in one sentence how this table's moment differs from each neighboring table's moment.

A table set is **ready for implementation** when:

- Every table in the set meets the individual table readiness criteria above.
- No two tables have moments that are indistinguishable in one sentence.
- The set covers the human moments identified in `TABLE_SET_V1.md` (the ten tables, in build-priority order).
- Every table's capacity guidance identifies a low-capacity entry point.
- The gift tables (Tables 7 and 8 in `TABLE_SET_V1.md`) are verified to not draw from an identical book set — they share books but are not identical.
- The set has been reviewed as a whole against the corpus: every table has enough members, no table is dangerously thin, and the corpus's strongest books appear on more than one table.

A table data contract implementation is **acceptable** when:

- It preserves all ten runtime concepts in §10.
- No table can be modified by any runtime signal — tables are read-only artifacts from the runtime's perspective.
- Atlas's output is a table selection, never a book selection.
- The lead book is served directly from the table's named lead field, not computed.
- The surprise book is surfaced periodically, not suppressed.
- Affiliate availability does not affect which book is selected.
- Capacity guidance is applied as the curator authored it, not computed.
- A curator can read every table artifact directly without tooling.

---

## 12. Recommended Next Step

**Create: `docs/TABLE_RUNTIME_MODEL_V1.md`**

This contract has defined the *what*. The runtime model defines the *how* — the conceptual translation of this contract into a form that Codex can implement.

`TABLE_RUNTIME_MODEL_V1.md` should define:

**The shape of a table as a runtime object** — what fields exist, what types they carry (described in plain English, not TypeScript), and what each field's constraints are. This is the bridge between this contract's conceptual roles (lead book, surprise book, capacity guidance) and the specific representation an implementation will use.

**The relationship between the table runtime object and the book runtime object** — how a table holds references to books, what form those references take, and how the runtime resolves a table to a specific book recommendation.

**The routing interface** — what information Atlas sends to the table system (a table identifier, a capacity indicator), and what the table system returns (a recommended book, with role context: lead, alternative, surprise). This is not the Atlas implementation; it is the table system's side of the boundary.

**The authoring format** — how a curator authors and edits a table. This may be a file format, a structured template, or a simple document structure. It must be human-readable without tooling.

**The validation rules** — the machine-checkable subset of the acceptance criteria in §11: uniqueness of identifiers, presence of required fields, minimum member count, non-empty lead book, non-empty surprise designation.

**What `TABLE_RUNTIME_MODEL_V1.md` must not do:**

It must not design the Atlas routing logic (that is `ATLAS_ROUTING_PHILOSOPHY.md`). It must not design the reveal copy format (that is `REVEAL_VOICE_UNDER_TABLES.md`). It must not design the curation workflow (that is `TABLE_CURATION_WORKFLOW.md`). The runtime model is specifically and only the table artifact and the narrow interface through which Atlas selects from it.

**Why this is the right next step:**

This contract gives Codex the product agreement. The runtime model gives Codex the implementation target. Without the contract, the runtime model has no authority to rely on. Without the runtime model, Codex cannot build. The sequence is correct: contract first, runtime model second, implementation third.

The stop condition from `ATLAS_V2_HANDOFF_BRIEF.md` — no Atlas v2 logic implemented until the data contract and product documents are approved — is satisfied when this contract and `TABLE_RUNTIME_MODEL_V1.md` are both approved. This contract is one half of that stop condition.

---

*End of contract. This is the product agreement for Bokhyllan's table system. It governs what tables are, what they contain, and what they must never become. The curator holds the authority this contract describes. The implementation serves it.*
