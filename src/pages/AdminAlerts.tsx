import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bell, Gauge, SignOut, UsersThree, Wallet } from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import { logoutAdmin } from '../lib/adminAuth'
import { listPayoutRequests, type PayoutRequest } from '../lib/payoutRequests'

export default function AdminAlerts() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState<PayoutRequest[]>([])

  useEffect(() => {
    setRequests(listPayoutRequests())
  }, [])

  const events = requests.flatMap((r) => [
    { id: `${r.id}-sub`, label: `${r.creatorName} submitted a payout channel request`, time: r.createdAt, kind: 'submitted' },
    ...(r.channelId
      ? [{ id: `${r.id}-conn`, label: `Channel ${r.channelId} connected to @${r.creatorHandle}`, time: r.updatedAt, kind: 'connected' }]
      : []),
    ...(r.status === 'ready'
      ? [{ id: `${r.id}-ready`, label: `@${r.creatorHandle} is live — channel verified`, time: r.updatedAt, kind: 'ready' }]
      : []),
  ] as { id: string; label: string; time: string; kind: string }[])

  events.sort((a, b) => b.time.localeCompare(a.time))

  const kindMeta: Record<string, { color: string; dot: string; label: string }> = {
    submitted: { color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', label: 'New request' },
    connected: { color: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500', label: 'Connected' },
    ready: { color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', label: 'Live' },
  }

  return (
    <div className="min-h-[100dvh]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-hairline bg-surface px-5 py-6 lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-ink">Vektra</span>
        </Link>
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-hairline bg-canvas p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-vektra-400 to-vektra-600 text-sm font-bold text-white">V</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">Vektra Admin</p>
            <p className="truncate text-xs text-muted">Payout operations</p>
          </div>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          <NavLink to="/admin" end className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-vektra-50 font-semibold text-vektra-800' : 'font-medium text-steel hover:bg-canvas hover:text-ink'}`}>
            <Wallet size={18} weight="bold" />
            Payout requests
          </NavLink>
          <NavLink to="/admin/alerts" className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-vektra-50 font-semibold text-vektra-800' : 'font-medium text-steel hover:bg-canvas hover:text-ink'}`}>
            <Bell size={18} weight="bold" />
            Alerts
          </NavLink>
          <NavLink to="/admin/creators" className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-vektra-50 font-semibold text-vektra-800' : 'font-medium text-steel hover:bg-canvas hover:text-ink'}`}>
            <UsersThree size={18} weight="bold" />
            Creators
          </NavLink>
          <NavLink to="/admin/channels" className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-vektra-50 font-semibold text-vektra-800' : 'font-medium text-steel hover:bg-canvas hover:text-ink'}`}>
            <Gauge size={18} weight="bold" />
            Lipa Haraka
          </NavLink>
        </nav>

        <div className="mt-6 rounded-2xl border border-vektra-100 bg-vektra-50 p-4">
          <p className="text-xs font-semibold text-vektra-800">Channel status</p>
          <p className="mt-1 text-xs leading-relaxed text-vektra-700">
            {requests.filter((r) => r.status === 'submitted').length} awaiting
          </p>
        </div>

        <button
          onClick={() => {
            logoutAdmin()
            navigate('/admin', { replace: true })
          }}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <SignOut size={16} weight="bold" />
          Sign out
        </button>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/85 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3 lg:hidden">
              <LogoMark className="h-7 w-7" />
              <span className="text-base font-bold text-ink">Vektra</span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold tracking-tight text-ink">Alerts</h1>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-8">
          <section className="overflow-hidden rounded-3xl border border-hairline bg-surface">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <h2 className="text-base font-bold tracking-tight text-ink">Channel activity</h2>
              <span className="text-xs text-muted">{events.length} events</span>
            </div>

            {events.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-base font-semibold text-ink">No activity yet</p>
                <p className="mt-1 text-sm text-muted">
                  New payout requests, channel connections, and go-lives will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-hairline/60">
                {events.map((e) => {
                  const meta = kindMeta[e.kind]
                  return (
                    <div key={e.id} className="flex items-center gap-4 px-6 py-3.5">
                      <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </span>
                      <p className="min-w-0 flex-1 truncate text-sm text-ink">{e.label}</p>
                      <span className="shrink-0 text-xs text-muted">
                        {new Date(e.time).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
