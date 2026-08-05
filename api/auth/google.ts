import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildAuthUrl } from '../_lib/google.js'
import { STATE_COOKIE, randomState, serializeCookie } from '../_lib/session.js'

/** GET /api/auth/google — start the OAuth dance: set state cookie, 302 to Google. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  const state = randomState()
  res.setHeader('Set-Cookie', serializeCookie(STATE_COOKIE, state, 600))
  return res.redirect(302, buildAuthUrl(state))
}
