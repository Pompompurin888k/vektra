/**
 * Major banks in Kenya (licensed commercial banks, CBK).
 * Used for bank payout setup — user picks from a searchable dropdown.
 * This is a static reference list, kept offline (no runtime dependency).
 *
 * Payout channels (Lipa Haraka model):
 * One merchant account can hold many API keys, each tied to a channel_id
 * that routes money through a specific bank. So `channel_id` is the payout
 * route identifier: creator → bank → channel_id → api_key.
 */
export const kenyanBanks: { name: string; code: string; channelId?: number }[] = [
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
  { name: 'SBM Bank Kenya', code: '070' },
  { name: 'Kingdom Bank', code: '078' },
  { name: 'CITC Bank (formerly Jamil Bora)', code: '026' },
  { name: 'Gulf African Bank', code: '097' },
  { name: 'Jamii Bank', code: '070' },
  { name: 'KWFT Bank', code: '070' },
  { name: 'KCB M-Pesa (mini-app)', code: '012' },
]

/** Simple fuzzy-ish search: matches substring across the full name. */
export function searchBanks(q: string): { name: string; code: string; channelId?: number }[] {
  const query = q.trim().toLowerCase()
  if (!query) return kenyanBanks
  return kenyanBanks.filter((b) => b.name.toLowerCase().includes(query))
}
