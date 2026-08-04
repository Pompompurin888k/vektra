import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { LogoMark } from './Logo'

const links = [
  { label: 'For creators', href: '/#creators' },
  { label: 'How it works', href: '/#how' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="text-lg font-bold tracking-tight text-ink">Vektra</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel">
              The buy-me-a-coffee built natively for Kenya. Instant M-Pesa tips
              for creators — in under ten seconds, no cards, no friction.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs font-medium text-steel">
              <span className="h-1.5 w-1.5 rounded-full bg-vektra-500" />
              Kenya · M-Pesa · Live
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Product
            </p>
            <ul className="mt-4 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-steel transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@vektra.me"
                  className="text-sm text-steel transition-colors hover:text-ink"
                >
                  hello@vektra.me
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-steel transition-colors hover:text-ink"
                >
                  Nairobi, Kenya
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-steel transition-colors hover:text-ink"
                >
                  Documentation
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Viral watermark — references from the GTM strategy */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Vektra Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Powered by Vektra —{' '}
            <a
              href="#creators"
              className="font-medium text-vektra-700 underline-offset-2 hover:underline"
            >
              Are you a creator? Start receiving instant M-Pesa tips today.
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}