<div align="center">

# 🧪 Checkout Page — QA Portfolio

**Manual QA documentation for a production Next.js checkout page**
covering multi-gateway payments, 3D Secure, coupon logic, IP-based routing, currency handling, and cross-browser compatibility.

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)
![Bugs](https://img.shields.io/badge/Bugs%20Reported-16-red)
![Fixed](https://img.shields.io/badge/Fixed-9-brightgreen)
![Test Cases](https://img.shields.io/badge/Test%20Cases-112-blue)
![Environment](https://img.shields.io/badge/Environment-DEV-lightgrey)

</div>

---

## 📌 Project Overview

| | |
|---|---|
| **Application** | Next.js Checkout Page (CWA) |
| **Testing Rounds** | R1 — 28 May 2025 &nbsp;·&nbsp; R2 — 29 May 2025 |
| **Environment** | DEV |
| **Payment Gateways** | Stripe · PayPal · Paystack |
| **QA Engineer** | Shahnawaz |

---

## 🌍 Payment Gateway Routing

Gateway visibility is determined by the customer's IP region:

| Region | Stripe | PayPal | Paystack |
|--------|:------:|:------:|:--------:|
| 🇺🇸 US (USD) | ✅ | ✅ | ❌ |
| 🇨🇦 CA (CAD) | ❌ | ✅ | ❌ |
| 🇲🇽 MXN / 🇪🇺 EUR | ✅ | ✅ | ❌ |
| 🌍 Africa | ✅ | ❌ | ✅ |

---

## 📁 Documentation

| Document | Description |
|----------|-------------|
| [`BUG_REPORT.md`](./BUG_REPORT.md) | All 16 checkout bugs with R1 → R2 status, 3DS/CAPTCHA/Mobile findings, and Jam.dev links |
| [`TEST_PLAN.md`](./TEST_PLAN.md) | Test scope, priorities, entry/exit criteria, tools, and risk assessment |
| [`TEST_CASES.md`](./TEST_CASES.md) | 112 test cases across 14 modules with steps, expected results, and status |
| [`QA_REPORT.md`](./QA_REPORT.md) | Executive summary, regression analysis, open issues, and release recommendation |

---

## 📊 Results Summary

### 🐛 Bug Tracking (R1 → R2)

| Total | Fixed ✅ | Open ❌ |
|-------|---------|--------|
| 16 | 9 (56%) | 7 (44%) |

### ✅ Test Execution

| Total | Passed | Failed | Pending |
|-------|--------|--------|---------|
| 112 | 25 | 11 | 79 |

### 🔐 3DS / Challenge Flows

| Category | Result |
|----------|--------|
| Mobile 3DS (OOB, OTP, Multi-select) | ✅ 6/6 Passed |
| CAPTCHA / PIN Challenges | ✅ 2/3 Passed |
| Standard 3DS Scenarios | ⚠️ 2 Passed · 2 Failed · 1 Partial |

---

## 🔍 What Was Tested

<details>
<summary><strong>Payment Flows</strong></summary>

- Stripe: success, decline, coupon sync, duplicate payment intent prevention
- PayPal: subscription, CAD flow, failover logic
- Paystack: African region routing
- Gateway display rules enforced by IP detection

</details>

<details>
<summary><strong>Coupon Logic</strong></summary>

- Coupon applied at homepage vs checkout page
- Previous coupon vs new coupon priority
- Cookie-based persistence (refresh, post-payment, multi-user)
- Session isolation (incognito, logout, multi-session)
- Edge cases: 100% discount, race conditions, wrong product type

</details>

<details>
<summary><strong>Multi-IP & Currency Handling</strong></summary>

- IP-based gateway routing for all 5 regions
- IP switch mid-session — gateway and currency must NOT change
- Stripe 0-decimal currencies (JPY, KRW) — integer amount validation
- Stripe 2-decimal currencies (USD, EUR) — cent value validation
- Negative cases: double conversion, unsupported currency fallback

</details>

<details>
<summary><strong>3D Secure & Authentication</strong></summary>

- All Stripe 3DS test card scenarios
- CAPTCHA and online/offline PIN simulations
- Mobile challenge flows: OOB, OTP, Multi-select

</details>

<details>
<summary><strong>UI / UX & Cross-Browser</strong></summary>

- Responsive layout: 375px (mobile) and 768px (tablet)
- Keyboard accessibility, input types, error messaging
- Chrome · Firefox · Safari · Edge (desktop + mobile)
- Zero console errors across all browsers

</details>

---

## 🚨 Critical Open Issues

| Bug ID | Issue | Impact |
|--------|-------|--------|
| CHECK#006 | Report+Sticker upsell missing from Register API payload | Product not delivered to customer |
| CHECK#007 | "Pay with PayPal" missing on PayPal tab for VHR | Blocks payment completion |
| CHECK#010 | Duplicate Stripe payment intents from homepage coupon | Risk of double charge |
| CHECK#013 | CAD pending order shows Stripe instead of PayPal as gateway | Admin data incorrect |
| CHECK#015 | CAD PayPal Window Sticker payment shows USD in admin | Currency mismatch |

> ⚠️ **Release not recommended** until all P1 issues above are resolved.

---

## 🛠️ Tools & Stack

| Tool | Purpose |
|------|---------|
| [Jam.dev](https://jam.dev) | Bug recording with screen capture + console logs |
| Stripe Dashboard (Test Mode) | Payment intent & 3DS verification |
| PayPal Sandbox | PayPal flow testing |
| Browser DevTools | Network tab — API payload inspection |
| Admin Panel | Order status, currency, gateway verification |

---

## 🗂️ Repo Structure

```
checkout-qa-portfolio/
├── README.md         ← You are here
├── BUG_REPORT.md     ← Bug tracker with R1/R2 comparison
├── TEST_PLAN.md      ← Strategy, scope, risks
├── TEST_CASES.md     ← 112 test cases across 14 modules
└── QA_REPORT.md      ← Final report + release recommendation
```

---

<div align="center">
<sub>QA Engineer: Shahnawaz &nbsp;·&nbsp; Testing Period: May 2025</sub>
</div>
