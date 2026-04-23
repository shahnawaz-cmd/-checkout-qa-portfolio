# V1-414 — Fix PayPal Multi Payment (Double Charge Prevention)

**Ticket:** V1-414
**Title:** Fix PayPal Multi Payment
**Type:** Story
**Priority:** Medium
**Reporter:** Zain Khan
**Assignee:** AKINADE AYODEJI TIMOTHEW (Dev)
**QA:** Muhammad Shahnawaz
**Created:** 10 Feb 2025
**Resolved:** 14 Mar 2025
**Fix Version:** Release V3.0
**Related Ticket:** V1-428
**Final Status:** ✅ Done — PRODUCTION CIT PASSED
**Evidence:** [jam.dev/c/5d5bd420](https://jam.dev/c/5d5bd420-fa9b-4d71-bdc3-df95ce20dc3a)

---

## 📋 Summary

Customers using PayPal on checkout could be charged twice. After completing payment, if they navigated back to the PayPal page instead of clicking "Return to Merchant", PayPal would process a second charge. The system only recorded the first order — leaving customers double-charged with one order record.

**Solution chosen:** Implement **PayPal Express popup window** instead of full-page redirect. Users never leave the checkout page, eliminating the back-navigation double-charge scenario. Subscriptions kept on the old redirect flow (low % of sales).

> Same issue was previously fixed for Stripe. This ticket applies the equivalent fix for PayPal across all V1 systems.

---

## 🐛 Issues Found During QA

### Round 1 — 20 Feb 2025 — DEV CIT FAILED

Issues found and reported in V1-428:
- PayPal popup implementation done but `landing/validatePayPalPayment` API returning **500 error** in some flows
- PayPal button clickable during processing state — could trigger multiple submissions
- Stripe label still showing "Stripe" instead of "Card"

**Status:** ❌ Sent back to dev

---

### Round 2 — 26 Feb 2025 — DEV CIT PASSED

Dev fixes applied:
- 500 error on `validatePayPalPayment` — could not reproduce after fix; confirmed working [jam.dev](https://jam.dev/c/a27e1560-d5c9-4929-a0a3-e5f4828326e8)
- PayPal button disabled during processing state — fixed [jam.dev](https://jam.dev/c/b4820d33-7e77-4d4e-9d34-dd61d70f8857)
- Stripe label updated to "Card"
- PayPal IPN logging improved — details logged to dev log file and DB

**Status:** ✅ DEV CIT PASSED

---

### Production — 14 Mar 2025 — PRODUCTION CIT PASSED

**Status:** ✅ PRODUCTION CIT PASSED
**Evidence:** [jam.dev](https://jam.dev/c/5d5bd420-fa9b-4d71-bdc3-df95ce20dc3a)

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-PP-001 | PayPal popup opens instead of full redirect | 1. Click PayPal on checkout | PayPal opens in popup window; user stays on checkout page | ✅ PASSED |
| TC-PP-002 | Single charge on successful PayPal payment | 1. Complete PayPal payment via popup | One charge in PayPal; one order in admin | ✅ PASSED |
| TC-PP-003 | Back navigation does not trigger second charge | 1. Complete PayPal popup payment 2. Close popup / navigate back | No second charge; original order intact | ✅ PASSED |
| TC-PP-004 | PayPal button disabled during processing | 1. Click PayPal button 2. While processing, click again | Button non-clickable during processing; no duplicate submission | ✅ PASSED |
| TC-PP-005 | validatePayPalPayment API returns 200 | 1. Complete PayPal popup flow 2. Check API response | API returns success; no 500 error | ✅ PASSED |
| TC-PP-006 | PayPal IPN details logged correctly | 1. Complete PayPal payment 2. Check dev logs and DB | IPN details present in log file and database | ✅ PASSED |
| TC-PP-007 | Stripe tab label shows "Card" not "Stripe" | 1. Open checkout 2. Check payment tab label | Label reads "Card" | ✅ PASSED |
| TC-PP-008 | PayPal subscription flow unaffected | 1. Select subscription plan 2. Pay via PayPal | Subscription uses original redirect flow; completes correctly | ✅ PASSED |
| TC-PP-009 | PayPal Express works across all V1 properties (DVH, IVR, CD, SCC) | 1. Test PayPal popup on each property | Popup works on all properties; no redirect issues | ✅ PASSED |
| TC-PP-010 | One order created per PayPal payment | 1. Complete PayPal payment 2. Check admin | Exactly one order record; no duplicates | ✅ PASSED |

**Total: 10 | Passed: 10 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 | 20 Feb 2025 | ❌ FAILED | 500 error on validate API; button clickable during processing; wrong label |
| R2 | 26 Feb 2025 | ✅ DEV PASSED | All issues fixed; IPN logging improved |
| Production | 14 Mar 2025 | ✅ PASSED | Full production verification passed |

---

## 💡 Design Decision Notes

| Option | Decision |
|--------|----------|
| PayPal Auto-Return URL | Rejected — multiple properties (DVH, IVR, CD, SCC) make single return URL impractical |
| PayPal Express Popup | ✅ Chosen — user never leaves checkout page; eliminates back-navigation double charge |
| Subscriptions via popup | Not supported by PayPal Express — kept on original redirect flow (low % of sales) |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| Original double charge report | [jam.dev](https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3) |
| PayPal popup implementation | [jam.dev](https://jam.dev/c/06ab5b45-ecb2-4bbb-8e6b-b377b4393723) |
| validatePayPalPayment API working | [jam.dev](https://jam.dev/c/a27e1560-d5c9-4929-a0a3-e5f4828326e8) |
| PayPal button processing state fix | [jam.dev](https://jam.dev/c/b4820d33-7e77-4d4e-9d34-dd61d70f8857) |
| Production CIT result | [jam.dev](https://jam.dev/c/5d5bd420-fa9b-4d71-bdc3-df95ce20dc3a) |

---

## 📝 Notes

- 2–3 real production cases of double charges reported before this fix
- PayPal Express popup was the cleanest solution — avoids the redirect entirely
- Dev time logged: ~1d 4h 38m total
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 14 Mar 2025 | Release: V3.0*
