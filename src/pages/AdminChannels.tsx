import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Bell, Gauge, SignOut, UsersThree, Wallet } from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import { logoutAdmin } from '../lib/adminAuth'
import { kenyanBanks } from '../lib/banks'

export default function AdminChannels() {
  const navigate = useNavigate()
  const channels = kenyanBanks.filter((b) => b.channelId)

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
            {channels.length} bank channels mapped
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
              <h1 className="text-lg font-bold tracking-tight text-ink">Lipa Haraka</h1>
            </div>
            <a
              href="https://lipaharakaapis.co.ke"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-black"
            >
              Open Lipa Haraka dashboard
              <ArrowUpRight size={14} weight="bold" />
            </a>
            <button
              onClick={() => {
                logoutAdmin()
                navigate('/admin', { replace: true })
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3.5 py-2 text-xs font-semibold text-steel transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              title="Sign out of admin"
            >
              <SignOut size={14} weight="bold" />
              Sign out
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-8">
          <section className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-float">
            <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-vektra-500/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-widest text-white/50">Channel model</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">One account, many bank routes.</h2>
              <p className="mt-2 max-w-lg text-sm text-white/70">
                Each API key on your Lipa Haraka account is tied to a
                channel_id — that's the route money takes to a specific bank.
                When you connect a creator, assign the channel_id that matches
                their bank.
              </p>
            </div>
          </section>

          <section className="mt-6 overflow-hidden rounded-3xl border border-hairline bg-surface">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <h2 className="text-base font-bold tracking-tight text-ink">Bank channels</h2>
              <span className="text-xs text-muted">{channels.length} mapped</span>
            </div>
            <div className="divide-y divide-hairline/60">
              {channels.map((b) => (
                <div key={b.name} className="flex items-center gap-4 px-6 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-vektra-50 text-xs font-bold text-vektra-700">
                    {b.name.replace(' Bank', '').replace(' Kenya', '').charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{b.name}</p>
                    <p className="text-[11px] text-muted">Bank code {b.code}</p>
                  </div>
                  <span className="rounded-full bg-canvas px-3 py-1 font-mono text-xs font-semibold text-ink">
                    channel {b.channelId}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
