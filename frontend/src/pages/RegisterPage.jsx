import { useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'

export default function RegisterPage({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isModal = !!onClose

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)
    try {
      console.log('Register attempt:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Registration successful')
      onClose?.()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = () => console.log('Google sign-up initiated')

  const handleSignIn = () => {
    if (onSwitchToLogin) onSwitchToLogin()
  }

  const cardContent = (
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 relative">

        {/* Close button — only in modal mode */}
        {isModal && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 z-50"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-700 transition-colors" strokeWidth={2.5} />
          </button>
        )}

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="text-sm text-gray-500 mt-1">Get started for free today</p>
        </div>

        {/* Google Sign-Up Button */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="reg-name" className="block text-xs font-bold uppercase text-gray-600 tracking-wider">
              Full Name
            </label>
            <input
              id="reg-name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all duration-200 text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="reg-email" className="block text-xs font-bold uppercase text-gray-600 tracking-wider">
              Email
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all duration-200 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="reg-password" className="block text-xs font-bold uppercase text-gray-600 tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all duration-200 text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showPassword
                  ? <EyeOff className="w-4 h-4" strokeWidth={2} />
                  : <Eye className="w-4 h-4" strokeWidth={2} />
                }
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="reg-confirm" className="block text-xs font-bold uppercase text-gray-600 tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="reg-confirm"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all duration-200 text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showConfirm
                  ? <EyeOff className="w-4 h-4" strokeWidth={2} />
                  : <Eye className="w-4 h-4" strokeWidth={2} />
                }
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2 text-sm shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creating account...
              </span>
            ) : 'Create account'}
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-400 text-center mt-4">
          By creating an account, you agree to our{' '}
          <button className="text-black hover:text-gray-600 font-bold transition-colors">Terms</button>
          {' '}and{' '}
          <button className="text-black hover:text-gray-600 font-bold transition-colors">Privacy Policy</button>
        </p>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center pt-3 border-t border-gray-100 mt-3">
          Already have an account?{' '}
          <button
            type="button"
            onClick={handleSignIn}
            className="text-black hover:text-gray-600 font-bold transition-colors duration-200"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )

  // Standalone page mode
  if (!isModal) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gray-50">
        {cardContent}
      </main>
    )
  }

  // Modal mode — AuthModal handles backdrop
  return <div className="relative w-full max-w-sm sm:max-w-md">{cardContent}</div>
}