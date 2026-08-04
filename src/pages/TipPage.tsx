import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lock,
  PhoneCall,
  ShieldCheck,
  Wallet,
  CaretRight,
  Check,
} from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import { ksh } from '../lib/format'

type Step = 'amount' | 'details' | 'push' | 'success'

const creators: Record<string, { name: string; bio: string; goal: string; raised: number }> = {
  amara: {
    name: 'Amara',
    bio: 'Filmmaker & video editor in Nairobi. I make weekly short-form edits from the streets of Kenya — every tip funds my next shoot.',
    goal: 'KES 120,000',
    raised: 84_600,
  },
  kip: {
    name: 'Kip',
    bio: 'Podcaster and storyteller. I sit down with builders and artists across East Africa to share their untold stories.',
    goal: 'KES 200,000',
    raised: 132_400,
  },
}

const suggestedAmounts = [50, 100, 200, 500, 1000]

export default function TipPage() {
  const { creator } = useParams<{ creator: string }>()
  const c = creators[creator ?? 'amara'] ?? creators.amara

  const [step, setStep] = useState<Step>('amount')
  const [amount, setAmount] = useState<number>(100)
  const [custom, setCustom] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')

  const validatedPhone = phone.replace(/\D/g, '')

  const selectAmount = (v: number) => {
    setAmount(v)
    setCustom('')
  }

  const handleCustom = (v: string) => {
    setCustom(v)
    const n = parseInt(v.replace(/\D/g, ''), 10)
    if (!Number.isNaN(n) && n > 0) setAmount(n)
  }

  const goDetails = () => {
    if (amount < 10) {
      setError('Minimum tip is KES 10.')
      return
    }
    setError('')
    setStep('details')
  }

  const goPush = () => {
    if (validatedPhone.length !== 9 && validatedPhone.length !== 10) {
      setError('Enter a valid Kenyan phone number (e.g. 0712 345 678).')
      return
    }
    setError('')
    setStep('push')
  }

  const displayedAmount = custom ? amount : amount

  return (
    <div className="min-h-[100dvh]">
      {/* Top mini-bar */}
      <header className="border-b border-hairline bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-steel hover:text-ink">
            <ArrowLeft size={16} weight="bold" />
            Back
          </Link>
          <Link to="/" className="inline-flex items-center gap-2">
            <LogoMark className="h-6 w-6" />
            <span className="text-sm font-bold tracking-tight text-ink">Vektra</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10 md:py-14">
        {/* Creator profile */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-vektra-400 to-vektra-600 text-3xl font-bold text-white">
            {c.name.charAt(0)}
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink">{c.name}</h1>
          <p className="mt-1 text-sm text-muted">vektra.me/@{creator}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-steel">{c.bio}</p>

          {/* goal progress */}
          <div className="mt-6 w-full max-w-sm">
            <div className="flex items-center justify-between text-xs font-medium text-steel">
              <span>Funded {ksh(c.raised)}</span>
              <span>{c.goal}</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-hairline">
              <div
                className="h-full rounded-full bg-vektra-500"
                style={{ width: `${Math.min(100, (c.raised / 120000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="mt-10 rounded-[2rem] border border-hairline bg-surface p-6 shadow-diffuse md:p-8">
          {step === 'amount' && (
            <AmountStep
              amount={amount}
              custom={custom}
              error={error}
              suggestedAmounts={suggestedAmounts}
              onSelect={selectAmount}
              onCustom={handleCustom}
              onNext={goDetails}
            />
          )}
          {step === 'details' && (
            <DetailsStep
              amount={displayedAmount}
              phone={phone}
              name={name}
              message={message}
              error={error}
              setPhone={setPhone}
              setName={setName}
              setMessage={setMessage}
              onBack={() => setStep('amount')}
              onNext={goPush}
            />
          )}
          {step === 'push' && <PushStep amount={displayedAmount} onDone={() => setStep('success')} />}
          {step === 'success' && <SuccessStep amount={displayedAmount} creator={c.name} />}
        </div>

        {/* Trust footer */}
        <div className="mt-6 flex items-center justify-center gap-5 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Lock size={13} weight="bold" />
            Encrypted
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} weight="bold" />
            M-Pesa secured
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wallet size={13} weight="bold" />
            No card needed
          </span>
        </div>
      </main>
    </div>
  )
}
/* ============ STEP: AMOUNT ============ */
type AmountStepProps = {
  amount: number
  custom: string
  error: string
  suggestedAmounts: number[]
  onSelect: (v: number) => void
  onCustom: (v: string) => void
  onNext: () => void
}

function AmountStep({ amount, custom, error, suggestedAmounts, onSelect, onCustom, onNext }: AmountStepProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Step 1 of 3</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Choose an amount</h2>
      <p className="mt-1 text-sm text-steel">Every shilling goes straight to {''}Amara{''}.</p>

      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {suggestedAmounts.map((a) => (
          <button
            key={a}
            onClick={() => onSelect(a)}
            className={`rounded-2xl border py-4 text-center text-lg font-semibold transition-all active:scale-[0.97] ${
              !custom && amount === a
                ? 'border-vektra-500 bg-vektra-50 text-vektra-700'
                : 'border-hairline bg-canvas text-ink hover:border-vektra-300'
            }`}
          >
            {ksh(a)}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <label className="text-xs font-medium text-muted">Or enter an amount</label>
        <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
          <span className="text-sm font-semibold text-muted">KES</span>
          <input
            value={custom}
            onChange={(e) => onCustom(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 750"
            className="w-full bg-transparent font-mono text-lg font-semibold text-ink outline-none placeholder:text-muted"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      <button
        onClick={onNext}
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
      >
        Continue
        <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
        <Lock size={12} weight="bold" />
        You'll pay via a secured M-Pesa push
      </p>
    </div>
  )
}
/* ============ STEP: DETAILS ============ */
type DetailsStepProps = {
  amount: number
  phone: string
  name: string
  message: string
  error: string
  setPhone: (v: string) => void
  setName: (v: string) => void
  setMessage: (v: string) => void
  onBack: () => void
  onNext: () => void
}

function DetailsStep({
  amount,
  phone,
  name,
  message,
  error,
  setPhone,
  setName,
  setMessage,
  onBack,
  onNext,
}: DetailsStepProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Step 2 of 3</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Your details</h2>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-vektra-200 bg-vektra-50 px-4 py-3">
        <span className="text-sm font-medium text-vektra-800">Amount</span>
        <span className="font-mono text-lg font-bold text-vektra-700">{ksh(amount)}</span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-xs font-medium text-muted">M-Pesa phone number</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
            <PhoneCall size={18} weight="bold" className="text-muted" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              placeholder="07XX XXX XXX"
              className="w-full bg-transparent font-mono text-base font-medium text-ink outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted">Your name (optional)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Wanjiku"
            className="mt-1.5 w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-base text-ink outline-none placeholder:text-muted focus:border-vektra-400"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted">Message (optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Say something encouraging…"
            className="mt-1.5 w-full resize-none rounded-2xl border border-hairline bg-canvas px-4 py-3 text-base text-ink outline-none placeholder:text-muted focus:border-vektra-400"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

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
          Send {ksh(amount)} via M-Pesa
          <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}
/* ============ STEP: PUSH ============ */
function PushStep({ amount, onDone }: { amount: number; onDone: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [done, setDone] = useState(false)

  // Simulate the STK push lifecycle: push arrives → user confirms → success
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 400)
    const t2 = setTimeout(() => setDone(true), 2600)
    const t3 = setTimeout(onDone, 3600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onDone])

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Step 3 of 3</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Check your phone</h2>

      {/* Phone keypad mock */}
      <div className="mt-8 w-full max-w-[280px]">
        <div className="rounded-[2rem] border border-hairline bg-ink p-5 text-white shadow-float">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-mpesa text-[11px] font-bold">
              M
            </span>
            <span className="text-xs font-semibold">M-PESA</span>
          </div>
          <div className="mt-4 space-y-1 text-left">
            <p className="text-[11px] text-white/60">Stk Push</p>
            <p className="text-sm font-semibold">Confirm payment of {ksh(amount)}</p>
            <p className="text-[11px] text-white/60">To: Vektra · Tips</p>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="flex-1 rounded-lg bg-white/10 py-2 text-center text-xs">Cancel</div>
            <div className="flex-1 rounded-lg bg-vektra-500 py-2 text-center text-xs font-semibold">
              Enter PIN
            </div>
          </div>
        </div>

        {mounted && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-vektra-700">
            <span className="h-2 w-2 animate-[pulse-dot_1.4s_ease-in-out_infinite] rounded-full bg-vektra-500" />
            {done ? 'Payment confirmed…' : 'Waiting for you to enter your PIN…'}
          </div>
        )}
      </div>
    </div>
  )
}

/* ============ STEP: SUCCESS ============ */
function SuccessStep({ amount, creator }: { amount: number; creator: string }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-vektra-100">
        <CheckCircle size={44} weight="fill" className="text-vektra-600" />
      </div>
      <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">Tip sent!</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-steel">
        {ksh(amount)} is on its way to {creator}. A receipt is on its way to
        your phone and email.
      </p>

      <div className="mt-7 w-full max-w-xs rounded-2xl border border-hairline bg-canvas p-5 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Amount</span>
          <span className="font-mono font-semibold text-ink">{ksh(amount)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted">To</span>
          <span className="font-medium text-ink">{creator}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted">Status</span>
          <span className="inline-flex items-center gap-1 font-medium text-vektra-700">
            <Check size={14} weight="bold" />
            Completed
          </span>
        </div>
      </div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
      >
        Back to Vektra
        <CaretRight size={16} weight="bold" />
      </Link>
    </div>
  )
}