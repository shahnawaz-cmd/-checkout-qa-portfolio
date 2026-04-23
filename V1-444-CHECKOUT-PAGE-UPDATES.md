# V1-444 — Checkout Page Updates (V1)

**Ticket:** V1-444
**Title:** Checkout Page Updates
**Type:** Story
**Priority:** High
**Reporter:** Zain Khan
**Assignee:** AKINADE AYODEJI TIMOTHEW (Dev)
**QA:** Muhammad Shahnawaz
**Created:** 18 Mar 2025
**Resolved:** 14 May 2025
**Fix Version:** Release V3.2
**Related Ticket:** V1-448
**Final Status:** ✅ Done — PRODUCTION CIT PASSED
**Design Reference:** [Figma — Checkout Page Redesign](https://www.figma.com/design/EuyEep746ZV00AoGIVYEgb/Checkout_Page_Redesign?node-id=0-1&p=f)

---

## 📋 Summary

The checkout page had poor mobile UX — the credit card form was not visible without scrolling on small screens. Three UI improvements were required alongside a coupon bug fix for the Window Sticker (WS) flow.

### Requirements

| # | Requirement |
|---|-------------|
| 1 | Remove site logo and VIN from checkout (mobile view) — brings the credit card form higher up |
| 2 | Update "Guaranteed Secure Checkout" section text and icons |
| 3 | Update customer reviews section |
| 4 | Fix bug: coupon from WS preview page applies successfully but does not reduce the price |

---

## 🐛 Bugs Found During QA Cycles

### Round 1 — 20 Mar 2025

| # | Issue | Status |
|---|-------|--------|
| 1 | Review date shows "2 days ago" instead of actual date (Mar 16, 2025) | ❌ Failed |
| 2 | All reviews show "…" truncation — full review text not shown on desktop or mobile | ❌ Failed |
| 3 | WS coupon issue — dev claims fixed locally; Cloudflare cache may be masking it | ⚠️ Inconclusive |

**DEV CIT: ❌ FAILED**

---

### Round 2 — 22 Apr 2025

| # | Issue | Evidence |
|---|-------|---------|
| 1 | Review slider pagination dots overlaying review text — unreadable due to z-index/padding/positioning CSS issue | [jam.dev](https://jam.dev/c/8ac5bb5d-daae-4697-8f56-a22fb5ece62f) |
| 2 | Coupon on checkout page returns success message but price does not change | [jam.dev](https://jam.dev/c/f218fa96-612f-4054-a2de-d71d06c71001) |
| 3 | UI issue: missing space after "Package" label — shows "Package1 Premium Report With Sticker" instead of "Package 1 Premium Report With Sticker" | — |

**Status:** Sent back to dev.

---

### Round 3 — 24–25 Apr 2025

| # | Issue | Evidence |
|---|-------|---------|
| 1 | Review carousel pagination dot does not update when navigating — active dot stays stuck on first position | [jam.dev](https://jam.dev/c/ed3ac9c4-f61e-44ab-9619-08f3b50f8af5) |

**Status:** Sent back to dev.

---

### Round 4 — 26 Apr 2025

| # | Issue | Evidence |
|---|-------|---------|
| 1 | Member Area — purchasing credits shows 10 images on checkout page (new bug found) | [jam.dev](https://jam.dev/c/332a6d40-baf4-44e5-9023-1a344872c704) |

**Reported issue fixed:** [jam.dev](https://jam.dev/c/b32488c8-e107-4e8f-9dda-7606d3294d6f)
**DEV CIT: ✅ PASSED** (main issues resolved; Member Area image bug logged separately)

---

### Round 5 — 28 Apr 2025

**All reported issues verified fixed:** [jam.dev](https://jam.dev/c/d631c051-0469-4346-aedf-d9271291b833)
**DEV CIT: ✅ PASSED**

---

### Production — 14 May 2025

**PRODUCTION CIT: ✅ PASSED**
Comment left in related ticket V1-448.

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-V1-001 | Credit card form visible without scrolling on mobile | 1. Open checkout on mobile (small screen) | Card form visible in viewport; no scrolling needed | ✅ PASSED |
| TC-V1-002 | Site logo and VIN removed from mobile checkout | 1. Open checkout on mobile | Logo and VIN not displayed; form positioned higher | ✅ PASSED |
| TC-V1-003 | Secure checkout section updated with correct text and icons | 1. Open checkout 2. Check secure checkout section | Updated text and icons displayed correctly | ✅ PASSED |
| TC-V1-004 | Reviews section updated with new content | 1. Open checkout 2. Check reviews section | New reviews displayed; full text visible (no truncation) | ✅ PASSED |
| TC-V1-005 | Review dates show actual date not relative time | 1. Open checkout 2. Check review dates | Dates shown as e.g. "Mar 16, 2025" not "2 days ago" | ✅ PASSED |
| TC-V1-006 | Full review text visible on desktop and mobile | 1. Open checkout on desktop and mobile | No "…" truncation; full review text shown | ✅ PASSED |
| TC-V1-007 | WS coupon reduces price on checkout | 1. Come from WS preview page with coupon 2. Check checkout price | Price reduced by coupon amount | ✅ PASSED |
| TC-V1-008 | Coupon applied on checkout page reduces price | 1. Enter coupon on checkout 2. Click Apply | Success message shown AND price updates | ✅ PASSED |
| TC-V1-009 | Review carousel pagination dot updates on navigation | 1. Click arrow to navigate reviews | Active dot moves to reflect current review | ✅ PASSED |
| TC-V1-010 | Review slider pagination dots do not overlay text | 1. Open checkout 2. View reviews | Dots positioned below text; no overlap; text readable | ✅ PASSED |
| TC-V1-011 | Package label has correct spacing | 1. Open checkout 2. Check package label below coupon field | Shows "Package 1 Premium Report With Sticker" with space | ✅ PASSED |
| TC-V1-012 | Member Area credit purchase shows correct number of images | 1. Purchase credits from Member Area 2. View checkout | Normal number of images shown; not 10 | ✅ PASSED |
| TC-V1-013 | WS sticker generation uses correct decode format for pre-1999 VINs | 1. Use Auto=auto with pre-1999 VIN 2. Generate sticker | Sticker generated using form route data, not reverse decode | ✅ PASSED |
| TC-V1-014 | Checkout mobile layout matches Figma design reference | 1. Open checkout on mobile 2. Compare with Figma | Layout matches design spec | ✅ PASSED |

**Total: 14 | Passed: 14 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Key Finding |
|-------|------|--------|-------------|
| R1 | 20 Mar 2025 | ❌ FAILED | Review dates wrong; text truncated; coupon inconclusive (Cloudflare cache) |
| R2 | 22 Apr 2025 | ❌ FAILED | Pagination dots overlaying text; coupon not reducing price; label spacing issue |
| R3 | 24–25 Apr 2025 | ❌ FAILED | Pagination dot not updating on navigation |
| R4 | 26 Apr 2025 | ✅ DEV PASSED | Main issues fixed; Member Area image bug found (new) |
| R5 | 28 Apr 2025 | ✅ DEV PASSED | All issues verified fixed |
| PRODUCTION | 14 May 2025 | ✅ PASSED | Full production sign-off |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| Initial implementation (3 key points + coupon fix) | [jam.dev](https://jam.dev/c/bf61e07f-f156-4915-ad8c-aef6030fdf0d) / [jam.dev](https://jam.dev/c/2eef6e6e-aa70-413a-97a4-0cf46d59b546) |
| Review UI fix (19 Apr) | [jam.dev](https://jam.dev/c/4b6d3350-52eb-4e0c-a21b-a6ecafdc1d0b) |
| Pagination dot overlay issue | [jam.dev](https://jam.dev/c/8ac5bb5d-daae-4697-8f56-a22fb5ece62f) |
| Coupon not reducing price | [jam.dev](https://jam.dev/c/f218fa96-612f-4054-a2de-d71d06c71001) |
| Pagination dot not updating | [jam.dev](https://jam.dev/c/ed3ac9c4-f61e-44ab-9619-08f3b50f8af5) |
| Small screen mobile fix | [jam.dev](https://jam.dev/c/c83acc10-a12c-40c6-bcdf-f02d6ae2799d) |
| Points #1, #2, #3 fixed (23 Apr) | [jam.dev](https://jam.dev/c/a782db64-a52e-4ad1-8596-87c160c9327f) / [jam.dev](https://jam.dev/c/69f1bf59-2323-4b37-9071-248047fa939a) |
| Pagination fix verified (25 Apr) | [jam.dev](https://jam.dev/c/e492bdbc-315e-4615-8448-3bd37edaf825) |
| Member Area 10 images bug | [jam.dev](https://jam.dev/c/332a6d40-baf4-44e5-9023-1a344872c704) |
| Reported issue fixed (26 Apr) | [jam.dev](https://jam.dev/c/b32488c8-e107-4e8f-9dda-7606d3294d6f) |
| DEV CIT PASSED (28 Apr) | [jam.dev](https://jam.dev/c/d631c051-0469-4346-aedf-d9271291b833) |
| WS sticker pre-1999 VIN fix | [jam.dev](https://jam.dev/c/6f61f12e-8cf2-446d-9d93-c5b957327227) |

---

## 📝 Notes

- Took 6 QA rounds over ~2 months (Mar–May 2025) before production sign-off
- Cloudflare cache caused confusion in R1 — always clear cache before DEV CIT
- WS sticker pre-1999 VIN bug was found as a side issue during QA and fixed in the same ticket
- Dev time logged: ~1d 1h 44m total
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 14 May 2025 | Release: V3.2*
