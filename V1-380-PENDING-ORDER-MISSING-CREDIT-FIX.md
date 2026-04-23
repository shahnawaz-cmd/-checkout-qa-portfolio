# V1-380 — Resolve Pending Order and Missing Credit Issue in User Account

**Ticket:** V1-380
**Title:** Resolve Pending Order and Missing Credit Issue in User Account
**Type:** Story
**Priority:** Medium
**Reporter / QA:** Muhammad Shahnawaz
**Assignee:** AKINADE AYODEJI TIMOTHEW (Dev)
**Created:** 31 Dec 2024
**Resolved:** 08 Feb 2025
**Fix Version:** Release V2.9
**Final Status:** ✅ Done — PRODUCTION CIT PASSED

---

## 📋 Summary

Two edge-case bugs identified through exploratory testing involving multi-session pending orders and missing credits after gateway switching. A third requirement was added to improve payment logging.

---

## 🐛 Issues Reported

### Issue 1 — Multi-Session Pending Order Conflict (Sticker vs Report)

**Scenario:**
1. Browser A: User creates pending order for **Sticker** (checkout stays open)
2. Browser B: Same user (same email + VIN) creates pending order for **Report**
3. V1 updates the pending order to Report — both sessions remain active

**Bug 1a:** If payment is made from Browser A (Sticker session) → Stripe processes Sticker payment → user stuck in pending state
**Evidence:** [jam.dev](https://jam.dev/c/5a28def1-aeee-4a45-aa3f-e1f06ed6be2e)

**Bug 1b:** If payment is made from Browser B (Report session) → user redirected to wrong tab after payment
**Evidence:** [jam.dev](https://jam.dev/c/67b21af0-6aae-4140-a372-49ecdc7e006a)

**Fix:** System now detects stale/conflicting sessions and shows appropriate error message instead of processing the wrong product. Same scenario also handled for PayPal.
**Dev evidence:** [jam.dev](https://jam.dev/c/8ec02276-de42-42df-9c25-24398c4aaea9)

---

### Issue 2 — Missing Credit After PayPal Cancel → Stripe Payment

**Scenario:**
1. User initiates PayPal payment → cancels from PayPal window
2. User then completes payment using Stripe
3. Order is updated correctly BUT user does not receive the credit

**Evidence:** [jam.dev](https://jam.dev/c/88bd4e73-dac1-42bb-966d-c6a132f6b853)

**Fix:** PayPal cancellation redirect fixed (was redirecting to APP domain instead of checkout). Credit delivery after gateway switch now works correctly.
**Dev evidence:** [jam.dev](https://jam.dev/c/778d0c4a-da07-42e2-9f5e-4b968c61d8d0)

---

### Issue 3 — Payment Success Response Logging

**Requirement:** Store payment success responses from Stripe, PayPal, Gumroad, and Paystack in a log file for audit and debugging purposes.

**Fix:** Implemented for Stripe and Paystack (as agreed with Ahsan and Zain on dev call).

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-ORD-001 | Stale session payment blocked with error message | 1. Open Sticker checkout (Browser A) 2. Open Report checkout (Browser B, same email+VIN) 3. Pay from Browser A | Error message shown; payment not processed for wrong product | ✅ PASSED |
| TC-ORD-002 | Correct tab shown after Report payment (multi-session) | 1. Open Sticker (Browser A) + Report (Browser B) 2. Pay from Browser B | User redirected to correct Report tab after payment | ✅ PASSED |
| TC-ORD-003 | PayPal multi-session conflict handled | 1. Same multi-session scenario using PayPal | PayPal payment for stale session blocked; error shown | ✅ PASSED |
| TC-ORD-004 | Credit received after PayPal cancel → Stripe payment | 1. Initiate PayPal 2. Cancel from PayPal window 3. Pay via Stripe | Order updated AND credit delivered to user account | ✅ PASSED |
| TC-ORD-005 | PayPal cancel redirects to checkout (not APP domain) | 1. Initiate PayPal 2. Cancel payment | User redirected back to checkout page; not APP domain | ✅ PASSED |
| TC-ORD-006 | Stripe payment success response logged | 1. Complete Stripe payment 2. Check log file | Stripe success response stored in log | ✅ PASSED |
| TC-ORD-007 | Paystack payment success response logged | 1. Complete Paystack payment 2. Check log file | Paystack success response stored in log | ✅ PASSED |
| TC-ORD-008 | Normal single-session Sticker purchase unaffected | 1. Single browser Sticker purchase | Normal flow; no error; product delivered | ✅ PASSED |
| TC-ORD-009 | Normal single-session Report purchase unaffected | 1. Single browser Report purchase | Normal flow; no error; product delivered | ✅ PASSED |
| TC-ORD-010 | Credit delivered on normal Stripe payment | 1. Complete Stripe payment (no gateway switch) | Credit delivered immediately | ✅ PASSED |

**Total: 10 | Passed: 10 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 | 15 Jan 2025 | ⚠️ Partial | Issue 1 fixed for Stripe only; PayPal multi-session not handled; PayPal cancel redirect wrong |
| R2 | 16 Jan 2025 | ✅ DEV PASSED | PayPal multi-session handled; cancel redirect fixed; both issues verified |
| Production | 08 Feb 2025 | ✅ PASSED | Full production sign-off |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| Issue 1a — Sticker payment stuck in pending | [jam.dev](https://jam.dev/c/5a28def1-aeee-4a45-aa3f-e1f06ed6be2e) |
| Issue 1b — Wrong tab redirect after Report payment | [jam.dev](https://jam.dev/c/67b21af0-6aae-4140-a372-49ecdc7e006a) |
| Issue 2 — Missing credit after PayPal cancel → Stripe | [jam.dev](https://jam.dev/c/88bd4e73-dac1-42bb-966d-c6a132f6b853) |
| R1 — PayPal multi-session still allows payment | [jam.dev](https://jam.dev/c/a7ed1a16-be71-4484-8af4-1fb166cc9e78) |
| R2 — PayPal multi-session fix | [jam.dev](https://jam.dev/c/8ec02276-de42-42df-9c25-24398c4aaea9) |
| R2 — PayPal cancel redirect fix | [jam.dev](https://jam.dev/c/778d0c4a-da07-42e2-9f5e-4b968c61d8d0) |
| Both issues verified fixed | [jam.dev](https://jam.dev/c/eca6703c-56c3-4f66-8530-cffd1e10f7ba) / [jam.dev](https://jam.dev/c/5aadb800-c5d2-4bc9-897a-dc8d9bf6e56b) |

---

## 📝 Notes

- Issue 1 was a complex multi-session edge case — required separate handling for Stripe and PayPal
- Issue 2 (PayPal cancel → Stripe credit) was initially questioned by dev as "unrealistic double payment" — clarified that the scenario is: user *cancels* PayPal (no charge) then pays via Stripe (single charge) — valid use case
- Payment logging implemented for Stripe and Paystack only (Gumroad/PayPal deferred per team decision)
- Dev time logged: ~4h total
- Released in **V2.9**

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 08 Feb 2025 | Release: V2.9*
