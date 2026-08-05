/**
 * Google OAuth client helpers. The OAuth dance happens server-side:
 *   loginWithGoogle()  → redirect to /api/auth/google
 *   getSession()       → GET /api/auth/me (reads the httpOnly session cookie)
 *   logout()           → POST /api/auth/logout (clears the cookie)
 */
export type SessionUser = {
  sub: string
  email: string
  name: string
  picture?: string
}

export type Session = { authenticated: boolean; user?: SessionUser }

export function loginWithGoogle() {
  window.location.assign('/api/auth/google')
}

export async function getSession(): Promise<Session> {
  try {
    const res = await fetch('/api/auth/me')
    if (!res.ok) return { authenticated: false }
    return (await res.json()) as Session
  } catch {
    return { authenticated: false }
  }
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' })
}
