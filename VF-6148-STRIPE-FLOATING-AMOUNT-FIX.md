# VF-6148 — Test Floating Amount Issue in Stripe Charge

**Ticket:** VF-6148
**Title:** Test Floating Amount Issue in Stripe Charge
**Type:** Sub-task
**Priority:** Medium
**Reporter / QA:** Muhammad Shahnawaz
**Assignee:** Muhammad Shahnawaz (QA)
**Dev Fix:** Ahsan Habib
**Created:** 27 Sep 2023
**Resolved:** 19 Oct 2023 (Production) | Formally closed: 05 Feb 2025
**Parent Ticket:** VF-6146 — Floating Amount Issue in Stripe Charge
**Sprint:** V1 Sprint 58
**Final Status:** ✅ Done — PRODUCTION CIT PASSED

---

## 📋 Summary

Stripe only accepts **integer values** for zero-decimal currencies (e.g., JPY, CLP). When discount calculations produced floating-point amounts for these currencies, Stripe was being charged a rounded-up value — resulting in customers being overcharged by a fraction.

**Fix:** Plans and discount functions updated to enforce integer values for zero-decimal currencies — no fractions allowed.

---

## 🐛 Issues Found During Testing

### JPY (Zero-Decimal) — Overcharged by 1 Unit After Discount
- Applied 90% discount → expected charge: **JPY 369**
- Stripe actually charged: **JPY 370** (overcharged by 0.1, rounded up)
- Root cause: discount calculation produced `369.x` — Stripe rounded up to `370`
- **Evidence (with discount):** [jam.dev](https://jam.dev/c/f9ae1400-6441-4da8-93d8-2314f2e5ce89)
- **Evidence (actual price):** [jam.dev](https://jam.dev/c/c2f41233-5ef2-472c-ac0b-70b9f5ff6b47)

### CLP (Zero-Decimal) — Floating Amount Sent to Stripe
- Calculated amount: **CLP 22116.1**
- Stripe showed: **CLP 22,117** (rounded up)
- Root cause: same floating-point issue in discount/plan calculation
- **Evidence:** [jam.dev](https://jam.dev/c/61c8481e-b679-4603-846a-f9b6b088b6b8)

### EUR, AED, and Other 2-Decimal Currencies — ✅ Working Correctly
- EUR with 20%, 40%, 50% discounts — all matched between Stripe and V1 order pages
- AED with 90% discount — correct

---

## 🧪 Test Cases

| TC ID | Title | Currency | Discount | Expected Stripe Charge | Status |
|-------|-------|----------|----------|----------------------|--------|
| TC-FLT-001 | JPY with 90% discount — integer amount charged | JPY | 90% | `369` (not `370`) | ✅ PASSED |
| TC-FLT-002 | JPY actual price — integer amount charged | JPY | None | Correct integer value | ✅ PASSED |
| TC-FLT-003 | CLP with discount — integer amount charged | CLP | Applied | Correct integer (no `.1`) | ✅ PASSED |
| TC-FLT-004 | EUR with 20% discount — correct amount | EUR | 20% | Matches V1 order page | ✅ PASSED |
| TC-FLT-005 | EUR with 40% discount — correct amount | EUR | 40% | Matches V1 order page | ✅ PASSED |
| TC-FLT-006 | EUR with 50% discount — correct amount | EUR | 50% | Matches V1 order page | ✅ PASSED |
| TC-FLT-007 | AED with 90% discount — correct amount | AED | 90% | Matches V1 order page | ✅ PASSED |
| TC-FLT-008 | Stripe charge matches V1 order page for all tested currencies | All | Various | No mismatch between Stripe and order page | ✅ PASSED |
| TC-FLT-009 | Zero-decimal currency — no floating point in Stripe payload | JPY / CLP | Any | Amount field is integer; no decimal point | ✅ PASSED |
| TC-FLT-010 | 2-decimal currency — discount calculation correct | EUR / AED | Any | Correct 2-decimal amount sent to Stripe | ✅ PASSED |

**Total: 10 | Passed: 10 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 — Initial Testing | 28 Sep 2023 | ⚠️ Partial | EUR/AED fixed; JPY and CLP still overcharging |
| Dev Fix (Ahsan) | 28 Sep 2023 | — | Plans and discount functions updated to enforce integer for zero-decimal currencies |
| DEV CIT | 28 Sep 2023 | ✅ PASSED | All currencies verified |
| Staging CIT | 17 Oct 2023 | ✅ PASSED | — |
| Production CIT | 19 Oct 2023 | ✅ PASSED | — |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| JPY 90% discount — overcharge (before fix) | [jam.dev](https://jam.dev/c/f9ae1400-6441-4da8-93d8-2314f2e5ce89) |
| JPY actual price | [jam.dev](https://jam.dev/c/c2f41233-5ef2-472c-ac0b-70b9f5ff6b47) |
| CLP floating amount | [jam.dev](https://jam.dev/c/61c8481e-b679-4603-846a-f9b6b088b6b8) |
| EUR 20% discount — correct | [jam.dev](https://jam.dev/c/a6fb8533-3926-41fb-a67a-5270a16d9d9f) |
| EUR 40% discount — correct | [jam.dev](https://jam.dev/c/63c191b0-9f10-4430-9a99-00a4ba0f7724) |
| EUR 50% discount — correct | [jam.dev](https://jam.dev/c/795d3c8e-7777-4ffa-afc3-495237ec88c5) |
| AED 90% discount — correct | [jam.dev](https://jam.dev/c/0087a8c4-9833-4082-815e-b1e9aa35fdef) |

---

## 📝 Notes

- Zero-decimal currencies affected: **JPY** (Japanese Yen) and **CLP** (Chilean Peso)
- Stripe strictly rejects or rounds floating-point amounts for zero-decimal currencies
- Fix scope: plans function + discount calculation function — both enforced integer output for zero-decimal currencies
- QA time logged: ~5h 31m total
- Related to VF-5113 (zero/three decimal currency fix) — same root cause family

---

*QA Engineer: Muhammad Shahnawaz | Production Verified: 19 Oct 2023*
