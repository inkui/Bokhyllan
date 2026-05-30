import type { EmotionProfileId } from "@/data/library/intelligence/emotionProfiles";

export type LifeMomentId =
  | "new_parent"
  | "retirement"
  | "grief"
  | "burnout"
  | "life_transition"
  | "loneliness"
  | "rediscovering_reading"
  | "starting_over"
  | "creative_block"
  | "seeking_calm"
  | "after_change"
  | "quiet_weekend"
  | "intellectual_restlessness"
  | "hard_to_reach_person"
  | "needs_brightness";

export type LifeMoment = {
  id: LifeMomentId;
  name: string;
  profiles: EmotionProfileId[];
  revealNote: string;
};

export const lifeMoments: Record<LifeMomentId, LifeMoment> = {
  new_parent: {
    id: "new_parent",
    name: "ny vardag",
    profiles: ["companionship", "comfort", "wonder"],
    revealNote:
      "Dagarna verkar vara fulla just nu. Då får läsningen gärna vara något eget och stilla.",
  },
  retirement: {
    id: "retirement",
    name: "ny rytm",
    profiles: ["reflection", "perspective", "renewal"],
    revealNote:
      "När vardagen får en ny rytm kan det vara skönt med en bok som låter tankarna ta plats.",
  },
  grief: {
    id: "grief",
    name: "sorg",
    profiles: ["meaning", "comfort", "reflection"],
    revealNote:
      "Det svåra behöver inte göras lättare än det är. Ibland räcker det med stilla sällskap.",
  },
  burnout: {
    id: "burnout",
    name: "utmattning",
    profiles: ["recovery", "comfort", "wonder"],
    revealNote:
      "Det verkar vara en tid för något som inte ställer stora krav. Läsningen får börja i liten skala.",
  },
  life_transition: {
    id: "life_transition",
    name: "övergång",
    profiles: ["perspective", "hope", "reflection"],
    revealNote:
      "Något verkar vara i rörelse, utan att riktigt ha satt sig ännu. Då kan en bok få ge lite utrymme.",
  },
  loneliness: {
    id: "loneliness",
    name: "ensamhet",
    profiles: ["companionship", "comfort", "hope"],
    revealNote:
      "Du verkar söka sällskap, men inte något som tar över rummet.",
  },
  rediscovering_reading: {
    id: "rediscovering_reading",
    name: "hitta tillbaka",
    profiles: ["renewal", "comfort", "curiosity"],
    revealNote:
      "Det får vara enkelt att hitta tillbaka till läsningen. Ingen prestation, bara en bok att börja med.",
  },
  starting_over: {
    id: "starting_over",
    name: "börja om",
    profiles: ["hope", "renewal", "perspective"],
    revealNote:
      "Det finns en försiktig rörelse framåt här. Den behöver inte göras större än den är.",
  },
  creative_block: {
    id: "creative_block",
    name: "skapande tröghet",
    profiles: ["curiosity", "wonder", "renewal"],
    revealNote:
      "Du verkar vilja öppna ett fönster, inte få ett färdigt svar.",
  },
  seeking_calm: {
    id: "seeking_calm",
    name: "söker lugn",
    profiles: ["recovery", "comfort", "reflection"],
    revealNote:
      "Du verkar söka något lågmält. En bok som inte skyndar på någonting.",
  },
  after_change: {
    id: "after_change",
    name: "efter förändring",
    profiles: ["reflection", "meaning", "hope"],
    revealNote:
      "Något har skiftat, och det behöver kanske få vara oklart ett tag.",
  },
  quiet_weekend: {
    id: "quiet_weekend",
    name: "stilla helg",
    profiles: ["comfort", "wonder", "reflection"],
    revealNote:
      "Det verkar finnas plats för en långsam stund. Något lågmält, men inte tomt.",
  },
  intellectual_restlessness: {
    id: "intellectual_restlessness",
    name: "tankemässig rastlöshet",
    profiles: ["curiosity", "perspective", "meaning"],
    revealNote:
      "Du verkar vilja ha något med motstånd, men inte med buller.",
  },
  hard_to_reach_person: {
    id: "hard_to_reach_person",
    name: "svår att nå",
    profiles: ["perspective", "reflection", "companionship"],
    revealNote:
      "Det här får gärna vara en varsam gåva, utan att bli ett alltför enkelt val.",
  },
  needs_brightness: {
    id: "needs_brightness",
    name: "behöver ljus",
    profiles: ["hope", "companionship", "renewal"],
    revealNote:
      "Du verkar söka lite ljus, men inget som låtsas att allt är enkelt.",
  },
};
