import { useEffect, useCallback } from 'react'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

/**
 * AuthModal
 * Props:
 *   mode     — 'login' | 'register' | null
 *   onClose  — () => void
 *   onSwitch — (newMode) => void
 */
export default function AuthModal({ mode, onClose, onSwitch }) {
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )

  useEffect(() => {
    if (!mode) return
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [mode, handleKey])

  if (!mode) return null

  return (
    <>
      {/* Blurred backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40 backdrop-blur-md bg-black/50"
      />

      {/* Scrollable modal container — handles small screens with many fields */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'login' ? 'Sign in' : 'Create account'}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-sm sm:max-w-md animate-in fade-in zoom-in-95 duration-200">
            {mode === 'login' ? (
              <LoginPage
                onClose={onClose}
                onSwitchToRegister={() => onSwitch('register')}
              />
            ) : (
              <RegisterPage
                onClose={onClose}
                onSwitchToLogin={() => onSwitch('login')}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}