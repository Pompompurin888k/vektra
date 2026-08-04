type LogoProps = {
  className?: string
  /** When true, render the wordmark next to the mark. */
  wordmark?: boolean
  /** When true, render the mark dark (for light backgrounds). */
  dark?: boolean
}

/**
 * The Vektra mark — a stylised "V" doubling as a lightning bolt / rising
 * pulse. It reads as "instant money moving forward" (the 10-second tip).
 */
export function LogoMark({
  className = 'h-9 w-9',
  dark = false,
}: {
  className?: string
  dark?: boolean
}) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vkt-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fb923c" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect
        width="40"
        height="40"
        rx="12"
        fill={dark ? 'url(#vkt-grad)' : '#18181b'}
      />
      {/* V / bolt — the rising tip */}
      <path
        d="M13 27 20 11 27 27"
        stroke={dark ? '#ffffff' : 'url(#vkt-grad)'}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* momentum tick */}
      <path
        d="M24 20.5 27 27H30"
        stroke={dark ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.5)'}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Logo({ className = '', wordmark = true, dark = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark dark={dark} />
      {wordmark && (
        <span className="text-[1.35rem] font-bold tracking-tight text-ink">
          Vektra
        </span>
      )}
    </span>
  )
}