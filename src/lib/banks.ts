/**
 * Major banks in Kenya (licensed commercial banks, CBK).
 * Used for bank payout setup — user picks from a searchable dropdown.
 * This is a static reference list, kept offline (no runtime dependency).
 *
 * Payout channels (Lipa Haraka model):
 * One merchant account can hold many API keys, each tied to a channel_id
 * that routes money through a specific bank. So `channel_id` is the payout
 * route identifier: creator → bank → channel_id → api_key.
 *
 * Field meaning (keep it accurate — this is financial reference data):
 *  - `name`  unique display name; banks are selected/searched by name.
 *  - `code`  (optional) the 3-digit beneficiary bank system code used by Kenya's
 *            EFT / PESALink rails (e.g. Equity = "068"). Only set verifiable
 *            values; omit rather than guess, so users never see a wrong code.
 *  - `channelId` unique Lipa Haraka route per bank (shown in the admin console).
 *
 * `assertBankIntegrity()` (below) fails fast in dev on duplicate name/code/channel.
 */
export type Bank = {
  name: string
  code?: string
  channelId?: number
}

export const kenyanBanks: Bank[] = [
  { name: 'Equity Bank', code: '068', channelId: 16 },
  { name: 'KCB Bank', code: '012', channelId: 17 },
  { name: 'Co-operative Bank', code: '011', channelId: 18 },
  { name: 'Absa Bank Kenya', code: '003', channelId: 19 },
  { name: 'Stanbic Bank', code: '031', channelId: 20 },
  { name: 'Standard Chartered Kenya', code: '002', channelId: 21 },
  { name: 'NCBA Bank', code: '067', channelId: 22 },
  { name: 'I&M Bank', code: '070', channelId: 23 },
  { name: 'Diamond Trust Bank (DTB)', code: '065', channelId: 24 },
  { name: 'Family Bank', code: '074', channelId: 25 },
  { name: 'Bank of Baroda', code: '006' },
  { name: 'Bank of India', code: '010' },
  { name: 'Citibank Kenya', code: '016' },
  { name: 'Prime Bank', code: '043' },
  { name: 'Sidian Bank', code: '072' },
  { name: 'Guaranty Trust Bank (GTBank)', code: '091' },
  { name: 'Bank of Africa Kenya', code: '019' },
  { name: 'Ecobank Kenya', code: '084' },
  { name: 'Housing Finance Bank', code: '047' },
  { name: 'Spire Bank', code: '076' },
  { name: 'Victoria Commercial Bank', code: '054' },
  { name: 'Mayfair CIB Bank', code: '092' },
  { name: 'Middle East Bank (MEB)', code: '030' },
  { name: 'Paramount Bank', code: '075' },
  { name: 'Consolidated Bank of Kenya (CBK)', code: '023' },
  { name: 'Credit Bank', code: '036' },
  { name: 'ABC Bank (African Banking Corp)', code: '035' },
  { name: 'First Community Bank', code: '080' },
  { name: 'UBA Kenya', code: '085' },
  { name: 'National Bank of Kenya', code: '018' },
  // code + name kept on one verified line below where possible; unverified codes
  // are omitted rather than guessed (SBM previously carried I&M's "070").
  { name: 'SBM Bank Kenya' },
  { name: 'Kingdom Bank', code: '078' },
  { name: 'CITC Bank (formerly Jamil Bora)', code: '026' },
  { name: 'Gulf African Bank', code: '097' },
  // Kenya Women Microfinance (KWFT): code unverified, so omitted rather than
  // reusing "070".
  { name: 'KWFT Bank' },
]

/** Fail loudly if the list is inconsistent: unique name, code, channel. */
export function assertBankIntegrity() {
  const issues: string[] = []
  const names = new Map<string, Bank>()
  const codes = new Map<string, Bank>()
  const channels = new Map<number, Bank>()

  for (const b of kenyanBanks) {
    const key = b.name.trim().toLowerCase()
    if (names.has(key)) issues.push(`duplicate bank name "${b.name}"`)
    else names.set(key, b)

    if (b.code) {
      if (codes.has(b.code)) issues.push(`duplicate bank code "${b.code}": ${codes.get(b.code)!.name} vs ${b.name}`)
      else codes.set(b.code, b)
    }

    if (b.channelId != null) {
      if (channels.has(b.channelId)) issues.push(`duplicate channel id ${b.channelId}: ${channels.get(b.channelId)!.name} vs ${b.name}`)
      else channels.set(b.channelId, b)
    }
  }

  if (issues.length) throw new Error('Bank data integrity failed:\n  - ' + issues.join('\n  - '))
}

// Fail fast during local dev (never in the production bundle).
if (import.meta.env?.DEV) assertBankIntegrity()

/** Simple fuzzy-ish search: matches substring across the full name. */
export function searchBanks(q: string): Bank[] {
  const query = q.trim().toLowerCase()
  if (!query) return kenyanBanks
  return kenyanBanks.filter((b) => b.name.toLowerCase().includes(query))
}
