# V1-509 — Test PayPal Updates (V1 Checkout)

**Ticket:** V1-509
**Title:** Test PayPal Updates
**Type:** Task
**Priority:** Medium
**Reporter / QA:** Muhammad Shahnawaz
**Assignee:** Muhammad Shahnawaz (QA) → AKINADE AYODEJI TIMOTHEW (Dev)
**Created:** 06 Jun 2025
**Resolved:** 30 Jul 2025
**Related Ticket:** V1-495
**Final Status:** ✅ Done
**Evidence:** screen-capture (5).webm

---

## 📋 Summary

QA task to test PayPal updates on the V1 checkout. The Country Selector Dropdown was confirmed functional for US and CA. Three issues were identified and needed to be addressed, plus two additional bugs found during testing.

---

## ✅ What Was Working

- Country Selector Dropdown — functional
- Country selection update for US and CA — working correctly
- CWA checkout currency display — correct (CAD shown properly)

---

## 🐛 Issues Found

### Issue 1 — Country Dropdown Default Not Set by IP Geolocation
- The country dropdown default value was not dynamically set based on the user's IP geolocation
- Expected: dropdown should auto-select the country matching the user's detected region on page load
- **Status:** ✅ Fixed

---

### Issue 2 — PayPal Pay Button Shows `$5.44` Without Currency Specifier
- When redirected to PayPal, the Pay button displayed only `"$5.44"` without specifying the currency (e.g., `CAD $5.44`)
- Ambiguous for non-USD customers — `$` could be interpreted as USD
- **Status:** ✅ Fixed

---

### Issue 3 — Success Page Shows `$` Instead of `CAD` (V1 Checkout Only)
- After payment via V1 checkout using Debit & Credit option, the success page displayed `$` instead of `CAD`
- CWA checkout was unaffected — issue was specific to V1 checkout + Debit & Credit flow
- **Status:** ✅ Fixed

---

### Issue 4 — PayPal API Returns 422 Unprocessable Content for MXN and EUR (Found During Testing)
- When paying with PayPal for a plan with coupon using MXN or EUR currency, the order API returned `422 Unprocessable Content`
- Root cause: amount value in API payload was too precise — e.g., `453.23665699` — PayPal does not allow more than 2 decimal places for currencies like MXN
- Same issue reproduced with EUR currency
- **Status:** ✅ Fixed

---

### Issue 5 — PayPal Option Displayed Twice on Checkout Page
- The PayPal option appeared both below the Stripe form AND again within the payment method tab
- Caused duplicate UI elements and user confusion
- **Status:** ✅ Fixed

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-PP-001 | Country dropdown auto-selects based on IP | 1. Open V1 checkout with CA IP | Country dropdown defaults to Canada without user action | ✅ PASSED |
| TC-PP-002 | Country dropdown auto-selects US for US IP | 1. Open V1 checkout with US IP | Country dropdown defaults to United States | ✅ PASSED |
| TC-PP-003 | PayPal pay button shows currency specifier | 1. Select CAD 2. Click PayPal | Button shows `CAD $5.44` not just `$5.44` | ✅ PASSED |
| TC-PP-004 | Success page shows CAD after V1 Debit/Credit payment | 1. Pay via V1 checkout Debit & Credit (CAD) 2. Check success page | Success page shows `CAD` not `$` | ✅ PASSED |
| TC-PP-005 | CWA checkout success page unaffected | 1. Pay via CWA checkout (CAD) 2. Check success page | CAD displayed correctly (regression check) | ✅ PASSED |
| TC-PP-006 | PayPal MXN payment with coupon — no 422 error | 1. Apply coupon 2. Pay with PayPal in MXN | Payment succeeds; no 422 error; amount rounded to 2 decimal places | ✅ PASSED |
| TC-PP-007 | PayPal EUR payment with coupon — no 422 error | 1. Apply coupon 2. Pay with PayPal in EUR | Payment succeeds; no 422 error | ✅ PASSED |
| TC-PP-008 | PayPal API payload amount has max 2 decimal places | 1. Apply coupon 2. Inspect PayPal API payload | Amount field has ≤ 2 decimal places (e.g., `453.24` not `453.23665699`) | ✅ PASSED |
| TC-PP-009 | PayPal option appears only once on checkout page | 1. Open V1 checkout 2. Inspect payment section | PayPal button appears once only; not duplicated below Stripe form | ✅ PASSED |
| TC-PP-010 | Country selector US/CA inputs work correctly | 1. Select US 2. Select CA | Both selections update correctly; no errors | ✅ PASSED |

**Total: 10 | Passed: 10 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 — Initial Testing | 06 Jun 2025 | ⚠️ Issues Found | 422 error on MXN/EUR PayPal + duplicate PayPal UI found |
| Dev Fix | 12 Jun 2025 | — | Dev picked up and worked on fixes |
| Final Verification | 30 Jul 2025 | ✅ Done | All issues resolved; ticket closed |

---

## 📝 Notes

- Issue 4 (422 error) root cause: PayPal strictly enforces max 2 decimal places in amount fields — coupon discount calculations were producing long decimal values
- Issue 5 (duplicate PayPal) was a UI rendering bug — PayPal SDK injecting button in wrong container
- QA time logged: ~1d 31m total
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 30 Jul 2025*
