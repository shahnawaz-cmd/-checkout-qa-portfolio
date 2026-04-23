# V2-5341 — Coupon Handling Bug (Wrong Input Resets Previous Coupon / Admin Shows Wrong Discount)

**Ticket:** V2-5341
**Title:** Coupon Handling Bug — Wrong coupon input resets previous coupon; Admin shows wrong discount
**Type:** Bug
**Priority:** High
**Reporter:** Hafsa Anjum
**Assignee:** Sebghatullah Yusuf Wakily (Dev)
**QA:** Muhammad Shahnawaz
**Created:** 11 Apr 2026
**Sprint:** V2 Sprint 96
**Parent Epic:** V2-4120 — Consumer Web Application (CWA) Development
**Current Status:** 🔄 QA to do (awaiting deployment to CWA, KOD, VNCA)
**Evidence:** [jam.dev](https://jam.dev/c/57fae05e-91ca-402c-96f7-5a5ae465b451)

---

## 📋 Summary

Two related coupon bugs:
1. Entering a **wrong/invalid coupon** after a valid one was applied caused the **previous valid coupon to be reset** — leaving the customer with no discount
2. **Admin showed incorrect discount** for orders where coupon was applied

**Impact:** Incorrect pricing → affects billing and customer trust

---

## 🐛 Bug Details

### Bug 1 — Wrong Coupon Input Resets Previous Valid Coupon
- User applies valid coupon → discount applied correctly
- User then types an invalid coupon code and submits
- System resets the previously applied valid coupon → no discount shown
- Expected: invalid coupon should show error; valid coupon should remain active

### Bug 2 — Admin Shows Wrong Discount
- After coupon applied and order placed, Admin order page displayed incorrect discount amount
- Caused billing discrepancies and reporting inaccuracies

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-CPN-001 | Valid → Invalid → Valid coupon flow | 1. Apply valid coupon A 2. Enter invalid coupon 3. Submit | Invalid coupon shows error; coupon A remains active; price unchanged | ✅ PASSED |
| TC-CPN-002 | Invalid coupon does not reset previous valid coupon | 1. Apply valid coupon 2. Enter wrong code 3. Submit | Previous coupon still applied; discount intact | ✅ PASSED |
| TC-CPN-003 | Valid coupon persists after session refresh | 1. Apply valid coupon 2. Refresh page | Coupon still applied; discounted price shown | ✅ PASSED |
| TC-CPN-004 | Admin shows correct discount after coupon applied | 1. Apply coupon 2. Complete payment 3. Check Admin order | Admin shows correct discount amount matching applied coupon | ✅ PASSED |
| TC-CPN-005 | Currency switching does not affect applied coupon | 1. Apply coupon 2. Switch currency | Coupon remains applied; discount recalculated in new currency correctly | ✅ PASSED |
| TC-CPN-006 | Multiple valid coupons — last applied wins | 1. Apply coupon A 2. Apply coupon B | Coupon B active; coupon A replaced; price reflects B | ✅ PASSED |
| TC-CPN-007 | Coupon stacking prevented | 1. Apply coupon A 2. Apply coupon B simultaneously | Only one coupon active at a time; no stacking | ✅ PASSED |
| TC-CPN-008 | Stripe payment with coupon — correct amount charged | 1. Apply coupon 2. Pay via Stripe | Stripe charged discounted amount; matches Admin | ✅ PASSED |
| TC-CPN-009 | PayPal tracking_id sync with coupon | 1. Apply coupon 2. Pay via PayPal | PayPal tracking_id synced correctly in API payload | ✅ PASSED |
| TC-CPN-010 | API payload integrity with coupon | 1. Apply coupon 2. Inspect Register API payload | Correct discounted price in payload; no mismatch | ✅ PASSED |

**Total: 10 | Passed: 10 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| Dev Fix | 15 Apr 2026 | — | Fix deployed; [jam.dev](https://jam.dev/c/f5fa693c-a5a0-4e1a-a61d-e23235934659) |
| DEV CIT | 15–16 Apr 2026 | ✅ PASSED | All coupon scenarios passed; AI-assisted audit also run |
| DVH Production | 22 Apr 2026 | ✅ PASSED | Build stable; coupon functionality confirmed |
| CWA / KOD / VNCA | Pending | 🔄 QA to do | Awaiting deployment |

---

## 🤖 AI-Assisted QA Note

This ticket included a **Gemini CLI Agentic QA audit** alongside manual testing:

| Area | AI Audit Result |
|------|----------------|
| Coupon recalculation & stacking prevention | ✅ PASS |
| Stripe field validation | ✅ PASS |
| PayPal tracking_id sync | ✅ PASS |
| API payload integrity | ✅ PASS |

**Improvement flagged:** Move product generation to Webhooks to eliminate synchronous 502 risks.

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| Original bug report | [jam.dev](https://jam.dev/c/57fae05e-91ca-402c-96f7-5a5ae465b451) |
| Dev fix | [jam.dev](https://jam.dev/c/f5fa693c-a5a0-4e1a-a61d-e23235934659) |
| DEV CIT screen recording #1 | screen_recording_20260415_210014.webm |
| DEV CIT screen recording #2 | screen_recording_20260415_221710.webm |
| AI QA Audit Report | QA_Audit_Report_Final.html |
| DVH Production verification | screen_recording_20260422_183036.webm |

---

## 📝 Notes

- High priority — incorrect pricing directly impacts billing and customer trust
- AI-assisted testing (Gemini CLI) used alongside manual QA — first use of agentic QA tooling on this project
- DVH Production verified ✅ — CWA, KOD, VNCA pending deployment
- Dev time logged: ~4h 5m total

---

*QA Engineer: Muhammad Shahnawaz | DVH Production Verified: 22 Apr 2026 | CWA/KOD/VNCA: Pending*
