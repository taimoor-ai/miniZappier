import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Search } from "lucide-react";
import { useAutomations, useLogs } from "../hooks/useAutomations";

const DashboardPage = () => {
  const { data: automations = [], isLoading } = useAutomations();
  const { data: logs = [] } = useLogs();
  const [search, setSearch] = useState("");

  const lastStatusMap = useMemo(() => {
    const map = new Map();
    for (const log of logs) {
      const automationId =
        typeof log.automationId === "string" ? log.automationId : log.automationId._id;
      if (!map.has(automationId)) {
        map.set(automationId, log.status);
      }
    }
    return map;
  }, [logs]);

  const filtered = automations
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(b.isActive) - Number(a.isActive));

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Automations</h2>
          <p className="text-sm text-slate-500">Monitor and manage workflow executions.</p>
        </div>
        <Link
          className="rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white"
          to="/automations/new"
        >
          Create Automation
        </Link>
      </div>

      <div className="glass flex items-center gap-3 rounded-xl p-3">
        <Search size={16} className="text-slate-400" />
        <input
          className="w-full bg-transparent text-sm outline-none"
          placeholder="Search automations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-white shadow-soft" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-soft">
          <p className="text-slate-600">No automations found.</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((automation) => (
            <Link
              key={automation._id}
              to={`/automation/${automation._id}`}
              className="rounded-2xl bg-white p-5 shadow-soft"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{automation.name}</h3>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    automation.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {automation.isActive ? "Active" : "Paused"}
                </span>
              </div>
              <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <p>Conditions: {automation.conditions?.length ?? 0}</p>
                <p>Actions: {automation.actions?.length ?? 0}</p>
                <p className="truncate sm:col-span-2">Webhook: {automation.webhookUrl ?? "N/A"}</p>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
                <Activity size={14} />
                Last execution: {lastStatusMap.get(automation._id) ?? "No runs yet"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
