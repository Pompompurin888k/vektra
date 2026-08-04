/** Format a number as Kenyan Shillings. */
export function ksh(amount: number): string {
  return (
    'KES ' +
    amount.toLocaleString('en-KE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  )
}

/** Compact KES for dashboard chips, e.g. KES 12.4K */
export function kshCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return 'KES ' + (amount / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (Math.abs(amount) >= 1_000) {
    return 'KES ' + (amount / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return 'KES ' + amount
}

/** Format a timestamp to a short, human-readable date. */
export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
  })
}

/** Format a timestamp to a short time, e.g. 14:32 */
export function shortTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-KE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}