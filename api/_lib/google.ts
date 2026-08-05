import { getEnv } from './session.js'

const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

/** Build the Google consent-screen URL. `state` guards against login CSRF. */
export function buildAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: getEnv('GOOGLE_CLIENT_ID'),
    redirect_uri: getEnv('GOOGLE_REDIRECT_URI'),
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
  })
  return `${AUTH_URL}?${params.toString()}`
}

export type GoogleUserInfo = {
  sub: string
  email: string
  name: string
  picture?: string
}

/** Exchange the authorization code for tokens, then fetch the profile. */
export async function exchangeCodeForUser(code: string): Promise<GoogleUserInfo> {
  const tokenRes = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: getEnv('GOOGLE_CLIENT_ID'),
      client_secret: getEnv('GOOGLE_CLIENT_SECRET'),
      code,
      grant_type: 'authorization_code',
      redirect_uri: getEnv('GOOGLE_REDIRECT_URI'),
    }),
  })

  if (!tokenRes.ok) {
    const body = await tokenRes.text()
    throw new Error(`Token exchange failed (${tokenRes.status}): ${body}`)
  }

  const tokens = (await tokenRes.json()) as { access_token: string }
  const userRes = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  })

  if (!userRes.ok) {
    throw new Error(`Userinfo fetch failed (${userRes.status})`)
  }

  const info = (await userRes.json()) as GoogleUserInfo
  if (!info.sub || !info.email) {
    throw new Error('Google profile missing sub/email')
  }
  return info
}
