import type { Table } from "@/lib/tables/table";

const version = "v1";

export const tableSetV1: readonly Table[] = [
  {
    id: "when-something-heavy-has-happened",
    version,
    name: "When Something Heavy Has Happened",
    displayName: "When Something Heavy Has Happened",
    status: "draft",
    audience: "self",
    purpose:
      "For someone in the aftermath of real loss, offer a book that meets them honestly before trying to move them.",
    readerMoment: {
      summary:
        "A reader has been changed by significant loss and does not want to be cheered up.",
      readerStatement:
        "Something heavy has happened, and I need a book that can sit with it honestly.",
      intent: "To not be alone in something that cannot be easily explained.",
      capacityProfile:
        "Usually low to very low; the table should be safe for depleted readers.",
    },
    curatorIntent:
      "This table should emphasize witness over consolation. The books should know the difference between sitting with grief and managing it.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "very_low", maximum: "medium" },
      difficultyTolerance: { minimum: "low", maximum: "medium" },
      lowCapacityNote:
        "Use the shortest, most immediately holdable entry point once books are assigned.",
      curatorNote:
        "Capacity protects the grieving reader from being given profundity when they have nothing to give back to the reading.",
    },
  },
  {
    id: "when-youre-running-on-empty",
    version,
    name: "When You're Running on Empty",
    displayName: "When You're Running on Empty",
    status: "draft",
    audience: "self",
    purpose:
      "For someone depleted by sustained demand, offer a book that gives back more than it asks.",
    readerMoment: {
      summary:
        "A reader is chronically worn down and wants reading to restore rather than demand.",
      readerStatement:
        "I am running on empty and need a book that will not ask too much of me.",
      intent: "To receive something gentle, low-pressure, and restoring.",
      capacityProfile:
        "Low by default; this table has the strictest capacity safeguard.",
    },
    curatorIntent:
      "This table should protect the depleted reader. Books here should be fragment-friendly, gentle, and rewarding even in very small reading sessions.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "very_low", maximum: "low" },
      difficultyTolerance: { minimum: "low", maximum: "medium" },
      lowCapacityNote:
        "Prefer the least demanding assigned alternative when the reader has almost nothing left.",
      curatorNote:
        "Ease and brevity matter here because the reader's capacity is the moment.",
    },
  },
  {
    id: "a-gift-when-youre-not-sure",
    version,
    name: "A Gift When You're Not Sure",
    displayName: "A Gift When You're Not Sure",
    status: "draft",
    audience: "gift",
    purpose:
      "For a gift buyer who does not know the recipient well, offer a broadly receivable book with quality and low risk.",
    readerMoment: {
      summary:
        "A buyer wants to give a thoughtful book but cannot confidently calibrate to the recipient.",
      readerStatement:
        "I want to give a book, but I do not know this person well enough to be specific.",
      intent: "To feel confident giving something non-presumptuous and genuinely good.",
      capacityProfile:
        "Unknown; the table must assume a wide range of recipient capacity.",
    },
    curatorIntent:
      "This table is calibrated to uncertainty itself. Its books should feel welcoming, thoughtful, and safe without becoming generic.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "low", maximum: "high" },
      difficultyTolerance: { minimum: "low", maximum: "medium" },
      curatorNote:
        "Because recipient capacity is unknown, assigned books should avoid emotionally specific or demanding entry points.",
    },
  },
  {
    id: "finding-your-way-back-to-books",
    version,
    name: "Finding Your Way Back to Books",
    displayName: "Finding Your Way Back to Books",
    status: "draft",
    audience: "self",
    purpose:
      "For someone returning to reading, offer a book that makes finishing feel possible and worthwhile.",
    readerMoment: {
      summary:
        "A reader has been away from reading and wants to come back without being tested.",
      readerStatement:
        "I want to find my way back to books and need an inviting place to start.",
      intent: "To remember that reading is possible, pleasurable, and worth returning to.",
      capacityProfile:
        "Variable, but assume low attention and high abandonment risk.",
    },
    curatorIntent:
      "This table should give the returning reader a win. Books should reward early and welcome the reader back without condescension.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "low", maximum: "medium" },
      difficultyTolerance: { minimum: "low", maximum: "medium" },
      lowCapacityNote:
        "Favor immediately rewarding and forward-moving entries when capacity is low.",
      curatorNote:
        "The first chapter matters unusually much for this table.",
    },
  },
  {
    id: "something-to-keep-you-company",
    version,
    name: "Something to Keep You Company",
    displayName: "Something to Keep You Company",
    status: "draft",
    audience: "self",
    purpose:
      "For someone lonely, offer a book that feels like a presence rather than an assignment.",
    readerMoment: {
      summary:
        "A reader is experiencing loneliness and wants a book with warmth, voice, and human presence.",
      readerStatement:
        "I want a book that will keep me company for a while.",
      intent: "To finish a reading session feeling less alone.",
      capacityProfile:
        "Usually medium; the lonely reader may have energy to invest in a reading relationship.",
    },
    curatorIntent:
      "This table should prioritize companionable voice, inhabited worlds, and the feeling of spending time with someone worth knowing.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "low", maximum: "high" },
      difficultyTolerance: { minimum: "low", maximum: "medium" },
      curatorNote:
        "Avoid cold or distancing entries when stocking this table.",
    },
  },
  {
    id: "a-gift-for-someone-you-know",
    version,
    name: "A Gift for Someone You Know",
    displayName: "A Gift for Someone You Know",
    status: "draft",
    audience: "gift",
    purpose:
      "For a gift buyer who can describe the recipient, offer a book calibrated to their hope for the gift.",
    readerMoment: {
      summary:
        "A buyer knows enough about the recipient to want a specific, meaningful book.",
      readerStatement:
        "I know something about this person and want the book to land with care.",
      intent: "To give a book that says: I thought of you.",
      capacityProfile:
        "Indirect; capacity is inferred from the buyer's description of the recipient.",
    },
    curatorIntent:
      "This table should bridge the main corpus into gift use, selecting books for receivability and specific emotional use cases.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "low", maximum: "high" },
      difficultyTolerance: { minimum: "low", maximum: "high" },
      curatorNote:
        "Capacity must be inferred from the buyer's reported relationship and hope, not direct reader self-report.",
    },
  },
  {
    id: "seeking-stillness",
    version,
    name: "Seeking Stillness",
    displayName: "Seeking Stillness",
    status: "draft",
    audience: "self",
    purpose:
      "For someone overstimulated, offer a book that models attention, quiet, and the ability to slow down.",
    readerMoment: {
      summary:
        "A reader has energy but wants quiet because the world has been too loud and fragmented.",
      readerStatement:
        "I want something still, patient, and quiet enough to help me slow down.",
      intent: "To let reading become a form of calming attention.",
      capacityProfile:
        "Medium to high; this reader is overstimulated, not necessarily depleted.",
    },
    curatorIntent:
      "This table should hold quiet as a quality, not just low eventfulness. Books should create stillness without becoming vacant.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "medium", maximum: "high" },
      difficultyTolerance: { minimum: "low", maximum: "high" },
      curatorNote:
        "A book can be demanding here if its register remains patient and quiet.",
    },
  },
  {
    id: "when-you-need-perspective",
    version,
    name: "When You Need Perspective",
    displayName: "When You Need Perspective",
    status: "draft",
    audience: "self",
    purpose:
      "For someone too close to their own situation, offer a book that makes the world larger.",
    readerMoment: {
      summary:
        "A reader needs distance, enlargement, or another frame of reference.",
      readerStatement:
        "I need a book that helps me see beyond the shape of my own situation.",
      intent: "To encounter another way of seeing, living, or understanding.",
      capacityProfile:
        "Medium to high; the reader has something to give to the reading.",
    },
    curatorIntent:
      "This table should enlarge rather than soothe. Its strongest entries may offer perspective from unexpected directions.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "medium", maximum: "high" },
      difficultyTolerance: { minimum: "medium", maximum: "high" },
      highCapacityNote:
        "High-capacity readers may be ready for denser or more unfamiliar perspective once books are assigned.",
      curatorNote:
        "The surprise slot is especially important here because perspective often comes from an unexpected angle.",
    },
  },
  {
    id: "ready-to-go-deep",
    version,
    name: "Ready to Go Deep",
    displayName: "Ready to Go Deep",
    status: "draft",
    audience: "self",
    purpose:
      "For someone rested and ready for literary seriousness, offer a demanding book that rewards the effort.",
    readerMoment: {
      summary:
        "A reader is in a good season and wants a book that asks something real of them.",
      readerStatement:
        "I am ready for a book with weight, difficulty, and lasting reward.",
      intent: "To read something serious that leaves a mark.",
      capacityProfile:
        "High; full attention is effectively a precondition.",
    },
    curatorIntent:
      "This table should hold Bokhyllan's most uncompromising titles: books the curator values deeply but would not hand to every reader.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "high", maximum: "high" },
      difficultyTolerance: { minimum: "high", maximum: "high" },
      highCapacityNote:
        "This table is itself the high-capacity entry point in the table set.",
      curatorNote:
        "Do not stock this table with books that merely look literary but offer themselves easily.",
    },
  },
  {
    id: "restless-and-curious",
    version,
    name: "Restless and Curious",
    displayName: "Restless and Curious",
    status: "draft",
    audience: "self",
    purpose:
      "For someone alert and restless, offer a book they would not have found on their own.",
    readerMoment: {
      summary:
        "A reader has energy and wants discovery, surprise, and the unfamiliar.",
      readerStatement:
        "I want to be surprised by a book I would not have picked myself.",
      intent: "To encounter strangeness, discovery, or a genuinely unexpected reading experience.",
      capacityProfile:
        "Medium to high; the reader can handle unusual form or unfamiliar conventions.",
    },
    curatorIntent:
      "This table should be full of bookseller-specific recommendations. The trust-me spirit should pervade the whole composition.",
    leadBookId: undefined,
    leadMembershipId: undefined,
    surpriseBookIds: [],
    membership: [],
    capacityGuidance: {
      readingEnergy: { minimum: "medium", maximum: "high" },
      difficultyTolerance: { minimum: "medium", maximum: "high" },
      curatorNote:
        "Books here should catch the reader early; patience without payoff is not enough.",
    },
  },
];

export function getTableSetV1(): Table[] {
  return tableSetV1.map(cloneTable);
}

function cloneTable(table: Table): Table {
  return {
    ...table,
    readerMoment: { ...table.readerMoment },
    membership: table.membership.map((membership) => ({
      ...membership,
      capacityFit: membership.capacityFit
        ? {
            ...membership.capacityFit,
            readingEnergy: membership.capacityFit.readingEnergy
              ? [...membership.capacityFit.readingEnergy]
              : undefined,
            difficultyTolerance: membership.capacityFit.difficultyTolerance
              ? [...membership.capacityFit.difficultyTolerance]
              : undefined,
          }
        : undefined,
    })),
    surpriseBookIds: table.surpriseBookIds ? [...table.surpriseBookIds] : undefined,
    capacityGuidance: table.capacityGuidance
      ? {
          ...table.capacityGuidance,
          readingEnergy: table.capacityGuidance.readingEnergy
            ? {
                ...table.capacityGuidance.readingEnergy,
                preferred: table.capacityGuidance.readingEnergy.preferred
                  ? [...table.capacityGuidance.readingEnergy.preferred]
                  : undefined,
              }
            : undefined,
          difficultyTolerance: table.capacityGuidance.difficultyTolerance
            ? {
                ...table.capacityGuidance.difficultyTolerance,
                preferred: table.capacityGuidance.difficultyTolerance.preferred
                  ? [...table.capacityGuidance.difficultyTolerance.preferred]
                  : undefined,
              }
            : undefined,
          lowCapacityEntry: table.capacityGuidance.lowCapacityEntry
            ? { ...table.capacityGuidance.lowCapacityEntry }
            : undefined,
          highCapacityEntry: table.capacityGuidance.highCapacityEntry
            ? { ...table.capacityGuidance.highCapacityEntry }
            : undefined,
          entryRules: table.capacityGuidance.entryRules
            ? table.capacityGuidance.entryRules.map((rule) => ({ ...rule }))
            : undefined,
        }
      : undefined,
    qualityGuidance: table.qualityGuidance
      ? { ...table.qualityGuidance }
      : undefined,
  };
}
