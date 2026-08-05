import { useNavigate } from 'react-router-dom'
import { SignOut } from '@phosphor-icons/react'
import { logoutAdmin } from '../lib/adminAuth'

/**
 * Sign-out for the admin area. Clears the admin session
 * and lands back on /admin (the code entry screen).
 */
export default function LogoutButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => {
        logoutAdmin()
        navigate('/admin', { replace: true })
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs font-semibold text-steel transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      title="Sign out of admin"
    >
      <SignOut size={14} weight="bold" />
      Sign out
    </button>
  )
}
