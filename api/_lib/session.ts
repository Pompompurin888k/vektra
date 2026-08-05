import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Server-only env access. VITE_* vars are never used here — these live in
 * Vercel project env vars and are injected at runtime.
 */
export function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

export const SESSION_COOKIE = 'vektra_session'
export const STATE_COOKIE = 'vektra_oauth_state'
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

export type SessionUser = {
  sub: string
  email: string
  name: string
  picture?: string
}

type SessionPayload = SessionUser & { exp: number }

function hmac(payload: string): string {
  return createHmac('sha256', getEnv('SESSION_SECRET')).update(payload).digest('base64url')
}

/** Sign a payload into `base64url(json).base64url(hmac)` — a "poor man's JWT". */
export function signSession(user: SessionUser): string {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${hmac(body)}`
}

/** Verify signature + expiry. Returns the user or null. */
export function verifySession(token: string | null | undefined): SessionUser | null {
  if (!token) return null
  const dot = token.lastIndexOf('.')
  if (dot <= 0) return null
  const body = token.slice(0, dot)
  const sig = token.slice(dot + 1)

  const expected = Buffer.from(hmac(body))
  const actual = Buffer.from(sig)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as SessionPayload
    if (typeof payload.exp !== 'number' || payload.exp < Date.now() / 1000) return null
    const { exp: _exp, ...user } = payload
    return user
  } catch {
    return null
  }
}

export function readCookie(header: string | null, name: string): string | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=') || null
  }
  return null
}

/** Build a Set-Cookie value. Secure only in production. */
export function serializeCookie(name: string, value: string, maxAgeSeconds: number): string {
  const isProd = process.env.VERCEL_ENV === 'production'
  const secure = isProd ? '; Secure' : ''
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`
}

export function clearCookie(name: string): string {
  return serializeCookie(name, '', 0)
}

export function randomState(): string {
  return randomBytes(32).toString('hex')
}
