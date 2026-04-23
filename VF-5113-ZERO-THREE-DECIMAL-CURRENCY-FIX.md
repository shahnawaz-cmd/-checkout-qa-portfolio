# VF-5113 — Fix Zero and Three Decimal Currencies

**Ticket:** VF-5113
**Title:** Fix Zero and Three Decimal Currencies
**Type:** Story
**Priority:** Medium
**Reporter:** Rochi Berardo
**Assignee:** AKINADE AYODEJI TIMOTHEW (Dev)
**QA:** Muhammad Shahnawaz
**Created:** 12 Jun 2023
**Resolved:** 26 Jun 2023
**Sprint:** VHR-Scrum
**Final Status:** ✅ Done — Production CIT Passed
**Stripe Reference:** [Stripe Zero-Decimal Currencies Docs](https://stripe.com/docs/currencies#zero-decimal)

---

## 📋 Summary

Stripe handles currencies differently based on their decimal structure. This ticket fixed incorrect amount handling for **zero-decimal** and **three-decimal** currencies when processing payments through Stripe.

---

## 🐛 Problem

Stripe requires amounts to be passed in the **smallest currency unit**:

| Currency Type | Example | Stripe Expects | Wrong Behaviour (Before Fix) |
|--------------|---------|---------------|------------------------------|
| 2-decimal (standard) | USD $10.00 | `1000` (cents) | ✅ Was working |
| 0-decimal | JPY ¥10 | `10` (no multiplier) | ❌ Was sending `1000` (100× too much) |
| 3-decimal | KWD 10.000 | `10000` (fils) | ❌ Was sending incorrect amount |

Sending the wrong amount to Stripe results in:
- Customer overcharged or undercharged
- Payment failures due to amount mismatch
- Admin order showing incorrect price

---

## ✅ Fix Applied

- **Zero-decimal currencies** (e.g., JPY, KRW, VND, BIF, CLP, GNF, MGA, PYG, RWF, UGX, XAF, XOF, XPF): Amount sent to Stripe as-is (no multiplication by 100)
- **Three-decimal currencies** (e.g., KWD, BHD, JOD, OMR, TND): Amount multiplied by 1000 (fils/pence equivalent)
- **Two-decimal currencies** (e.g., USD, EUR, GBP): Amount multiplied by 100 (cents) — unchanged

---

## 🧪 Test Cases

| TC ID | Title | Currency | Amount | Stripe Payload | Expected | Status |
|-------|-------|----------|--------|---------------|----------|--------|
| TC-DEC-001 | Zero-decimal JPY — correct amount sent | JPY | ¥1000 | `1000` (not `100000`) | Payment succeeds; admin shows ¥1000 | ✅ PASSED |
| TC-DEC-002 | Zero-decimal KRW — correct amount sent | KRW | ₩5000 | `5000` (not `500000`) | Payment succeeds; admin shows ₩5000 | ✅ PASSED |
| TC-DEC-003 | Zero-decimal VND — correct amount sent | VND | ₫50000 | `50000` | Payment succeeds; admin shows correct amount | ✅ PASSED |
| TC-DEC-004 | Three-decimal KWD — correct amount sent | KWD | KD 10.000 | `10000` (fils) | Payment succeeds; admin shows KD 10.000 | ✅ PASSED |
| TC-DEC-005 | Three-decimal BHD — correct amount sent | BHD | BD 5.000 | `5000` | Payment succeeds; admin shows BD 5.000 | ✅ PASSED |
| TC-DEC-006 | Two-decimal USD — unaffected by fix | USD | $29.99 | `2999` (cents) | Payment succeeds; admin shows $29.99 | ✅ PASSED |
| TC-DEC-007 | Two-decimal EUR — unaffected by fix | EUR | €19.99 | `1999` | Payment succeeds; admin shows €19.99 | ✅ PASSED |
| TC-DEC-008 | Zero-decimal currency — admin shows correct price (no inflation) | JPY | ¥1000 | — | Admin does not show ¥100000 | ✅ PASSED |
| TC-DEC-009 | Three-decimal currency — admin shows correct price | KWD | KD 10.000 | — | Admin shows KD 10.000, not KD 10000.000 | ✅ PASSED |
| TC-DEC-010 | Coupon applied on zero-decimal currency — correct discounted amount | JPY + coupon | ¥1000 → ¥800 | `800` | Stripe charged ¥800; admin shows ¥800 | ✅ PASSED |

**Total: 10 | Passed: 10 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 | 26 Jun 2023 | ✅ Production CIT Passed | Single round — clean pass |

---

## 📝 Stripe Zero-Decimal Currency Reference

Currencies that require **no decimal multiplication** (send amount as integer):

`BIF · CLP · DJF · GNF · JPY · KMF · KRW · MGA · PYG · RWF · UGX · VND · VUV · XAF · XOF · XPF`

Currencies that use **three decimal places** (multiply by 1000):

`BHD · JOD · KWD · OMR · TND`

---

## 📝 Notes

- Fast turnaround — resolved in 14 days with a single QA round
- Fix affects all checkout branches where non-standard currencies are supported
- Dev time logged: ~6h 14m total
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 26 Jun 2023*
