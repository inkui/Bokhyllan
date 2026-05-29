import { books } from "@/data/library/books/books";
import type { Book } from "@/data/library/books/bookTypes";
import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";
import { emotionProfiles } from "@/data/library/intelligence/emotionProfiles";
import type { EmotionProfileId } from "@/data/library/intelligence/emotionProfiles";
import { interpretAnswers } from "@/data/library/intelligence/answerInterpretation";
import type { AnswerInterpretation } from "@/data/library/intelligence/answerInterpretation";
import { lifeMoments } from "@/data/library/intelligence/lifeMoments";

export type CuratorRevealCopy = {
  openingLine: string;
  recognition: string;
  whyThisBook: string;
  readingExperienceNote: string;
  placement: string;
};

export type RecommendationResolution = {
  book: Book;
  interpretation: AnswerInterpretation;
  revealNote: string;
  curatorCopy: CuratorRevealCopy;
};

function hasAny<T extends string>(source: readonly T[], wanted: readonly T[]) {
  return wanted.some((item) => source.includes(item));
}

function matchesProfile(book: Book, profileId: EmotionProfileId) {
  const profile = emotionProfiles[profileId];

  return (
    profile.readingEnergyRange.includes(book.readingEnergy) &&
    hasAny(book.pacing, profile.preferredPacing) &&
    hasAny(book.emotionalTone, profile.preferredTones) &&
    hasAny(book.emotionalEffects, profile.emotionalNeeds)
  );
}

function selectFromCandidates(
  candidates: Book[],
  interpretation: AnswerInterpretation,
) {
  const [primaryProfile, secondaryProfile] = interpretation.profileIds;
  const curatedBookId = preferredBookForContext(interpretation);

  if (curatedBookId) {
    const curatedCandidate = candidates.find((book) => book.id === curatedBookId);

    if (curatedCandidate) {
      return curatedCandidate;
    }
  }

  return (
    candidates.find((book) => matchesProfile(book, primaryProfile)) ??
    candidates.find(
      (book) => secondaryProfile && matchesProfile(book, secondaryProfile),
    ) ??
    candidates[0]
  );
}

function preferredBookForContext(interpretation: AnswerInterpretation) {
  const { lifeMomentId, profileIds, signals } = interpretation;

  if (lifeMomentId === "burnout" || lifeMomentId === "seeking_calm") {
    return signals.includes("returning:yes") ? "sommarboken" : "gilead";
  }

  if (lifeMomentId === "grief") {
    return "dora-bruder";
  }

  if (lifeMomentId === "loneliness") {
    return "gentleman-i-moskva";
  }

  if (lifeMomentId === "rediscovering_reading") {
    return signals.includes("energy:low") ? "sommarboken" : "gentleman-i-moskva";
  }

  if (lifeMomentId === "life_transition") {
    return "stoner";
  }

  if (lifeMomentId === "hard_to_reach_person") {
    return "aterstoden-av-dagen";
  }

  if (lifeMomentId === "creative_block") {
    return signals.includes("energy:high") ? "samuel-bok" : "det-vilda-torget";
  }

  if (profileIds.includes("meaning")) {
    return "handelser-vid-vatten";
  }

  return undefined;
}

function candidateBooksForInterpretation(
  interpretation: AnswerInterpretation,
): Book[] {
  const candidates = books.filter((book) =>
    interpretation.profileIds.some((profileId) => matchesProfile(book, profileId)),
  );

  if (candidates.length > 0) {
    return candidates;
  }

  return books;
}

export function resolveRecommendation(
  flow: FlowKind,
  answers: FlowAnswers,
): RecommendationResolution {
  const interpretation = interpretAnswers(flow, answers);
  const candidates = candidateBooksForInterpretation(interpretation);
  const book = selectFromCandidates(candidates, interpretation);
  const lifeMoment = lifeMoments[interpretation.lifeMomentId];
  const curatorCopy = buildCuratorRevealCopy(book, interpretation);

  return {
    book,
    interpretation,
    revealNote: lifeMoment.revealNote,
    curatorCopy,
  };
}

function buildCuratorRevealCopy(
  book: Book,
  interpretation: AnswerInterpretation,
): CuratorRevealCopy {
  const lifeMoment = lifeMoments[interpretation.lifeMomentId];
  const primaryProfile = interpretation.profileIds[0];

  return {
    openingLine: openingLineForProfile(primaryProfile, book),
    recognition: lifeMoment.revealNote,
    whyThisBook: connectionForProfile(primaryProfile, book),
    readingExperienceNote: book.voiceNote ?? book.emotionalDescription,
    placement: placementForBook(book, interpretation),
  };
}

function openingLineForProfile(profileId: EmotionProfileId, book: Book) {
  if (profileId === "comfort" || profileId === "recovery") {
    return "Jag skulle lägga fram den här varsamt.";
  }

  if (profileId === "companionship") {
    return "Det här är en bok som håller sällskap.";
  }

  if (profileId === "perspective" || profileId === "reflection") {
    return "Det här är en bok som ger tankarna lite mer rum.";
  }

  if (profileId === "wonder" || profileId === "curiosity") {
    return "Det här är en bok som öppnar ett fönster.";
  }

  if (profileId === "meaning") {
    return "Det här är en bok för något som får väga.";
  }

  if (profileId === "hope" || profileId === "renewal") {
    return "Det här är en bok med stilla rörelse framåt.";
  }

  return book.shortDescription;
}

function connectionForProfile(profileId: EmotionProfileId, book: Book) {
  if (profileId === "comfort") {
    return `${book.title} passar här för att den inte försöker skynda på känslan. Den ger närvaro utan att göra stora anspråk.`;
  }

  if (profileId === "recovery") {
    return `${book.title} har den sortens lugn som låter läsningen börja i liten skala. Den möter trötthet utan att förenkla den.`;
  }

  if (profileId === "companionship") {
    return `${book.title} fungerar som sällskap snarare än förklaring. Den låter någon annan vara nära utan att ta över rummet.`;
  }

  if (profileId === "perspective") {
    return `${book.title} ger avstånd på ett stillsamt sätt. Den hjälper tanken att byta plats utan att tala om vad man ska tänka.`;
  }

  if (profileId === "reflection") {
    return `${book.title} stannar upp där många böcker går vidare. Den ger eftertanken form utan att göra den tung i onödan.`;
  }

  if (profileId === "wonder") {
    return `${book.title} ger något vackert att rikta blicken mot. Den öppnar snarare än pressar.`;
  }

  if (profileId === "curiosity") {
    return `${book.title} har tillräckligt med rörelse för att väcka nyfikenhet, men behåller den lugna precision som gör valet tryggt.`;
  }

  if (profileId === "meaning") {
    return `${book.title} ger plats åt det som inte behöver lösas direkt. Den litar på att läsaren orkar med allvaret.`;
  }

  if (profileId === "renewal" || profileId === "hope") {
    return `${book.title} bär en lågmäld framåtrörelse. Den ger ljus utan att bli förenklad.`;
  }

  return book.emotionalDescription;
}

function placementForBook(book: Book, interpretation: AnswerInterpretation) {
  if (book.readingEnergy === "very_low") {
    return "Läs den i korta stunder. Den tål att man kommer och går.";
  }

  if (interpretation.signals.includes("returning:yes")) {
    return "Det här är en bra bok att komma tillbaka med, utan krav på att vara en viss sorts läsare.";
  }

  if (book.pacing.includes("slow")) {
    return "Läs den långsamt, gärna när dagen har blivit tystare.";
  }

  if (book.pacing.includes("absorbing")) {
    return "Ge den några sammanhängande kvällar, så får den lägga sin egen rytm.";
  }

  if (book.pacing.includes("deep")) {
    return "Det här är en bok att ge lite ostörd uppmärksamhet.";
  }

  return "Det här är en bok att lägga nära, inte rusa igenom.";
}
