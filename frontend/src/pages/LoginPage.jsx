import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuthActions } from "../hooks/useAuth";

const LoginPage = () => {
  const { loginMutation } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to manage your workflow automations.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white/80 p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-xl border border-slate-200 bg-white/80 p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full rounded-xl bg-brand-600 p-3 font-medium text-white transition hover:bg-brand-700 disabled:opacity-70"
          disabled={loginMutation.isPending}
          type="submit"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        New here?{" "}
        <Link className="text-brand-700 hover:underline" to="/register">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
};

export default LoginPage;
