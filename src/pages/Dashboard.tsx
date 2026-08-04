import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Bank,
  Bell,
  CaretDown,
  ChartLineUp,
  Download,
  Eye,
  Globe,
  Plus,
  UsersThree,
  Wallet,
  CheckCircle,
  Swap,
} from '@phosphor-icons/react'
import { LogoMark } from '../components/Logo'
import { ksh, kshCompact, shortDate, shortTime } from '../lib/format'
import { previewUsers, getPreviewUser, setPreviewUser, type MockUser } from '../lib/users'
import { listPayoutRequests } from '../lib/payoutRequests'

export default function Dashboard() {
  const [tab, setTab] = useState<'tips' | 'supporters'>('tips')
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const [user, setUser] = useState<MockUser>(getPreviewUser)

  const switchUser = (u: MockUser) => {
    setUser(u)
    setPreviewUser(u.id)
    setSwitcherOpen(false)
  }

  const stats = [
    { label: 'Total earned', value: user.totalEarned, delta: '+12.4%', icon: Wallet },
    { label: 'This month', value: user.thisMonth, delta: '+8.1%', icon: ChartLineUp },
    { label: 'Supporters', value: user.supporters, delta: '+96', icon: UsersThree },
    { label: 'Avg. tip', value: user.avgTip, delta: '+6.2%', icon: Bank },
  ]

  const transactions = user.transactions
  const withdrawable = user.withdrawable
  const weekly = user.weekly

  // Payout channel status for the current creator (from the admin loop)
  const myRequest = listPayoutRequests().find((r) => r.creatorHandle === user.handle)
  const channelVerified = myRequest?.status === 'ready'

  return (
    <div className="min-h-[100dvh]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-hairline bg-surface px-5 py-6 lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-ink">Vektra</span>
        </Link>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-hairline bg-canvas p-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${user.gradient} text-sm font-bold text-white`}
          >
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
            <p className="truncate text-xs text-muted">@{user.handle} · {user.plan}</p>
          </div>
        </div>

        {/* Preview user switcher */}
        <div className="relative mt-3">
          <button
            onClick={() => setSwitcherOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl border border-dashed border-vektra-300 bg-vektra-50/50 px-3 py-2.5 text-xs font-semibold text-vektra-800 transition-colors hover:bg-vektra-50"
          >
            <span className="inline-flex items-center gap-2">
              <Swap size={14} weight="bold" className="text-vektra-600" />
              Switch user
            </span>
            <CaretDown
              size={12}
              weight="bold"
              className={`transition-transform ${switcherOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {switcherOpen && (
            <div className="absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-2xl border border-hairline bg-surface shadow-float">
              <div className="max-h-72 overflow-y-auto p-1.5">
                {previewUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => switchUser(u)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-canvas ${
                      u.id === user.id ? 'bg-vektra-50' : ''
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${u.gradient} text-xs font-bold text-white`}
                    >
                      {u.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{u.name}</p>
                      <p className="truncate text-[11px] text-muted">@{u.handle} · {u.plan}</p>
                    </div>
                    {u.id === user.id && <CheckCircle size={16} weight="fill" className="text-vektra-500" />}
                  </button>
                ))}
              </div>
              <div className="border-t border-hairline px-4 py-2.5 text-[11px] text-muted">
                Preview mode — pick any creator to test their dashboard
              </div>
            </div>
          )}
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-vektra-50 px-3 py-2.5 text-sm font-semibold text-vektra-800">
            <Wallet size={18} weight="bold" />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-canvas hover:text-ink">
            <Bell size={18} weight="bold" />
            Live alerts
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-canvas hover:text-ink">
            <UsersThree size={18} weight="bold" />
            Supporters
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-canvas hover:text-ink">
            <Globe size={18} weight="bold" />
            My page
          </a>
        </nav>

        <div className="mt-6 rounded-2xl border border-vektra-100 bg-vektra-50 p-4">
          <p className="text-xs font-semibold text-vektra-800">Pro plan</p>
          <p className="mt-1 text-xs leading-relaxed text-vektra-700">
            2.5% fee · custom domain · white-label receipts
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
              <h1 className="text-lg font-bold tracking-tight text-ink">Overview</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/tip/${user.handle}`}
                className="hidden items-center gap-1.5 rounded-full border border-hairline bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-vektra-300 sm:inline-flex"
              >
                <Eye size={16} weight="bold" />
                View page
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
              >
                <Plus size={16} weight="bold" />
                Share
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8">
          {/* Payout channel status banner */}
          {myRequest && (
            <section
              className={`mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3.5 ${
                channelVerified
                  ? 'border-emerald-100 bg-emerald-50'
                  : 'border-vektra-100 bg-vektra-50'
              }`}
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  channelVerified ? 'bg-emerald-100 text-emerald-600' : 'bg-vektra-100 text-vektra-600'
                }`}
              >
                {channelVerified ? (
                  <CheckCircle size={17} weight="fill" />
                ) : (
                  <span className="h-2.5 w-2.5 animate-[pulse-dot_1.4s_ease-in-out_infinite] rounded-full bg-vektra-500" />
                )}
              </span>
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${channelVerified ? 'text-emerald-800' : 'text-vektra-800'}`}>
                  {channelVerified ? 'Payout channel verified' : 'Payout channel pending verification'}
                </p>
                <p className={`mt-0.5 text-xs leading-relaxed ${channelVerified ? 'text-emerald-700' : 'text-vektra-700'}`}>
                  {channelVerified
                    ? 'Your bank channel is live — tips will land straight in your account.'
                    : 'We\u2019re verifying your bank details. You\u2019ll get an email as soon as everything is ready — you can keep using your page in the meantime.'}
                </p>
              </div>
            </section>
          )}

          {/* Balance card */}
          <section className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-float">
            <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-vektra-500/20 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                  Available balance
                </p>
                <p className="mt-3 font-mono text-5xl font-bold tracking-tight">
                  {ksh(withdrawable)}
                </p>
                <p className="mt-2 text-sm text-white/50">
                  Next settlement daily at 10:00 AM
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setWithdrawOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-vektra-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-vektra-400 active:scale-[0.98]"
                >
                  <Wallet size={18} weight="bold" />
                  Withdraw to M-Pesa
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  <Bank size={18} weight="bold" />
                  Bank
                </button>
              </div>
            </div>
          </section>
{/* Stats */}
          <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl border border-hairline bg-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-vektra-50 text-vektra-600">
                    <s.icon size={18} weight="bold" />
                  </span>
                  <span className="rounded-full bg-vektra-50 px-2 py-0.5 text-xs font-semibold text-vektra-700">
                    {s.delta}
                  </span>
                </div>
                <p className="mt-4 font-mono text-2xl font-bold tracking-tight text-ink">
                  {kshCompact(s.value)}
                </p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </section>

          {/* Chart + right column */}
          <section className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-3xl border border-hairline bg-surface p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-ink">Earnings</h2>
                  <p className="text-xs text-muted">Last 7 days</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-steel">
                  7 days
                  <CaretDown size={12} weight="bold" />
                </div>
              </div>
              <Chart weekly={weekly} />
            </div>

            <div className="rounded-3xl border border-hairline bg-surface p-6">
              <h2 className="text-base font-bold tracking-tight text-ink">Quick actions</h2>
              <div className="mt-4 space-y-3">
                <button className="flex w-full items-center justify-between rounded-2xl border border-hairline bg-canvas px-4 py-3 text-left transition-colors hover:border-vektra-300">
                  <span className="flex items-center gap-3 text-sm font-medium text-ink">
                    <Download size={18} weight="bold" className="text-vektra-600" />
                    Export supporters
                  </span>
                  <ArrowUpRight size={16} weight="bold" className="text-muted" />
                </button>
                <button className="flex w-full items-center justify-between rounded-2xl border border-hairline bg-canvas px-4 py-3 text-left transition-colors hover:border-vektra-300">
                  <span className="flex items-center gap-3 text-sm font-medium text-ink">
                    <Globe size={18} weight="bold" className="text-vektra-600" />
                    Copy my link
                  </span>
                  <ArrowUpRight size={16} weight="bold" className="text-muted" />
                </button>
                <button className="flex w-full items-center justify-between rounded-2xl border border-hairline bg-canvas px-4 py-3 text-left transition-colors hover:border-vektra-300">
                  <span className="flex items-center gap-3 text-sm font-medium text-ink">
                    <Bell size={18} weight="bold" className="text-vektra-600" />
                    Live alert settings
                  </span>
                  <ArrowUpRight size={16} weight="bold" className="text-muted" />
                </button>
              </div>
            </div>
          </section>
{/* Transactions / Supporters */}
          <section className="mt-6 rounded-3xl border border-hairline bg-surface">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div className="flex gap-1 rounded-full bg-canvas p-1">
                {(['tips', 'supporters'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all ${
                      tab === t ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-steel transition-colors hover:text-ink">
                <Download size={14} weight="bold" />
                Export
              </button>
            </div>

            {tab === 'tips' ? (
              <TransactionsTable transactions={transactions} />
            ) : (
              <SupportersTable />
            )}
          </section>
        </main>
      </div>

      {/* Withdraw modal */}
      {withdrawOpen && (
        <WithdrawModal amount={withdrawable} onClose={() => setWithdrawOpen(false)} />
      )}
    </div>
  )
}
/* ============ CHART ============ */
function Chart({ weekly }: { weekly: { day: string; value: number }[] }) {
  const max = Math.max(...weekly.map((w) => w.value))
  return (
    <div className="mt-6 flex h-40 items-end gap-3">
      {weekly.map((w, i) => (
        <div key={w.day} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-vektra-600 to-vektra-400 transition-all duration-500 hover:from-vektra-700 hover:to-vektra-500"
              style={{ height: `${(w.value / max) * 100}%`, opacity: 0.5 + 0.5 * (i / weekly.length) }}
            />
          </div>
          <span className="text-[10px] font-medium text-muted">{w.day}</span>
        </div>
      ))}
    </div>
  )
}

/* ============ TRANSACTIONS TABLE ============ */
type Transaction = {
  id: string
  name: string
  amount: number
  note: string
  date: string
  method: string
}

function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-hairline text-xs uppercase tracking-wider text-muted">
            <th className="px-6 py-3 font-medium">Supporter</th>
            <th className="px-6 py-3 font-medium">Note</th>
            <th className="px-6 py-3 font-medium">Date</th>
            <th className="px-6 py-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-hairline/60 last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-vektra-50 text-xs font-bold text-vektra-700">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="font-mono text-[11px] text-muted">{t.id}</p>
                  </div>
                </div>
              </td>
              <td className="max-w-[180px] px-6 py-4 text-steel">
                <span className="truncate">“{t.note}”</span>
              </td>
              <td className="px-6 py-4 text-muted">
                <span className="font-mono text-xs">{shortDate(t.date)}</span>
                <span className="ml-1.5 text-xs text-muted">{shortTime(t.date)}</span>
              </td>
              <td className="px-6 py-4 text-right font-mono font-semibold text-ink">
                {ksh(t.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ============ SUPPORTERS TABLE ============ */
function SupportersTable() {
  const supporters = [
    { name: 'Wanjiku', email: 'wanjiku@gmail.com', total: 2400, tips: 6, last: '2026-08-03T14:32:00' },
    { name: 'Brian', email: 'b@gmail.com', total: 800, tips: 3, last: '2026-08-03T11:07:00' },
    { name: 'Otieno', email: 'otieno@yahoo.com', total: 3200, tips: 4, last: '2026-08-02T20:45:00' },
    { name: 'Achieng', email: 'a@outlook.com', total: 1050, tips: 5, last: '2026-08-02T09:12:00' },
    { name: 'Sam', email: 'sam@gmail.com', total: 1500, tips: 2, last: '2026-08-01T18:03:00' },
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-hairline text-xs uppercase tracking-wider text-muted">
            <th className="px-6 py-3 font-medium">Supporter</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Tips</th>
            <th className="px-6 py-3 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {supporters.map((s) => (
            <tr key={s.email} className="border-b border-hairline/60 last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-vektra-50 text-xs font-bold text-vektra-700">
                    {s.name.charAt(0)}
                  </div>
                  <p className="font-medium text-ink">{s.name}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-steel">{s.email}</td>
              <td className="px-6 py-4 text-steel">{s.tips}</td>
              <td className="px-6 py-4 text-right font-mono font-semibold text-ink">
                {ksh(s.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
/* ============ WITHDRAW MODAL ============ */
function WithdrawModal({ amount, onClose }: { amount: number; onClose: () => void }) {
  const [val, setVal] = useState('')
  const [success, setSuccess] = useState(false)
  const parsed = parseInt(val.replace(/\D/g, ''), 10) || 0
  const valid = parsed > 0 && parsed <= amount

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-[2rem] border border-hairline bg-surface p-7 shadow-float">
        {!success ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-ink">Withdraw</h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink"
                aria-label="Close"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-hairline bg-canvas p-4">
              <p className="text-xs text-muted">Available</p>
              <p className="mt-1 font-mono text-2xl font-bold text-ink">{ksh(amount)}</p>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-muted">Amount to withdraw</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-hairline bg-canvas px-4 py-3 focus-within:border-vektra-400">
                <span className="text-sm font-semibold text-muted">KES</span>
                <input
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  inputMode="numeric"
                  placeholder="0"
                  className="w-full bg-transparent font-mono text-lg font-semibold text-ink outline-none placeholder:text-muted"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[5000, 10000, 20000].map((a) => (
                  <button
                    key={a}
                    onClick={() => setVal(String(a))}
                    className="rounded-full border border-hairline px-3 py-1 text-xs font-medium text-steel transition-colors hover:border-vektra-300"
                  >
                    {ksh(a)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-hairline px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                <Wallet size={16} weight="bold" className="text-vektra-600" />
                M-Pesa · 2547 12 345 678
              </span>
              <span className="text-xs text-muted">Change</span>
            </div>

            <button
              disabled={!valid}
              onClick={() => setSuccess(true)}
              className="mt-6 w-full rounded-full bg-vektra-500 py-3.5 text-sm font-semibold text-white transition-all hover:bg-vektra-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {valid ? `Withdraw ${ksh(parsed)}` : 'Enter an amount'}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vektra-100">
              <CheckCircle size={36} weight="fill" className="text-vektra-600" />
            </div>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-ink">Withdrawal queued</h2>
            <p className="mt-2 text-sm text-steel">
              {ksh(parsed)} will land on your M-Pesa in under a minute.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}