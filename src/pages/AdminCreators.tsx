import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bell, Gauge, UsersThree, Wallet } from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import { listPayoutRequests, type PayoutRequest } from '../lib/payoutRequests'
import { previewUsers } from '../lib/users'

const statusMeta: Record<PayoutRequest['status'], { label: string; color: string; dot: string }> = {
  submitted: { label: 'Awaiting channel', color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  connected: { label: 'Channel connected', color: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500' },
  tested: { label: 'Tested', color: 'bg-violet-50 text-violet-700', dot: 'bg-violet-500' },
  ready: { label: 'Live', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
}

export default function AdminCreators() {
  const [requests, setRequests] = useState<PayoutRequest[]>([])

  useEffect(() => {
    setRequests(listPayoutRequests())
  }, [])

  const count = (s: PayoutRequest['status']) => requests.filter((r) => r.status === s).length

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
            {count('submitted')} awaiting · {count('connected')} connected · {count('ready')} live
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/85 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3 lg:hidden">
              <LogoMark className="h-7 w-7" />
              <span className="text-base font-bold text-ink">Vektra</span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold tracking-tight text-ink">Creators</h1>
            </div>
            <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-semibold text-steel">
              {previewUsers.length + requests.filter((r) => !previewUsers.some((u) => u.handle === r.creatorHandle)).length} creators
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8">
          <section className="overflow-hidden rounded-3xl border border-hairline bg-surface">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <h2 className="text-base font-bold tracking-tight text-ink">All creators</h2>
              <span className="text-xs text-muted">{previewUsers.length} in preview</span>
            </div>

            {previewUsers.map((u) => {
              const req = requests.find((r) => r.creatorHandle === u.handle)
              const status = req ? statusMeta[req.status] : null
              return (
                <div key={u.id} className="flex items-center gap-4 border-b border-hairline/60 px-6 py-3.5 last:border-0">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${u.gradient} text-xs font-bold text-white`}>
                    {u.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{u.name}</p>
                    <p className="truncate text-xs text-muted">@{u.handle} · {u.tagline}</p>
                  </div>
                  <div className="hidden min-w-0 flex-1 sm:block">
                    <p className="truncate text-sm text-steel">{u.plan} plan</p>
                  </div>
                  {status ? (
                    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center rounded-full bg-canvas px-2.5 py-1 text-[11px] font-semibold text-muted">
                      No payout setup
                    </span>
                  )}
                  <Link to={`/tip/${u.handle}`} className="shrink-0 text-xs font-medium text-steel hover:text-ink">
                    Page
                  </Link>
                </div>
              )
            })}
          </section>
        </main>
      </div>
    </div>
  )
}
