import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Envelope,
  Eye,
  EyeSlash,
  Lock,
  ShieldCheck,
  Sparkle,
  Check,
} from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import Toast from '../components/Toast'
import { loginWithGoogle } from '../lib/auth'
import { previewUsers, setPreviewUser, type MockUser } from '../lib/users'
import { ksh, kshCompact } from '../lib/format'

/**
 * Login — production-style sign in.
 * The "Preview" mode lets us test end-to-end like production, no backend yet:
 * click an avatar to select a creator, then "Enter preview" plays a short
 * "Welcome, [Name]" transition into their dashboard.
 */
export default function Login() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [toast, setToast] = useState<string | null>(null)

  // Surface Google OAuth errors surfaced via ?error=
  useEffect(() => {
    const error = searchParams.get('error')
    if (!error) return
    const msg =
      error === 'access_denied'
        ? 'Sign-in was cancelled.'
        : error === 'invalid_state'
          ? 'Session expired — try again.'
          : 'Google sign-in failed.'
    setToast(msg)
    setSearchParams({}, { replace: true })
  }, [searchParams, setSearchParams])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<MockUser>(previewUsers[0])
  const [entering, setEntering] = useState(false)
  // preview typing sequence: idle → typing-email → typing-password → welcome → done
  const [previewState, setPreviewState] = useState<'idle' | 'typing-email' | 'typing-password' | 'welcome' | 'done'>('idle')
  const [typedEmail, setTypedEmail] = useState('')
  const [typedPw, setTypedPw] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.includes('@') || !email.trim()) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    // No backend yet — go straight to the dashboard for testing
    navigate('/dashboard')
  }

  const enterPreview = (u: MockUser) => {
    if (previewState !== 'idle') return
    setSelected(u)
    setPreviewUser(u.id)
    setEntering(true)
    setTypedEmail('')
    setTypedPw('')
    setPreviewState('typing-email')
  }

  // Drive the auto-fill: type email → type masked password → welcome → go
  useEffect(() => {
    if (previewState === 'typing-email') {
      const emailAddr = `fan@${selected.handle}.com`
      let i = 0
      const id = setInterval(() => {
        i++
        setTypedEmail(emailAddr.slice(0, i))
        if (i >= emailAddr.length) {
          clearInterval(id)
          setPreviewState('typing-password')
        }
      }, 65)
      return () => clearInterval(id)
    }
    if (previewState === 'typing-password') {
      const pw = 'v3ktra-demo'
      let i = 0
      const id = setInterval(() => {
        i++
        setTypedPw(pw.slice(0, i))
        if (i >= pw.length) {
          clearInterval(id)
          setPreviewState('welcome')
        }
      }, 80)
      return () => clearInterval(id)
    }
  }, [previewState, selected])

  return (
    <div className="min-h-[100dvh]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-hairline bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <LogoMark className="h-7 w-7" />
            <span className="text-lg font-bold tracking-tight text-ink">Vektra</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-steel hover:text-ink"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl items-center gap-14 px-6 py-12 lg:py-20">
        {/* LEFT: form */}
        <div className="w-full max-w-md">
          <p className="text-xs font-semibold uppercase tracking-widest text-vektra-600">
            Sign in
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Welcome back.
          </h1>
          <p className="mt-2 text-sm text-steel">
            Your tips, supporters, and payouts — all in one place.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted">Email address</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
                <Envelope size={18} weight="bold" className="text-muted" />
                <input
                  value={previewState === 'typing-email' || previewState === 'typing-password' || previewState === 'welcome' || previewState === 'done' ? typedEmail : email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
                  readOnly={previewState !== 'idle'}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted">Password</label>
                <button
                  type="button"
                  className="text-xs font-medium text-vektra-600 hover:text-vektra-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
                <Lock size={18} weight="bold" className="text-muted" />
                <input
                  value={previewState === 'typing-email' || previewState === 'typing-password' || previewState === 'welcome' || previewState === 'done' ? typedPw : password}
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

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
            >
              Sign in
              <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={previewState !== 'idle'}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-hairline bg-white py-3.5 text-sm font-semibold text-ink shadow-sm transition-all hover:bg-surface active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
          >
            <GoogleG className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-hairline" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">or</span>
            <div className="h-px flex-1 bg-hairline" />
          </div>

          {/* Preview — for internal testing, no backend needed */}
          <div className="rounded-2xl border border-vektra-100 bg-vektra-50/60 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-vektra-800">
              <Sparkle size={14} weight="bold" className="text-vektra-600" />
              Preview mode — test as any creator
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-vektra-700">
              No login needed. Pick a creator and land straight in their
              dashboard with sample data.
            </p>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {previewUsers.map((u) => {
                const active = u.id === selected.id
                return (
                  <button
                    key={u.id}
                    onClick={() => setSelected(u)}
                    title={`${u.name} · @${u.handle}`}
                    className="group flex flex-col items-center gap-1.5 rounded-xl px-1 py-2 transition-all hover:bg-surface active:scale-95"
                  >
                    <span className="relative">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${u.gradient} text-base font-bold text-white transition-all ${
                          active
                            ? 'scale-110 ring-2 ring-vektra-500 ring-offset-2 ring-offset-vektra-50'
                            : 'opacity-80 ring-2 ring-transparent group-hover:opacity-100 group-hover:ring-vektra-300'
                        }`}
                      >
                        {u.initials}
                      </span>
                      {active && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-vektra-500 text-white">
                          <Check size={10} weight="bold" />
                        </span>
                      )}
                    </span>
                    <span className={`text-[10px] font-medium ${active ? 'text-vektra-700' : 'text-steel group-hover:text-ink'}`}>
                      {u.name}
                    </span>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => enterPreview(selected)}
              disabled={entering}
              className="group mt-3 flex w-full items-center justify-center gap-2 rounded-full border-2 border-vektra-500 bg-surface py-2.5 text-xs font-semibold text-vektra-800 transition-all hover:bg-vektra-100 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              <Sparkle size={14} weight="bold" className="text-vektra-600" />
              {entering ? `Entering as ${selected.name}…` : 'Enter preview'}
              <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted">
            <ShieldCheck size={14} weight="bold" className="text-vektra-600" />
            Secured by Vektra · Your data stays yours
          </div>

          <p className="mt-4 text-center text-sm text-steel">
            New here?{' '}
            <Link to="/join" className="font-semibold text-vektra-600 hover:text-vektra-700">
              Create your page
            </Link>
          </p>
        </div>

        {/* RIGHT: live preview panel */}
        <div className="hidden flex-1 lg:block">
          <UserPanel user={selected} />
        </div>
      </main>

      {/* Welcome transition overlay */}
      {entering && <WelcomeOverlay user={selected} onDone={() => navigate('/dashboard')} />}

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

/* ============ GOOGLE G LOGO ============ */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}

/* ============ RIGHT PANEL: user details ============ */
function UserPanel({ user }: { user: MockUser }) {  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-10 text-white shadow-float">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-vektra-500/20 blur-3xl"
      />

      {/* user header */}
      <div className="relative flex items-center gap-4">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${user.gradient} text-2xl font-bold text-white`}
        >
          {user.initials}
        </div>
        <div>
          <p className="text-xl font-bold tracking-tight">{user.name}</p>
          <p className="text-sm text-white/60">@{user.handle} · {user.plan}</p>
        </div>
        <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
          {user.tagline}
        </span>
      </div>

      {/* mini stats */}
      <div className="relative mt-8 grid grid-cols-3 gap-3">
        {[
          { label: 'Total earned', value: kshCompact(user.totalEarned) },
          { label: 'This month', value: kshCompact(user.thisMonth) },
          { label: 'Supporters', value: user.supporters.toLocaleString('en-KE') },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-mono text-lg font-bold text-vektra-300">{s.value}</p>
            <p className="mt-1 text-[11px] text-white/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* recent tips */}
      <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
          Recent tips
        </p>
        <div className="mt-3 space-y-3">
          {user.transactions.slice(0, 3).map((t) => (
            <div key={t.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[11px] text-white/50">“{t.note}”</p>
                </div>
              </div>
              <span className="font-mono text-sm font-semibold text-vektra-300">{ksh(t.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-between rounded-2xl border border-vektra-500/30 bg-vektra-500/10 px-4 py-3">
        <span className="text-xs font-medium text-vektra-200">
          Available to withdraw
        </span>
        <span className="font-mono text-lg font-bold text-vektra-300">{ksh(user.withdrawable)}</span>
      </div>
    </div>
  )
}

/* ============ WELCOME OVERLAY (typewriter + fade) ============ */
function WelcomeOverlay({ user, onDone }: { user: MockUser; onDone: () => void }) {
  const name = user.name
  const [typed, setTyped] = useState('')
  const [showCard, setShowCard] = useState(false)

  // Typewriter: "Welcome, <name>"
  useEffect(() => {
    let i = 0
    const full = `Welcome, ${name}`
    const id = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) clearInterval(id)
    }, 55)
    return () => clearInterval(id)
  }, [name])

  // Show the little stat card once typing finishes, then leave
  useEffect(() => {
    const t1 = setTimeout(() => setShowCard(true), name.length * 55 + 450)
    const t2 = setTimeout(onDone, name.length * 55 + 1700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [name, onDone])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-vektra-500/20 blur-3xl"
      />

      <div
        className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-4xl font-bold text-white"
        style={{ animation: 'welcome-avatar 0.5s cubic-bezier(0.16, 1, 0.3, 1) both', backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
      >
        <span
          className={`bg-gradient-to-br ${user.gradient} bg-clip-text`}
          style={{ color: 'transparent' }}
        >
          {user.initials}
        </span>
      </div>

      <h1
        className="mt-8 font-mono text-2xl font-bold tracking-tight text-white md:text-4xl"
        style={{ animation: 'welcome-word 0.4s ease-out both' }}
      >
        {typed}
        <span className="ml-0.5 inline-block h-[0.9em] w-[0.55ch] translate-y-[0.15em] animate-pulse bg-vektra-500" />
      </h1>

      {showCard && (
        <div
          className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3"
          style={{ animation: 'welcome-fade 0.4s ease-out both' }}
        >
          <span className="h-2 w-2 animate-[pulse-dot_1.2s_ease-in-out_infinite] rounded-full bg-vektra-400" />
          <span className="text-sm text-white/80">
            Loading {user.name}'s dashboard…
          </span>
        </div>
      )}
    </div>
  )
}
