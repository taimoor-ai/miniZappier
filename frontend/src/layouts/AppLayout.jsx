import { motion } from "framer-motion";
import { Home, LogOut, Logs, PlusCircle, Workflow } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/automations/new", icon: PlusCircle, label: "Create Automation" },
  { to: "/logs", icon: Logs, label: "Execution Logs" },
];

const AppLayout = () => {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="glass border-r border-white/50 p-6">
          <div className="mb-10 flex items-center gap-2">
            <Workflow className="text-brand-600" />
            <h1 className="text-lg font-semibold">Mini Zapier</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-200"
                  }`
                }
              >
                <item.icon size={17} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="p-4 md:p-8">
          <header className="mb-8 flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft">
            <div>
              <p className="text-xs uppercase text-slate-400">Signed in as</p>
              <p className="font-semibold text-slate-800">{user?.name || "User"}</p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
              onClick={() => {
                clearAuth();
                navigate("/login");
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </header>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
