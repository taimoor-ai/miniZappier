import { motion } from "framer-motion";
import { Workflow } from "lucide-react";

const AuthShell = ({ title, subtitle, children }) => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-brand-700 p-4">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass w-full max-w-md rounded-2xl p-8"
    >
      <div className="mb-8 flex items-center gap-3">
        <Workflow className="text-brand-700" />
        <span className="font-semibold text-slate-800">Mini Zapier</span>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </motion.div>
  </div>
);

export default AuthShell;
