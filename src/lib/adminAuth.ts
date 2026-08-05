/**
 * Admin auth — 6-digit code entry.
 *
 * There's no backend yet: the code is accepted, the session is stored in
 * localStorage, and it will be wired to an authenticator app (TOTP) later.
 * For now, any 6-digit code works, and the "Admin preview" button on the
 * login screen lets us test the whole flow end-to-end like production.
 */

const SESSION_KEY = 'vektra.adminSession'
const ADMIN_CODE = '123456'

export function isAdminAuthed(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(SESSION_KEY) === '1'
}

/** Verify a 6-digit code. Returns an error message, or null on success. */
export function verifyAdminCode(code: string): string | null {
  const digits = code.replace(/\D/g, '')
  if (digits.length !== 6) {
    return 'Enter the 6-digit code from your authenticator app.'
  }
  if (digits !== ADMIN_CODE) {
    return "That code isn't right — try again."
  }
  localStorage.setItem(SESSION_KEY, '1')
  return null
}

export function logoutAdmin() {
  localStorage.removeItem(SESSION_KEY)
}
