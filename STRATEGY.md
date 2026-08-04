# VEKTRA — Strategy & Execution Playbook
_AI Co-Founder working document · v1.0_

> The frontend is built (landing, tip flow, creator dashboard). This document
> converts the business plan into an executable operating playbook: what to
> guard against, how to reach 100 creators, and exactly what to say to them.

---

## 1. Risk, Compliance & Financial Leakage

### 1.1 Regulatory & Compliance (Kenya)

Vektra is a **payment aggregator / money-movement intermediary**, not just a
"website." That triggers real obligations. Treat these as launch blockers, not
afterthoughts.

| Area | Requirement | Why it matters |
|---|---|---|
| **Payment licensing** | Register under the **Payment Service Providers Act, 2023** (CBK) as a PSP / payment aggregator. The National Payment Systems Act (NPSA, 2011) framework is being folded into this. | Operating an unlicensed money-movement service is illegal and Safaricom will not partner with you without it. |
| **M-Pesa / Daraja API** | Sign up as a **Safaricom developer**, obtain a **Paybill/Till**, and enable **C2B** (collections) + **B2C** (payouts) APIs. | This is the actual rails. You need a registered business + IPN (payment notifications) endpoint. |
| **Data Protection** | Register as a **Data Controller** with the **ODPC** under the **Data Protection Act 2019**. | You collect fan phone numbers + emails. Consent, purpose limitation, and secure storage are mandatory. |
| **AML/CFT** | Comply with **POCAMLA 2009** + AML/CFT Regulations; register with the **Financial Reporting Centre (FRC)**. | You move money. You need **KYC/CDD** on creators, **transaction monitoring**, and **threshold/suspicion reporting**. |
| **Tax** | **KRA** registration: income tax on platform fees, **VAT** on digital services/commission, and **withholding tax** considerations on creator payouts. | Unplanned tax erodes your thin margin. Budget it from day one. |
| **Consumer protection** | Clear refunds, dispute, and reversal policy. | Builds trust and keeps you Clean under CBK conduct scrutiny. |

**The honest trade-off:** full CBK PSP licensing is heavy for a solo founder.
The pragmatic v1 path is *(a)* incorporate a Kenyan company, *(b)* commit to
Data Protection + AML/CFT + KRA compliance immediately, and *(c)* launch on a
**licensed partner / aggregator** (e.g., a CBK-licensed PSP or a licensed
payments gateway) while you pursue your own PSP licence in parallel. This keeps
---

### 1.2 Financial Leakage & Unit Economics

Your stated model is **5% take rate, ~2% network cost, ~3% net**. That margin is
thin and fragile. Here is exactly where money leaks:

1. **Network-cost drift.** The 1.5–2% C2B figure is not contractual — M-Pesa
   tariffs change and STK push requests carry a per-request cost. **Action:**
   re-verify actual tariffs quarterly and build a cost buffer (charge fee on
   gross, not net).
2. **B2C payout cost.** You said "pass raw B2C cost to the creator," but a
   **failed payout** (wrong number, sim-swap, unregistered) still costs you and
   creates reconciliation work. **Action:** implement payout retry + a
   "payout failure" SLA; never silently swallow a failed payout.
3. **Float exposure.** Money sits in your account between C2B collection and
   B2C payout. **Action:** reduce settlement window to daily; reconcile IPN vs
   ledger every night; never spend float on operations.
4. **VAT un-budgeted.** If VAT applies to your commission, ~16% of your 5% fee
   goes to tax. **Action:** model net-of-VAT economics now.
5. **Chargebacks/reversals.** Rare but real. **Action:** build a reversal ledger
   and adjust creator balance, not platform revenue.
6. **Round-number traps.** Fees on gross vs net, and "5%" quoted as if it's
   net profit. Set your **true net margin target** (aim ≥ 3%) and price
   accordingly.

**Target unit economics (v1):**
- Tip = KES 500
- Platform fee (5%) = KES 25.00
- Less network cost (~2%) = KES 10.00
- Less VAT/reserve (~1%) = KES 5.00
- **Net ≈ KES 10.00 per KES 500 tip (2%)** — increase via Pro tier (2.5% fee
  + subscription) rather than chasing scale.

---

### 1.3 Operational Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Safaricom dependency** (Daraja uptime/API changes) | High | Idempotent API layer, retry/backoff, clear fallback messaging, monitor uptime. |
| **Fraud / fake creators** | High | KYC/CDD on signup; verify M-Pesa account ownership; flag creation spikes. |
| **Money-laundering via fake tips** | Medium | Transaction monitoring + FRC threshold reporting; suspicious-volume alerts. |
| **Sim-swap & payout fraud** | Medium | Confirm payout account; velocity limits; 2FA on withdrawal. |
| **Data breach** (fan PII) | High | Encrypt at rest/in transit; ODPC registration; minimisation (don't store full numbers if not needed). |
| **Creator churn** | Medium | Fast payouts (24h), proactive support, referral rewards. |
| **Single founder burnout / key-man** | Medium | Document the Daraja integration; automated reconciliation; keep the client (Engine 1) de-risked. |
---

## 2. Creator Acquisition: 10 → 100

### 2.1 The funnel math
- **10 → 25: Anchor + referral.** Recruit 5–10 mid-tier creators (50k–200k
  followers) at **0% fees for 3 months**. Convert each into a referral engine:
  **1% of referred creator's volume for 6 months**.
- **25 → 50: Niche flywheels.** Pick 2–3 verticals (podcasters, gamers/live
  streamers, educators/musicians) and go deep — build a repeatable onboarding
  + case study per vertical.
- **50 → 100: Product-led growth + partnerships.** The viral watermark,
  bio-link SEO, and partnerships with **creator management agencies** and
  **Twitter/X creator communities** carry the volume.

### 2.2 Ideal Creator Profile (ICP)
- 50k–200k followers on TikTok/YouTube/Instagram/X.
- Posts at least 2–3x/week (has an audience to mobilize).
- Already monetizing informally (till/paybill/Pochi in bio) — this is your
  proof of pain.
- Willing to be a **case study** within 30 days.

### 2.3 Channels & tactics
- **Concierge onboarding:** < 24h from signup to live page. Do it for them.
- **The "10s" demo:** send a 10-second screen recording of someone tipping
  them. This is the whole pitch.
- **Referral mechanic:** 1% of referred volume for 6 months (both sides feel
  it). Make it a visible dashboard counter.
- **Case studies:** "Creator X earned KES 40K in 30 days" — one per vertical.
- **Agency partnerships:** creator management agencies get a rev-share for
  onboarding their rosters.
- **Bio-link SEO:** `vektra.me/@handle` should rank for "creator name + tip"
  and "support [creator]." Cheap, compounding, defensible.
- **Watermark + footer CTA** (already built into the frontend): every receipt
  and page footer recruits the next creator.

### 2.4 Metrics that matter
- **Activation rate:** % of signups with a live page in 24h.
- **First-tip time-to-value:** days from signup to first non-test tip.
- **Repeat supporter rate:** % of fans who tip twice.
- **Net creator retention** (monthly).
- **Referral loop coefficient** (referrals per creator).
---

## 3. Pitch & Outreach Messaging

### 3.1 The core value proposition (one line)
> "Your fans already want to support you — Vektra lets them do it in **10
> seconds** with M-Pesa, instead of typing a till number and losing interest."

### 3.2 Pitch scripts by channel

**DM (TikTok/IG/YouTube — short, personal):**
> Hi [Name] — I saw your [TikTok/stream/post] and love the [specific thing].
> Quick question: do fans ever ask how to support you? I built a tool that
> gives every creator a link where fans tap, punch in their M-Pesa PIN, and
> you're tipped in 10 seconds — no cards, no till numbers. It's free for your
> first 3 months. Happy to set it up for you in 10 minutes — want a live demo?

**Email (agency / management):**
> Subject: A 10-second M-Pesa tip rail for your creators
> [Body] — one-paragraph pitch, link to a live demo page, the 2.5% Pro fee,
> the referral share, and a one-line "creators in your roster keep 100% of
> tips minus a small fee." Ask for a 15-min call.

**In-person / creator event:**
> "What's the biggest barrier to your fans paying you? The card, right? Most
> Kenyans don't have one. I can show you a link where a fan tips you with
> M-Pesa in 10 seconds — and I'll set it up for you right now."

### 3.3 Objection handling
- **"I use Paybill/Pochi already."** → "That's 15 keystrokes mid-video. Most
  fans drop off. Mine is one tap + your PIN. And you get their email + every
  tip in a dashboard."
- **"Will it work on my phone?"** → "It's a web link — no app, works on any
  phone with M-Pesa."
- **"What's the fee?"** → "5% on Starter, 2.5% on Pro (KES 1,500/mo). Your
  first 3 months are free."
- **"What if I want to leave?"** → "Your link and data are yours. Withdraw
  anytime, no lock-in."

### 3.4 Social proof & CTA
- Always end with a **live demo page** (`/tip/amara`) and a number:
  "Creator X made KES 40K in 30 days."
- CTA is always a **low-friction next step**: "I'll set it up for you in 10
  minutes" — never "sign up here."

---

## 4. Immediate Next Steps (this week)
1. Incorporate Kenya company + register KRA PIN.
2. Open ODPC Data Controller registration.
3. Apply for Safaricom Daraja / decide on a licensed aggregator partner.
4. Wire the frontend to a real C2B + B2C sandbox (Daraja sandbox).
5. Recruit the first 2–3 anchor creators and ship their live pages.
6. Build the reconciliation + payout ledger (float control).
you compliant and fast without pre-empting the licence.