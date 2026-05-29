# Recommendation Intelligence

Bokhyllan uses interpretation, not AI, to choose one book with care.

## Why Interpretation

The product should feel like a thoughtful bookseller, not like a model explaining itself. A few quiet answers are translated into a reading situation, then into an emotional profile, then into one curated book.

There are no LLM calls, embeddings, vector databases, popularity metrics, ratings, percentages, or collaborative filtering.

## Structure

- `emotionProfiles.ts` defines reusable needs such as comfort, recovery, perspective, companionship, wonder, and hope.
- `lifeMoments.ts` defines human situations such as burnout, grief, loneliness, rediscovering reading, starting over, seeking calm, and creative block.
- `answerInterpretation.ts` translates current flow answers into profiles and a life moment.
- `recommendationResolver.ts` identifies candidate books from the curated library and returns one deterministic recommendation.

## Flow

```text
answers
-> answer interpretation
-> emotional profiles + life moment
-> candidate books
-> one recommendation
```

The user never sees profiles, tags, rules, or taxonomy. They only see a slightly more personal reveal note written in calm Swedish.

## Resolver Rules

The resolver is deterministic and readable. It prefers books whose pacing, tones, emotional effects, and reading energy match the interpreted emotional profile. If no match is found, it falls back to the curated library rather than inventing a result.

## Boundaries

This layer must stay separate from affiliate and payment systems. It should never contain customer data, secrets, tracking IDs, real payment logic, or user accounts.
