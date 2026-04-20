import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { ACTION_TYPES, CONDITION_OPERATORS, TRIGGER_TYPES } from "../constants/automation";
import { useCreateAutomation } from "../hooks/useAutomations";

const CreateAutomationPage = () => {
  const navigate = useNavigate();
  const createMutation = useCreateAutomation();
  const [name, setName] = useState("");
  const [triggerType, setTriggerType] = useState("webhook");
  const [conditions, setConditions] = useState([]);
  const [actions, setActions] = useState([{ type: "discord", config: { webhookUrl: "" } }]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const automation = await createMutation.mutateAsync({ name, triggerType, actions, conditions });
    navigate(`/automation/${automation._id}`);
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">Create automation</h2>
        <p className="text-sm text-slate-500">Design your workflow trigger, conditions, and actions.</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <label className="mb-2 block text-sm font-medium">Automation Name</label>
        <input
          className="w-full rounded-xl border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="mb-2 mt-4 block text-sm font-medium">Trigger Type</label>
        <select
          className="w-full rounded-xl border p-3"
          value={triggerType}
          onChange={(e) => setTriggerType(e.target.value)}
        >
          {TRIGGER_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Conditions</h3>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
            onClick={() =>
              setConditions((p) => [...p, { field: "", operator: "==", value: "" }])
            }
          >
            <Plus size={14} /> Add Condition
          </button>
        </div>
        <div className="space-y-3">
          {conditions.map((condition, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-[1fr_160px_1fr_auto]">
              <input
                className="rounded-xl border p-3"
                placeholder="payload field (e.g. amount)"
                value={condition.field}
                onChange={(e) =>
                  setConditions((prev) =>
                    prev.map((c, i) => (i === index ? { ...c, field: e.target.value } : c))
                  )
                }
              />
              <select
                className="rounded-xl border p-3"
                value={condition.operator}
                onChange={(e) =>
                  setConditions((prev) =>
                    prev.map((c, i) => (i === index ? { ...c, operator: e.target.value } : c))
                  )
                }
              >
                {CONDITION_OPERATORS.map((operator) => (
                  <option key={operator} value={operator}>
                    {operator}
                  </option>
                ))}
              </select>
              <input
                className="rounded-xl border p-3"
                placeholder="value"
                value={condition.value}
                onChange={(e) =>
                  setConditions((prev) =>
                    prev.map((c, i) => (i === index ? { ...c, value: e.target.value } : c))
                  )
                }
              />
              <button
                type="button"
                onClick={() => setConditions((p) => p.filter((_, i) => i !== index))}
                className="rounded-xl border p-3 text-slate-500 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Actions</h3>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
            onClick={() => setActions((p) => [...p, { type: "mongodb", config: {} }])}
          >
            <Plus size={14} /> Add Action
          </button>
        </div>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div key={index} className="rounded-xl border p-4">
              <div className="grid gap-2 md:grid-cols-[180px_1fr_auto]">
                <select
                  className="rounded-xl border p-3"
                  value={action.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    const config =
                      type === "discord"
                        ? { webhookUrl: "" }
                        : type === "email"
                          ? { to: "", subject: "" }
                          : {};
                    setActions((prev) => prev.map((a, i) => (i === index ? { ...a, type, config } : a)));
                  }}
                >
                  {ACTION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {action.type === "discord" && (
                  <input
                    className="rounded-xl border p-3"
                    placeholder="Discord webhook URL"
                    value={action.config.webhookUrl ?? ""}
                    onChange={(e) =>
                      setActions((prev) =>
                        prev.map((a, i) =>
                          i === index
                            ? { ...a, config: { ...a.config, webhookUrl: e.target.value } }
                            : a
                        )
                      )
                    }
                    required
                  />
                )}
                {action.type === "email" && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      className="rounded-xl border p-3"
                      placeholder="Recipient email"
                      value={action.config.to ?? ""}
                      onChange={(e) =>
                        setActions((prev) =>
                          prev.map((a, i) =>
                            i === index ? { ...a, config: { ...a.config, to: e.target.value } } : a
                          )
                        )
                      }
                      required
                    />
                    <input
                      className="rounded-xl border p-3"
                      placeholder="Subject"
                      value={action.config.subject ?? ""}
                      onChange={(e) =>
                        setActions((prev) =>
                          prev.map((a, i) =>
                            i === index
                              ? { ...a, config: { ...a.config, subject: e.target.value } }
                              : a
                          )
                        )
                      }
                    />
                  </div>
                )}
                {action.type === "mongodb" && (
                  <p className="self-center text-sm text-slate-500">No extra configuration required.</p>
                )}
                <button
                  type="button"
                  onClick={() => setActions((p) => p.filter((_, i) => i !== index))}
                  className="rounded-xl border p-3 text-slate-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-brand-700 p-6 text-white shadow-soft">
        <p className="text-sm uppercase text-white/70">Workflow Preview</p>
        <p className="mt-2 text-lg">
          Trigger ({triggerType}) → {conditions.length || "No"} Conditions → {actions.length} Actions
        </p>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-brand-600 px-5 py-3 font-medium text-white"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? "Creating..." : "Create Automation"}
      </button>
    </form>
  );
};

export default CreateAutomationPage;
