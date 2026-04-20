import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Copy } from "lucide-react";
import { useAutomations, useLogs, useTriggerWebhook } from "../hooks/useAutomations";
import { formatDateTime } from "../utils/format";

const AutomationDetailsPage = () => {
  const { id } = useParams();
  const { data: automations = [], isLoading } = useAutomations();
  const { data: logs = [] } = useLogs();
  const triggerMutation = useTriggerWebhook();
  const [payloadText, setPayloadText] = useState('{"amount":1000,"event":"payment"}');

  const automation = useMemo(() => automations.find((item) => item._id === id), [automations, id]);
  const executionLogs = logs.filter((log) => {
    const automationId = typeof log.automationId === "string" ? log.automationId : log.automationId._id;
    return automationId === id;
  });

  if (isLoading) return <div className="h-40 animate-pulse rounded-2xl bg-white shadow-soft" />;
  if (!automation) return <div className="rounded-2xl bg-white p-8 shadow-soft">Automation not found.</div>;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">{automation.name}</h2>
        <p className="mt-1 text-sm text-slate-500">Created {formatDateTime(automation.createdAt)}</p>
        <div className="mt-4 grid gap-2 text-sm">
          <p>Trigger: {automation.trigger.type}</p>
          <p>Queue Status: Not exposed by backend API</p>
          <p className="inline-flex items-center gap-2">
            Webhook URL: <span className="font-mono text-xs">{automation.webhookUrl ?? "N/A"}</span>
            {automation.webhookUrl && (
              <button
                className="rounded border p-1"
                onClick={() => {
                  navigator.clipboard.writeText(automation.webhookUrl);
                  toast.success("Webhook URL copied");
                }}
              >
                <Copy size={14} />
              </button>
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h3 className="mb-3 font-semibold">Conditions</h3>
          {!automation.conditions?.length ? (
            <p className="text-sm text-slate-500">No conditions configured.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {automation.conditions.map((condition, index) => (
                <li key={index} className="rounded-lg border p-3">
                  {condition.field} {condition.operator} {condition.value}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h3 className="mb-3 font-semibold">Actions</h3>
          <ul className="space-y-2 text-sm">
            {automation.actions.map((action, index) => (
              <li key={index} className="rounded-lg border p-3">
                <p className="font-medium capitalize">{action.type}</p>
                <pre className="mt-2 overflow-auto rounded bg-slate-100 p-2 text-xs">
                  {JSON.stringify(action.config, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h3 className="mb-3 font-semibold">Test Webhook</h3>
        {!automation.webhookUrl ? (
          <p className="text-sm text-slate-500">
            Webhook test is available only for webhook trigger automations.
          </p>
        ) : (
          <div className="space-y-3">
            <textarea
              className="h-40 w-full rounded-xl border p-3 font-mono text-xs"
              value={payloadText}
              onChange={(e) => setPayloadText(e.target.value)}
            />
            <button
              className="rounded-xl bg-brand-600 px-4 py-2 text-white"
              onClick={() => {
                try {
                  const parsed = JSON.parse(payloadText);
                  triggerMutation.mutate({ webhookUrl: automation.webhookUrl, payload: parsed });
                } catch {
                  toast.error("Payload must be valid JSON.");
                }
              }}
            >
              Trigger Automation
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h3 className="mb-3 font-semibold">Execution History</h3>
        {!executionLogs.length ? (
          <p className="text-sm text-slate-500">No logs available for this automation yet.</p>
        ) : (
          <div className="space-y-3">
            {executionLogs.map((log) => (
              <div key={log._id} className="rounded-xl border p-3 text-sm">
                <div className="flex justify-between">
                  <span className={log.status === "success" ? "text-emerald-600" : "text-red-600"}>
                    {log.status}
                  </span>
                  <span className="text-slate-500">{formatDateTime(log.createdAt)}</span>
                </div>
                {log.error && <p className="mt-1 text-red-600">{log.error}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AutomationDetailsPage;
