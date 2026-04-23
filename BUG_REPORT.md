# Bug Report — Next.js Checkout Page
**Project:** Next.js Checkout Page (CWA)
**Environment:** DEV
**Testing Rounds:** R1 (28 May 2025) → R2 (29 May 2025)
**Payment Gateways:** Stripe · PayPal · Paystack
**Reported By:** QA Engineer
**Last Updated:** 23 April 2026

---

## Regional Payment Gateway Rules

| Region | Stripe | PayPal | Paystack |
|--------|--------|--------|----------|
| US | ✅ | ✅ | ❌ |
| CA | ❌ | ✅ (CAD) | ❌ |
| MXN / EUR | ✅ | ✅ | ❌ |
| Africa | ✅ | ❌ | ✅ |

---

## Summary

| Metric | Count |
|--------|-------|
| Total Bugs Reported | 16 |
| Fixed (PASSED in R2) | 9 |
| Not Fixed / Still Open | 7 |
| 3DS / CAPTCHA / Mobile Flow Issues | 14 |

---

## Checkout Page Bugs — R1 vs R2 Status

| Bug ID | Title | Component | Severity | R1 Status | R2 Status | Attachment |
|--------|-------|-----------|----------|-----------|-----------|------------|
| CHECK#001 | Mismatch Between Stripe Payment and System Price After Applying Coupon | Coupon + Stripe | High | FAILED | ✅ PASSED | [R1](https://jam.dev/c/2e3ac466-e7be-4d0c-bfaf-1690339c5229) / [R2](https://jam.dev/c/59a53555-4c94-45cf-9d6b-949f864b35cd) |
| CHECK#002 | Create_Plan API Returns 500 Error When Using PayPal for Subscription | PayPal API | Critical | FAILED | ✅ PASSED | [R1](https://jam.dev/c/800aa1de-baeb-4978-862b-d5e10b80abdd) / [R2](https://jam.dev/c/1df1e440-aa0d-41e3-8799-8a5590c5c345) |
| CHECK#003 | Stripe Error Page Missing UID and Showing Incorrect Price on Card Decline | Stripe Error UI | Medium | FAILED | ✅ PASSED | [R1](https://jam.dev/c/f18249b7-86fc-4def-bc8e-636ca4b97237) / [R2](https://jam.dev/c/2b0b72b5-6e1f-4651-b493-b5f983f569df) |
| CHECK#004 | Duplicate Stripe Entries for Same Email When Navigating Back During Checkout with Coupon | Stripe / Session | High | FAILED | ✅ PASSED | [R1](https://jam.dev/c/16173f44-d989-4933-8008-341391430e62) / [R2](https://jam.dev/c/59a53555-4c94-45cf-9d6b-949f864b35cd) |
| CHECK#005 | Coupon Incorrectly Applied to Second Order in Same Session Without User Action | Coupon / Session | High | FAILED | ✅ PASSED | [R1](https://jam.dev/c/067dc9f2-b140-4f14-9923-659b23f50e64) / [R2](https://jam.dev/c/9015d549-9b50-4cbd-b459-9093b3c09609) |
| CHECK#006 | Upsell Report Missing in CWA_Sticker Register API Payload — Only Sticker Order Created | Upsell / API | High | FAILED | ❌ NOT FIXED (Report+Sticker upsell) | [R1](https://jam.dev/c/3ea63be3-14f6-49cf-ae58-8ded74dd2b50) / [R2](https://jam.dev/c/9bec432c-8ae3-48c6-9f25-7bdb12f8da22) |
| CHECK#007 | Failed Stripe Payments Redirect to PayPal Tab with Improper Error Handling | Stripe / PayPal UI | High | FAILED | ❌ NOT FIXED (PayPal option missing for VHR) | [R1](https://jam.dev/c/dbd9564b-5112-4514-aa78-6a1856cdec9a) / [R2](https://jam.dev/c/b3fa5f47-376c-497c-a05e-7123a405e0fa) |
| CHECK#008 | Incorrect PayPal Failover Triggered for Non-USD Transactions | PayPal Failover | Medium | FAILED | ✅ PASSED | [R1](https://jam.dev/c/e422574b-75d7-47cc-8c23-5672835ea1e1) / [R2](https://jam.dev/c/7b4bdc30-9329-4e03-9c44-1a572e56484a) |
| CHECK#009 | Incorrect Currency Display and Report/Sticker Generation Not Triggered for CAD Payments | CAD / Currency | High | FAILED | ✅ PASSED | [R1](https://jam.dev/c/3f29cd16-8222-4868-a04e-032b088621e7) / [R2](https://jam.dev/c/42ba688f-b342-4b01-b82e-5b7f3a6a7c56) |
| CHECK#010 | Duplicate Stripe Entries for Same Email, VIN, and UID When Applying Coupon from Homepage | Stripe / Coupon | High | FAILED | ❌ NOT FIXED | [R1](https://jam.dev/c/ef13afc2-680f-44de-85e1-68971a372204) / [R2](https://jam.dev/c/aaeee2b7-ab4d-48f6-8d41-131c978e5354) |
| CHECK#011 | Multiple Stripe Entries Created When Navigating Back and Forth Between Checkout and Review Pages | Stripe / Navigation | High | FAILED | — (not in R2) | [R1](https://jam.dev/c/de6b0196-dc59-4d64-9549-0ee161513da7) |
| CHECK#012 | Add SH/Auction Image Display on Checkout Page (Align with V1 Checkout Design) | UI / Design | Low | FAILED | ✅ PASSED | [R1](https://jam.dev/c/8c08c736-462e-473a-9267-6ae959e818a8) / [R2](https://jam.dev/c/dc806300-e459-4557-907c-7072b0e2669c) |
| CHECK#013 | Create Pending Order on Checkout Load for CAD Customers (PayPal Only) | CAD / PayPal | High | FAILED | ❌ PARTIAL (gateway shows Stripe instead of PayPal) | [R1](https://jam.dev/c/22c4bfe7-a036-4310-94e1-88a2f3fa6ee7) / [R2](https://jam.dev/c/eb7f5b9d-3792-4119-8bd4-f6e37a8450ef) |
| CHECK#014 | Add Informational Text with Icons Below the Pay Button (Match V1 Checkout) | UI / Design | Low | FAILED | ✅ PASSED | [R1](https://jam.dev/c/66743890-e482-4272-a34e-f75718f0ea16) / [R2](https://jam.dev/c/93e779da-a335-4823-9201-ff14a28f7dad) |
| CHECK#015 | Issue with PayPal Payment in CAD for Window Sticker | CAD / PayPal / WS | High | — | ❌ OPEN | [R2](https://jam.dev/c/2aa5562c-30ec-4b84-b30e-08deeaae040b) |
| CHECK#016 | Review Section on Checkout Page Not Looping Properly | UI / Testimonials | Low | — | ❌ OPEN | — |

---

## Detailed Bug Descriptions

### CHECK#001 — Mismatch Between Stripe Payment and System Price After Applying Coupon
- **Severity:** High
- **Component:** Coupon + Stripe Payment Intent
- **Description:** When a coupon is applied and payment completes, Stripe records the full price while the system reflects the discounted price. Payment intent is not updated to reflect the discount.
- **R2 Status:** ✅ Fixed

---

### CHECK#002 — Create_Plan API Returns 500 Error When Using PayPal for Subscription
- **Severity:** Critical
- **Component:** PayPal API
- **Description:** Attempting a subscription payment via PayPal triggers a 500 error from the Create_Plan API.
- **R2 Status:** ✅ Fixed

---

### CHECK#003 — Stripe Error Page Missing UID and Showing Incorrect Price on Card Decline
- **Severity:** Medium
- **Component:** Stripe Error Page
- **Description:** On card decline, the error page omits the UID and shows incorrect price when a coupon discount was applied.
- **R2 Status:** ✅ Fixed

---

### CHECK#004 — Duplicate Stripe Entries for Same Email When Navigating Back During Checkout with Coupon
- **Severity:** High
- **Component:** Stripe / Session Management
- **Steps to Reproduce:**
  1. Apply a coupon on the checkout page.
  2. Click back, then return to checkout.
  3. Two Stripe entries are created for the same email. Admin only updates one.
- **R2 Status:** ✅ Fixed

---

### CHECK#005 — Coupon Incorrectly Applied to Second Order in Same Session Without User Action
- **Severity:** High
- **Component:** Coupon / Session
- **Description:** If the first order in a session uses a coupon, the second order automatically inherits it without user input.
- **R2 Status:** ✅ Fixed

---

### CHECK#006 — Upsell Report Missing in CWA_Sticker Register API Payload
- **Severity:** High
- **Component:** Upsell / Register API
- **Description:** For WS + Report upsell, the Register API payload only includes the Sticker order. The upsell report is not processed. Sticker-only upsell is fixed; Report+Sticker upsell remains broken.
- **R2 Status:** ❌ Not Fixed (Report+Sticker upsell)

---

### CHECK#007 — Failed Stripe Payments Redirect to PayPal Tab with Improper Error Handling
- **Severity:** High
- **Component:** Stripe / PayPal UI
- **Description:** On Stripe failure, user is redirected to PayPal tab but "Pay with PayPal" button is missing. For VHR, PayPal option is absent in both failover and normal flow. WS behaves correctly.
- **R2 Status:** ❌ Not Fixed

---

### CHECK#008 — Incorrect PayPal Failover Triggered for Non-USD Transactions
- **Severity:** Medium
- **Component:** PayPal Failover Logic
- **Description:** PayPal failover should only apply to USD customers. Non-USD currencies (e.g., CRC) were incorrectly redirecting to PayPal.
- **R2 Status:** ✅ Fixed

---

### CHECK#009 — Incorrect Currency Display and Report/Sticker Generation Not Triggered for CAD Payments
- **Severity:** High
- **Component:** CAD / Currency Display
- **Description:** Admin panel shows USD instead of CAD for CAD payments. Report & Sticker generation does not auto-start.
- **R2 Status:** ✅ Fixed

---

### CHECK#010 — Duplicate Stripe Entries for Same Email, VIN, and UID When Applying Coupon from Homepage
- **Severity:** High
- **Component:** Stripe / Coupon (Homepage flow)
- **Steps to Reproduce:**
  1. Apply coupon on homepage.
  2. Proceed to preview → checkout.
  3. Discount applied with delay; two payment intents created (one at full price, one discounted).
- **R2 Status:** ❌ Not Fixed

---

### CHECK#011 — Multiple Stripe Entries Created When Navigating Back and Forth
- **Severity:** High
- **Component:** Stripe / Navigation
- **Steps to Reproduce:**
  1. Go to review page → proceed to checkout.
  2. Do not pay — click back.
  3. Click Revisit banner → proceed to checkout again.
  4. New payment intent created instead of updating existing one.
- **R2 Status:** Not re-tested in R2

---

### CHECK#012 — Add SH/Auction Image Display on Checkout Page
- **Severity:** Low
- **Component:** UI / Design
- **Description:** SH/Auction image present in V1 checkout is missing in CWA checkout.
- **R2 Status:** ✅ Fixed

---

### CHECK#013 — Create Pending Order on Checkout Load for CAD Customers (PayPal Only)
- **Severity:** High
- **Component:** CAD / PayPal / Register API
- **Description:** Pending order not created on checkout load for CAD users. Register API only fires after PayPal button click. Gateway incorrectly shows "AllGateway" / "Stripe" instead of "PayPal".
- **R2 Status:** ❌ Partial — functionality implemented but gateway still shows Stripe

---

### CHECK#014 — Add Informational Text with Icons Below the Pay Button
- **Severity:** Low
- **Component:** UI / Design
- **Description:** V1 checkout has secure payment / refund policy icons below Pay button. Missing in CWA.
- **R2 Status:** ✅ Fixed

---

### CHECK#015 — Issue with PayPal Payment in CAD for Window Sticker *(New in R2)*
- **Severity:** High
- **Component:** CAD / PayPal / Window Sticker
- **Description:** PayPal CAD payment for Window Sticker shows USD in admin panel and sticker generation does not start.
- **R2 Status:** ❌ Open

---

### CHECK#016 — Review Section on Checkout Page Not Looping Properly *(New in R2)*
- **Severity:** Low
- **Component:** UI / Testimonials
- **Description:** Review carousel does not loop correctly. First review (Vivek Malkan) should not appear first; first visible review should have an English name.
- **R2 Status:** ❌ Open

---

## 3D Secure — Bug Report (Sheet1)

### 3DS Challenge Flows

| Bug ID | Title | Test Card | Expected Behaviour | Actual Behaviour | Status |
|--------|-------|-----------|-------------------|-----------------|--------|
| CHK#001 | 3DS Required & Success | 4000003720000278 | Redirects to 3DS challenge, succeeds | Challenge fails but error only on frontend — not logged on Stripe error page | ❌ FAILED |
| CHK#002 | 3DS Authentication Required — Declined After Auth | 4000008400001629 | Payment declined after authentication | Working as expected | ✅ PASSED |
| CHK#003 | 3DS Supported (no challenge expected) | 4000000000003055 | Payment succeeds without 3DS prompt | Incorrectly triggers a challenge | ❌ FAILED |
| CHK#004 | 3DS Required but Lookup Fails | 4000008400001280 | Payment declined, no challenge UI | Working as expected | ✅ PASSED |
| CHK#005 | 3DS Supported but Auth Errors | 4000000000003097 | Case 1: succeeds without 3DS; Case 2: fails with error | Case 1 passes; Case 2 not handled | ⚠️ PARTIAL |

### CAPTCHA / PIN Challenge Flows

| Bug ID | Title | Test Card | Status | Notes |
|--------|-------|-----------|--------|-------|
| CHK#001 | Online PIN Simulation | 4000002760000008 | ✅ PASSED | Stripe test mode acknowledges 3DS attempt |
| CHK#002 | CAPTCHA Challenge | 4000000000001208 | ✅ PASSED | Working as expected |
| CHK#003 | Offline PIN Simulation | 4001007020000002 | — | No status recorded |

### 3DS Mobile Challenge Flows

| Bug ID | Title | Test Card | Status |
|--------|-------|-----------|--------|
| CHK#001 | Out-of-Band Challenge | 4000582600000094 | ✅ PASSED |
| CHK#002 | One-Time Passcode | 4000582600000045 | ✅ PASSED |
| CHK#003 | Multi-Select UI | 4000582600000110 | ✅ PASSED |
| CHK#004 | Required & Successful | 4000000000003220 | ✅ PASSED |
| CHK#005 | Required but Declined | 4000008400001629 | ✅ PASSED |
| CHK#006 | Required with Error | 4000008400001280 | ✅ PASSED |

---

---

## Production Bug Report — V2-4448 (PayPal Checkout Updates)

**Jira Ticket:** V2-4448
**Title:** CWA & CD PayPal Checkout Updates
**Type:** Story
**Priority:** High
**Reporter:** Zain Khan
**Assignee:** Sebghatullah Yusuf Wakily
**QA:** Muhammad Shahnawaz
**Created:** 11 Feb 2025
**Resolved:** 19 Mar 2025
**Final Status:** ✅ Done — PRODUCTION CIT PASSED
**Sprint:** V2 Sprint 83 → V2 Sprint 84
**Evidence:** [https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3](https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3)

---

### Issues Reported

| # | Issue | Environment | Final Status |
|---|-------|-------------|-------------|
| 1 | PayPal double charge — customer can pay again by navigating back instead of clicking "Return to Merchant"; system only records first order | PRODUCTION | ✅ Fixed |
| 2 | Stripe shown for CAD customers — must be hidden since CAD payments should not go to Stripe account | CWA / CD | ✅ Fixed |
| 3 | Checkout page fails to load when only PayPal is set as payment gateway in site settings | CWA | ✅ Fixed |

---

### Issue Details

#### Issue 1 — PayPal Double Charge (Production)
- **Description:** On checkout, customers using PayPal can be charged twice. After completing payment, if they navigate back to the PayPal payment page instead of clicking "Return to Merchant", PayPal processes a second charge. The system only creates one order (for the first payment), so the customer is double-charged with only one order record.
- **Similar fix:** Previously resolved for Stripe; same fix pattern applied to PayPal across CWA and CD.
- **Evidence:** [jam.dev recording](https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3)
- **Final Status:** ✅ Fixed — PRODUCTION CIT PASSED (19 Mar 2025)

#### Issue 2 — Stripe Visible for CAD Customers
- **Description:** CAD customers were seeing Stripe as a payment option. Since CAD payments must not be processed through the Stripe account, Stripe must be hidden for all CAD/Canadian customers.
- **Final Status:** ✅ Fixed

#### Issue 3 — Checkout Page Doesn't Load with PayPal-Only Gateway Setting
- **Description:** When site settings are configured to show only PayPal as the payment gateway, the checkout page fails to load entirely.
- **Final Status:** ✅ Fixed

---

### QA Cycle Summary

| Round | Date | QA Result | Notes |
|-------|------|-----------|-------|
| DEV CIT #1 | 14 Feb 2025 | ❌ FAILED | Duplicate Stripe entries found (discount + full price); email missing from discounted entry |
| DEV CIT #2 | 17 Feb 2025 | ❌ FAILED | Sent back for further fixes |
| DEV CIT #3 | 20 Feb 2025 | ❌ FAILED | Additional issues found |
| DEV CIT #4 | 21 Feb 2025 | ❌ FAILED | V1 issues fixed; new Stripe-related issue found |
| DEV CIT #5 | 22 Feb 2025 | ✅ PASSED | All DEV issues resolved |
| PRODUCTION CIT | 19 Mar 2025 | ✅ PASSED | Full production verification passed |

---

### Additional Evidence from QA Cycle

| Description | Link |
|-------------|------|
| V1 related issues fixed | [jam.dev](https://jam.dev/c/79d7d5e6-5363-46c9-8c3d-915240523d73) |
| Stripe-related issue found | [jam.dev](https://jam.dev/c/0bfe01e3-132c-4ad6-88fb-85bd3417df21) |
| NGN shows Stripe + Paystack only | [jam.dev](https://jam.dev/c/c06919ea-2cef-4db0-b0f2-173377e70b41) |
| PayPal CAD discount working | [jam.dev](https://jam.dev/c/c2d2c5fe-dfaf-4d69-9a77-08627d11dc34) |
| Stripe payment working in CD | [jam.dev](https://jam.dev/c/21217c25-a37d-445c-8c76-174e6a8f82f1) |
| PayPal payment working in CD | [jam.dev](https://jam.dev/c/7234d8d1-f4e4-4d1c-afe7-9b94887216da) |
| Stripe payment working in CWA | [jam.dev](https://jam.dev/c/867e76f0-68de-4e41-9a37-9875753088a8) |
| PayPal payment working in CWA | [jam.dev](https://jam.dev/c/2c4dea50-db01-4d97-9c26-b3d8d4fc29c7) |
| Production evidence | [jam.dev](https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3) |

---

*Generated from CSV data: R1 28_5_2025, R2 29_5_2025, Sheet1, V2-4448_Export_23-04-2026*
