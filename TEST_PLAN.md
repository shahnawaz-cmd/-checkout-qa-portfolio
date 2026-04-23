# Test Plan — Next.js Checkout Page
**Project:** Next.js Checkout Page (CWA)
**Version:** 1.0
**Environment:** DEV
**Prepared By:** QA Engineer
**Date:** 23 April 2026

---

## 1. Objective

Validate the end-to-end checkout experience for the CWA Next.js checkout page, covering payment gateway routing, coupon logic, upsell flows, 3D Secure authentication, UI consistency, and regional currency handling.

---

## 2. Scope

### In Scope
- Payment gateway display and routing by region (US, CA, MXN/EUR, Africa)
- Stripe payment flows (success, decline, 3DS, coupon)
- PayPal payment flows (subscription, CAD, failover)
- Paystack payment flows (African region)
- Coupon code application (homepage, checkout page, multi-session)
- Upsell flows (Window Sticker, Vehicle History Report, Report+Sticker combo)
- 3D Secure challenge flows (all card scenarios)
- CAPTCHA and PIN challenge flows
- Mobile 3DS challenge flows
- Pending order creation and admin panel accuracy
- UI elements (SH/Auction image, info icons, testimonials carousel)
- Currency display accuracy in admin panel

### Out of Scope
- Backend infrastructure and database internals
- Third-party gateway internal processing
- Non-checkout pages (homepage, preview page tested only as entry points)

---

## 3. Payment Gateway Routing Matrix

| Customer Region | Currency | Stripe | PayPal | Paystack |
|----------------|----------|--------|--------|----------|
| US | USD | ✅ Show | ✅ Show | ❌ Hide |
| CA | CAD | ❌ Hide | ✅ Show | ❌ Hide |
| MXN | MXN | ✅ Show | ✅ Show | ❌ Hide |
| EUR | EUR | ✅ Show | ✅ Show | ❌ Hide |
| Africa | USD/local | ✅ Show | ❌ Hide | ✅ Show |

---

## 4. Test Areas & Priorities

| # | Test Area | Priority | Linked Bugs |
|---|-----------|----------|-------------|
| 1 | Stripe — Coupon + Payment Intent Sync | P1 | CHECK#001, #004, #010, #011 |
| 2 | PayPal — Subscription & API | P1 | CHECK#002 |
| 3 | Stripe — Error Page Accuracy | P2 | CHECK#003 |
| 4 | Coupon — Session Isolation | P1 | CHECK#005 |
| 5 | Upsell — Register API Payload | P1 | CHECK#006 |
| 6 | Stripe → PayPal Failover Logic | P1 | CHECK#007, #008 |
| 7 | CAD — Currency & Order Creation | P1 | CHECK#009, #013, #015 |
| 8 | UI — V1 Parity (Images, Icons) | P3 | CHECK#012, #014 |
| 9 | Testimonials Carousel | P3 | CHECK#016 |
| 10 | 3DS — All Challenge Scenarios | P1 | CHK#001–#005 (3DS) |
| 11 | CAPTCHA / PIN Challenges | P2 | CHK#001–#003 (CAPTCHA) |
| 12 | Mobile 3DS Challenge Flows | P2 | CHK#001–#006 (Mobile) |
| 13 | Multi-IP Handling & Gateway Routing by IP | P1 | TC-IP-001–010 |
| 14 | Stripe 0-Decimal & 2-Decimal Currency + Conversion | P1 | TC-CUR-001–013 |
| 15 | Coupon: Prev vs New, Cookie & Session Verification | P1 | TC-CPN-005–022 |
| 16 | UI/UX Validation | P2 | TC-UX-001–012 |
| 17 | Cross-Browser Compatibility | P2 | TC-CB-001–012 |
| 18 | V2-4448 — PayPal Production Bug Fixes | P1 | TC-V2-001–010 |

---

## 5. Entry & Exit Criteria

### Entry Criteria
- DEV environment is stable and accessible
- All payment gateways are configured in test/sandbox mode
- Stripe test cards are available
- Coupon codes are seeded in the system
- Admin panel access is available for order verification

### Exit Criteria
- All P1 test cases executed
- No open Critical or High severity bugs
- All previously fixed bugs verified as PASSED
- Test report signed off

---

## 6. Test Types

| Type | Description |
|------|-------------|
| Functional | Verify each payment flow works end-to-end |
| Regression | Re-verify all R1 bugs fixed in R2 |
| Boundary | Edge cases: back navigation, multi-session coupons |
| UI/Visual | V1 vs CWA parity checks |
| API | Verify Register API payloads via network inspection |
| Security | 3DS challenge flows, CAPTCHA, PIN simulation |

---

## 7. Tools & Resources

| Tool | Purpose |
|------|---------|
| Jam.dev | Bug recording with screen capture |
| Stripe Dashboard (Test Mode) | Payment intent verification |
| PayPal Sandbox | PayPal flow testing |
| Browser DevTools | Network tab for API payload inspection |
| Admin Panel | Order status, currency, gateway verification |
| Stripe Test Cards | 3DS and decline scenario simulation |

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Stripe test mode doesn't fully simulate all 3DS flows | Document expected vs actual per card; mark as known limitation |
| CAD PayPal sandbox behaviour differs from production | Flag discrepancies; test in staging before prod release |
| Session-based coupon bugs hard to reproduce consistently | Use fresh browser sessions / incognito for each test run |
| Upsell API payload issues require backend log access | Coordinate with dev to enable verbose API logging in DEV |

---

## 9. Deliverables

- [x] Bug Report (`BUG_REPORT.md`)
- [ ] Test Cases (`TEST_CASES.md`)
- [ ] Final QA Report (`QA_REPORT.md`)
- [ ] GitHub README (`README.md`)
