/**
 * Payout channel requests — the manual provisioning loop.
 *
 * Flow: creator submits bank/M-Pesa details during onboarding →
 * stored here (visible on /admin) → admin sets the channel up on the
 * Lipa Haraka dashboard, gets a channel_id, connects it to the creator →
 * tests a small payout → marks done → "everything is ready" email.
 *
 * No backend yet: this is localStorage so the whole loop is testable
 * end-to-end like production. Swap for an API later.
 */

export type ChannelStatus = 'submitted' | 'connected' | 'tested' | 'ready'

export type PayoutRequest = {
  id: string
  creatorHandle: string
  creatorName: string
  creatorEmail: string
  method: 'mpesa' | 'bank'
  // mpesa
  payPhone?: string
  // bank
  bankName?: string
  bankAccount?: string
  bankHolder?: string
  channelId?: string
  status: ChannelStatus
  createdAt: string
  updatedAt: string
}

const KEY = 'vektra.payoutRequests'

export function listPayoutRequests(): PayoutRequest[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as PayoutRequest[]
    return Array.isArray(arr) ? arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) : []
  } catch {
    return []
  }
}

export function getPayoutRequest(id: string): PayoutRequest | undefined {
  return listPayoutRequests().find((r) => r.id === id)
}

function saveAll(requests: PayoutRequest[]) {
  localStorage.setItem(KEY, JSON.stringify(requests))
}

export function submitPayoutRequest(input: Omit<PayoutRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): PayoutRequest {
  const now = new Date().toISOString()
  const req: PayoutRequest = {
    ...input,
    id: `PR-${Date.now().toString(36).toUpperCase()}`,
    status: 'submitted',
    createdAt: now,
    updatedAt: now,
  }
  saveAll([req, ...listPayoutRequests()])
  return req
}

/** Admin connects the Lipa Haraka channel_id to this creator's route. */
export function connectChannel(id: string, channelId: string): PayoutRequest | undefined {
  const all = listPayoutRequests()
  const req = all.find((r) => r.id === id)
  if (!req) return undefined
  const next: PayoutRequest = { ...req, channelId, status: 'connected', updatedAt: new Date().toISOString() }
  saveAll(all.map((r) => (r.id === id ? next : r)))
  return next
}

/** Admin ran a test payout through the channel — works. */
export function markTested(id: string): PayoutRequest | undefined {
  const all = listPayoutRequests()
  const req = all.find((r) => r.id === id)
  if (!req) return undefined
  const next: PayoutRequest = { ...req, status: 'tested', updatedAt: new Date().toISOString() }
  saveAll(all.map((r) => (r.id === id ? next : r)))
  return next
}

/** "Everything is ready" — creator notified (email sent from admin). */
export function markReady(id: string): PayoutRequest | undefined {
  const all = listPayoutRequests()
  const req = all.find((r) => r.id === id)
  if (!req) return undefined
  const next: PayoutRequest = { ...req, status: 'ready', updatedAt: new Date().toISOString() }
  saveAll(all.map((r) => (r.id === id ? next : r)))
  return next
}

/** Remove a request entirely (e.g. a test/demo entry). */
export function deletePayoutRequest(id: string) {
  saveAll(listPayoutRequests().filter((r) => r.id !== id))
}

/** Clear ALL requests (admin cleanup). */
export function clearAllPayoutRequests() {
  saveAll([])
}
