# Final QA Report — Next.js Checkout Page
**Project:** Next.js Checkout Page (CWA)
**Environment:** DEV
**Testing Period:** 28 May 2025 – 29 May 2025
**Prepared By:** QA Engineer
**Report Date:** 23 April 2026

---

## 1. Executive Summary

Two rounds of QA testing were conducted on the CWA Next.js Checkout Page. Testing covered payment gateway routing, Stripe and PayPal flows, coupon logic, upsell API payloads, 3D Secure challenge scenarios, CAPTCHA/PIN flows, mobile 3DS flows, CAD currency handling, and UI parity with V1 checkout.

**Overall Result: ⚠️ CONDITIONAL PASS — Critical issues remain open**

| Metric | Value |
|--------|-------|
| Total Bugs Reported (Checkout) | 16 |
| Fixed After R2 | 9 |
| Still Open / Not Fixed | 7 |
| 3DS / Challenge Scenarios Tested | 14 |
| 3DS Issues Found | 2 failed + 1 partial |
| Total Test Cases | 47 |
| Passed | 23 |
| Failed | 11 |
| Not Yet Tested | 13 |

---

## 2. Testing Rounds Overview

### Round 1 — R1 (28 May 2025)
- 14 bugs reported, all marked FAILED/Open
- Covered: Stripe coupon sync, PayPal API errors, duplicate payment intents, session coupon leakage, upsell API, failover logic, CAD currency, UI parity

### Round 2 — R2 (29 May 2025)
- Re-tested all R1 bugs + 2 new bugs discovered (CHECK#015, CHECK#016)
- 9 bugs fixed and verified PASSED
- 5 bugs remain open or partially fixed
- 2 new bugs added to backlog

---

## 3. Bug Status by Category

### Payment & API (High Priority)

| Bug ID | Title | Final Status |
|--------|-------|-------------|
| CHECK#001 | Stripe price mismatch after coupon | ✅ Fixed |
| CHECK#002 | PayPal Create_Plan API 500 error | ✅ Fixed |
| CHECK#003 | Stripe error page missing UID / wrong price | ✅ Fixed |
| CHECK#004 | Duplicate Stripe entries on back navigation + coupon | ✅ Fixed |
| CHECK#005 | Coupon leaks to second order in same session | ✅ Fixed |
| CHECK#006 | Upsell Report missing from Register API payload | ❌ Open (Report+Sticker) |
| CHECK#007 | Stripe failure → PayPal tab missing PayPal option (VHR) | ❌ Open |
| CHECK#008 | Non-USD PayPal failover incorrectly triggered | ✅ Fixed |
| CHECK#009 | CAD currency shown as USD; sticker/report not triggered | ✅ Fixed |
| CHECK#010 | Duplicate Stripe entries from homepage coupon flow | ❌ Open |
| CHECK#011 | Multiple Stripe entries on back-and-forth navigation | ⚠️ Not re-tested |
| CHECK#013 | CAD pending order gateway shows Stripe instead of PayPal | ❌ Partial |
| CHECK#015 | CAD PayPal WS payment shows USD in admin | ❌ Open |

### UI / Design

| Bug ID | Title | Final Status |
|--------|-------|-------------|
| CHECK#012 | SH/Auction image missing on checkout | ✅ Fixed |
| CHECK#014 | Info icons below Pay button missing | ✅ Fixed |
| CHECK#016 | Testimonials carousel not looping correctly | ❌ Open |

### 3D Secure

| Bug ID | Title | Final Status |
|--------|-------|-------------|
| CHK#001 (3DS) | 3DS challenge error not logged on Stripe error page | ❌ Failed |
| CHK#003 (3DS) | 3DS supported card incorrectly triggers challenge | ❌ Failed |
| CHK#005 (3DS) | 3DS forced auth error (Case 2) not handled | ⚠️ Partial |

---

## 4. Open Issues Requiring Action Before Release

| Priority | Bug ID | Issue | Recommended Action |
|----------|--------|-------|--------------------|
| P1 | CHECK#006 | Report+Sticker upsell not in Register API payload | Fix API payload to include both products |
| P1 | CHECK#007 | PayPal option missing on PayPal tab for VHR | Ensure PayPal button renders for all product types |
| P1 | CHECK#010 | Duplicate Stripe payment intents from homepage coupon | Reuse/update existing payment intent instead of creating new |
| P1 | CHECK#013 | CAD pending order shows Stripe gateway | Set gateway to PayPal for all CAD orders |
| P1 | CHECK#015 | CAD PayPal WS payment shows USD in admin | Fix currency mapping for CAD PayPal WS orders |
| P2 | CHK#001 (3DS) | 3DS challenge error not logged on Stripe error page | Ensure frontend errors are also sent to Stripe error logging |
| P2 | CHK#003 (3DS) | 3DS supported card triggers unnecessary challenge | Review 3DS enforcement logic; don't force challenge for "supported" cards |
| P3 | CHECK#016 | Testimonials carousel order incorrect | Reorder reviews; ensure first visible review has English name |
| P3 | CHECK#011 | Multiple Stripe entries on back-and-forth navigation | Needs re-test after payment intent deduplication fix |

---

## 5. 3DS Testing Summary

All 3DS test card scenarios were executed. Key findings:

- **Mobile challenge flows (OOB, OTP, Multi-select):** All 6 scenarios PASSED ✅
- **CAPTCHA / PIN flows:** 2/3 PASSED; 1 not recorded
- **Standard 3DS flows:** 2 PASSED, 2 FAILED, 1 partial
  - Card `4000003720000278`: Frontend error not propagated to Stripe error page
  - Card `4000000000003055`: Incorrectly triggers challenge (should not)
  - Card `4000000000003097`: Case 2 (forced 3DS with error) not handled

---

## 6. Regression Summary (R1 → R2)

| Total R1 Bugs | Fixed in R2 | Regressed | New Bugs Found |
|--------------|-------------|-----------|----------------|
| 14 | 9 | 0 | 2 (CHECK#015, #016) |

No regressions were observed. All previously passing items remained stable.

---

## 7. Risk Assessment

| Risk | Level | Notes |
|------|-------|-------|
| Duplicate Stripe payment intents (CHECK#010, #011) | 🔴 High | Revenue impact — customers may be double-charged |
| Upsell report not created (CHECK#006) | 🔴 High | Product delivery failure for Report+Sticker upsell |
| CAD gateway mislabeled (CHECK#013, #015) | 🟡 Medium | Admin confusion; potential reporting errors |
| VHR PayPal option missing (CHECK#007) | 🟡 Medium | Blocks payment completion for VHR customers |
| 3DS error not logged (CHK#001) | 🟡 Medium | Reduces debuggability of payment failures |

---

## 8. Recommendations

1. **Do not release to production** until CHECK#006, CHECK#007, CHECK#010, and CHECK#015 are resolved — these directly impact payment processing and product delivery.
2. Re-test CHECK#011 after the payment intent deduplication fix is applied.
3. Conduct a focused 3DS regression after fixing CHK#001 and CHK#003.
4. Add automated checks for payment intent deduplication to prevent regression.
5. Verify CAD currency mapping end-to-end (checkout → Stripe/PayPal → admin panel) before CA market launch.

---

## 9. Sign-off

| Role | Name | Status |
|------|------|--------|
| QA Engineer | Shahnawaz | ✅ Report Complete |
| Developer | — | ⏳ Pending |
| Product Owner | — | ⏳ Pending |

---

## 10. Production Bug — V2-4448 (PayPal Checkout Updates)

**Ticket:** V2-4448 | **Priority:** High | **Status:** ✅ Done
**Resolved:** 19 March 2025 | **Evidence:** [jam.dev/c/32b81a28](https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3)

### Issues Fixed in Production

| # | Issue | Status |
|---|-------|--------|
| 1 | PayPal double charge — customer could re-pay by navigating back instead of clicking "Return to Merchant" | ✅ Fixed |
| 2 | Stripe visible for CAD customers — must be hidden | ✅ Fixed |
| 3 | Checkout page fails to load when only PayPal set in site settings | ✅ Fixed |

### QA Cycle: DEV → PRODUCTION

| Round | Date | Result |
|-------|------|--------|
| DEV CIT #1 | 14 Feb 2025 | ❌ FAILED |
| DEV CIT #2–4 | 17–21 Feb 2025 | ❌ FAILED |
| DEV CIT #5 | 22 Feb 2025 | ✅ PASSED |
| PRODUCTION CIT | 19 Mar 2025 | ✅ PASSED |

All 10 test cases for V2-4448 passed. No regressions observed on existing checkout flows.

---

*This report was generated from QA testing data collected across R1, R2, Sheet1 (3DS/CAPTCHA/Mobile flows), and V2-4448 production export.*
