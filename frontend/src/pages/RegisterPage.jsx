import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuthActions } from "../hooks/useAuth";

const RegisterPage = () => {
  const { registerMutation } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    registerMutation.mutate({ name, email, password });
  };

  return (
    <AuthShell title="Create account" subtitle="Start building automations in minutes.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white/80 p-3"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          placeholder="Password (min 6 characters)"
          type="password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full rounded-xl bg-brand-600 p-3 font-medium text-white transition hover:bg-brand-700 disabled:opacity-70"
          disabled={registerMutation.isPending}
          type="submit"
        >
          {registerMutation.isPending ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link className="text-brand-700 hover:underline" to="/login">
          Login
        </Link>
      </p>
    </AuthShell>
  );
};

export default RegisterPage;
