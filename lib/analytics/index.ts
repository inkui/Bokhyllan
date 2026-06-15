export type {
  AffiliateClickedEventOptions,
  AffiliateClickedPayload,
  AnalyticsBasePayload,
  AnalyticsEvent,
  AnalyticsEventName,
  AnalyticsEventPayloadMap,
  AnalyticsEventSource,
  BookSavedPayload,
  QuestionCompletedPayload,
  QuestionStartedPayload,
  RecommendationShownPayload,
} from "@/lib/analytics/events";
export {
  createAffiliateClickedEvent,
  createAnalyticsEvent,
  trackAnalyticsEvent,
} from "@/lib/analytics/events";
