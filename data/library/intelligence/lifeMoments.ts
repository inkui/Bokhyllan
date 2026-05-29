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
      "Det här känns som en bok för en tid då dagarna är fulla, men man ändå behöver något eget och stilla.",
  },
  retirement: {
    id: "retirement",
    name: "ny rytm",
    profiles: ["reflection", "perspective", "renewal"],
    revealNote:
      "Det här känns som en bok för en ny rytm i livet, när tankarna får ta mer plats.",
  },
  grief: {
    id: "grief",
    name: "sorg",
    profiles: ["meaning", "comfort", "reflection"],
    revealNote:
      "Det här känns som en bok för när man inte vill bli uppmuntrad för snabbt, bara få sällskap i det som är svårt.",
  },
  burnout: {
    id: "burnout",
    name: "utmattning",
    profiles: ["recovery", "comfort", "wonder"],
    revealNote:
      "Det här känns som en bok för en tid då man behöver läsa långsammare och låta uppmärksamheten komma tillbaka.",
  },
  life_transition: {
    id: "life_transition",
    name: "övergång",
    profiles: ["perspective", "hope", "reflection"],
    revealNote:
      "Det här känns som en bok för en övergång, när något håller på att bli tydligare men ännu inte har satt sig.",
  },
  loneliness: {
    id: "loneliness",
    name: "ensamhet",
    profiles: ["companionship", "comfort", "hope"],
    revealNote:
      "Det här känns som en bok för när man vill ha sällskap utan att bli överröstad.",
  },
  rediscovering_reading: {
    id: "rediscovering_reading",
    name: "hitta tillbaka",
    profiles: ["renewal", "comfort", "curiosity"],
    revealNote:
      "Det här känns som en bok för att hitta tillbaka till läsningen utan att behöva prestera.",
  },
  starting_over: {
    id: "starting_over",
    name: "börja om",
    profiles: ["hope", "renewal", "perspective"],
    revealNote:
      "Det här känns som en bok för när man börjar om, även om man inte riktigt säger det högt.",
  },
  creative_block: {
    id: "creative_block",
    name: "skapande tröghet",
    profiles: ["curiosity", "wonder", "renewal"],
    revealNote:
      "Det här känns som en bok för när tanken behöver öppnas lite, utan att någon kräver ett svar.",
  },
  seeking_calm: {
    id: "seeking_calm",
    name: "söker lugn",
    profiles: ["recovery", "comfort", "reflection"],
    revealNote:
      "Det här känns som en bok för en stund då man vill sänka rösten och komma närmare sig själv.",
  },
  after_change: {
    id: "after_change",
    name: "efter förändring",
    profiles: ["reflection", "meaning", "hope"],
    revealNote:
      "Det här känns som en bok för tiden efter något har skiftat, när man fortfarande lyssnar efter vad det betyder.",
  },
  quiet_weekend: {
    id: "quiet_weekend",
    name: "stilla helg",
    profiles: ["comfort", "wonder", "reflection"],
    revealNote:
      "Det här känns som en bok för en långsam stund, när läsningen får vara lågmäld men inte tom.",
  },
  intellectual_restlessness: {
    id: "intellectual_restlessness",
    name: "tankemässig rastlöshet",
    profiles: ["curiosity", "perspective", "meaning"],
    revealNote:
      "Det här känns som en bok för någon som behöver något med motstånd, men inte med buller.",
  },
  hard_to_reach_person: {
    id: "hard_to_reach_person",
    name: "svår att nå",
    profiles: ["perspective", "reflection", "companionship"],
    revealNote:
      "Det här känns som en bok för någon man vill nå varsamt, utan att välja något för enkelt.",
  },
  needs_brightness: {
    id: "needs_brightness",
    name: "behöver ljus",
    profiles: ["hope", "companionship", "renewal"],
    revealNote:
      "Det här känns som en bok som kan ge lite ljus utan att låtsas att allt är enkelt.",
  },
};
