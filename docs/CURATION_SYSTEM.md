# Curation System

Bokhyllan recommends from a small, hand-curated literary library. The system is deliberately emotional before it is commercial or algorithmic.

## Structure

- `data/library/books/bookTypes.ts` defines the book model.
- `data/library/books/books.ts` contains the curated corpus.
- `data/library/taxonomy/*` contains the emotional taxonomy.
- `data/library/mappings/recommendationRules.ts` contains human-readable recommendation rules.

## Taxonomy

The taxonomy describes reading moments, not market categories.

- Emotional tones: still, warm, clear, melancholic, immersive, hopeful, restless, quietly funny, tender, haunting.
- Reading states: emotionally tired, wants comfort, needs perspective, wants immersion, recovering, grieving, searching for calm, wants intellectual clarity, lonely, overstimulated, restless, ready for depth.
- Pacing: slow, steady, absorbing, demanding, lightweight, deep.
- Effects: calms, comforts, clarifies, keeps company, opens perspective, deepens feeling, restores attention, makes room for grief, awakens wonder.

## Recommendation Rules

Rules are curated judgments written as simple conditions. They should remain readable by a human curator:

```ts
if (flow === "self" && answers.longing === "stillsamt") {
  return "gilead";
}
```

This is not a score system, ranking engine, or AI layer. The product still presents one recommendation as a confident choice.

## Adding Books

Add books only when they have a clear emotional purpose. Each entry should include a restrained Swedish description, a short emotional descriptor, pacing, reading states, emotional effects, and a safe affiliate request.

Avoid ratings, review language, popularity metadata, stock status, prices, publisher marketing copy, and genre overload.

## Boundaries

Affiliate behavior remains separate in `lib/affiliate`. Payments remain separate in `lib/payments`. The curation library should never contain secrets, affiliate IDs, customer data, payment data, or real tracking parameters.
