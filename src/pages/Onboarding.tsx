import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bank,
  Check,
  CheckCircle,
  CaretDown,
  Lock,
  Envelope,
  Eye,
  EyeSlash,
  MagnifyingGlass,
  PhoneCall,
  ShieldCheck,
  Sparkle,
  User,
  Wallet,
  X,
} from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import Toast from '../components/Toast'
import { ksh } from '../lib/format'
import { searchBanks } from '../lib/banks'
import { submitPayoutRequest } from '../lib/payoutRequests'

type Step = 1 | 2 | 3 | 4

const steps = [
  { n: 1, label: 'Account' },
  { n: 2, label: 'Profile' },
  { n: 3, label: 'Payouts' },
  { n: 4, label: 'Live' },
]

const perks = [
  'Free for your first 3 months',
  'vektra.me/@you link',
  'Instant M-Pesa payouts',
  'Email supporter list',
]

export default function Onboarding() {
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>(1)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)

  // Step 1 — account
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  // Step 2 — profile
  const [displayName, setDisplayName] = useState('')
  const [handle, setHandle] = useState('')
  const [bio, setBio] = useState('')

  // Step 3 — payouts
  const [payPhone, setPayPhone] = useState('')
  const [payMethod, setPayMethod] = useState<'mpesa' | 'bank'>('mpesa')
  const [bankName, setBankName] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankHolder, setBankHolder] = useState('')

  const cleanHandle = handle.toLowerCase().replace(/[^a-z0-9_]/g, '')
  const firstName = displayName.trim().split(' ')[0] || 'Creator'

  const next = () => {
    setError('')
    if (step === 1) {
      if (!email.includes('@') || !email.trim()) return setError('Please enter a valid email address.')
      if (password.length < 6) return setError('Your password needs at least 6 characters.')
      if (confirmPw !== password) return setError('Those passwords don\u2019t match — please try again.')
    }
    if (step === 2) {
      if (!displayName.trim()) return setError('Add your display name so fans know who you are.')
      if (!cleanHandle) return setError('Choose a handle — it becomes your link.')
    }
    if (step === 3) {
      if (payMethod === 'mpesa') {
        if (payPhone.replace(/\D/g, '').length !== 9 && payPhone.replace(/\D/g, '').length !== 10)
          return setError('That phone number doesn\u2019t look right — use e.g. 0712 345 678.')
      } else {
        if (!bankName) return setError('Pick your bank to continue.')
        if (!bankAccount.trim()) return setError('Add your bank account number.')
        if (!bankHolder.trim()) return setError('Add the name on the account.')
      }
      // Submit the payout channel request — shows up on the admin side.
      submitPayoutRequest({
        creatorHandle: cleanHandle || 'you',
        creatorName: displayName.trim() || 'Creator',
        creatorEmail: email,
        method: payMethod,
        payPhone: payMethod === 'mpesa' ? payPhone : undefined,
        bankName: payMethod === 'bank' ? bankName : undefined,
        bankAccount: payMethod === 'bank' ? bankAccount : undefined,
        bankHolder: payMethod === 'bank' ? bankHolder : undefined,
      })
    }
    setStep((s) => (s + 1) as Step)
  }

  const back = () => {
    setError('')
    setStep((s) => (s - 1) as Step)
  }

  /** One-click fill for rapid testing — no backend, just sample data. */
  const fillDemo = () => {
    setError('')
    setEmail('amara@demo.vektra.me')
    setPassword('v3ktra-demo')
    setConfirmPw('v3ktra-demo')
    setDisplayName('Amara')
    setHandle('amara')
    setBio('Filmmaker & video editor in Nairobi. Every tip funds my next shoot.')
    setPayPhone('0712345678')
    setPayMethod('mpesa')
    setBankName('')
    setBankAccount('')
    setBankHolder('')
    setStep(1)
  }

  return (
    <div className="min-h-[100dvh]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-hairline bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <LogoMark className="h-7 w-7" />
            <span className="text-lg font-bold tracking-tight text-ink">Vektra</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={fillDemo}
              className="inline-flex items-center gap-1.5 rounded-full border border-vektra-200 bg-vektra-50 px-3.5 py-1.5 text-xs font-semibold text-vektra-800 transition-all hover:bg-vektra-100 active:scale-[0.98]"
            >
              <Sparkle size={13} weight="bold" />
              Fill demo details
            </button>
            <div className="flex items-center gap-2 text-sm text-steel">
              <Lock size={14} weight="bold" className="text-muted" />
              Secure signup
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1fr_1fr] lg:py-14">
        {/* LEFT: form + progress */}
        <div className="max-w-lg">
          <StepIndicator current={step} />

          <div className="mt-8">
            {step === 1 && (
              <AccountStep
                email={email}
                password={password}
                confirmPw={confirmPw}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPw={setConfirmPw}
                showPw={showPw}
                setShowPw={setShowPw}
                onNext={next}
              />
            )}
            {step === 2 && (
              <ProfileStep
                displayName={displayName}
                handle={handle}
                bio={bio}
                setDisplayName={setDisplayName}
                setHandle={setHandle}
                setBio={setBio}
                onBack={back}
                onNext={next}
              />
            )}
            {step === 3 && (
              <PayoutStep
                payPhone={payPhone}
                payMethod={payMethod}
                bankName={bankName}
                bankAccount={bankAccount}
                bankHolder={bankHolder}
                setPayPhone={setPayPhone}
                setPayMethod={setPayMethod}
                setBankName={setBankName}
                setBankAccount={setBankAccount}
                setBankHolder={setBankHolder}
                onBack={back}
                onNext={next}
              />
            )}
            {step === 4 && (
              <LiveStep
                firstName={firstName}
                handle={cleanHandle}
                payMethod={payMethod}
                bankName={bankName}
                onDone={() => navigate(`/tip/${cleanHandle}`)}
              />
            )}
          </div>
        </div>

        {/* RIGHT: live preview */}
        <div className="hidden lg:block">
          <LivePreview
            firstName={firstName}
            handle={cleanHandle || 'you'}
            bio={bio}
            payPhone={payPhone}
            payMethod={payMethod}
            bankName={bankName}
          />
        </div>
      </main>

      <Toast message={error} onDismiss={() => setError('')} />
    </div>
  )
}
/* ============ STEP INDICATOR ============ */
function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const done = current > s.n
        const active = current === s.n
        return (
          <div key={s.n} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  done
                    ? 'bg-vektra-500 text-white'
                    : active
                      ? 'bg-ink text-white'
                      : 'border border-hairline bg-surface text-muted'
                }`}
              >
                {done ? <Check size={15} weight="bold" /> : s.n}
              </div>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  active ? 'text-ink' : 'text-muted'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 ${done ? 'bg-vektra-500' : 'bg-hairline'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ============ STEP 1: ACCOUNT ============ */
function AccountStep({
  email,
  password,
  confirmPw,
  setEmail,
  setPassword,
  setConfirmPw,
  showPw,
  setShowPw,
  onNext,
}: {
  email: string
  password: string
  confirmPw: string
  setEmail: (v: string) => void
  setPassword: (v: string) => void
  setConfirmPw: (v: string) => void
  showPw: boolean
  setShowPw: React.Dispatch<React.SetStateAction<boolean>>
  onNext: () => void
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
        Step 1 of 4
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-steel">
        Set up your Vektra account in under a minute.
      </p>

      <div className="mt-7 space-y-4">
        <div>
          <label className="text-xs font-medium text-muted">Email address</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
            <Envelope size={18} weight="bold" className="text-muted" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted">Password</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
            <Lock size={18} weight="bold" className="text-muted" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPw ? 'text' : 'password'}
              placeholder="At least 6 characters"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="text-muted transition-colors hover:text-ink"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted">Confirm password</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
            <Lock size={18} weight="bold" className="text-muted" />
            <input
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              type={showPw ? 'text' : 'password'}
              placeholder="Re-enter your password"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="text-muted transition-colors hover:text-ink"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
      >
        Continue
        <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-6 space-y-2">
        {perks.map((p) => (
          <div key={p} className="flex items-center gap-2.5">
            <CheckCircle size={16} weight="fill" className="text-vektra-500" />
            <span className="text-sm text-steel">{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
/* ============ STEP 2: PROFILE ============ */
function ProfileStep({
  displayName,
  handle,
  bio,
  setDisplayName,
  setHandle,
  setBio,
  onBack,
  onNext,
}: {
  displayName: string
  handle: string
  bio: string
  setDisplayName: (v: string) => void
  setHandle: (v: string) => void
  setBio: (v: string) => void
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
        Step 2 of 4
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
        Build your page
      </h1>
      <p className="mt-2 text-sm text-steel">
        This is what your fans will see. Preview updates live on the right.
      </p>

      <div className="mt-7 space-y-4">
        <div>
          <label className="text-xs font-medium text-muted">Display name</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
            <User size={18} weight="bold" className="text-muted" />
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Amara"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted">Your handle</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
            <span className="font-mono text-sm font-semibold text-ink">vektra.me/@</span>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value.toLowerCase())}
              placeholder="amara"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="w-full bg-transparent font-mono text-base text-ink outline-none placeholder:text-muted"
            />
          </div>
          <p className="mt-1.5 text-xs text-muted">
            Lowercase letters, numbers, underscores. This is your link.
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted">Bio (optional)</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={160}
            placeholder="Tell fans what you make and what tips fund…"
            className="mt-1.5 w-full resize-none rounded-2xl border border-hairline bg-canvas px-4 py-3 text-base text-ink outline-none placeholder:text-muted focus:border-vektra-400"
          />
          <p className="mt-1 text-right text-xs text-muted">{bio.length}/160</p>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-5 py-3.5 text-sm font-semibold text-steel transition-all hover:text-ink active:scale-[0.98]"
        >
          <ArrowLeft size={16} weight="bold" />
          Back
        </button>
        <button
          onClick={onNext}
          className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
        >
          Continue
          <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}
/* ============ STEP 3: PAYOUTS ============ */
function PayoutStep({
  payPhone,
  payMethod,
  bankName,
  bankAccount,
  bankHolder,
  setPayPhone,
  setPayMethod,
  setBankName,
  setBankAccount,
  setBankHolder,
  onBack,
  onNext,
}: {
  payPhone: string
  payMethod: 'mpesa' | 'bank'
  bankName: string
  bankAccount: string
  bankHolder: string
  setPayPhone: (v: string) => void
  setPayMethod: (v: 'mpesa' | 'bank') => void
  setBankName: (v: string) => void
  setBankAccount: (v: string) => void
  setBankHolder: (v: string) => void
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
        Step 3 of 4
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
        Where do you get paid?
      </h1>
      <p className="mt-2 text-sm text-steel">
        Withdraw tips to your M-Pesa or bank. We pass the raw B2C cost to you.
      </p>

      {/* Payout method toggle */}
      <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-hairline bg-canvas p-1.5">
        {(
          [
            { id: 'mpesa', label: 'M-Pesa', icon: PhoneCall },
            { id: 'bank', label: 'Bank', icon: Bank },
          ] as const
        ).map((m) => (
          <button
            key={m.id}
            onClick={() => setPayMethod(m.id)}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              payMethod === m.id
                ? 'bg-surface text-ink shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            <m.icon size={16} weight="bold" />
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {payMethod === 'mpesa' ? (
          <>
            <div>
              <label className="text-xs font-medium text-muted">M-Pesa number</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
                <PhoneCall size={18} weight="bold" className="text-muted" />
                <input
                  value={payPhone}
                  onChange={(e) => setPayPhone(e.target.value)}
                  inputMode="tel"
                  placeholder="07XX XXX XXX"
                  className="w-full bg-transparent font-mono text-base text-ink outline-none placeholder:text-muted"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-vektra-100 bg-vektra-50 px-4 py-3">
              <ShieldCheck size={18} weight="bold" className="text-vektra-600" />
              <p className="text-xs leading-relaxed text-vektra-800">
                We'll verify this number with a small M-Pesa push before your first
                payout.
              </p>
            </div>
          </>
        ) : (
          <>
            <BankPicker value={bankName} onChange={setBankName} />

            <div>
              <label className="text-xs font-medium text-muted">Account holder name</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
                <User size={18} weight="bold" className="text-muted" />
                <input
                  value={bankHolder}
                  onChange={(e) => setBankHolder(e.target.value)}
                  placeholder="Full name on the account"
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted">Account number</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
                <Bank size={18} weight="bold" className="text-muted" />
                <input
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  inputMode="numeric"
                  placeholder="e.g. 0123456789"
                  className="w-full bg-transparent font-mono text-base text-ink outline-none placeholder:text-muted"
                />
              </div>
            </div>
          </>
        )}

        <div className="flex items-center gap-3 rounded-2xl border border-vektra-100 bg-vektra-50 px-4 py-3">
          <ShieldCheck size={18} weight="bold" className="text-vektra-600" />
          <p className="text-xs leading-relaxed text-vektra-800">
            We'll verify your payout details before the first withdrawal.
          </p>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-5 py-3.5 text-sm font-semibold text-steel transition-all hover:text-ink active:scale-[0.98]"
        >
          <ArrowLeft size={16} weight="bold" />
          Back
        </button>
        <button
          onClick={onNext}
          className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-vektra-500 py-3.5 text-sm font-semibold text-white transition-all hover:bg-vektra-600 active:scale-[0.98]"
        >
          <Wallet size={18} weight="bold" />
          Create my page
          <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

/* ============ BANK PICKER (full-screen sheet) ============ */
function BankPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = searchBanks(query)
  const popular = ['Equity Bank', 'KCB Bank', 'Co-operative Bank', 'Absa Bank Kenya', 'NCBA Bank', 'Stanbic Bank']

  const pick = (name: string) => {
    onChange(name)
    setOpen(false)
    setQuery('')
  }

  return (
    <div>
      <label className="text-xs font-medium text-muted">Bank</label>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`mt-1.5 flex w-full items-center justify-between gap-2 rounded-2xl border bg-canvas px-4 py-3 text-left transition-colors hover:border-vektra-300 ${
          value ? 'border-vektra-200' : 'border-hairline'
        }`}
      >
        <span className={`flex items-center gap-2.5 ${value ? 'text-ink' : 'text-muted'}`}>
          <Bank size={18} weight="bold" className={value ? 'text-vektra-600' : 'text-muted'} />
          {value || 'Select your bank'}
        </span>
        <CaretDown size={16} weight="bold" className="shrink-0 text-muted" />
      </button>

      {open && (
        <BankSheet
          query={query}
          setQuery={setQuery}
          results={results}
          popular={popular}
          value={value}
          onPick={pick}
          onClose={() => {
            setOpen(false)
            setQuery('')
          }}
        />
      )}
    </div>
  )
}

/* ============ FULL-SCREEN BANK SHEET ============ */
function BankSheet({
  query,
  setQuery,
  results,
  popular,
  value,
  onPick,
  onClose,
}: {
  query: string
  setQuery: (v: string) => void
  results: { name: string; code?: string }[]
  popular: string[]
  value: string
  onPick: (name: string) => void
  onClose: () => void
}) {
  const showPopular = query.trim() === ''

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      {/* sheet — slides up from bottom, takes full page */}
      <div
        className="absolute inset-0 flex flex-col bg-surface sm:inset-x-4 sm:bottom-4 sm:top-8 sm:rounded-[2rem] sm:border sm:border-hairline sm:shadow-float"
        style={{ animation: 'sheet-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-ink">Select your bank</h2>
            <p className="text-xs text-muted">Find your bank and tap to select</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink"
            aria-label="Close bank picker"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* search */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-2.5 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
            <MagnifyingGlass size={18} weight="bold" className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search banks…"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
              autoFocus
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="text-muted hover:text-ink">
                <X size={16} weight="bold" />
              </button>
            )}
          </div>
        </div>

        {/* list */}
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {showPopular && (
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Popular
              </p>
              <div className="mt-3 space-y-2">
                {popular.map((name, i) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onPick(name)}
                    style={{ animation: `row-in 0.3s ease-out ${i * 40}ms both` }}
                    className="flex w-full items-center gap-3 rounded-2xl border border-hairline bg-canvas px-4 py-3 text-left text-sm font-medium text-ink transition-all hover:border-vektra-300 hover:bg-surface active:scale-[0.98]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vektra-50 text-xs font-bold text-vektra-700">
                      {name.replace(' Bank', '').replace(' Kenya', '').charAt(0)}
                    </span>
                    {name}
                    <ArrowRight size={15} weight="bold" className="ml-auto text-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            {showPopular ? 'All banks' : 'Results'}
          </p>
          <div className="mt-3 space-y-1.5">
            {results.length === 0 && (
              <div className="rounded-2xl border border-dashed border-hairline px-4 py-10 text-center">
                <p className="text-sm font-medium text-ink">No banks match “{query}”</p>
                <p className="mt-1 text-xs text-muted">Try “Equity”, “KCB”, or “Co-op”</p>
              </div>
            )}
            {results.map((b, i) => (
              <button
                key={b.name}
                type="button"
                onClick={() => onPick(b.name)}
                style={{ animation: `row-in 0.3s ease-out ${i * 30}ms both` }}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all active:scale-[0.98] ${
                  value === b.name
                    ? 'border-vektra-500 bg-vektra-50 text-vektra-800'
                    : 'border-hairline bg-canvas text-ink hover:border-vektra-300'
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                    value === b.name ? 'bg-vektra-500 text-white' : 'bg-vektra-50 text-vektra-700'
                  }`}
                >
                  {b.name.replace(' Bank', '').replace(' Kenya', '').charAt(0)}
                </span>
                <span className="flex-1">{b.name}</span>
                {value === b.name ? (
                  <Check size={16} weight="bold" className="text-vektra-600" />
                ) : (
                  <span className="font-mono text-[11px] text-muted">{b.code}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
/* ============ STEP 4: LIVE ============ */
function LiveStep({
  firstName,
  handle,
  payMethod,
  bankName,
  onDone,
}: {
  firstName: string
  handle: string
  payMethod: 'mpesa' | 'bank'
  bankName: string
  onDone: () => void
}) {
  // Simulated integration progress: connecting → connected
  const [connecting, setConnecting] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setConnecting(false), 2200)
    const t2 = setTimeout(() => setConnected(true), 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const channelLabel = payMethod === 'bank' ? bankName : 'M-Pesa'
  const channelDetail = payMethod === 'bank' ? 'Bank payout channel' : 'M-Pesa STK push channel'

  return (
    <div className="flex flex-col items-start">
      {!connected ? (
        <>
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-vektra-50">
            <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-vektra-200 border-t-vektra-500" />
            {connecting && (
              <span className="absolute inset-0 animate-ping rounded-full border border-vektra-300/60" />
            )}
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink">
            {connecting ? 'Connecting your payments…' : 'Verifying your channel…'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-steel">
            We're connecting your payout channel so tips can flow straight to
            you. You'll get an email the moment everything is verified — keep
            going in the meantime.
          </p>

          <div className="mt-6 w-full rounded-2xl border border-hairline bg-canvas p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Payout channel</span>
              <span className="text-xs font-medium text-vektra-700">{channelLabel}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted">Route</span>
              <span className="font-mono text-xs text-ink">{channelDetail}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-vektra-100 bg-vektra-50 px-3 py-2">
              <span className="h-2 w-2 animate-[pulse-dot_1.4s_ease-in-out_infinite] rounded-full bg-vektra-500" />
              <p className="text-xs font-medium text-vektra-800">
                {connecting ? 'Submitting your channel…' : 'Verifying your details — you\u2019ll be notified when it\u2019s done'}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vektra-100">
            <CheckCircle size={36} weight="fill" className="text-vektra-600" />
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink">
            You're live, {firstName}.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-steel">
            Your page is ready and your {channelLabel} channel is connected.
            Share your link and start getting M-Pesa tips in seconds.
          </p>

          <div className="mt-6 w-full rounded-2xl border border-hairline bg-canvas p-4">
            <p className="text-xs text-muted">Your link</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="font-mono text-sm font-semibold text-ink">
                vektra.me/@{handle || 'you'}
              </p>
              <button
                onClick={() => navigator.clipboard?.writeText(`vektra.me/@${handle || 'you'}`)}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
              >
                <Sparkle size={13} weight="bold" />
                Copy
              </button>
            </div>
          </div>
        </>
      )}

      {/* Continue actions — always available while integration runs */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onDone}
          className="group inline-flex items-center gap-2 rounded-full bg-vektra-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-vektra-600 active:scale-[0.98]"
        >
          View my page
          <ArrowRight size={17} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </button>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-vektra-300 active:scale-[0.98]"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}

/* ============ LIVE PREVIEW ============ */
function LivePreview({
  firstName,
  handle,
  bio,
  payPhone,
  payMethod,
  bankName,
}: {
  firstName: string
  handle: string
  bio: string
  payPhone: string
  payMethod: 'mpesa' | 'bank'
  bankName: string
}) {
  return (
    <div className="sticky top-24">
      <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
        <span className="h-2 w-2 rounded-full bg-vektra-500" />
        Live preview — your tip page
      </p>

      <div className="mx-auto max-w-[340px]">
        {/* phone mockup */}
        <div className="rounded-[2.6rem] border border-hairline bg-surface p-3 shadow-float">
          <div className="rounded-[2.1rem] bg-canvas p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-vektra-400 to-vektra-600 text-xl font-bold text-white">
                {(firstName || 'C').charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-ink">{firstName || 'Your name'}</p>
                <p className="font-mono text-xs text-muted">vektra.me/@{handle || 'you'}</p>
              </div>
            </div>

            <p className="mt-4 min-h-[2.5rem] text-sm leading-relaxed text-steel">
              {bio || 'Support my work — every tip goes straight back into the content.'}
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

            <button className="mt-3 w-full rounded-xl bg-vektra-500 py-3 text-sm font-semibold text-white">
              Pay with M-Pesa
            </button>
          </div>
        </div>

        {/* payout channel card */}
        <div className="mt-4 rounded-2xl border border-hairline bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Payout channel
            </p>
            <span className="rounded-full bg-vektra-50 px-2 py-0.5 text-[10px] font-semibold text-vektra-700">
              {payMethod === 'bank' ? 'Bank' : 'M-Pesa'}
            </span>
          </div>

          {payMethod === 'bank' ? (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-canvas px-3 py-2.5">
                <Bank size={16} weight="bold" className="text-vektra-600" />
                <div>
                  <p className="text-sm font-medium text-ink">{bankName || 'Your bank'}</p>
                  <p className="text-[11px] text-muted">Bank account payouts</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-canvas px-3 py-2.5">
                <ShieldCheck size={16} weight="bold" className="text-mpesa" />
                <div>
                  <p className="text-sm font-medium text-ink">Verified account</p>
                  <p className="text-[11px] text-muted">Name + account number on file</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-hairline bg-canvas px-3 py-2.5">
              <PhoneCall size={16} weight="bold" className="text-mpesa" />
              <div>
                <p className="text-sm font-medium text-ink">{payPhone || '07XX XXX XXX'}</p>
                <p className="text-[11px] text-muted">M-Pesa STK push payouts</p>
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-vektra-50 px-3 py-2">
            <span className="h-2 w-2 animate-[pulse-dot_1.4s_ease-in-out_infinite] rounded-full bg-vektra-500" />
            <p className="text-[11px] font-medium text-vektra-800">
              Channel connection in progress
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}