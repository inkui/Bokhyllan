# Affiliate Strategy

## Purpose

This document defines Bokhyllan's approach to retailer integration and affiliate partnerships for Swedish book sales.

The affiliate boundary exists to connect a recommendation to a purchase without making Bokhyllan feel like a shop. The user receives one book. They are given one quiet path to find it. The mechanics of that path are invisible.

---

## Strategic Comparison

| Criterion | Bokus | Adlibris | Akademibokhandeln |
|---|---|---|---|
| Swedish brand trust | High | High | Very high (local feel) |
| Book availability | Excellent | Excellent | Good (varies by title) |
| Affiliate network | Tradedoubler | Tradedoubler / Adtraction | Limited / not standard |
| Deeplink support | Yes — ISBN-based URL | Yes — ISBN-based URL | Limited |
| Brand fit with Bokhyllan | Good | Good | Excellent, but impractical at scale |
| Conversion potential | High | High | Unknown |
| UI neutrality | Supported | Supported | Hard to maintain at scale |
| Future flexibility | Good | Good | Low |

---

## Why Bokus Is the Primary Target

Bokus is Sweden's largest dedicated online bookstore. It carries virtually every title Bokhyllan would recommend. Its affiliate program runs through Tradedoubler, which is standard, well-documented, and reliable.

URL structure is predictable: `bokus.com/bok/{isbn}/` — which means affiliate links can be constructed programmatically from an ISBN without a product API or manual lookup. This aligns cleanly with the planned ISBN-driven book library architecture.

Bokus is a known, trusted retailer for Swedish readers. It does not feel discount-oriented or marketplace-like, which matters for brand fit.

**First production implementation should target Bokus via Tradedoubler.**

---

## Why Adlibris Should Remain a Supported Fallback

Adlibris is Bokus's closest competitor in the Swedish market and covers an equivalent catalogue. Maintaining it as a fallback protects against:

- A recommended title being out of stock at Bokus
- A future change in Bokus affiliate terms
- Regional or personal preferences among users

The affiliate client is already typed for `RetailerId: "bokus" | "adlibris" | "generic"`. Adlibris should be connected in parallel once Bokus is live, pointing to a secondary adapter that is never surfaced to the user unless Bokus fails.

Adlibris uses Tradedoubler and/or Adtraction depending on the agreement — either works with the same adapter pattern.

---

## What Criteria Matter

**Book availability** — The retailer must stock the books Bokhyllan recommends. Both Bokus and Adlibris cover the full catalogue of literary fiction, Swedish and translated, that the library currently contains. Availability should be considered a baseline requirement, not a differentiator.

**Swedish trust** — The retailer must be recognisable and trusted by Swedish readers. Both Bokus and Adlibris qualify. Unknown or unfamiliar retailers would undermine the recommendation's credibility.

**Affiliate availability** — A formal affiliate program is required for any retailer to be primary. Informal arrangements or manual link construction without tracking are not sustainable.

**Deeplink support** — The system must be able to link to a specific book, not a retailer homepage or a search result. Both Bokus and Adlibris support deeplinks via ISBN-based URLs. This is a hard requirement.

**Brand fit** — The retailer must not feel discount-heavy, marketplace-like, or transactional in a way that conflicts with Bokhyllan's voice. Bokus and Adlibris both present as straightforward book retailers, which is acceptable. Neither should be described or named in a promotional way in the UI.

**Conversion potential** — Conversions from Bokhyllan are expected to be quiet and low-friction. Users arrive with a specific recommendation. Retailer familiarity and direct product deeplinks are the primary conversion factors, not retailer-side features.

**User experience** — The path from recommendation to retailer must be a single click. No intermediate pages, no retailer selection, no price comparison. One button. One destination.

**Future flexibility** — The architecture must allow the primary retailer to be swapped without changes to the UI layer.

---

## What the UI Must Never Expose

The UI layer must have no knowledge of the affiliate mechanics. Specifically:

- No affiliate network name (Tradedoubler, Adtraction, Awin)
- No tracking IDs or publisher IDs in visible URLs or page source in a way that identifies them as affiliate tracking
- No retailer logo, retailer branding, or promotional copy in the recommendation UI
- No price, availability status, or stock level pulled from a retailer feed
- No "as seen on" or "available at" framing
- No A/B testing of retailers surfaced through the UI

The CTA label ("Hitta boken") is retailer-neutral and must remain so. It is not "Köp på Bokus" or "Se pris på Adlibris."

---

## Recommended Architecture

```
UI (CTA button)
    ↓
affiliate boundary
    ↓
createAffiliateLink(request: AffiliateLinkRequest)
    ↓
retailer adapter  ←  provider adapter
(bokus | adlibris | generic)   (tradedoubler | adtraction | direct | mock)
    ↓
AffiliateLinkResult { url, label, retailer, provider, isAffiliate }
    ↓
retailer product page (deeplink via ISBN)
```

The `affiliateClient.ts` function is the only public interface. Everything below it is an implementation detail. The result type is already defined and correct — it contains only what the UI needs: a url and a label.

The ISBN field already exists on `AffiliateLinkRequest`. URL construction should be ISBN-first. Title/author are fallbacks for retailers that do not support ISBN deeplinks.

**To activate Bokus production links**, replace the safe placeholder in the Bokus adapter with an approved provider implementation. Keep publisher identifiers, tracking parameters, redirect templates, and credentials in approved configuration only; do not commit them to the repository.

---

## Future Considerations

**Stock fallback** — If a title is unavailable at the primary retailer, the system should fall back to the secondary. This requires either a stock-check API call at request time (adds latency and a live dependency) or a pre-verified fallback order per book in the book data. The simpler solution is to verify availability manually when adding a book and define a per-book preferred retailer.

**Multiple retailers** — Offering the user a choice of retailer ("Bokus / Adlibris") would make the product feel like a comparison tool. This conflicts with the single-placement principle. Multiple retailers should only exist as an internal fallback, never as a user-facing choice.

**Local bookshop option** — Akademibokhandeln is the most plausible "local bookshop" option at scale, and carries a strong trust signal. It is not a viable primary affiliate due to limited deeplink support and no standard affiliate program. A possible future direction: a static "also available at your local bookshop" line with no link, which acknowledges independent retail without requiring integration. This keeps the product honest without implying ecommerce infrastructure.

**Transparency text** — A short, honest disclosure belongs somewhere accessible (footer or about page): that links to retailers may generate a small commission that supports Bokhyllan. The tone should match the product — matter-of-fact, not apologetic, not marketing.

Example: *"Länkarna till bokhandel kan ge Bokhyllan en liten provision. Det påverkar aldrig vilka böcker vi rekommenderar."*

**Legal and privacy** — Affiliate links involve tracking. Depending on implementation, a Tradedoubler redirect may set a cookie or pass a session identifier. This must be covered in Bokhyllan's privacy notice. The standard Swedish/EU requirement is to disclose affiliate relationships and any associated tracking in the cookie policy. No additional user consent is required for affiliate tracking that does not involve personal profiling, but the disclosure must exist.

---

## Summary

| Decision | Direction |
|---|---|
| Primary retailer | Bokus |
| Primary affiliate network | Tradedoubler |
| Fallback retailer | Adlibris |
| Link construction | ISBN-based deeplink |
| UI exposure | None — retailer is invisible |
| CTA label | "Hitta boken" (retailer-neutral) |
| Multiple-retailer UI | Never |
| Disclosure | Plain text on about/footer page |
