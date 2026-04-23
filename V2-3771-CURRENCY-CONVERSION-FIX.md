# V2-3771 — Fix Currency Conversion Issues

**Ticket:** V2-3771
**Title:** Fix Currency Conversion Issues
**Type:** Bug
**Priority:** Highest
**Reporter / QA:** Muhammad Shahnawaz
**Assignee:** Sebghatullah Yusuf Wakily (Dev)
**Created:** 27 Feb 2024
**Resolved:** 01 Mar 2024
**Sprint:** VHR-Scrum
**Related Ticket:** V2-3773 (test results)
**Final Status:** ✅ Done — PRODUCTION CIT PASSED

---

## 📋 Summary

Multiple currency conversion and display bugs were found on Staging and persisted after a previous fix attempt. Six issues were reported covering wrong currency signs, incorrect Stripe charges, dashboard amount inflation, and currency symbol mismatches for MXN and THB.

---

## 🐛 Issues Reported

### Issue 1 — V1 Order Page Shows USD Sign Instead of Actual Currency
- Order pages in V1 displayed `$` (USD) sign regardless of the customer's actual currency
- Also showed inflated amount e.g. `$4519` instead of the correct local currency amount
- **Status:** ✅ Fixed

---

### Issue 2 — Stripe Charges Full Amount When Coupon Applied
- When a coupon code was applied on the checkout page, Stripe charged the full (pre-discount) amount instead of the discounted amount
- **Evidence:** [jam.dev](https://jam.dev/c/f4fb4ccb-ca77-4de8-b460-5ce7d68971b8)
- **Status:** ✅ Fixed

---

### Issue 3 — Order History Shows `$` Sign With Converted Price
- Order history displayed currency sign as `$` with the converted price (e.g., `$ 7530`) instead of the correct local currency sign and amount
- **Status:** ✅ Fixed

---

### Issue 4 — Dashboard Total Sales Shows Inflated Amount
- Dashboard → Total Sales showed prices like `2,095,00` when the actual amount was `$14 USD`
- Root cause: converted amounts were being added as raw numbers without proper decimal handling
- **Status:** ✅ Fixed

---

### Issue 5 — MXN Currency Shows `C$` Symbol and Calculates in CAD
- For Mexican customers (MXN), the currency symbol displayed as `C$` (Canadian Dollar symbol) instead of `MXN`
- Stripe correctly charged MXN 586 (~35 USD) but V1 page calculated prices in CAD instead of MXN
- Total sales were also being converted to CAD instead of MXN
- **Evidence:** [jam.dev](https://jam.dev/c/33b4311b-dda8-4b2b-8512-420fc5489bf4)
- **Status:** ✅ Fixed

---

### Issue 6 — THB Currency Shows `$` Symbol (Conversion Amount Correct)
- For Thai Baht (THB) customers, the conversion amount was correct but the currency symbol displayed as `$`
- This caused the entire conversion to be treated as USD in the system
- **Evidence:** [jam.dev](https://jam.dev/c/8ea18c42-ffc4-448f-802b-8a8d19c0b2d2)
- **Status:** ✅ Fixed

> **Note (0-Decimal Currencies):** V1 engine order page showed `$` sign for 0-decimal currencies but conversion amount was correct. The converted amount was being added to total sales in USD. [Evidence](https://jam.dev/c/3f1f2bba-3ef9-447c-8ca0-9145e1549b88)

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-CUR-001 | V1 order page shows correct currency sign (non-USD) | 1. Place order as EUR customer 2. Check V1 order page | EUR sign displayed; not `$` | ✅ PASSED |
| TC-CUR-002 | V1 order page shows correct amount (no inflation) | 1. Place order as non-USD customer 2. Check order page amount | Correct local currency amount shown | ✅ PASSED |
| TC-CUR-003 | Stripe charges discounted amount when coupon applied | 1. Apply coupon on checkout 2. Complete payment 3. Check Stripe | Stripe charged = price after discount | ✅ PASSED |
| TC-CUR-004 | Order history shows correct currency sign | 1. Place non-USD order 2. Check order history | Correct currency sign shown (not `$`) | ✅ PASSED |
| TC-CUR-005 | Order history shows correct converted amount | 1. Place non-USD order 2. Check order history | Amount matches actual charge; no inflated value | ✅ PASSED |
| TC-CUR-006 | Dashboard total sales shows correct amount | 1. Place multiple orders 2. Check Dashboard → Total Sales | Total reflects actual amounts; no `2,095,00` style inflation | ✅ PASSED |
| TC-CUR-007 | MXN customer sees MXN symbol (not C$) | 1. Open checkout/order page as MXN customer | Currency symbol shows `MXN`, not `C$` | ✅ PASSED |
| TC-CUR-008 | MXN customer prices calculated in MXN (not CAD) | 1. Place order as MXN customer 2. Check V1 order page | Prices in MXN; total sales converted from MXN | ✅ PASSED |
| TC-CUR-009 | THB customer sees THB symbol (not $) | 1. Open order page as THB customer | Currency symbol shows `฿` or `THB`, not `$` | ✅ PASSED |
| TC-CUR-010 | THB conversion amount correct and not treated as USD | 1. Place order as THB customer 2. Check admin | Amount in THB; not added to total sales as USD | ✅ PASSED |
| TC-CUR-011 | 0-decimal currency sign correct on V1 order page | 1. Place order in JPY/KRW 2. Check V1 order page | Correct 0-decimal currency sign shown | ✅ PASSED |
| TC-CUR-012 | Total sales correctly aggregates multi-currency orders | 1. Place orders in USD, EUR, MXN, THB 2. Check Dashboard | Total sales shows correct aggregated value in base currency | ✅ PASSED |

**Total: 12 | Passed: 12 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| Staging CIT | 28 Feb 2024 | ✅ PASSED | All 6 issues verified on Staging; deploy to production requested |
| Production CIT | 01 Mar 2024 | ✅ PASSED | Full production verification passed |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| Stripe charges full amount on coupon | [jam.dev](https://jam.dev/c/f4fb4ccb-ca77-4de8-b460-5ce7d68971b8) |
| MXN shows C$ symbol / calculates in CAD | [jam.dev](https://jam.dev/c/33b4311b-dda8-4b2b-8512-420fc5489bf4) |
| THB shows $ symbol | [jam.dev](https://jam.dev/c/8ea18c42-ffc4-448f-802b-8a8d19c0b2d2) |
| 0-decimal currency sign issue | [jam.dev](https://jam.dev/c/3f1f2bba-3ef9-447c-8ca0-9145e1549b88) |
| Test results (full detail) | V2-3773 |

---

## 📝 Notes

- Issues were persisting on Staging even after a previous fix attempt — this ticket was raised to force a clean resolution
- Fast turnaround: reported 27 Feb, Staging passed 28 Feb, Production passed 01 Mar (3 days total)
- Dev time logged: ~6h 35m
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 01 Mar 2024*
