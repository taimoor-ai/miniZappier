import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthActions } from "../hooks/useAuth";

const AnimatedAutomationBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.10; }
          50% { transform: translateY(-20px) rotate(3deg); opacity: 0.22; }
        }
        .automation-icon {
          animation: float-icon 5s ease-in-out infinite;
          font-size: 2rem;
          position: absolute;
          filter: grayscale(1);
        }
      `}</style>

      <div className="automation-icon" style={{ left: "8%",  top: "12%", animationDelay: "0s"    }}>⚙️</div>
      <div className="automation-icon" style={{ left: "78%", top: "16%", animationDelay: "0.3s", fontSize: "1.4rem" }}>→</div>
      <div className="automation-icon" style={{ left: "12%", top: "72%", animationDelay: "0.6s"  }}>⚡</div>
      <div className="automation-icon" style={{ left: "82%", top: "74%", animationDelay: "0.9s", fontSize: "1.4rem" }}>✓</div>
      <div className="automation-icon" style={{ left: "70%", top: "45%", animationDelay: "0.15s" }}>🔄</div>
      <div className="automation-icon" style={{ left: "6%",  top: "44%", animationDelay: "0.45s", fontSize: "1.2rem" }}>▶</div>
    </div>
  );
};

const RegisterPage = () => {
  const { registerMutation } = useAuthActions();

  const [name, setName]                     = useState("");
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]     = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree]                   = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");
    registerMutation.mutate({ name, email, password });
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-white font-sans relative">

      {/* Brand — top left */}
      <div className="absolute top-5 left-6 z-10 text-xl font-bold text-black tracking-tight">
        Nexus<span className="text-gray-400">.</span>
      </div>

      {/* Animated background */}
      <AnimatedAutomationBackground />

      {/* Centered form card */}
      <div className="relative z-10 w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-7 mx-4">

        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-black mb-1">Create account</h2>
          <p className="text-sm text-gray-500">Fill in your details to get started</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wide">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Taimoor Arshad"
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2.5 pr-14 text-sm text-black placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wide">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter your password"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2.5 pr-14 text-sm text-black placeholder-gray-400 outline-none focus:border-black focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer pt-0.5" onClick={() => setAgree(!agree)}>
            <div
              className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                agree ? "bg-black border-black" : "bg-white border-gray-300"
              }`}
            >
              {agree && (
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-600 leading-relaxed select-none">
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={registerMutation.isPending || !agree}
            className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-2.5 text-sm transition-all shadow-sm hover:shadow-md"
          >
            {registerMutation.isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Social buttons — no divider */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <button
            type="button"
            title="Sign up with Google"
            className="bg-white border-2 border-gray-200 hover:border-black hover:bg-gray-50 rounded-xl py-2.5 flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1f2937"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#1f2937"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#1f2937"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#1f2937"/>
            </svg>
          </button>
          <button
            type="button"
            title="Sign up with GitHub"
            className="bg-white border-2 border-gray-200 hover:border-black hover:bg-gray-50 rounded-xl py-2.5 flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1f2937">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </button>
          <button
            type="button"
            title="Sign up with X"
            className="bg-white border-2 border-gray-200 hover:border-black hover:bg-gray-50 rounded-xl py-2.5 flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1f2937">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-black hover:text-gray-700 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;