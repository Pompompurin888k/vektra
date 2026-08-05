import type { VercelRequest, VercelResponse } from '@vercel/node'
import { exchangeCodeForUser } from '../_lib/google.ts'
import {
  SESSION_COOKIE,
  STATE_COOKIE,
  clearCookie,
  readCookie,
  serializeCookie,
  signSession,
} from '../_lib/session.ts'

/** GET /api/auth/callback — Google's redirect target. Exchange code, set session, go to /dashboard. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, state, error } = req.query

  if (error) {
    return res.redirect(302, `/login?error=${encodeURIComponent(String(error))}`)
  }
  if (typeof code !== 'string' || typeof state !== 'string') {
    return res.status(400).json({ error: 'missing_code_or_state' })
  }

  const storedState = readCookie(req.headers.cookie ?? null, STATE_COOKIE)
  if (!storedState || storedState !== state) {
    return res.status(400).json({ error: 'invalid_state' })
  }

  try {
    const user = await exchangeCodeForUser(code)
    const session = signSession(user)

    res.setHeader('Set-Cookie', [
      serializeCookie(SESSION_COOKIE, session, 60 * 60 * 24 * 30),
      clearCookie(STATE_COOKIE),
    ])
    return res.redirect(302, '/dashboard')
  } catch (err) {
    return res.status(500).json({ error: 'auth_exchange_failed', detail: String(err) })
  }
}
