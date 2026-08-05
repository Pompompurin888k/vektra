import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESSION_COOKIE, clearCookie } from '../_lib/session.ts'

/** POST /api/auth/logout — clear the session cookie. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', clearCookie(SESSION_COOKIE))
  return res.json({ ok: true })
}
