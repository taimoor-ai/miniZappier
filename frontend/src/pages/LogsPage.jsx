import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAutomations, useLogs } from "../hooks/useAutomations";
import { formatDateTime } from "../utils/format";

const LogsPage = () => {
  const { data: logs = [], isLoading } = useLogs();
  const { data: automations = [] } = useAutomations();
  const [statusFilter, setStatusFilter] = useState("all");
  const [automationFilter, setAutomationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(
    () =>
      logs.filter((log) => {
        const automationId = typeof log.automationId === "string" ? log.automationId : log.automationId._id;
        const createdDate = new Date(log.createdAt).toISOString().slice(0, 10);
        return (
          (statusFilter === "all" || log.status === statusFilter) &&
          (automationFilter === "all" || automationId === automationFilter) &&
          (!dateFilter || createdDate === dateFilter)
        );
      }),
    [logs, statusFilter, automationFilter, dateFilter]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">Execution logs</h2>
        <p className="text-sm text-slate-500">Track workflow outcomes and inspect payload data.</p>
      </div>

      <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-soft md:grid-cols-3">
        <select
          className="rounded-xl border p-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
        <select
          className="rounded-xl border p-3"
          value={automationFilter}
          onChange={(e) => setAutomationFilter(e.target.value)}
        >
          <option value="all">All automations</option>
          {automations.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="rounded-xl border p-3"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="rounded-2xl bg-white shadow-soft">
        {isLoading ? (
          <div className="h-40 animate-pulse rounded-2xl bg-white" />
        ) : !filtered.length ? (
          <div className="p-10 text-center text-sm text-slate-500">No logs match current filters.</div>
        ) : (
          <div className="divide-y">
            {filtered.map((log) => (
              <div key={log._id} className="p-4">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setExpandedId((prev) => (prev === log._id ? null : log._id))}
                >
                  <div>
                    <p className="font-medium">
                      {typeof log.automationId === "string" ? "Automation" : log.automationId.name}
                    </p>
                    <p className="text-xs text-slate-500">{formatDateTime(log.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={log.status === "success" ? "text-emerald-600" : "text-red-600"}>
                      {log.status}
                    </span>
                    {expandedId === log._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                {expandedId === log._id && (
                  <div className="mt-3 rounded-xl bg-slate-100 p-3">
                    <pre className="overflow-auto text-xs">{JSON.stringify(log.payload, null, 2)}</pre>
                    {log.error && <p className="mt-2 text-xs text-red-600">Error: {log.error}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LogsPage;
