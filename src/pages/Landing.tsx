import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Lightning,
  PhoneCall,
  Wallet,
  CheckCircle,
  UsersThree,
  ChartLineUp,
  Bell,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  Sparkle,
} from '@phosphor-icons/react'
import Reveal from '../components/Reveal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ksh } from '../lib/format'

/* Live ticker feed — organic, realistic data points */
const tickerItems = [
  { name: 'Amara', handle: 'amara', amount: 500, note: 'Keep the edits coming' },
  { name: 'Brian', handle: 'brian_ke', amount: 200, note: 'Support' },
  { name: 'Wanjiku', handle: 'wanjiku', amount: 1000, note: 'Go for the 1M' },
  { name: 'Otieno', handle: 'otieno', amount: 100, note: 'Coffee on me' },
  { name: 'Zawadi', handle: 'zawadi', amount: 300, note: 'Keep grinding' },
  { name: 'Kevin', handle: 'kev', amount: 1500, note: 'Top tier content' },
  { name: 'Achieng', handle: 'achieng', amount: 250, note: 'Tip' },
  { name: 'Sam', handle: 'sammy', amount: 750, note: 'Legend' },
  { name: 'Njeri', handle: 'njeri', amount: 400, note: 'Support' },
  { name: 'David', handle: 'david', amount: 2000, note: 'Huge fan' },
]

const steps = [
  {
    icon: PhoneCall,
    step: '01',
    title: 'Click the link',
    body: 'Fans tap your bio-link. No app to install, no card to type — it just opens.',
  },
  {
    icon: Lightning,
    step: '02',
    title: 'Set an amount',
    body: 'Pick KES 50, 100, 500 or any amount. Add a note or your email if you want.',
  },
  {
    icon: Wallet,
    step: '03',
    title: 'Pay with M-Pesa',
    body: 'A push arrives on your phone. Enter your PIN and the tip is sent instantly.',
  },
]

const features = [
  {
    icon: Wallet,
    title: 'Instant payouts',
    body: 'Withdraw to your M-Pesa or bank in one tap via B2C. Money lands in minutes, not days.',
  },
  {
    icon: UsersThree,
    title: 'Build your audience',
    body: 'Collect emails and messages with every tip, then export your supporter list anytime.',
  },
  {
    icon: ChartLineUp,
    title: 'Real-time earnings',
    body: 'A live dashboard that shows every tip the second a fan pays. No more guessing.',
  },
  {
    icon: Bell,
    title: 'Live-stream alerts',
    body: 'Screen popups announce every tip mid-stream so your community sees the love.',
  },
  {
    icon: ShieldCheck,
    title: 'M-Pesa native',
    body: 'Built on the rails Kenyans already trust. No cards, no forex friction, no hidden banks.',
  },
  {
    icon: Globe,
    title: 'Your own domain',
    body: 'Claim vektra.me/@you and optionally map a custom domain with Pro.',
  },
]

const pricing = [
  {
    name: 'Starter',
    price: '5%',
    cadence: 'per tip',
    highlight: false,
    features: [
      'Unlimited tips',
      'vektra.me/@you link',
      'M-Pesa & bank payouts',
      'Email receipts',
      'Email supporter list',
    ],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    price: 'KES 1,500',
    cadence: '/month',
    highlight: true,
    features: [
      '2.5% transaction fee',
      'Custom domain',
      'White-labeled receipts',
      'Live-stream tip popups',
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Go Pro',
  },
]

const faqs = [
  {
    q: 'How do fans actually pay?',
    a: 'They click your link, choose an amount, and a standard M-Pesa STK push lands on their phone. They enter their PIN and the money moves instantly — no typing till numbers, no cards.',
  },
  {
    q: 'How fast can I withdraw?',
    a: 'Withdrawing is a one-tap B2C payout to your M-Pesa or bank. Most M-Pesa payouts land in under a minute; bank transfers are processed on the next settlement.',
  },
  {
    q: 'What does it cost?',
    a: 'Starter charges 5% per tip. Pro reduces that to 2.5% for KES 1,500 a month and unlocks custom domains, white-label receipts, and live-stream popups.',
  },
  {
    q: 'Is it safe for my fans?',
    a: 'Yes. Payments go through Safaricom\u2019s M-Pesa rails and push prompts are standard. We never see your fans\u2019 PINs — that stays with M-Pesa.',
  },
]

const stats = [
  { value: '10s', label: 'to complete a tip' },
  { value: '5%', label: 'flat fee to start' },
  { value: '0', label: 'cards required' },
  { value: '24/7', label: 'payouts to M-Pesa' },
]

export default function Landing() {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'radial-gradient(at 12% 8%, rgba(249, 115, 22, 0.10) 0, transparent 42%),' +
              'radial-gradient(at 88% 4%, rgba(234, 88, 12, 0.09) 0, transparent 38%),' +
              'radial-gradient(at 55% 88%, rgba(249, 115, 22, 0.07) 0, transparent 45%),' +
              'radial-gradient(rgba(24, 24, 27, 0.05) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 26px 26px',
          }}
        >
          <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-vektra-100/50 blur-3xl" />
          <div className="absolute top-40 left-[-12%] h-[420px] w-[420px] rounded-full bg-vektra-50 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-vektra-200 bg-vektra-50 px-3.5 py-1.5 text-xs font-semibold text-vektra-800">
                <span className="h-1.5 w-1.5 rounded-full bg-vektra-500" />
                Built for Kenya · Powered by M-Pesa
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight text-ink md:text-[4.2rem]">
                Tips for creators, <span className="text-vektra-600">in 10 seconds.</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-steel">
                The buy-me-a-coffee built natively for Kenya. Fans tap your
                bio-link, get an M-Pesa push, and support you — no cards, no
                typing till numbers, no drop-off.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/tip/amara"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
                >
                  See a live tip page
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-vektra-300 active:scale-[0.98]"
                >
                  Start as a creator
                </Link>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 grid max-w-md grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-mono text-2xl font-semibold tracking-tight text-ink">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative">
            <PhoneMockup />
          </Reveal>
        </div>
      </section>

      {/* ============ LIVE TICKER ============ */}
      <section className="border-y border-hairline bg-surface py-5">
        <div className="relative overflow-hidden">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted">
            Live tips across Kenya
          </p>
          <div className="flex w-max animate-[ticker_40s_linear_infinite] gap-3 pr-3">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-full border border-hairline bg-canvas px-4 py-2 whitespace-nowrap"
              >
                <span className="flex h-2 w-2 rounded-full bg-vektra-500" />
                <span className="text-sm font-medium text-ink">@{t.handle}</span>
                <span className="text-sm font-semibold text-vektra-700">{ksh(t.amount)}</span>
                <span className="text-xs text-muted">“{t.note}”</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingBody />
      <Footer />
    </div>
  )
}
/* ============ PHONE MOCKUP ============ */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className="animate-[floaty_7s_ease-in-out_infinite] rounded-[2.6rem] border border-hairline bg-surface p-3 shadow-float">
        <div className="rounded-[2.1rem] bg-canvas p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-vektra-400 to-vektra-600 text-lg font-bold text-white">
              A
            </div>
            <div>
              <p className="font-semibold text-ink">Amara</p>
              <p className="text-xs text-muted">vektra.me/@amara</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-steel">
            Support my weekly edits. Every shilling goes straight back into the content.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[50, 100, 500].map((a) => (
              <div
                key={a}
                className={`rounded-xl border py-2.5 text-center text-sm font-semibold ${
                  a === 100
                    ? 'border-vektra-500 bg-vektra-50 text-vektra-700'
                    : 'border-hairline bg-surface text-ink'
                }`}
              >
                {ksh(a)}
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-hairline bg-surface p-3">
            <p className="text-xs text-muted">Phone number</p>
            <p className="mt-1 font-mono text-sm text-ink">07 12 345 678</p>
          </div>

          <button className="mt-3 w-full rounded-xl bg-vektra-500 py-3 text-sm font-semibold text-white">
            Pay with M-Pesa
          </button>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-vektra-50 px-3 py-2.5">
            <span className="h-2 w-2 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-vektra-500" />
            <p className="text-xs font-medium text-vektra-800">
              Push sent — check your phone and enter PIN
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 top-10 hidden animate-[floaty_6s_ease-in-out_infinite] items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-3 shadow-float sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mpesa text-white">
          <span className="text-sm font-bold">M</span>
        </span>
        <div>
          <p className="text-xs font-semibold text-ink">M-Pesa</p>
          <p className="text-[10px] text-muted">Successful</p>
        </div>
      </div>
    </div>
  )
}
/* ============ BODY SECTIONS ============ */
function LandingBody() {
  return (
    <>
      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
            How it works
          </p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
            From tap to tip in three steps.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-steel">
            No apps, no cards, no copying numbers. Just the rails Kenyans
            already use every day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 100}>
              <div className="group relative h-full rounded-3xl border border-hairline bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-diffuse">
                <span className="font-mono text-sm text-muted">{s.step}</span>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-vektra-50 text-vektra-600 transition-colors group-hover:bg-vektra-500 group-hover:text-white">
                  <s.icon size={24} weight="bold" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* For creators */}
      <section id="creators" className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
                For creators
              </p>
              <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
                Your fans already support you. Vektra just makes it easy.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-steel">
                Most creators lose supporters the moment they ask fans to type a
                till number mid-video. Vektra turns that friction into a
                one-tap M-Pesa push.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  'One link, every platform — TikTok, YouTube, X, Instagram',
                  'Emails + messages collected with every tip',
                  'Withdraw to M-Pesa or bank in one tap',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={20} weight="fill" className="text-vektra-500" />
                    <span className="text-sm text-ink">{f}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/tip/amara"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
              >
                Explore the dashboard
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>

            {/* Feature bento */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 70}>
                  <div className="group h-full rounded-3xl border border-hairline bg-canvas p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-diffuse">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-vektra-50 text-vektra-600">
                      <f.icon size={22} weight="bold" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Simple, honest fees.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-steel">
            Pay as you grow. No setup costs, no monthly lock-in on Starter.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {pricing.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={`relative h-full rounded-[2rem] p-8 transition-all duration-300 ${
                  p.highlight
                    ? 'border-2 border-vektra-500 bg-ink text-white shadow-float'
                    : 'border border-hairline bg-surface'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-vektra-500 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <p className={`text-sm font-semibold ${p.highlight ? 'text-vektra-300' : 'text-muted'}`}>
                  {p.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                  <span className={`text-sm ${p.highlight ? 'text-steel' : 'text-muted'}`}>
                    {p.cadence}
                  </span>
                </div>
                <ul className="mt-7 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckCircle
                        size={18}
                        weight="fill"
                        className={p.highlight ? 'text-vektra-400' : 'text-vektra-500'}
                      />
                      <span className={`text-sm ${p.highlight ? 'text-white/85' : 'text-ink'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-full py-3.5 text-sm font-semibold transition-all active:scale-[0.98] ${
                    p.highlight
                      ? 'bg-vektra-500 text-white hover:bg-vektra-400'
                      : 'border border-hairline bg-surface text-ink hover:border-vektra-300'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
              FAQ
            </p>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>

          <div className="mt-12 divide-y divide-hairline">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                    {f.q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline text-vektra-600 transition-transform group-open:rotate-45">
                      <Sparkle size={14} weight="bold" />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-vektra-500/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
                Ready to get paid for your content?
              </h2>
              <p className="mt-4 text-base text-white/70 md:text-lg">
                Join the creators keeping their M-Pesa tips flowing. Free to
                start, live in minutes.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/join"
                  className="group inline-flex items-center gap-2 rounded-full bg-vektra-500 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-vektra-400 active:scale-[0.98]"
                >
                  Create your page
                  <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}