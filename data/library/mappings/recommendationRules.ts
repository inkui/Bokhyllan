import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";
import type { Book } from "@/data/library/books/bookTypes";
import { books } from "@/data/library/books/books";

export type RecommendationRuleContext = {
  flow: FlowKind;
  answers: FlowAnswers;
};

type RecommendationRule = {
  id: string;
  choose: (context: RecommendationRuleContext) => string | undefined;
};

const rules: RecommendationRule[] = [
  {
    id: "very-low-energy-needs-calm",
    choose: ({ flow, answers }) => {
      if (
        flow === "self" &&
        (answers.energy === "valdigt-lite" || answers.pace === "mjuk")
      ) {
        return "sommarboken";
      }
    },
  },
  {
    id: "still-low-energy",
    choose: ({ flow, answers }) => {
      if (
        flow === "self" &&
        answers.longing === "stillsamt" &&
        (answers.energy === "lite-nyfiken" || answers.pace === "langsam")
      ) {
        return "gilead";
      }
    },
  },
  {
    id: "self-wants-clarity",
    choose: ({ flow, answers }) => {
      if (
        flow === "self" &&
        (answers.longing === "klartankt" || answers.pace === "efterklang")
      ) {
        return "outline";
      }
    },
  },
  {
    id: "self-wants-immersion",
    choose: ({ flow, answers }) => {
      if (
        flow === "self" &&
        (answers.longing === "uppslukande" ||
          answers.energy === "nagot-stort" ||
          answers.pace === "drivande")
      ) {
        return "gentleman-i-moskva";
      }
    },
  },
  {
    id: "self-stays-with-you",
    choose: ({ flow, answers }) => {
      if (flow === "self" && answers.longing === "stannar-kvar") {
        return "stoner";
      }
    },
  },
  {
    id: "gift-needs-rest",
    choose: ({ flow, answers }) => {
      if (
        flow === "gift" &&
        (answers.person === "behover-vila" ||
          answers.gift === "trost" ||
          answers.gift === "lugn")
      ) {
        return "gilead";
      }
    },
  },
  {
    id: "gift-warm-company",
    choose: ({ flow, answers }) => {
      if (
        flow === "gift" &&
        (answers.person === "varm" ||
          answers.gift === "sallskap" ||
          answers.tone === "varm")
      ) {
        return "gentleman-i-moskva";
      }
    },
  },
  {
    id: "gift-restless-new",
    choose: ({ flow, answers }) => {
      if (
        flow === "gift" &&
        (answers.person === "rastlos" ||
          answers.person === "soker-nytt" ||
          answers.gift === "energi")
      ) {
        return "samuel-bok";
      }
    },
  },
  {
    id: "gift-hard-to-reach",
    choose: ({ flow, answers }) => {
      if (
        flow === "gift" &&
        (answers.person === "svar-att-na" || answers.tone === "klar")
      ) {
        return "aterstoden-av-dagen";
      }
    },
  },
  {
    id: "gift-depth-perspective",
    choose: ({ flow, answers }) => {
      if (
        flow === "gift" &&
        (answers.person === "eftertanksam" ||
          answers.gift === "perspektiv" ||
          answers.tone === "djup")
      ) {
        return "handelser-vid-vatten";
      }
    },
  },
];

export function chooseBookForRecommendation(
  context: RecommendationRuleContext,
): Book {
  for (const rule of rules) {
    const selectedId = rule.choose(context);

    if (selectedId) {
      return books.find((book) => book.id === selectedId) ?? books[0];
    }
  }

  return books[0];
}
