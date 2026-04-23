# V2-5342 — Duplicate Plan Purchase Bug (Pending Order Not Created in Admin)

**Ticket:** V2-5342
**Title:** Duplicate Plan Purchase Bug — Buying the same plan again does not create pending order in Admin
**Type:** Bug
**Priority:** —
**Reporter:** Hafsa Anjum
**Assignee:** Sebghatullah Yusuf Wakily (Dev)
**QA:** Muhammad Shahnawaz
**Created:** 11 Apr 2026
**Sprint:** V2 Sprint 96
**Parent Epic:** V2-4120 — Consumer Web Application (CWA) Development
**Current Status:** 🔄 QA to do (awaiting deployment to other properties)
**Evidence:** [jam.dev](https://jam.dev/c/9cdd8805-034c-4690-b0a3-004e51bddd20)

---

## 📋 Summary

When a customer attempted to purchase the same plan again (same Email + VIN + product source), the system did not create a pending order in Admin. This caused orders to go untracked, with potential revenue loss.

**Impact:** Orders not tracked → potential revenue loss

---

## 🐛 Issues Found During QA Cycles

### Round 1 — 16 Apr 2026 — Issues Found

**Scope tested:** Duplicate plan purchase (same Email + VIN, same product source) on CD Web → Checkout → Admin

| Area | Result |
|------|--------|
| Duplicate plan within 24hrs — blocked | ✅ Correctly blocked; no new pending order |
| Admin order tracking — no duplicate pending order | ✅ Working |
| Navigation — duplicate purchase routes to CWA | ❌ Still routing to Checkout instead of CWA |
| Stripe — form on duplicate purchase | ❌ Form missing; payment blocked |
| PayPal — duplicate purchase | ❌ Payment succeeds but creates conflicting pending order |

**Required fixes identified:**
- Redirect duplicate purchase (same Email + VIN + product source) directly to CWA
- Prevent duplicate pending orders via PayPal
- Align Stripe and PayPal gateway behavior for duplicate flow

**Evidence:** screen_recording_20260416_185654.webm
**Status:** ❌ Sent back to dev

---

### Round 2 — 17 Apr 2026 — DEV CIT PASSED

All reported issues resolved.
**Evidence:** [BetterBugs session](https://app.betterbugs.io/session/69e26ad53143a51084bad8e7)
**Status:** ✅ DEV CIT PASSED

---

### DVH Production — 22 Apr 2026 — PASSED

**Build Verification Summary:**
- Duplicate plan purchase flow (same Email + VIN, same product source) verified end-to-end
- Pending order creation and tracking working correctly in Admin
- No unintended duplicate pending orders
- Stripe and PayPal behavior aligned with updated logic
- Changes live on **DVH Production** ✅

**Status:** ✅ PASSED for DVH — ready to deploy to other properties

---

### Current Status — 23 Apr 2026

Dev deployed fix; ticket moved back to **QA to do** — awaiting verification on remaining properties.

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-DUP-001 | Duplicate plan purchase blocked within 24hrs | 1. Purchase plan 2. Attempt same plan (same Email + VIN) within 24hrs | Purchase blocked; no new pending order created | ✅ PASSED |
| TC-DUP-002 | Pending order created on first purchase | 1. Purchase plan for first time | Pending order appears in Admin immediately | ✅ PASSED |
| TC-DUP-003 | No duplicate pending order in Admin | 1. Attempt duplicate purchase | Admin shows only original order; no duplicate pending order | ✅ PASSED |
| TC-DUP-004 | Duplicate purchase redirects to CWA (not Checkout) | 1. Attempt duplicate purchase | User redirected to CWA flow; not old Checkout | ✅ PASSED |
| TC-DUP-005 | Stripe form present on duplicate purchase flow | 1. Attempt duplicate purchase via Stripe | Stripe card form visible and functional | ✅ PASSED |
| TC-DUP-006 | PayPal duplicate purchase does not create conflicting pending order | 1. Attempt duplicate purchase via PayPal | PayPal payment handled correctly; no conflicting pending order | ✅ PASSED |
| TC-DUP-007 | Stripe and PayPal behavior consistent on duplicate flow | 1. Test both gateways on duplicate purchase | Both gateways follow same logic; no inconsistency | ✅ PASSED |
| TC-DUP-008 | First-time purchase unaffected by fix | 1. New Email + VIN purchase | Normal flow; pending order created; no blocking | ✅ PASSED |
| TC-DUP-009 | DVH Production — duplicate flow end-to-end | 1. Test on DVH Production | All above cases pass on production | ✅ PASSED |
| TC-DUP-010 | Other properties — pending deployment verification | 1. Deploy to other properties 2. Retest | Same behavior expected across all properties | 🔄 Pending |

**Total: 10 | Passed: 9 | Pending: 1 (other properties)**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 | 16 Apr 2026 | ❌ Issues Found | Navigation wrong; Stripe form missing; PayPal duplicate pending order |
| R2 | 17 Apr 2026 | ✅ DEV PASSED | All issues fixed |
| DVH Production | 22 Apr 2026 | ✅ PASSED | End-to-end verified on DVH |
| Other Properties | Pending | 🔄 QA to do | Awaiting deployment |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| Original bug report | [jam.dev](https://jam.dev/c/9cdd8805-034c-4690-b0a3-004e51bddd20) |
| Dev fix | [jam.dev](https://jam.dev/c/7f49495e-8ffd-42ba-b68a-852ac1769e97) |
| DEV CIT PASSED | [BetterBugs](https://app.betterbugs.io/session/69e26ad53143a51084bad8e7) |
| R1 screen recording | screen_recording_20260416_185654.webm |

---

## 📝 Notes

- This bug was re-introduced from a branch regression (also seen in V2-5265 QA cycle)
- Fix logic: duplicate purchase detection based on Email + VIN + product source combination
- DVH Production verified ✅ — other properties pending deployment
- Dev time logged: ~6h 47m total

---

*QA Engineer: Muhammad Shahnawaz | DVH Production Verified: 22 Apr 2026 | Other Properties: Pending*
