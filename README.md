# 🧪 QA Portfolio — Next.js Checkout Page

A complete QA documentation portfolio for a **Next.js Checkout Page** supporting multiple payment gateways, regional routing, coupon logic, upsell flows, and 3D Secure authentication.

---

## 📋 Project Overview

| Detail | Info |
|--------|------|
| **Application** | Next.js Checkout Page (CWA) |
| **Environment** | DEV |
| **Testing Rounds** | R1 (28 May 2025) · R2 (29 May 2025) |
| **Payment Gateways** | Stripe · PayPal · Paystack |
| **Total Bugs Reported** | 16 checkout + 14 3DS/challenge scenarios |

---

## 🌍 Payment Gateway Routing Logic

| Region | Stripe | PayPal | Paystack |
|--------|--------|--------|----------|
| US (USD) | ✅ | ✅ | ❌ |
| CA (CAD) | ❌ | ✅ | ❌ |
| MXN / EUR | ✅ | ✅ | ❌ |
| Africa | ✅ | ❌ | ✅ |

---

## 🔑 Features Tested

- ✅ Payment gateway display by region
- ✅ Stripe payment flows (success, decline, coupon sync, duplicate intent prevention)
- ✅ PayPal subscription and CAD flows
- ✅ Paystack (African region)
- ✅ Coupon code application (homepage, checkout, multi-session isolation)
- ✅ Upsell flows (Window Sticker, Vehicle History Report, Report+Sticker combo)
- ✅ 3D Secure challenge flows (all Stripe test card scenarios)
- ✅ CAPTCHA and PIN challenge simulations
- ✅ Mobile 3DS challenge flows (OOB, OTP, Multi-select)
- ✅ CAD currency display and pending order creation
- ✅ Admin panel accuracy (gateway, currency, order status)
- ✅ UI parity with V1 checkout (SH/Auction image, info icons, testimonials)

---

## 📁 Documents

| File | Description |
|------|-------------|
| [`BUG_REPORT.md`](./BUG_REPORT.md) | All 16 checkout bugs + 3DS/CAPTCHA/Mobile findings with R1→R2 status |
| [`TEST_PLAN.md`](./TEST_PLAN.md) | Scope, priorities, entry/exit criteria, risk assessment |
| [`TEST_CASES.md`](./TEST_CASES.md) | 47 test cases across 10 modules with expected results and status |
| [`QA_REPORT.md`](./QA_REPORT.md) | Final QA report with executive summary, regression analysis, and release recommendation |

---

## 📊 Results at a Glance

### Checkout Bugs (R1 → R2)

```
Total Reported : 16
Fixed (PASSED) : 9   ████████░░  56%
Still Open     : 7   ██████░░░░  44%
```

### Test Cases

```
Total    : 112
Passed   : 25   ████░░░░░░░░░░░░░░░░  22%
Failed   : 11   ██░░░░░░░░░░░░░░░░░░  10%
Pending  : 79   ██████████████░░░░░░  70%
```

### 3DS / Challenge Flows

```
Mobile 3DS (6/6) : ✅ All Passed
CAPTCHA/PIN (2/3): ✅ 2 Passed, 1 Not Recorded
Standard 3DS     : ⚠️  2 Passed, 2 Failed, 1 Partial
```

---

## 🐛 Critical Open Issues

| Bug ID | Issue | Impact |
|--------|-------|--------|
| CHECK#006 | Report+Sticker upsell missing from Register API | Product not delivered |
| CHECK#007 | PayPal option missing on PayPal tab for VHR | Blocks payment |
| CHECK#010 | Duplicate Stripe payment intents from homepage coupon | Potential double charge |
| CHECK#013 | CAD pending order shows Stripe instead of PayPal | Admin data incorrect |
| CHECK#015 | CAD PayPal WS payment shows USD in admin | Currency mismatch |

---

## 🛠️ Tools Used

| Tool | Purpose |
|------|---------|
| [Jam.dev](https://jam.dev) | Bug recording with screen capture and console logs |
| Stripe Dashboard (Test Mode) | Payment intent and 3DS verification |
| PayPal Sandbox | PayPal flow testing |
| Browser DevTools | Network tab for API payload inspection |
| Admin Panel | Order status, currency, gateway verification |

---

## 🗂️ Folder Structure

```
checkout-qa-portfolio/
├── BUG_REPORT.md       # Detailed bug report with R1/R2 comparison
├── TEST_PLAN.md        # Test strategy, scope, and risk assessment
├── TEST_CASES.md       # 47 test cases across 10 modules
├── QA_REPORT.md        # Final QA report and release recommendation
└── README.md           # This file
```

---

## 👤 About

This portfolio demonstrates end-to-end QA work on a production-grade checkout system including:
- Multi-gateway payment testing
- API payload verification
- 3D Secure and authentication challenge testing
- Regression testing across multiple rounds
- Structured documentation for team and stakeholder communication

---

*QA Engineer: Shahnawaz | Testing Period: May 2025*
