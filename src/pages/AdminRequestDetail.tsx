import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bank,
  Bell,
  Check,
  CheckCircle,
  Envelope,
  Gauge,
  PhoneCall,
  Sparkle,
  TestTube,
  UsersThree,
  Wallet,
} from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import Toast from '../components/Toast'
import {
  getPayoutRequest,
  listPayoutRequests,
  connectChannel,
  markTested,
  markReady,
  type PayoutRequest,
} from '../lib/payoutRequests'

const statusMeta: Record<
  PayoutRequest['status'],
  { label: string; color: string; dot: string }
> = {
  submitted: { label: 'Awaiting channel', color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  connected: { label: 'Channel connected', color: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500' },
  tested: { label: 'Tested — ready to email', color: 'bg-violet-50 text-violet-700', dot: 'bg-violet-500' },
  ready: { label: 'Ready — creator notified', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
}

export default function AdminRequestDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [req, setReq] = useState<PayoutRequest | null>(null)
  const [channelValue, setChannelValue] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const r = id ? getPayoutRequest(id) : undefined
    if (!r) {
      // Unknown id — back to the list
      navigate('/admin', { replace: true })
      return
    }
    setReq(r)
    setChannelValue(r.channelId ?? '')
  }, [id, navigate])

  if (!req) return null

  const meta = statusMeta[req.status]

  const refresh = (next: PayoutRequest) => {
    setReq(next)
    setChannelValue(next.channelId ?? '')
  }

  const onConnect = () => {
    const channelId = channelValue.trim()
    if (!channelId) {
      setToast('Enter the channel ID from the Lipa Haraka dashboard first.')
      return
    }
    const next = connectChannel(req.id, channelId)
    if (next) refresh(next)
    setToast('Channel connected to the creator. Test it now.')
  }

  const onTest = () => {
    const next = markTested(req.id)
    if (next) refresh(next)
    setToast('Test payout sent — once it lands, mark it ready and email the creator.')
  }

  const onReady = () => {
    const next = markReady(req.id)
    if (next) refresh(next)
    setToast('Creator emailed — their payout channel is live. ⚡')
  }

  return (
    <div className="min-h-[100dvh]">
      {/* Sidebar — mirrors creator dashboard */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-hairline bg-surface px-5 py-6 lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-ink">Vektra</span>
        </Link>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-hairline bg-canvas p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-vektra-400 to-vektra-600 text-sm font-bold text-white">
            V
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">Vektra Admin</p>
            <p className="truncate text-xs text-muted">Payout operations</p>
          </div>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          <Link to="/admin" className="flex items-center gap-3 rounded-xl bg-vektra-50 px-3 py-2.5 text-sm font-semibold text-vektra-800">
            <Wallet size={18} weight="bold" />
            Payout requests
          </Link>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-canvas hover:text-ink">
            <Bell size={18} weight="bold" />
            Alerts
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-canvas hover:text-ink">
            <UsersThree size={18} weight="bold" />
            Creators
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-canvas hover:text-ink">
            <Gauge size={18} weight="bold" />
            Lipa Haraka
          </a>
        </nav>

        <div className="mt-6 rounded-2xl border border-vektra-100 bg-vektra-50 p-4">
          <p className="text-xs font-semibold text-vektra-800">Channel status</p>
          <p className="mt-1 text-xs leading-relaxed text-vektra-700">
            {listPayoutRequests().filter((r) => r.status === 'submitted').length} awaiting
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/85 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-6">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-steel transition-colors hover:text-ink"
            >
              <ArrowLeft size={16} weight="bold" />
              Back to requests
            </Link>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-8">
          {/* Creator header */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-vektra-400 to-vektra-600 text-2xl font-bold text-white">
                {req.creatorName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-ink">{req.creatorName}</h1>
                <p className="text-sm text-muted">@{req.creatorHandle} · {req.creatorEmail}</p>
                <p className="mt-0.5 font-mono text-[11px] text-muted">{req.id}</p>
              </div>
            </div>
            <Link
              to={`/tip/${req.creatorHandle}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-vektra-300"
            >
              View their page
              <ArrowRight size={15} weight="bold" />
            </Link>
          </section>

          {/* Payout details */}
          <section className="mt-8 rounded-3xl border border-hairline bg-surface p-6 shadow-diffuse">
            <h2 className="text-base font-bold tracking-tight text-ink">Payout details</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Detail
                icon={req.method === 'bank' ? <Bank size={16} weight="bold" /> : <PhoneCall size={16} weight="bold" />}
                label="Method"
                value={req.method === 'bank' ? 'Bank' : 'M-Pesa'}
              />
              {req.method === 'bank' ? (
                <>
                  <Detail icon={<Bank size={16} weight="bold" />} label="Bank" value={req.bankName ?? '—'} />
                  <Detail icon={<Wallet size={16} weight="bold" />} label="Account number" value={req.bankAccount ?? '—'} />
                  <Detail icon={<CheckCircle size={16} weight="bold" />} label="Account holder" value={req.bankHolder ?? '—'} />
                </>
              ) : (
                <Detail icon={<PhoneCall size={16} weight="bold" />} label="M-Pesa number" value={req.payPhone ?? '—'} />
              )}
              <Detail
                icon={<Sparkle size={16} weight="bold" />}
                label="Channel ID"
                value={req.channelId ?? 'Not set yet'}
                mono
              />
            </div>
          </section>

          {/* Channel setup */}
          <section className="mt-6 rounded-3xl border border-hairline bg-surface p-6 shadow-diffuse">
            <h2 className="text-base font-bold tracking-tight text-ink">Channel setup</h2>
            <p className="mt-1 text-sm text-steel">
              Set this creator's route up on the Lipa Haraka dashboard, then
              paste the channel ID and walk it through to live.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={channelValue}
                onChange={(e) => setChannelValue(e.target.value)}
                disabled={req.status === 'ready'}
                placeholder="Channel ID from Lipa Haraka (e.g. 16)"
                className="w-full max-w-sm rounded-xl border border-hairline bg-canvas px-3.5 py-2.5 font-mono text-sm text-ink outline-none placeholder:text-muted focus:border-vektra-400 disabled:opacity-50"
              />
              {req.status === 'submitted' && (
                <button
                  onClick={onConnect}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
                >
                  <Sparkle size={14} weight="bold" />
                  Connect channel
                </button>
              )}
            </div>

            {/* Step timeline */}
            <div className="mt-6 space-y-3">
              {([
                { label: 'Channel connected', done: req.status !== 'submitted' },
                { label: 'Test payout sent', done: req.status === 'tested' || req.status === 'ready' },
                { label: 'Creator emailed — live', done: req.status === 'ready' },
              ] as const).map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      step.done ? 'bg-vektra-500 text-white' : 'border border-hairline bg-canvas text-muted'
                    }`}
                  >
                    {step.done ? <Check size={14} weight="bold" /> : i + 1}
                  </div>
                  <span className={`text-sm ${step.done ? 'font-medium text-ink' : 'text-muted'}`}>
                    {step.label}
                  </span>
                  {i === 0 && req.status === 'connected' && (
                    <button
                      onClick={onTest}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-vektra-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-vektra-600 active:scale-[0.98]"
                    >
                      <TestTube size={14} weight="bold" />
                      Send test payout (KES 10)
                    </button>
                  )}
                  {i === 1 && req.status === 'tested' && (
                    <button
                      onClick={onReady}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]"
                    >
                      <Envelope size={14} weight="bold" />
                      Email creator — everything is ready
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

/* ============ DETAIL ============ */
function Detail({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="rounded-xl border border-hairline bg-canvas px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
        <span className="text-vektra-600">{icon}</span>
        {label}
      </p>
      <p className={`mt-1 truncate text-sm font-semibold text-ink ${mono ? 'font-mono' : ''}`}>
        {value}
      </p>
    </div>
  )
}
