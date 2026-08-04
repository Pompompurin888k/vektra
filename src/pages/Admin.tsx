import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Bell,
  CheckCircle,
  Gauge,
  PhoneCall,
  Sparkle,
  TestTube,
  Trash,
  UsersThree,
  Wallet,
} from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import Toast from '../components/Toast'
import {
  listPayoutRequests,
  deletePayoutRequest,
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

export default function AdminPayouts() {
  const [requests, setRequests] = useState<PayoutRequest[]>([])
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    setRequests(listPayoutRequests())
  }, [])

  const refresh = () => setRequests(listPayoutRequests())

  const count = (s: PayoutRequest['status']) => requests.filter((r) => r.status === s).length

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
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? 'bg-vektra-50 text-vektra-800' : 'font-medium text-steel hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <Wallet size={18} weight="bold" />
            Payout requests
          </NavLink>
          <NavLink
            to="/admin/alerts"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-vektra-50 text-vektra-800 font-semibold' : 'font-medium text-steel hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <Bell size={18} weight="bold" />
            Alerts
          </NavLink>
          <NavLink
            to="/admin/creators"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-vektra-50 text-vektra-800 font-semibold' : 'font-medium text-steel hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <UsersThree size={18} weight="bold" />
            Creators
          </NavLink>
          <NavLink
            to="/admin/channels"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-vektra-50 text-vektra-800 font-semibold' : 'font-medium text-steel hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <Gauge size={18} weight="bold" />
            Lipa Haraka
          </NavLink>
        </nav>

        <div className="mt-6 rounded-2xl border border-vektra-100 bg-vektra-50 p-4">
          <p className="text-xs font-semibold text-vektra-800">Channel status</p>
          <p className="mt-1 text-xs leading-relaxed text-vektra-700">
            {count('submitted')} awaiting · {count('connected')} connected · {count('tested')} tested
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/85 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3 lg:hidden">
              <LogoMark className="h-7 w-7" />
              <span className="text-base font-bold text-ink">Vektra</span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold tracking-tight text-ink">Payout requests</h1>
            </div>
            <div className="flex items-center gap-2">
              {(['submitted', 'connected', 'tested', 'ready'] as const).map((s) => (
                <div
                  key={s}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusMeta[s].color}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${statusMeta[s].dot}`} />
                  {count(s)}
                </div>
              ))}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8">
          {/* Intro card */}
          <section className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-float">
            <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-vektra-500/20 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                  Payout provisioning
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Connect channels, test payouts, go live.
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/70">
                  Creators submit bank/M-Pesa details at signup. Set the channel
                  up on Lipa Haraka, paste the channel ID, test a small payout,
                  then email the creator. Payments hit the creator's bank
                  directly.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white/80">
                  {requests.length} request{requests.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {([
              { label: 'Awaiting channel', value: count('submitted'), icon: PhoneCall, color: 'text-amber-600' },
              { label: 'Channel connected', value: count('connected'), icon: Sparkle, color: 'text-sky-600' },
              { label: 'Tested', value: count('tested'), icon: TestTube, color: 'text-violet-600' },
              { label: 'Live', value: count('ready'), icon: CheckCircle, color: 'text-emerald-600' },
            ] as const).map((s) => (
              <div key={s.label} className="rounded-3xl border border-hairline bg-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-vektra-50">
                    <s.icon size={18} weight="bold" className={s.color} />
                  </span>
                </div>
                <p className="mt-4 font-mono text-2xl font-bold tracking-tight text-ink">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </section>

          {/* Creators list — one-liner rows */}
          {requests.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-hairline bg-surface px-6 py-16 text-center">
              <p className="text-base font-semibold text-ink">No creators yet</p>
              <p className="mt-1 text-sm text-muted">
                When a creator finishes onboarding, their payout details appear here.
              </p>
            </div>
          ) : (
            <section className="mt-6 overflow-hidden rounded-3xl border border-hairline bg-surface">
              <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
                <h2 className="text-base font-bold tracking-tight text-ink">Creators</h2>
                <span className="text-xs text-muted">{requests.length} total</span>
              </div>
              {requests.map((r) => (
                <CreatorRow key={r.id} req={r} onDelete={() => {
                  deletePayoutRequest(r.id)
                  refresh()
                  setToast('Creator removed.')
                }} />
              ))}
            </section>
          )}
        </main>
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

/* ============ CREATOR ROW (one-liner) ============ */
function CreatorRow({ req, onDelete }: { req: PayoutRequest; onDelete: () => void }) {
  const meta = statusMeta[req.status]
  const detail = req.method === 'bank'
    ? `${req.bankName ?? 'Bank'} · ${req.bankAccount ?? ''}`
    : req.payPhone ?? 'M-Pesa'

  return (
    <Link
      to={`/admin/requests/${req.id}`}
      className="group flex items-center gap-4 border-b border-hairline/60 px-6 py-3.5 transition-colors last:border-0 hover:bg-canvas"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-vektra-400 to-vektra-600 text-xs font-bold text-white">
        {req.creatorName.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{req.creatorName}</p>
        <p className="truncate text-xs text-muted">@{req.creatorHandle}</p>
      </div>
      <div className="hidden min-w-0 flex-[1.5] sm:block">
        <p className="truncate text-sm text-steel">{detail}</p>
        <p className="truncate text-[11px] text-muted">{req.creatorEmail}</p>
      </div>
      <div className="hidden min-w-0 flex-1 md:block">
        <span className="font-mono text-xs text-muted">{req.channelId ?? '—'}</span>
      </div>
      <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.color}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
        {meta.label}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDelete()
        }}
        className="shrink-0 rounded-full p-1.5 text-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
        aria-label="Remove creator"
      >
        <Trash size={14} weight="bold" />
      </button>
    </Link>
  )
}
