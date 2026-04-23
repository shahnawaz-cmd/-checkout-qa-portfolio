# V2-5285 — Postal Code Field Update (Alphanumeric Support)

**Ticket:** V2-5285
**Title:** Update postal code field to be alphanumeric on checkout (all properties)
**Type:** Story
**Priority:** Medium
**Reporter:** Hafsa Anjum
**Assignee:** Sebghatullah Yusuf Wakily
**QA:** Muhammad Shahnawaz
**Created:** 07 Apr 2026
**Resolved:** 11 Apr 2026
**Sprint:** V2 Sprint 95
**Parent Epic:** V2-4120 — Consumer Web Application (CWA) Development
**Final Status:** ✅ Done — QA Complete → Pushed to Production

---

## 📋 Summary

The postal code field on checkout previously only accepted numeric input. Canada uses alphanumeric postal codes (e.g., `M5V 3A8`). The fix was first applied to the Classic Decoder checkout and then needed to be rolled out to all other checkout properties:

- CWA (Consumer Web App)
- KOD
- VHREU
- SCC
- VNCA

---

## 🐛 Regression Findings (R1 — 08 Apr 2026)

During initial QA, the ZIP code fix passed but **4 regression issues** were found:

| # | Regression Issue | Status |
|---|-----------------|--------|
| 1 | Duplicate error messages shown under both Stripe and PayPal tabs on card decline | ✅ Fixed in R2 |
| 2 | Switching back from PayPal to Stripe tab triggers auto-refresh (previously not occurring) | ✅ Fixed in R2 |
| 3 | Payment button state change delayed (waits a few seconds for event call); on prod it updates instantly | ✅ Fixed in R2 |
| 4 | Invalid ZIP code error message spacing incorrect — messages concatenated | ✅ Fixed in R2 |

---

## ✅ QA Cycle

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 — Initial QA | 08 Apr 2026 | ⚠️ REGRESSION | ZIP fix passed; 4 regression anomalies found |
| R2 — Regression Fix | 08 Apr 2026 | ✅ DEV CIT PASSED | All 4 regressions resolved; [evidence](https://jam.dev/c/936c12bf-332c-4514-bbe8-775243250ab8) |
| Production Deploy (KOD) | 08 Apr 2026 | ✅ PASSED | Build verified; CWA MVP + DVH payload included |
| Production Deploy (All) | 09 Apr 2026 | ✅ PASSED | Pushed to production with log updates |
| Final Sign-off | 11 Apr 2026 | ✅ Done | Status moved to Done by Hafsa Anjum |

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-ZIP-001 | Numeric ZIP accepted (US format) | 1. Enter `90210` in postal code field 2. Submit | Field accepts numeric input; no error | ✅ PASSED |
| TC-ZIP-002 | Alphanumeric postal code accepted (CA format) | 1. Enter `M5V 3A8` in postal code field 2. Submit | Field accepts alphanumeric input; no validation error | ✅ PASSED |
| TC-ZIP-003 | Alphanumeric with space accepted | 1. Enter `SW1A 1AA` (UK format) 2. Submit | Accepted without error | ✅ PASSED |
| TC-ZIP-004 | Invalid ZIP shows correct error message | 1. Enter `!!!` in postal code 2. Submit | Clear error message shown; no concatenation or spacing issues | ✅ PASSED |
| TC-ZIP-005 | Error message not duplicated on card decline | 1. Enter valid ZIP 2. Use declining card 3. Submit | Single error message shown; no duplicate under Stripe and PayPal tabs | ✅ PASSED |
| TC-ZIP-006 | Switching PayPal → Stripe tab does not auto-refresh | 1. Click PayPal tab 2. Switch back to Stripe tab | Stripe tab loads normally; no auto-refresh triggered | ✅ PASSED |
| TC-ZIP-007 | Payment button state updates instantly | 1. Fill all fields 2. Click Pay | Button state changes immediately; no delay | ✅ PASSED |
| TC-ZIP-008 | ZIP field update applied on CWA | 1. Open CWA checkout 2. Enter CA postal code | Alphanumeric accepted | ✅ PASSED |
| TC-ZIP-009 | ZIP field update applied on KOD | 1. Open KOD checkout 2. Enter CA postal code | Alphanumeric accepted | ✅ PASSED |
| TC-ZIP-010 | ZIP field update applied on VHREU | 1. Open VHREU checkout 2. Enter EU postal code | Alphanumeric accepted | ✅ PASSED |
| TC-ZIP-011 | ZIP field update applied on SCC | 1. Open SCC checkout 2. Enter CA postal code | Alphanumeric accepted | ✅ PASSED |
| TC-ZIP-012 | ZIP field update applied on VNCA | 1. Open VNCA checkout 2. Enter CA postal code | Alphanumeric accepted | ✅ PASSED |

**Total: 12 | Passed: 12 | Failed: 0**

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| R2 Regression fix verification | [jam.dev/c/936c12bf](https://jam.dev/c/936c12bf-332c-4514-bbe8-775243250ab8) |
| Screen recording — KOD deploy #1 | screen_recording_20260409_010724.webm |
| Screen recording — KOD deploy #2 | screen_recording_20260409_010838.webm |
| Screen recording — KOD deploy #3 | screen_recording_20260409_010851.webm |
| Screen recording — Production regression | screen_recording_20260408_223425.webm |

---

## 📝 Notes

- Fix originally applied to Classic Decoder; V2-5285 extends it to all checkout properties
- QA requested deployment to VHREU, SCC, and VNCA after KOD verification
- Dev time logged: ~5h 43m total
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 11 Apr 2026*
