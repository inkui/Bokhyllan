import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";
import type { EmotionProfileId } from "@/data/library/intelligence/emotionProfiles";
import type { LifeMomentId } from "@/data/library/intelligence/lifeMoments";

export type Signal =
  | "energy:low"
  | "energy:medium"
  | "energy:high"
  | "direction:toward"
  | "direction:sitting_with"
  | "direction:transitioning"
  | "self_or_world:self"
  | "self_or_world:world"
  | "company:needs_company"
  | "company:needs_space"
  | "difficulty:low"
  | "difficulty:medium"
  | "difficulty:high"
  | "surprise:open"
  | "surprise:constrained"
  | "returning:yes"
  | "life_moment:grief"
  | "life_moment:transition"
  | "life_moment:loneliness"
  | "life_moment:burnout"
  | "life_moment:ordinary";

export type AnswerInterpretation = {
  flow: FlowKind;
  profileIds: EmotionProfileId[];
  lifeMomentId: LifeMomentId;
  signals: Signal[];
};

export const answerSignalMap: Record<string, Signal[]> = {
  heavy: ["energy:low", "direction:sitting_with", "difficulty:low"],
  quiet_empty: [
    "energy:low",
    "direction:sitting_with",
    "company:needs_company",
    "difficulty:low",
  ],
  restless: [
    "energy:medium",
    "direction:sitting_with",
    "company:needs_space",
    "difficulty:low",
  ],
  okay_needs_space: [
    "energy:medium",
    "direction:toward",
    "company:needs_space",
    "difficulty:medium",
  ],
  transitioning: [
    "energy:medium",
    "direction:transitioning",
    "difficulty:medium",
    "surprise:open",
  ],
  presence_no_demands: [
    "self_or_world:self",
    "company:needs_company",
    "difficulty:low",
    "energy:low",
  ],
  companionship: [
    "self_or_world:self",
    "company:needs_company",
    "difficulty:medium",
  ],
  distance_from_self: [
    "self_or_world:world",
    "company:needs_space",
    "surprise:open",
  ],
  perspective: [
    "self_or_world:world",
    "difficulty:medium",
    "surprise:open",
  ],
  beauty: ["self_or_world:world", "difficulty:medium", "surprise:open"],
  short_sessions: ["energy:low", "difficulty:low"],
  time_not_energy: ["energy:medium", "difficulty:low"],
  full_attention: ["energy:high", "difficulty:high"],
  returning: ["returning:yes", "energy:low", "difficulty:low"],
  small_warm_room: [
    "self_or_world:self",
    "company:needs_company",
    "difficulty:low",
    "surprise:constrained",
  ],
  wide_unfamiliar_landscape: [
    "self_or_world:world",
    "company:needs_space",
    "difficulty:medium",
    "surprise:open",
  ],
  reading_room_clarity: [
    "self_or_world:self",
    "company:needs_space",
    "difficulty:high",
  ],
  another_persons_home: [
    "self_or_world:world",
    "company:needs_company",
    "difficulty:medium",
  ],
  open_air_movement: [
    "self_or_world:world",
    "direction:toward",
    "surprise:open",
    "energy:medium",
  ],
  warm_carries_others: ["company:needs_company", "difficulty:low"],
  thoughtful_depth: ["difficulty:high", "company:needs_space"],
  curious_outward: ["self_or_world:world", "surprise:open"],
  private_needs_space: ["company:needs_space", "difficulty:medium"],
  uncertain_not_close: [],
  going_through_difficulty: [
    "direction:sitting_with",
    "difficulty:low",
    "life_moment:grief",
  ],
  new_beginning: [
    "direction:transitioning",
    "difficulty:medium",
    "life_moment:transition",
  ],
  quiet_lonely_period: [
    "direction:sitting_with",
    "company:needs_company",
    "life_moment:loneliness",
  ],
  needs_respite: ["energy:low", "difficulty:low", "life_moment:burnout"],
  ordinary_moment: ["life_moment:ordinary", "surprise:open"],
  hope_companionship: [
    "company:needs_company",
    "self_or_world:self",
    "difficulty:low",
  ],
  hope_relief: ["difficulty:low", "energy:low", "direction:sitting_with"],
  hope_perspective: [
    "self_or_world:world",
    "surprise:open",
    "difficulty:medium",
  ],
  hope_joy_of_reading: ["returning:yes", "difficulty:low", "energy:low"],
  hope_beauty: ["self_or_world:world", "difficulty:medium", "surprise:open"],
  regular_reader: ["energy:high", "difficulty:high"],
  occasional_reader: ["energy:medium", "difficulty:medium"],
  aspiring_reader: ["returning:yes", "energy:low", "difficulty:low"],
  uncertain_reading_life: ["energy:low", "difficulty:low"],
};

function collectSignals(answers: FlowAnswers) {
  return Object.values(answers).flatMap((answer) => answerSignalMap[answer] ?? []);
}

function hasSignal(signals: Signal[], signal: Signal) {
  return signals.includes(signal);
}

function countSignals(signals: Signal[], wanted: Signal[]) {
  return wanted.filter((signal) => signals.includes(signal)).length;
}

function profilesFromSignals(flow: FlowKind, signals: Signal[]): EmotionProfileId[] {
  if (hasSignal(signals, "returning:yes")) {
    return ["renewal", "comfort", "companionship"];
  }

  if (
    hasSignal(signals, "life_moment:grief") ||
    countSignals(signals, ["direction:sitting_with", "difficulty:low"]) >= 2
  ) {
    return ["comfort", "recovery", "meaning"];
  }

  if (
    hasSignal(signals, "life_moment:burnout") ||
    countSignals(signals, ["energy:low", "difficulty:low"]) >= 3
  ) {
    return ["recovery", "comfort", "wonder"];
  }

  if (hasSignal(signals, "life_moment:loneliness")) {
    return ["companionship", "comfort", "hope"];
  }

  if (
    hasSignal(signals, "life_moment:transition") ||
    hasSignal(signals, "direction:transitioning")
  ) {
    return ["hope", "renewal", "perspective"];
  }

  if (
    countSignals(signals, ["self_or_world:world", "surprise:open"]) >= 2 &&
    hasSignal(signals, "energy:high")
  ) {
    return ["curiosity", "perspective", "wonder"];
  }

  if (
    countSignals(signals, ["self_or_world:world", "surprise:open"]) >= 2
  ) {
    return flow === "gift"
      ? ["perspective", "wonder", "curiosity"]
      : ["wonder", "perspective", "renewal"];
  }

  if (hasSignal(signals, "company:needs_company")) {
    return ["companionship", "comfort", "hope"];
  }

  if (hasSignal(signals, "company:needs_space")) {
    return ["reflection", "perspective", "meaning"];
  }

  return ["reflection", "comfort", "hope"];
}

function lifeMomentFromSignals(flow: FlowKind, signals: Signal[]): LifeMomentId {
  if (hasSignal(signals, "life_moment:grief")) {
    return "grief";
  }

  if (hasSignal(signals, "life_moment:burnout")) {
    return "burnout";
  }

  if (hasSignal(signals, "life_moment:loneliness")) {
    return "loneliness";
  }

  if (
    hasSignal(signals, "life_moment:transition") ||
    hasSignal(signals, "direction:transitioning")
  ) {
    return "life_transition";
  }

  if (hasSignal(signals, "returning:yes")) {
    return "rediscovering_reading";
  }

  if (countSignals(signals, ["energy:low", "difficulty:low"]) >= 3) {
    return "seeking_calm";
  }

  if (
    flow === "gift" &&
    countSignals(signals, ["company:needs_space", "difficulty:medium"]) >= 2
  ) {
    return "hard_to_reach_person";
  }

  if (countSignals(signals, ["self_or_world:world", "surprise:open"]) >= 2) {
    return "creative_block";
  }

  return flow === "gift" ? "quiet_weekend" : "seeking_calm";
}

export function interpretAnswers(
  flow: FlowKind,
  answers: FlowAnswers,
): AnswerInterpretation {
  const signals = collectSignals(answers);

  return {
    flow,
    profileIds: profilesFromSignals(flow, signals),
    lifeMomentId: lifeMomentFromSignals(flow, signals),
    signals,
  };
}
