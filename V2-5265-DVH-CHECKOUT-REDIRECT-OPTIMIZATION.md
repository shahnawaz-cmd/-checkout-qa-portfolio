# V2-5265 — Improve DVH Checkout Redirect Time

**Ticket:** V2-5265
**Title:** Improve DVH Checkout Redirect Time
**Type:** Story
**Priority:** Medium (originally Highest)
**Reporter:** Zain Khan
**Assignee:** Muhammad Ahmed (Dev)
**QA:** Muhammad Shahnawaz
**Created:** 24 Mar 2026
**Resolved:** 23 Apr 2026
**Sprint:** V2 Sprint 95 → V2 Sprint 96
**Parent Epic:** V2-4867 — DVH Next.js
**Final Status:** ✅ Done — PRODUCTION Build Verified

---

## 📋 Summary

Checkout redirection from the preview page (after email submission) was taking ~30 seconds. The goal was to bring this consistently under 10 seconds across all flows including Report, Sticker, and Home Collection.

---

## 🐛 Issues Found During QA Cycles

### Round 1 — 03 Apr 2026 (Initial Build Verification)

| Area | Result |
|------|--------|
| Checkout load time | ✅ First attempt ~10s, subsequent <8s |
| Coupon functionality | ✅ Valid/invalid checks working |
| Checkout logs | ✅ Generated correctly |
| Pending order creation | ✅ Working with all parameters |
| Home collection flow | ✅ End-to-end verified |
| DVH order location | ⚠️ Intermittent N/A on some orders |

**Status:** Build verified. N/A location issue noted as non-blocker.

---

### Round 2 — 06–07 Apr 2026 (Location Mapping Regression)

| # | Issue | Details |
|---|-------|---------|
| 1 | Location mapping incorrect in DEV | PK IP → Admin shows Country=FR, State=Marseille. IP Lookup API returns correct data but DEV checkout not applying it |
| 2 | Two orders for same email — one returns N/A, one returns full data | Inconsistent location resolution |
| 3 | Admin shows N/A / always US Manassas | Location stuck on wrong value |
| 4 | Local IP (PK) — empty checkout logs | Missing payment processing responses |

**Status:** ❌ DEV CIT FAILED — sent back to dev.

---

### Round 3 — 14 Apr 2026 (Currency & Coupon Regression)

| # | Issue | Evidence |
|---|-------|---------|
| 1 | Local IP (PK) + JPY currency — location shows "untrackable"; after coupon applied, admin shows US location (CWA Register API remote address overrides) | [jam.dev](https://jam.dev/c/972775fd-b714-4f4d-97a6-b3f9a42a731f) |
| 2 | Coupon pricing passed to CWA Register API is wrong; API response price is correct | [jam.dev](https://jam.dev/c/972775fd-b714-4f4d-97a6-b3f9a42a731f) |
| 3 | KRW IP (VPN) + USD site setting — Home Collection shows Country=US instead of KR | [jam.dev](https://jam.dev/c/1d76c706-65ab-45a1-8e19-5c9c7d84f7b6) |
| 4 | NGN IP — initial order shows N/A location; plan+upsell shows "untrackable"; CWA_Sticker_Register API returns wrong currency sign & price (EU) | [jam.dev](https://jam.dev/c/c449ad60-7838-4a2d-a119-28b52b466e96) |

**Status:** ❌ DEV CIT FAILED

---

### Round 4 — 17–18 Apr 2026 (Post-Fix Verification)

| Area | Result | Notes |
|------|--------|-------|
| Checkout optimization | ✅ Working as expected | Verified across multiple IP switches |
| P#1 reported issues | ✅ All resolved | [jam.dev](https://jam.dev/c/7310ea42-ef36-4719-aaa7-c451345f96fa) |
| Coupon + CWA Register API on IP switch | ❌ API returns 500 | Frontend shows discounted price correctly; backend pending order shows wrong pricing |
| Currency display in admin | ❌ Currency sign mismatch | Admin shows sign from 2nd currency but price from 1st currency |
| IPv6 — Country/State on order page | ❌ Missing | Location not populated for IPv6 users |

**Status:** Regression issues identified — non-blocker but critical for release.

---

### Round 5 — 21–22 Apr 2026 (Sanity & Regression)

| Area | Result |
|------|--------|
| Checkout optimization | ✅ Stable |
| Member Area — duplicate plan purchase | ❌ Re-introduced (branch regression from Mudassir's branch) |
| Sign-up location tracking | ❌ Shows "untraceable" |
| Coupon persistence on refresh | ❌ Coupon reset on page refresh |

**Status:** Sanity passed. 3 regression issues found — fixes requested before release.

---

### Round 6 — 22–23 Apr 2026 (PROD Build Verification) ✅

| Area | Result |
|------|--------|
| Location update in Admin | ✅ Fixed — updates correctly, verified across multiple IPs |
| Checkout redirection time | ✅ Consistently under 10 seconds |
| Checkout flow | ✅ Stable |
| Location mapping | ✅ Correct |
| Currency detection | ✅ Accurate |
| Coupon functionality | ✅ Working |
| Logs behavior | ✅ Normal |
| Pending order creation | ✅ Stable |
| Home collection flow | ✅ No issues |

**Status:** ✅ PRODUCTION CIT PASSED — all issues resolved.

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-DVH-001 | Checkout redirect completes under 10 seconds | 1. Enter email on preview page 2. Submit | Redirect to checkout in <10s | ✅ PASSED |
| TC-DVH-002 | Subsequent checkout redirects under 8 seconds | 1. Repeat checkout flow | All subsequent redirects <8s | ✅ PASSED |
| TC-DVH-003 | Sticker flow redirect optimized | 1. Select sticker product 2. Submit email on preview | Redirect <10s | ✅ PASSED |
| TC-DVH-004 | Report flow redirect optimized | 1. Select report product 2. Submit email on preview | Redirect <10s | ✅ PASSED |
| TC-DVH-005 | Location correctly mapped in admin (non-US IP) | 1. Use VPN (PK/KR/NG IP) 2. Complete checkout | Admin shows correct country/state matching IP | ✅ PASSED |
| TC-DVH-006 | Location not overridden by CWA Register API remote address | 1. Apply coupon 2. Check admin order location | Location reflects user IP, not API server IP | ✅ PASSED |
| TC-DVH-007 | Currency sign and price consistent in admin | 1. Complete checkout with non-USD currency | Admin shows matching currency sign and price | ✅ PASSED |
| TC-DVH-008 | Coupon pricing correct in CWA Register API payload | 1. Apply coupon 2. Inspect CWA Register API request | Discounted price sent correctly in payload | ✅ PASSED |
| TC-DVH-009 | IPv6 — Country/State populated on order page | 1. Use IPv6 connection 2. Complete checkout | Country and State fields populated in admin | ✅ PASSED |
| TC-DVH-010 | Coupon persists on page refresh | 1. Apply coupon 2. Refresh checkout page | Coupon still applied after refresh | ✅ PASSED |
| TC-DVH-011 | Member Area — duplicate plan purchase works | 1. Purchase plan 2. Attempt to purchase same plan again from Member Area | Purchase succeeds without error | ✅ PASSED |
| TC-DVH-012 | Sign-up location tracked correctly | 1. Sign up with non-US IP | Location field shows correct country, not "untraceable" | ✅ PASSED |
| TC-DVH-013 | Checkout logs generated with payment responses | 1. Complete checkout 2. Check logs | All payment processing responses logged; no missing entries | ✅ PASSED |
| TC-DVH-014 | Pending order created with correct parameters | 1. Load checkout page | Pending order in admin has correct currency, location, gateway | ✅ PASSED |
| TC-DVH-015 | Home collection flow end-to-end | 1. Complete home collection checkout | Flow completes; order created correctly | ✅ PASSED |

**Total: 15 | Passed: 15 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Key Finding |
|-------|------|--------|-------------|
| R1 | 03 Apr 2026 | ✅ Build verified | Intermittent N/A location (non-blocker) |
| R2 | 06–07 Apr 2026 | ❌ FAILED | Location mapping wrong in DEV; empty logs |
| R3 | 14 Apr 2026 | ❌ FAILED | Coupon API pricing wrong; currency sign mismatch; IPv6 location missing |
| R4 | 17–18 Apr 2026 | ⚠️ PARTIAL | Main fix verified; 3 new regressions found |
| R5 | 21–22 Apr 2026 | ⚠️ PARTIAL | Sanity passed; duplicate plan + location + coupon refresh issues |
| R6 (PROD) | 22–23 Apr 2026 | ✅ PASSED | All issues resolved; production verified |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| R1 — Checkout optimization verified | [jam.dev](https://jam.dev/c/62c051b0-c125-41ee-9517-234fa53e7e8e) |
| R3 — JPY + coupon location/pricing issue | [jam.dev](https://jam.dev/c/972775fd-b714-4f4d-97a6-b3f9a42a731f) |
| R3 — KRW IP home collection location | [jam.dev](https://jam.dev/c/1d76c706-65ab-45a1-8e19-5c9c7d84f7b6) |
| R3 — NGN IP currency/price mismatch | [jam.dev](https://jam.dev/c/c449ad60-7838-4a2d-a119-28b52b466e96) |
| R4 — All reported issues fixed | [jam.dev](https://jam.dev/c/7310ea42-ef36-4719-aaa7-c451345f96fa) |
| Screen recordings (Apr 03) | screen_recording_20260403_205909.webm, screen-capture.webm |
| Screen recordings (Apr 07) | screen_recording_20260407_165109.webm |
| Screen recordings (Apr 20) | screen_recording_20260420_153916.webm, screen_recording_20260420_171800.webm |

---

## 📝 Notes

- Original redirect time: ~30 seconds. Target: <10 seconds. Achieved: consistently <10s (first attempt), <8s (subsequent)
- Location override bug root cause: CWA Register API was using its own server remote address instead of the user's IP
- Currency mismatch root cause: admin was picking up currency sign from a second API call instead of the initial registration
- Dev time logged: ~2d 3h 35m total
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 23 Apr 2026*
