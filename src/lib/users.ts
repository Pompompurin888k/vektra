/**
 * Mock users for preview/demo mode.
 * There's no backend yet — these let us test the app end-to-end like it's
 * production: pick a creator on the login screen and land in their dashboard.
 */
export type MockUser = {
  id: string
  name: string
  handle: string
  plan: 'Starter' | 'Pro'
  initials: string
  gradient: string
  tagline: string
  // dashboard data
  totalEarned: number
  thisMonth: number
  supporters: number
  avgTip: number
  withdrawable: number
  transactions: {
    id: string
    name: string
    amount: number
    note: string
    date: string
    method: string
  }[]
  weekly: { day: string; value: number }[]
}

export const previewUsers: MockUser[] = [
  {
    id: 'amara',
    name: 'Amara',
    handle: 'amara',
    plan: 'Pro',
    initials: 'A',
    gradient: 'from-vektra-400 to-vektra-600',
    tagline: 'Filmmaker · Nairobi',
    totalEarned: 184_500,
    thisMonth: 32_900,
    supporters: 1_284,
    avgTip: 214,
    withdrawable: 152_800,
    transactions: [
      { id: 'VK-10241', name: 'Wanjiku', amount: 500, note: 'Keep the edits coming', date: '2026-08-03T14:32:00', method: 'M-Pesa' },
      { id: 'VK-10240', name: 'Brian', amount: 200, note: 'Support', date: '2026-08-03T11:07:00', method: 'M-Pesa' },
      { id: 'VK-10239', name: 'Otieno', amount: 1000, note: 'Go for the 1M', date: '2026-08-02T20:45:00', method: 'M-Pesa' },
      { id: 'VK-10238', name: 'Achieng', amount: 250, note: 'Tip', date: '2026-08-02T09:12:00', method: 'M-Pesa' },
      { id: 'VK-10237', name: 'Sam', amount: 750, note: 'Legend', date: '2026-08-01T18:03:00', method: 'M-Pesa' },
      { id: 'VK-10236', name: 'Njeri', amount: 400, note: 'Support', date: '2026-07-31T16:40:00', method: 'M-Pesa' },
      { id: 'VK-10235', name: 'David', amount: 2000, note: 'Huge fan', date: '2026-07-30T10:22:00', method: 'M-Pesa' },
      { id: 'VK-10234', name: 'Zawadi', amount: 300, note: 'Keep grinding', date: '2026-07-29T13:55:00', method: 'M-Pesa' },
    ],
    weekly: [
      { day: 'Mon', value: 4200 },
      { day: 'Tue', value: 6100 },
      { day: 'Wed', value: 3800 },
      { day: 'Thu', value: 8900 },
      { day: 'Fri', value: 11300 },
      { day: 'Sat', value: 17400 },
      { day: 'Sun', value: 9600 },
    ],
  },
  {
    id: 'kip',
    name: 'Kip',
    handle: 'kip',
    plan: 'Pro',
    initials: 'K',
    gradient: 'from-sky-400 to-indigo-600',
    tagline: 'Podcaster · Mombasa',
    totalEarned: 96_200,
    thisMonth: 18_400,
    supporters: 742,
    avgTip: 185,
    withdrawable: 61_700,
    transactions: [
      { id: 'VK-9871', name: 'Njoki', amount: 300, note: 'Love the stories', date: '2026-08-03T16:20:00', method: 'M-Pesa' },
      { id: 'VK-9870', name: 'Farid', amount: 1500, note: 'Keep interviewing', date: '2026-08-03T09:45:00', method: 'M-Pesa' },
      { id: 'VK-9869', name: 'Amina', amount: 200, note: 'Support', date: '2026-08-02T21:10:00', method: 'M-Pesa' },
      { id: 'VK-9868', name: 'Collins', amount: 450, note: 'Great episode', date: '2026-08-02T12:33:00', method: 'M-Pesa' },
      { id: 'VK-9867', name: 'Diana', amount: 1000, note: 'More Kip please', date: '2026-08-01T19:08:00', method: 'M-Pesa' },
    ],
    weekly: [
      { day: 'Mon', value: 2100 },
      { day: 'Tue', value: 3300 },
      { day: 'Wed', value: 1800 },
      { day: 'Thu', value: 4600 },
      { day: 'Fri', value: 6200 },
      { day: 'Sat', value: 8900 },
      { day: 'Sun', value: 5400 },
    ],
  },
  {
    id: 'zawadi',
    name: 'Zawadi',
    handle: 'zawadi',
    plan: 'Starter',
    initials: 'Z',
    gradient: 'from-rose-400 to-pink-600',
    tagline: 'Musician · Kisumu',
    totalEarned: 41_300,
    thisMonth: 9_800,
    supporters: 356,
    avgTip: 160,
    withdrawable: 22_500,
    transactions: [
      { id: 'VK-7741', name: 'Moraa', amount: 500, note: 'Your voice!', date: '2026-08-03T15:02:00', method: 'M-Pesa' },
      { id: 'VK-7740', name: 'John', amount: 250, note: 'New single is fire', date: '2026-08-02T22:47:00', method: 'M-Pesa' },
      { id: 'VK-7739', name: 'Sofia', amount: 1000, note: 'Keep singing', date: '2026-08-02T08:15:00', method: 'M-Pesa' },
      { id: 'VK-7738', name: 'Mike', amount: 150, note: 'Tip', date: '2026-08-01T17:30:00', method: 'M-Pesa' },
      { id: 'VK-7737', name: 'Purity', amount: 800, note: 'Streaming on repeat', date: '2026-07-31T20:12:00', method: 'M-Pesa' },
    ],
    weekly: [
      { day: 'Mon', value: 900 },
      { day: 'Tue', value: 1600 },
      { day: 'Wed', value: 2400 },
      { day: 'Thu', value: 1100 },
      { day: 'Fri', value: 2800 },
      { day: 'Sat', value: 3900 },
      { day: 'Sun', value: 2100 },
    ],
  },
  {
    id: 'otieno',
    name: 'Otieno',
    handle: 'otieno',
    plan: 'Pro',
    initials: 'O',
    gradient: 'from-emerald-400 to-teal-600',
    tagline: 'Streamer · Eldoret',
    totalEarned: 212_900,
    thisMonth: 41_200,
    supporters: 1_910,
    avgTip: 245,
    withdrawable: 178_400,
    transactions: [
      { id: 'VK-11501', name: 'Baraka', amount: 2000, note: 'GG!', date: '2026-08-03T18:21:00', method: 'M-Pesa' },
      { id: 'VK-11500', name: 'Winnie', amount: 350, note: 'Best streamer KE', date: '2026-08-03T13:40:00', method: 'M-Pesa' },
      { id: 'VK-11499', name: 'Tunde', amount: 1200, note: 'Clutch moment', date: '2026-08-02T23:55:00', method: 'M-Pesa' },
      { id: 'VK-11498', name: 'Faith', amount: 500, note: 'Support', date: '2026-08-02T10:27:00', method: 'M-Pesa' },
      { id: 'VK-11497', name: 'Gideon', amount: 800, note: 'Sub or tip? Both', date: '2026-08-01T21:49:00', method: 'M-Pesa' },
      { id: 'VK-11496', name: 'Lucy', amount: 150, note: 'Tip', date: '2026-08-01T07:38:00', method: 'M-Pesa' },
    ],
    weekly: [
      { day: 'Mon', value: 5200 },
      { day: 'Tue', value: 7100 },
      { day: 'Wed', value: 9400 },
      { day: 'Thu', value: 6800 },
      { day: 'Fri', value: 12100 },
      { day: 'Sat', value: 19800 },
      { day: 'Sun', value: 14600 },
    ],
  },
  {
    id: 'njeri',
    name: 'Njeri',
    handle: 'njeri',
    plan: 'Starter',
    initials: 'N',
    gradient: 'from-violet-400 to-purple-600',
    tagline: 'Educator · Nakuru',
    totalEarned: 58_600,
    thisMonth: 12_300,
    supporters: 468,
    avgTip: 175,
    withdrawable: 33_900,
    transactions: [
      { id: 'VK-6631', name: 'Karanja', amount: 400, note: 'Your lessons help', date: '2026-08-03T12:18:00', method: 'M-Pesa' },
      { id: 'VK-6630', name: 'Mary', amount: 300, note: 'Support', date: '2026-08-02T19:42:00', method: 'M-Pesa' },
      { id: 'VK-6629', name: 'Ben', amount: 1000, note: 'Keep teaching', date: '2026-08-02T06:55:00', method: 'M-Pesa' },
      { id: 'VK-6628', name: 'Grace', amount: 200, note: 'Tip', date: '2026-08-01T15:26:00', method: 'M-Pesa' },
      { id: 'VK-6627', name: 'Paul', amount: 600, note: 'Great content', date: '2026-07-31T23:04:00', method: 'M-Pesa' },
    ],
    weekly: [
      { day: 'Mon', value: 1400 },
      { day: 'Tue', value: 2100 },
      { day: 'Wed', value: 1200 },
      { day: 'Thu', value: 2500 },
      { day: 'Fri', value: 3100 },
      { day: 'Sat', value: 4600 },
      { day: 'Sun', value: 2400 },
    ],
  },
]

/** Store the id of the preview user to impersonate. */
export function setPreviewUser(id: string) {
  if (typeof window !== 'undefined') localStorage.setItem('vektra.previewUser', id)
}

export function getPreviewUser(): MockUser {
  const id = typeof window !== 'undefined' ? localStorage.getItem('vektra.previewUser') : null
  return previewUsers.find((u) => u.id === id) ?? previewUsers[0]
}
