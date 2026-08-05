import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESSION_COOKIE, readCookie, verifySession } from '../_lib/session.js'

/** GET /api/auth/me — return the session (or authenticated: false). */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const token = readCookie(req.headers.cookie ?? null, SESSION_COOKIE)
  const user = verifySession(token)
  if (!user) return res.json({ authenticated: false })
  return res.json({ authenticated: true, user })
}
