# V2-4985 — Fix Register & CWA_Register API Location Bug

**Ticket:** V2-4985
**Title:** Fix Register & CWA_Register API Location Bug
**Type:** Story
**Priority:** Medium
**Reporter / QA:** Muhammad Shahnawaz
**Assignee:** Sebghatullah Yusuf Wakily (Dev)
**Created:** 26 Nov 2025
**Resolved:** 14 Jan 2026
**Sprint:** V2 Sprint 93
**Related Ticket:** V2-5031
**Final Status:** ✅ Done — Deployed on KOD Production

---

## 📋 Summary

Four interconnected bugs were identified in the `Register API` and `CWA_Register API` related to how user location and currency are resolved when a customer uses multiple IPs or revisits from a different location.

---

## 🐛 Issues Reported

### Issue 1 — CWA_Register API Returns Wrong Currency Sign on IP Change

**API:** `CWA_Register API` (Checkout page)
**Evidence:** [jam.dev](https://jam.dev/c/492c3f68-75d2-48dc-9001-000530b56fe9)

**Root Cause:** The API reads the server's remote address as a US IP and returns `USD ($)` regardless of the currency sent in the payload.

**Scenario:**
1. User lands on checkout → pending order created in EUR (based on first IP)
2. User's IP changes (VPN switch, mobile network, etc.)
3. API retried → response returns USD even though EUR was sent in payload
4. Admin order page shows USD sign with EUR price → mismatch

**Solution Applied:** Admin Order Page now always displays the currency sign passed in the payload, regardless of IP changes or retries. Stripe charges using the initial payment intent currency — admin must reflect that consistently.

---

### Issue 2 — Register API Uses Server IP Instead of User's Real IP (Preview Page)

**API:** `Register API` (Preview page)

**Root Cause:** The Register API was using the server's remote address to determine user location, not the actual user IP. Real user location was only captured when they reached the checkout page.

**Impact:** If card is declined or payment retried, Stripe charges in the previous currency → order appears in USD in admin.

**Solution Applied:** Register API now uses the user's real IP address for location and currency resolution.

---

### Issue 3 — Reorder from Different IP Overwrites Previous Order's Location

**API:** `Register API`

**Scenario:**
1. Order 1 created in USD (US IP)
2. Order 2 created in EUR (EU IP)
3. On re-registration with same email → API returns "user exists" with old location
4. New location correctly shown on new order page BUT overwrites location of Order 1

**Solution Applied:** Previous order location is no longer updated when a user places a new order from a different location. Logic was previously implemented but had regressed — re-fixed.

---

### Issue 4 — CD Signup Page Uses Server Location Instead of User Location

**Affected:** CD signup page (WEB)

**Root Cause:** Registration on CD signup was using the server's location, not the user's actual location.

**Solution Applied:** CD signup now registers using the user's real location.

> **Note:** This issue affected all checkout branches and the Preview page (Next.js).

---

## 🔍 Additional Bug Found During QA

**CDMA — Alternate Product Auto-Generation Not Working**
- When a product (Report/Buildsheet) is generated and user tries to generate an alternate product (Report or Sticker) from My Report page, it lands on a dropdown instead of auto-generating
- Evidence: [jam.dev](https://jam.dev/c/587f0a78-4a39-4bef-a241-3b4dfa8aa504)
- Logged as separate issue

---

## 🧪 Test Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-LOC-001 | Currency sign correct in admin when IP unchanged | 1. Complete checkout with EUR IP 2. Check admin | Admin shows EUR sign and EUR price | ✅ PASSED |
| TC-LOC-002 | Currency sign correct in admin after IP switch | 1. Start checkout on EUR IP 2. Switch IP 3. Complete payment | Admin shows EUR sign (initial currency); no USD override | ✅ PASSED |
| TC-LOC-003 | CWA_Register API payload currency matches admin display | 1. Inspect CWA_Register API payload 2. Check admin order | Currency sign in payload = currency sign in admin | ✅ PASSED |
| TC-LOC-004 | Register API uses user's real IP on Preview page | 1. Open preview page with non-US IP 2. Submit email | Pending order shows correct non-US location | ✅ PASSED |
| TC-LOC-005 | Card decline + retry does not change currency to USD | 1. Start checkout in EUR 2. Decline card 3. Retry payment | Stripe charges in EUR; admin shows EUR | ✅ PASSED |
| TC-LOC-006 | Reorder from different IP does not overwrite first order location | 1. Place Order 1 (USD, US IP) 2. Place Order 2 (EUR, EU IP) | Order 1 still shows US location; Order 2 shows EU location | ✅ PASSED |
| TC-LOC-007 | Re-registration with same email shows correct new location | 1. Register with US IP 2. Re-register with EU IP | New order shows EU location; old order unchanged | ✅ PASSED |
| TC-LOC-008 | CD signup uses user's real location | 1. Sign up on CD with non-US IP | Registration location matches user IP, not server IP | ✅ PASSED |
| TC-LOC-009 | KOD — currency sign correct after IP switch | 1. Test on KOD with KWD/EUR IP switch | Admin shows correct currency sign; no USD override | ✅ PASSED |
| TC-LOC-010 | VHREU — static EUR currency unaffected by fix | 1. Test on VHREU (EUR only) | EUR displayed correctly; no regression | ✅ PASSED |
| TC-LOC-011 | Location N/A not shown for valid IPs | 1. Complete checkout with PK/KR/NG IP | Location populated correctly; no N/A | ✅ PASSED |
| TC-LOC-012 | Supported location updates order correctly | 1. Change location to V1-supported region 2. Complete checkout | Admin updates currency sign and price for new location | ✅ PASSED |
| TC-LOC-013 | Unsupported location — Stripe uses previous data | 1. Change to unsupported location 2. Complete checkout | Stripe charges previous currency; admin shows same currency/price | ✅ PASSED |

**Total: 13 | Passed: 13 | Failed: 0**

---

## 📊 QA Cycle Summary

| Round | Date | Result | Notes |
|-------|------|--------|-------|
| R1 (CWAMVP Production) | 12 Dec 2025 | ✅ PASSED | Currency sign fix verified on CWAMVP prod |
| R2 (VHREU DEV) | 18–19 Dec 2025 | ⚠️ BLOCKED | Currency conversion not working on VHREU DEV (Next.js blocker); VHREU uses static EUR so untestable |
| R3 (KOD) | 31 Dec 2025 | ❌ FAILED | KOD still showing old issue — EUR price with USD sign after KWD switch |
| R4 (KOD — Final) | 14 Jan 2026 | ✅ PASSED | Deployed on KOD Production; all issues resolved |

---

## 📎 Evidence

| Description | Link |
|-------------|------|
| Original bug — currency sign mismatch | [jam.dev](https://jam.dev/c/492c3f68-75d2-48dc-9001-000530b56fe9) |
| Currency sign fix — location supported in V1 | [jam.dev](https://jam.dev/c/0216e9ee-69a2-4cd9-adf2-d237fa77c584) |
| Currency sign fix — unsupported location | [jam.dev](https://jam.dev/c/d7d9d3f2-7e1f-49ba-965b-f2e648bac644) |
| Currency sign fix — unsupported location (2) | [jam.dev](https://jam.dev/c/f2a5884f-1742-4920-862b-fb65aeea6799) |
| KOD regression — EUR price with USD sign | [jam.dev](https://jam.dev/c/9687bc39-2d37-4789-ad99-358c0519f1d2) |
| CDMA alternate product auto-generation bug | [jam.dev](https://jam.dev/c/587f0a78-4a39-4bef-a241-3b4dfa8aa504) |

---

## 📝 Notes

- Root cause of all 4 issues: APIs were using server remote address instead of user's real IP
- VHREU uses static EUR currency — IP-based currency switching cannot be tested there without site setting changes
- Always test on `dodgewindowsticker` (KOD), not `audi` — per dev note
- Dev time logged: ~1d 7h 31m total
- No open issues remaining

---

*QA Engineer: Muhammad Shahnawaz | Resolved: 14 Jan 2026 | Deployed: KOD Production*
