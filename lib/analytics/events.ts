import type { AffiliateLinkTarget } from "@/lib/library/affiliate";
import type { AffiliateUrlResult } from "@/lib/library/affiliate-provider";

export type AnalyticsEventName =
  | "question_started"
  | "question_completed"
  | "recommendation_shown"
  | "book_saved"
  | "affiliate_clicked";

export type AnalyticsEventSource =
  | "recommendation_flow"
  | "recommendation_reveal"
  | "saved_books"
  | "affiliate"
  | "unknown";

export type AnalyticsBasePayload = {
  source?: AnalyticsEventSource;
  timestamp?: string;
};

export type QuestionStartedPayload = AnalyticsBasePayload & {
  questionId?: string;
};

export type QuestionCompletedPayload = AnalyticsBasePayload & {
  questionId?: string;
  answerId?: string;
};

export type RecommendationShownPayload = AnalyticsBasePayload & {
  bookId?: string;
  curatorId?: string;
};

export type BookSavedPayload = AnalyticsBasePayload & {
  bookId?: string;
  curatorId?: string;
};

export type AffiliateClickedPayload = AnalyticsBasePayload & {
  bookId?: string;
  provider?: string;
  destinationHost?: string;
};

export type AnalyticsEventPayloadMap = {
  question_started: QuestionStartedPayload;
  question_completed: QuestionCompletedPayload;
  recommendation_shown: RecommendationShownPayload;
  book_saved: BookSavedPayload;
  affiliate_clicked: AffiliateClickedPayload;
};

export type AnalyticsEvent<
  Name extends AnalyticsEventName = AnalyticsEventName,
> = {
  name: Name;
  payload: AnalyticsEventPayloadMap[Name] & {
    timestamp: string;
  };
};

export type AffiliateClickedEventOptions = {
  source?: AnalyticsEventSource;
  timestamp?: string;
};

export function createAnalyticsEvent<Name extends AnalyticsEventName>(
  name: Name,
  payload: AnalyticsEventPayloadMap[Name],
): AnalyticsEvent<Name> {
  return {
    name,
    payload: {
      ...payload,
      timestamp: payload.timestamp ?? new Date().toISOString(),
    },
  };
}

export function trackAnalyticsEvent(): void {
  return undefined;
}

export function createAffiliateClickedEvent(
  target: AffiliateLinkTarget,
  result: AffiliateUrlResult,
  options: AffiliateClickedEventOptions = {},
): AnalyticsEvent<"affiliate_clicked"> {
  return createAnalyticsEvent("affiliate_clicked", {
    bookId: target.bookId,
    provider: result.provider,
    destinationHost: result.available ? getDestinationHost(result.url) : undefined,
    source: options.source ?? "affiliate",
    timestamp: options.timestamp,
  });
}

function getDestinationHost(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}
