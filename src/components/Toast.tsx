import { useEffect, useState } from 'react'
import { WarningCircle, X } from '@phosphor-icons/react'

type ToastProps = {
  /** Message to show. null hides the toast. */
  message: string | null
  /** Called after the toast has faded out. */
  onDismiss: () => void
}

/**
 * Top-center toast. Slides down and fades in, auto-dismisses after ~3s,
 * then fades out smoothly before the parent clears the message.
 */
export default function Toast({ message, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!message) {
      setVisible(false)
      return
    }
    // Next frame so the enter transition actually plays
    const raf = requestAnimationFrame(() => setVisible(true))
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 300)
    }, 3000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hide)
    }
  }, [message, onDismiss])

  if (!message) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-[60] flex justify-center px-4">
      <div
        role="status"
        className={`pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-hairline bg-surface py-3 pl-3 pr-2 shadow-float transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
        }`}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
          <WarningCircle size={17} weight="bold" />
        </span>
        <p className="text-sm font-medium leading-snug text-ink">{message}</p>
        <button
          onClick={() => {
            setVisible(false)
            setTimeout(onDismiss, 300)
          }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink"
          aria-label="Dismiss"
        >
          <X size={14} weight="bold" />
        </button>
      </div>
    </div>
  )
}
