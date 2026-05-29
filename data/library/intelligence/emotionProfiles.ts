import type { ReadingEnergy } from "@/data/library/books/bookTypes";
import type { EmotionalEffect } from "@/data/library/taxonomy/emotions";
import type { ReadingPacing } from "@/data/library/taxonomy/pacing";
import type { EmotionalTone } from "@/data/library/taxonomy/tones";

export type EmotionProfileId =
  | "comfort"
  | "renewal"
  | "perspective"
  | "companionship"
  | "wonder"
  | "reflection"
  | "recovery"
  | "curiosity"
  | "meaning"
  | "hope";

export type EmotionProfile = {
  id: EmotionProfileId;
  name: string;
  emotionalNeeds: EmotionalEffect[];
  preferredPacing: ReadingPacing[];
  preferredTones: EmotionalTone[];
  readingEnergyRange: ReadingEnergy[];
};

export const emotionProfiles: Record<EmotionProfileId, EmotionProfile> = {
  comfort: {
    id: "comfort",
    name: "tröst",
    emotionalNeeds: ["comforts", "calms", "keeps_company"],
    preferredPacing: ["slow", "lightweight", "steady"],
    preferredTones: ["warm", "tender", "still"],
    readingEnergyRange: ["very_low", "low"],
  },
  renewal: {
    id: "renewal",
    name: "förnyelse",
    emotionalNeeds: ["awakens_wonder", "restores_attention", "calms"],
    preferredPacing: ["steady", "absorbing"],
    preferredTones: ["hopeful", "immersive", "warm"],
    readingEnergyRange: ["low", "medium"],
  },
  perspective: {
    id: "perspective",
    name: "perspektiv",
    emotionalNeeds: ["opens_perspective", "clarifies", "deepens_feeling"],
    preferredPacing: ["steady", "deep"],
    preferredTones: ["clear", "melancholic", "still"],
    readingEnergyRange: ["medium", "high"],
  },
  companionship: {
    id: "companionship",
    name: "sällskap",
    emotionalNeeds: ["keeps_company", "comforts", "awakens_wonder"],
    preferredPacing: ["steady", "absorbing"],
    preferredTones: ["warm", "quietly_funny", "hopeful"],
    readingEnergyRange: ["low", "medium"],
  },
  wonder: {
    id: "wonder",
    name: "förundran",
    emotionalNeeds: ["awakens_wonder", "restores_attention"],
    preferredPacing: ["slow", "lightweight", "absorbing"],
    preferredTones: ["clear", "hopeful", "immersive"],
    readingEnergyRange: ["very_low", "low", "medium"],
  },
  reflection: {
    id: "reflection",
    name: "eftertanke",
    emotionalNeeds: ["deepens_feeling", "opens_perspective", "clarifies"],
    preferredPacing: ["slow", "deep", "steady"],
    preferredTones: ["still", "clear", "melancholic"],
    readingEnergyRange: ["low", "medium"],
  },
  recovery: {
    id: "recovery",
    name: "återhämtning",
    emotionalNeeds: ["calms", "restores_attention", "comforts"],
    preferredPacing: ["slow", "lightweight"],
    preferredTones: ["still", "warm", "tender"],
    readingEnergyRange: ["very_low", "low"],
  },
  curiosity: {
    id: "curiosity",
    name: "nyfikenhet",
    emotionalNeeds: ["awakens_wonder", "opens_perspective", "clarifies"],
    preferredPacing: ["absorbing", "steady"],
    preferredTones: ["restless", "immersive", "clear"],
    readingEnergyRange: ["medium", "high"],
  },
  meaning: {
    id: "meaning",
    name: "mening",
    emotionalNeeds: ["deepens_feeling", "makes_room_for_grief", "clarifies"],
    preferredPacing: ["deep", "slow"],
    preferredTones: ["melancholic", "haunting", "clear"],
    readingEnergyRange: ["medium", "high"],
  },
  hope: {
    id: "hope",
    name: "hopp",
    emotionalNeeds: ["comforts", "awakens_wonder", "opens_perspective"],
    preferredPacing: ["steady", "slow"],
    preferredTones: ["hopeful", "warm", "tender"],
    readingEnergyRange: ["low", "medium"],
  },
};
