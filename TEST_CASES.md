# Test Cases — Next.js Checkout Page
**Project:** Next.js Checkout Page (CWA)
**Environment:** DEV
**Prepared By:** QA Engineer
**Date:** 23 April 2026

---

## Module 1 — Payment Gateway Routing

| TC ID | Title | Precondition | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-------------|-------|----------------|------------|--------|
| TC-PG-001 | US customer sees Stripe and PayPal only | User region = US | 1. Navigate to checkout as US customer | Both Stripe and PayPal tabs visible; Paystack hidden | — | — |
| TC-PG-002 | CA customer sees PayPal only | User region = CA | 1. Navigate to checkout as CA customer | Only PayPal tab visible; Stripe and Paystack hidden | — | — |
| TC-PG-003 | MXN customer sees Stripe and PayPal | User region = MXN | 1. Navigate to checkout as MXN customer | Both Stripe and PayPal tabs visible | — | — |
| TC-PG-004 | EUR customer sees Stripe and PayPal | User region = EUR | 1. Navigate to checkout as EUR customer | Both Stripe and PayPal tabs visible | — | — |
| TC-PG-005 | African customer sees Stripe and Paystack | User region = Africa | 1. Navigate to checkout as African customer | Stripe and Paystack tabs visible; PayPal hidden | — | — |

---

## Module 2 — Stripe Payment Flows

| TC ID | Title | Precondition | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-------------|-------|----------------|------------|--------|
| TC-STR-001 | Successful Stripe payment (USD) | US customer, valid card | 1. Enter card details 2. Click Pay | Payment succeeds; order created in admin | — | — |
| TC-STR-002 | Stripe payment with coupon — price synced | Valid coupon applied | 1. Apply coupon 2. Complete Stripe payment | Stripe records discounted price; admin shows same discounted price | CHECK#001 | ✅ PASSED (R2) |
| TC-STR-003 | Card decline shows correct error with UID | Invalid card | 1. Enter declining card 2. Submit | Error page shows correct UID and discounted price | CHECK#003 | ✅ PASSED (R2) |
| TC-STR-004 | No duplicate Stripe entry on back navigation with coupon | Coupon applied | 1. Apply coupon 2. Click back 3. Return to checkout | Only one Stripe entry for the email | CHECK#004 | ✅ PASSED (R2) |
| TC-STR-005 | No duplicate Stripe entry when coupon applied from homepage | Coupon on homepage | 1. Apply coupon on homepage 2. Preview → Checkout | Single payment intent created at discounted price | CHECK#010 | ❌ FAILED (R2) |
| TC-STR-006 | No duplicate Stripe entry on back-and-forth navigation | No coupon needed | 1. Checkout → back → Revisit banner → Checkout | Existing payment intent updated, no new one created | CHECK#011 | — |
| TC-STR-007 | Stripe failure redirects to PayPal tab with PayPal option visible | Declining card | 1. Enter declining card 2. Submit | Redirected to PayPal tab; "Pay with PayPal" button visible | CHECK#007 | ❌ FAILED (R2) |
| TC-STR-008 | Stripe failure for VHR shows PayPal option | VHR product, declining card | 1. Select VHR 2. Enter declining card 3. Submit | PayPal option visible on PayPal tab | CHECK#007 | ❌ FAILED (R2) |

---

## Module 3 — PayPal Payment Flows

| TC ID | Title | Precondition | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-------------|-------|----------------|------------|--------|
| TC-PP-001 | PayPal subscription payment succeeds | US customer | 1. Select PayPal 2. Complete PayPal flow | Subscription created; no API errors | CHECK#002 | ✅ PASSED (R2) |
| TC-PP-002 | PayPal failover only triggers for USD | Non-USD customer (e.g., CRC) | 1. Non-USD customer payment fails | No PayPal redirect; appropriate error shown | CHECK#008 | ✅ PASSED (R2) |
| TC-PP-003 | CAD customer sees PayPal only | CA customer | 1. Navigate to checkout | Only PayPal tab shown | — | — |
| TC-PP-004 | CAD PayPal payment for Window Sticker — admin shows CAD | CA customer, WS product | 1. Complete PayPal CAD payment for WS | Admin shows CAD amount; sticker generation starts | CHECK#015 | ❌ OPEN |

---

## Module 4 — CAD / Currency Handling

| TC ID | Title | Precondition | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-------------|-------|----------------|------------|--------|
| TC-CAD-001 | Pending order created on checkout load for CAD customer | CA customer | 1. Navigate to checkout page | Pending order appears in admin immediately | CHECK#013 | ⚠️ PARTIAL (R2) |
| TC-CAD-002 | Pending order shows PayPal as gateway for CAD | CA customer | 1. Navigate to checkout page | Admin shows "PayPal" as payment gateway | CHECK#013 | ❌ FAILED (R2) |
| TC-CAD-003 | Admin panel shows CAD currency for CAD payments | CA customer | 1. Complete CAD payment | Admin displays price in CAD, not USD | CHECK#009 | ✅ PASSED (R2) |
| TC-CAD-004 | Report & Sticker generation auto-starts for CAD payment | CA customer | 1. Complete CAD payment | Report and Sticker generation triggered automatically | CHECK#009 | ✅ PASSED (R2) |

---

## Module 5 — Coupon Logic

| TC ID | Title | Precondition | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-------------|-------|----------------|------------|--------|
| TC-CPN-001 | Coupon applied on checkout page reduces price | Valid coupon | 1. Enter coupon on checkout 2. Verify price | Price updates to discounted amount | — | — |
| TC-CPN-002 | Coupon not carried over to second order in same session | First order with coupon | 1. Complete order with coupon 2. Start second order | Second order has no coupon pre-applied | CHECK#005 | ✅ PASSED (R2) |
| TC-CPN-003 | Invalid coupon shows error | Invalid code | 1. Enter invalid coupon | Error message displayed; price unchanged | — | — |
| TC-CPN-004 | Coupon from homepage applies correctly at checkout | Coupon on homepage | 1. Apply coupon on homepage 2. Proceed to checkout | Discount applied immediately; single payment intent | CHECK#010 | ❌ FAILED (R2) |

---

## Module 6 — Upsell Flows

| TC ID | Title | Precondition | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-------------|-------|----------------|------------|--------|
| TC-UPS-001 | Window Sticker upsell — Register API includes sticker | WS upsell selected | 1. Select WS upsell 2. Complete payment 3. Inspect Register API payload | Payload includes sticker order | — | — |
| TC-UPS-002 | Report+Sticker upsell — Register API includes both | Report+Sticker upsell selected | 1. Select Report+Sticker upsell 2. Complete payment 3. Inspect Register API payload | Payload includes both sticker and report | CHECK#006 | ❌ FAILED (R2) |
| TC-UPS-003 | Sticker-only upsell generates correctly | Sticker upsell selected | 1. Select sticker upsell 2. Complete payment | Sticker generated in admin | CHECK#006 | ✅ PASSED (R2) |

---

## Module 7 — UI / Design Parity

| TC ID | Title | Precondition | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-------------|-------|----------------|------------|--------|
| TC-UI-001 | SH/Auction image displayed on checkout | SH/Auction VIN | 1. Navigate to checkout with SH/Auction VIN | Image displayed on checkout page | CHECK#012 | ✅ PASSED (R2) |
| TC-UI-002 | Info icons and text below Pay button | Any checkout | 1. Navigate to checkout | Secure payment, refund policy icons visible below Pay button | CHECK#014 | ✅ PASSED (R2) |
| TC-UI-003 | Testimonials carousel loops correctly | Any checkout | 1. Navigate to checkout 2. Observe review carousel | Reviews loop; first visible review has English name | CHECK#016 | ❌ OPEN |

---

## Module 8 — 3D Secure Challenge Flows

| TC ID | Title | Test Card | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-----------|-------|----------------|------------|--------|
| TC-3DS-001 | 3DS required — challenge succeeds, error logged on Stripe | 4000003720000278 | 1. Enter card 2. Complete 3DS challenge | Challenge succeeds; error (if any) logged on Stripe error page | CHK#001 | ❌ FAILED |
| TC-3DS-002 | 3DS required — payment declined after auth | 4000008400001629 | 1. Enter card 2. Complete 3DS | Payment declined after authentication | CHK#002 | ✅ PASSED |
| TC-3DS-003 | 3DS supported — no challenge triggered | 4000000000003055 | 1. Enter card 2. Submit | Payment succeeds without any 3DS prompt | CHK#003 | ❌ FAILED |
| TC-3DS-004 | 3DS lookup fails — payment declined immediately | 4000008400001280 | 1. Enter card 2. Submit | Payment declined; no challenge UI shown | CHK#004 | ✅ PASSED |
| TC-3DS-005 | 3DS supported but auth errors — Case 1 (no 3DS forced) | 4000000000003097 | 1. Enter card (no 3DS forcing) 2. Submit | Payment succeeds without 3DS | CHK#005 | ✅ PASSED |
| TC-3DS-006 | 3DS supported but auth errors — Case 2 (3DS forced) | 4000000000003097 | 1. Enter card with 3DS forced 2. Submit | Authentication fails; payment declined with error | CHK#005 | ❌ FAILED |

---

## Module 9 — CAPTCHA & PIN Challenge Flows

| TC ID | Title | Test Card | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-----------|-------|----------------|------------|--------|
| TC-CAP-001 | Online PIN simulation | 4000002760000008 | 1. Enter card 2. Submit | Stripe acknowledges 3DS attempt; appropriate test mode message shown | CHK#001 | ✅ PASSED |
| TC-CAP-002 | CAPTCHA challenge — succeeds on correct answer | 4000000000001208 | 1. Enter card 2. Complete CAPTCHA | Charge succeeds | CHK#002 | ✅ PASSED |
| TC-CAP-003 | Offline PIN simulation | 4001007020000002 | 1. Enter card 2. Submit | Stripe acknowledges 3DS attempt; appropriate test mode message shown | CHK#003 | — |

---

## Module 10 — Mobile 3DS Challenge Flows

| TC ID | Title | Test Card | Steps | Expected Result | Linked Bug | Status |
|-------|-------|-----------|-------|----------------|------------|--------|
| TC-MOB-001 | Out-of-band challenge — approve | 4000582600000094 | 1. Enter card 2. Simulate OOB approval | Payment succeeds | CHK#001 | ✅ PASSED |
| TC-MOB-002 | Out-of-band challenge — fail | 4000582600000094 | 1. Enter card 2. Simulate OOB failure | Payment declined | CHK#001 | ✅ PASSED |
| TC-MOB-003 | One-time passcode — complete auth | 4000582600000045 | 1. Enter card 2. Enter simulated OTP | Payment succeeds | CHK#002 | ✅ PASSED |
| TC-MOB-004 | Multi-select UI — complete auth | 4000582600000110 | 1. Enter card 2. Select options 3. Complete auth | Payment succeeds | CHK#003 | ✅ PASSED |
| TC-MOB-005 | 3DS required & successful | 4000000000003220 | 1. Enter card 2. Complete 3DS | Payment succeeds | CHK#004 | ✅ PASSED |
| TC-MOB-006 | 3DS required but declined | 4000008400001629 | 1. Enter card 2. Complete 3DS | Payment declined after auth | CHK#005 | ✅ PASSED |
| TC-MOB-007 | 3DS required with error | 4000008400001280 | 1. Enter card 2. Submit | Payment declined; lookup error | CHK#006 | ✅ PASSED |

---

---

## Module 11 — Multi-IP Handling & Gateway Routing by IP

> Verifies that the system correctly detects customer region via IP and displays the appropriate payment gateways. Also verifies that switching IP mid-session does not corrupt currency or gateway state.

| TC ID | Title | Precondition | Steps | Expected Result | Status |
|-------|-------|-------------|-------|----------------|--------|
| TC-IP-001 | US IP shows Stripe + PayPal | VPN/proxy set to US IP | 1. Open checkout with US IP | Stripe and PayPal tabs visible; Paystack hidden | — |
| TC-IP-002 | CA IP shows PayPal only | VPN/proxy set to CA IP | 1. Open checkout with CA IP | Only PayPal tab visible; currency = CAD | — |
| TC-IP-003 | MXN IP shows Stripe + PayPal | VPN/proxy set to MX IP | 1. Open checkout with MX IP | Stripe and PayPal tabs visible; currency = MXN | — |
| TC-IP-004 | EUR IP shows Stripe + PayPal | VPN/proxy set to EU IP | 1. Open checkout with EU IP | Stripe and PayPal tabs visible; currency = EUR | — |
| TC-IP-005 | African IP shows Stripe + Paystack | VPN/proxy set to African IP | 1. Open checkout with African IP | Stripe and Paystack tabs visible; PayPal hidden | — |
| TC-IP-006 | IP switch mid-session does not change gateway | Start with US IP, switch to CA IP after page load | 1. Load checkout on US IP 2. Switch VPN to CA 3. Do not reload page | Gateway tabs remain as originally loaded (US = Stripe+PayPal); no auto-switch | — |
| TC-IP-007 | IP switch mid-session does not change currency | Start with USD session, switch IP to MXN region | 1. Load checkout on US IP (USD) 2. Switch VPN to MX 3. Do not reload 4. Proceed to pay | Currency remains USD; no conversion triggered by IP switch | — |
| TC-IP-008 | Page reload after IP switch reflects new region | Switch IP then reload | 1. Load checkout on US IP 2. Switch VPN to CA 3. Reload page | New region (CA) detected; PayPal only shown; currency = CAD | — |
| TC-IP-009 | Unknown/unsupported IP falls back to default gateway | Use IP from unsupported region | 1. Open checkout with unsupported region IP | Default gateway shown (Stripe); no crash or blank tab | — |
| TC-IP-010 | IP detection failure does not break checkout | Simulate IP detection API timeout | 1. Block IP detection API 2. Open checkout | Checkout loads with fallback/default gateway; no white screen | — |

---

## Module 12 — Stripe Currency Handling (0-Decimal & 2-Decimal)

> Verifies Stripe processes zero-decimal currencies (JPY, KRW) and two-decimal currencies (USD, EUR, CAD) correctly, and that conversion flows behave as expected.

### 12A — Zero-Decimal Currency

| TC ID | Title | Currency | Steps | Expected Result | Status |
|-------|-------|----------|-------|----------------|--------|
| TC-CUR-001 | Stripe charge in JPY (0-decimal) — correct amount sent | JPY | 1. Set currency to JPY 2. Complete Stripe payment | Stripe receives integer amount (e.g., 1000 for ¥1000); no decimal sent | — |
| TC-CUR-002 | Stripe charge in KRW (0-decimal) — no decimal conversion | KRW | 1. Set currency to KRW 2. Complete Stripe payment | Amount sent as integer; payment succeeds | — |
| TC-CUR-003 | Admin panel displays correct 0-decimal amount | JPY | 1. Complete JPY payment | Admin shows ¥1000, not ¥10.00 or ¥100000 | — |
| TC-CUR-004 | Coupon applied on 0-decimal currency — correct discounted amount | JPY + coupon | 1. Apply coupon 2. Complete JPY payment | Discounted amount is integer; Stripe and admin match | — |

### 12B — Two-Decimal Currency

| TC ID | Title | Currency | Steps | Expected Result | Status |
|-------|-------|----------|-------|----------------|--------|
| TC-CUR-005 | Stripe charge in USD (2-decimal) — correct cents sent | USD | 1. Complete USD payment ($29.99) | Stripe receives 2999 (cents); admin shows $29.99 | — |
| TC-CUR-006 | Stripe charge in EUR (2-decimal) | EUR | 1. Complete EUR payment | Stripe receives correct cent value; admin shows EUR amount | — |
| TC-CUR-007 | Coupon on 2-decimal currency — Stripe and admin match | USD + coupon | 1. Apply coupon 2. Complete USD payment | Stripe and admin both show discounted price in cents/dollars | — |

### 12C — Currency Conversion Flow (Negative / Edge Cases)

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-CUR-008 | Conversion rate not applied twice | 1. Load checkout with EUR IP 2. Verify price displayed 3. Complete payment | Price shown to user = price charged by Stripe (no double conversion) | — |
| TC-CUR-009 | IP switch does not trigger currency re-conversion | 1. Load checkout (USD) 2. Switch IP to EUR region 3. Do not reload 4. Pay | Currency stays USD; Stripe charged in USD; no EUR conversion applied | — |
| TC-CUR-010 | Currency mismatch between display and Stripe charge | 1. Load checkout 2. Inspect Stripe payment intent currency vs displayed currency | Stripe payment intent currency matches displayed currency | — |
| TC-CUR-011 | 0-decimal currency not sent with decimal multiplier | 1. Set JPY 2. Inspect Stripe API call | Amount field is integer (e.g., 1000), not 100000 | — |
| TC-CUR-012 | Negative conversion: unsupported currency falls back gracefully | 1. Set currency to unsupported code 2. Open checkout | Fallback currency applied (USD); no crash; user informed | — |
| TC-CUR-013 | Conversion does not change after coupon applied | 1. Load checkout in EUR 2. Apply coupon 3. Verify price | Discount applied in EUR; no re-conversion to USD | — |

---

## Module 13 — Coupon Handling: Previous vs New Coupon (Cookie & Session)

> Verifies coupon priority logic, session/cookie isolation, and all edge cases around coupon state management.

### 13A — Previous Coupon vs New Coupon Priority

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-CPN-005 | New coupon overrides previously applied coupon | 1. Apply coupon A 2. Apply coupon B | Coupon B is active; coupon A is discarded; price reflects B | — |
| TC-CPN-006 | Removing new coupon does not restore previous coupon | 1. Apply coupon A 2. Apply coupon B 3. Remove coupon B | No coupon active; full price shown (coupon A not restored) | — |
| TC-CPN-007 | Expired coupon not accepted | 1. Enter expired coupon code | Error: "Coupon expired"; price unchanged | — |
| TC-CPN-008 | Already-used single-use coupon rejected | 1. Enter a coupon already redeemed by this user | Error: "Coupon already used"; price unchanged | — |

### 13B — Cookie-Based Coupon Verification

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-CPN-009 | Coupon persists in cookie across page refresh | 1. Apply coupon 2. Refresh page | Coupon still applied; discounted price shown | — |
| TC-CPN-010 | Coupon cookie cleared after successful payment | 1. Apply coupon 2. Complete payment 3. Navigate back to checkout | No coupon pre-applied; full price shown | — |
| TC-CPN-011 | Coupon cookie not shared across different users on same browser | 1. User A applies coupon and logs out 2. User B logs in on same browser | User B sees no coupon applied | — |
| TC-CPN-012 | Coupon cookie does not persist after browser close (session cookie) | 1. Apply coupon 2. Close browser completely 3. Reopen and navigate to checkout | Coupon not pre-applied (if session cookie); full price shown | — |
| TC-CPN-013 | Coupon from cookie matches coupon in admin order | 1. Apply coupon via cookie 2. Complete payment 3. Check admin | Admin order shows correct coupon code | — |

### 13C — Session-Based Coupon Verification

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-CPN-014 | Coupon applied in session not visible to new session (incognito) | 1. Apply coupon in normal browser 2. Open incognito tab → checkout | No coupon pre-applied in incognito session | — |
| TC-CPN-015 | Coupon session resets on logout | 1. Apply coupon while logged in 2. Log out 3. Log back in → checkout | No coupon pre-applied after re-login | — |
| TC-CPN-016 | Coupon not carried from session 1 to session 2 (same user) | 1. Apply coupon in session 1, complete order 2. Start new session → checkout | No coupon in new session | — |
| TC-CPN-017 | Coupon applied from homepage stored correctly in session | 1. Apply coupon on homepage 2. Navigate to preview → checkout | Same coupon reflected at checkout; single payment intent at discounted price | — |

### 13D — Parallel / Edge Cases

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-CPN-018 | Two tabs open — coupon applied in tab 1 not auto-applied in tab 2 | 1. Open checkout in tab 1 and tab 2 2. Apply coupon in tab 1 | Tab 2 does not auto-apply coupon without user action | — |
| TC-CPN-019 | Coupon applied after payment intent created — intent updated | 1. Load checkout (payment intent created) 2. Apply coupon | Payment intent amount updated to discounted price; not a new intent | — |
| TC-CPN-020 | Coupon with 100% discount — $0 charge handled | 1. Apply 100% discount coupon | Stripe handles $0 charge correctly; order created in admin | — |
| TC-CPN-021 | Coupon applied to wrong product type rejected | 1. Apply product-specific coupon to different product | Error shown; coupon not applied | — |
| TC-CPN-022 | Rapid coupon switching — final state is correct | 1. Apply coupon A 2. Quickly apply coupon B 3. Quickly apply coupon C | Final active coupon is C; price reflects C; no race condition | — |

---

## Module 14 — UI / UX & Cross-Browser Compatibility

### 14A — UI / UX Validation

| TC ID | Title | Steps | Expected Result | Status |
|-------|-------|-------|----------------|--------|
| TC-UX-001 | Checkout page loads within acceptable time | 1. Open checkout page | Page fully interactive within 3 seconds on standard connection | — |
| TC-UX-002 | Payment tab switching is smooth with no layout shift | 1. Click between Stripe / PayPal / Paystack tabs | No layout shift; active tab highlighted; form updates correctly | — |
| TC-UX-003 | Error messages are visible and descriptive | 1. Submit form with invalid card | Inline error shown near field; bottom error message shown; no duplicate errors | — |
| TC-UX-004 | Coupon field shows loading state while validating | 1. Enter coupon and click Apply | Loading spinner shown; button disabled during validation | — |
| TC-UX-005 | Coupon success/failure feedback is clear | 1. Apply valid coupon 2. Apply invalid coupon | Green success message with discount amount; red error for invalid | — |
| TC-UX-006 | Pay button disabled until required fields filled | 1. Open checkout 2. Leave fields empty | Pay button is disabled; enabled only when all required fields valid | — |
| TC-UX-007 | 3DS modal renders correctly and is dismissible | 1. Use 3DS test card 2. Trigger challenge | 3DS modal opens centered; does not overflow viewport; can be dismissed on failure | — |
| TC-UX-008 | Testimonials carousel is accessible via keyboard | 1. Tab to carousel 2. Use arrow keys | Carousel navigable via keyboard; focus visible | — |
| TC-UX-009 | Checkout page is responsive on mobile (375px) | 1. Open checkout at 375px width | All elements visible; no horizontal scroll; buttons tappable | — |
| TC-UX-010 | Checkout page is responsive on tablet (768px) | 1. Open checkout at 768px width | Layout adapts correctly; no overlapping elements | — |
| TC-UX-011 | Form fields have correct input types and autocomplete | 1. Inspect card number, expiry, CVV fields | inputmode="numeric" on card fields; autocomplete attributes set correctly | — |
| TC-UX-012 | Currency symbol updates correctly when region changes | 1. Load checkout for USD 2. Load for EUR 3. Load for CAD | Correct currency symbol shown next to price for each region | — |

### 14B — Cross-Browser Compatibility

| TC ID | Title | Browser | Steps | Expected Result | Status |
|-------|-------|---------|-------|----------------|--------|
| TC-CB-001 | Checkout renders correctly on Chrome (latest) | Chrome | 1. Open checkout 2. Complete payment | All elements render; payment succeeds | — |
| TC-CB-002 | Checkout renders correctly on Firefox (latest) | Firefox | 1. Open checkout 2. Complete payment | All elements render; payment succeeds | — |
| TC-CB-003 | Checkout renders correctly on Safari (latest) | Safari | 1. Open checkout 2. Complete payment | All elements render; payment succeeds | — |
| TC-CB-004 | Checkout renders correctly on Edge (latest) | Edge | 1. Open checkout 2. Complete payment | All elements render; payment succeeds | — |
| TC-CB-005 | Stripe card element renders on all browsers | Chrome, Firefox, Safari, Edge | 1. Open Stripe tab on each browser | Card input iframe loads; no blank/broken element | — |
| TC-CB-006 | 3DS modal works on Safari (known iframe restrictions) | Safari | 1. Use 3DS test card on Safari | 3DS challenge modal opens and completes correctly | — |
| TC-CB-007 | PayPal button renders on all browsers | Chrome, Firefox, Safari, Edge | 1. Open PayPal tab on each browser | PayPal button visible and clickable | — |
| TC-CB-008 | Coupon field works on all browsers | Chrome, Firefox, Safari, Edge | 1. Apply coupon on each browser | Coupon applied; price updates correctly | — |
| TC-CB-009 | Checkout on Chrome mobile (Android) | Chrome Android | 1. Open checkout on Android Chrome | Responsive layout; Stripe keyboard appears on card tap | — |
| TC-CB-010 | Checkout on Safari mobile (iOS) | Safari iOS | 1. Open checkout on iPhone Safari | Responsive layout; no zoom on input focus; payment completes | — |
| TC-CB-011 | No console errors on any browser | All browsers | 1. Open checkout 2. Open DevTools console | Zero JS errors in console on page load | — |
| TC-CB-012 | CSS layout consistent across browsers | Chrome, Firefox, Safari, Edge | 1. Visual comparison of checkout on each browser | No broken layouts, misaligned buttons, or missing icons | — |

---

## Module 15 — V2-4448: PayPal Production Bug Fixes

> Issues found in production after deployment. All fixed and verified via PRODUCTION CIT on 19 Mar 2025.

| TC ID | Title | Environment | Steps | Expected Result | Evidence | Status |
|-------|-------|-------------|-------|----------------|----------|--------|
| TC-V2-001 | PayPal double charge prevented — back navigation blocked | PRODUCTION | 1. Complete PayPal payment 2. Navigate back to PayPal page instead of clicking "Return to Merchant" | System prevents second charge; only one order created; user redirected away from PayPal page | [jam.dev](https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3) | ✅ PASSED |
| TC-V2-002 | Only one order created for PayPal payment regardless of back navigation | PRODUCTION | 1. Complete PayPal payment 2. Attempt to re-pay via back navigation | Admin shows exactly one order for the transaction | [jam.dev](https://jam.dev/c/32b81a28-7ef9-4ed0-97d0-a512a04e27f3) | ✅ PASSED |
| TC-V2-003 | Stripe hidden for CAD customers | CWA / CD | 1. Open checkout as CAD customer | Stripe tab not visible; only PayPal shown | [jam.dev](https://jam.dev/c/c2d2c5fe-dfaf-4d69-9a77-08627d11dc34) | ✅ PASSED |
| TC-V2-004 | Checkout page loads when only PayPal set in site settings | CWA | 1. Set site settings to PayPal-only gateway 2. Open checkout | Checkout page loads correctly; no blank/error page | — | ✅ PASSED |
| TC-V2-005 | Stripe payment working in CD after fix | CD | 1. Complete Stripe payment in CD | Payment succeeds; order created | [jam.dev](https://jam.dev/c/21217c25-a37d-445c-8c76-174e6a8f82f1) | ✅ PASSED |
| TC-V2-006 | PayPal payment working in CD after fix | CD | 1. Complete PayPal payment in CD | Payment succeeds; order created | [jam.dev](https://jam.dev/c/7234d8d1-f4e4-4d1c-afe7-9b94887216da) | ✅ PASSED |
| TC-V2-007 | Stripe payment working in CWA after fix | CWA | 1. Complete Stripe payment in CWA | Payment succeeds; order created | [jam.dev](https://jam.dev/c/867e76f0-68de-4e41-9a37-9875753088a8) | ✅ PASSED |
| TC-V2-008 | PayPal payment working in CWA after fix | CWA | 1. Complete PayPal payment in CWA | Payment succeeds; order created | [jam.dev](https://jam.dev/c/2c4dea50-db01-4d97-9c26-b3d8d4fc29c7) | ✅ PASSED |
| TC-V2-009 | NGN region shows Stripe + Paystack only | CWA | 1. Open checkout as NGN customer | Stripe and Paystack visible; PayPal hidden | [jam.dev](https://jam.dev/c/c06919ea-2cef-4db0-b0f2-173377e70b41) | ✅ PASSED |
| TC-V2-010 | PayPal CAD discount applied correctly | CWA | 1. Apply coupon as CAD customer 2. Pay via PayPal | Discounted price charged via PayPal in CAD | [jam.dev](https://jam.dev/c/c2d2c5fe-dfaf-4d69-9a77-08627d11dc34) | ✅ PASSED |

---

## Updated Test Execution Summary

| Module | Total TCs | Passed | Failed | Open/Not Tested |
|--------|-----------|--------|--------|-----------------|
| Payment Gateway Routing | 5 | — | — | 5 |
| Stripe Flows | 8 | 3 | 3 | 2 |
| PayPal Flows | 4 | 2 | 1 | 1 |
| CAD / Currency | 4 | 2 | 2 | 0 |
| Coupon Logic (original) | 4 | 2 | 1 | 1 |
| Upsell Flows | 3 | 1 | 1 | 1 |
| UI / Design | 3 | 2 | 1 | 0 |
| 3DS Challenges | 6 | 2 | 2 | 2 |
| CAPTCHA / PIN | 3 | 2 | 0 | 1 |
| Mobile 3DS | 7 | 7 | 0 | 0 |
| Multi-IP Handling | 10 | — | — | 10 |
| Stripe Currency (0/2-decimal + conversion) | 13 | — | — | 13 |
| Coupon: Prev vs New (Cookie/Session/Edge) | 18 | — | — | 18 |
| UI/UX + Cross-Browser | 24 | — | — | 24 |
| **V2-4448: PayPal Production Fixes** | **10** | **10** | **0** | **0** |
| **Total** | **122** | **35** | **11** | **79** |
