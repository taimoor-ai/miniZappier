import { useState, useEffect } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { useAuthStore } from "../store/authStore"; // adjust path if needed
export default function LoginPage({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
 const setAuth = useAuthStore((state) => state.setAuth);
  const isModal = !!onClose
 console.log(import.meta.env);
  //////////////////////////////////////////////////////
  // 🔥 GOOGLE INIT
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:  import.meta.env.VITE_GOOGLE_CLIENT_ID, // 🔴 replace this
        callback: handleGoogleResponse,
      });
    }
  }, []);

  //////////////////////////////////////////////////////
  // 🔥 GOOGLE RESPONSE HANDLER
  //////////////////////////////////////////////////////
  const handleGoogleResponse = async (response) => {
  try {
    const token = response.credential;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Google login failed");
    }

    // 🔥 Zustand store
    setAuth(data.token, data.user);

    onClose?.();
  } catch (err) {
    console.error(err);
    setError("Google login failed");
  }
};

  //////////////////////////////////////////////////////
  // 🔥 BUTTON CLICK HANDLER
  //////////////////////////////////////////////////////
  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // 🔥 opens popup
    } else {
      setError("Google SDK not loaded");
    }
  };

  //////////////////////////////////////////////////////
  // 🔐 EMAIL LOGIN
  //////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // 🔥 Zustand store
    setAuth(data.token, data.user);

    onClose?.();
  } catch (err) {
    setError(err.message || "Invalid email or password")
  } finally {
    setIsLoading(false)
  }
};

  const handleSSO = () => console.log('SSO initiated')
  const handleResetPassword = () => console.log('Reset password initiated')

  const handleCreateAccount = () => {
    if (onSwitchToRegister) onSwitchToRegister()
  }

  const cardContent = (
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 relative">

        {/* Close button */}
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue</p>
        </div>

        {/* 🔥 Google Button */}
        <button
          onClick={handleGoogleSignIn}
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

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-gray-600">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2.5 bg-black text-white rounded-lg"
          >
            {isLoading ? "Signing in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  )

  if (!isModal) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        {cardContent}
      </main>
    )
  }

  return <div>{cardContent}</div>
}