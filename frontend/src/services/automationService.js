import axios from "axios";
import apiClient from "./apiClient";

export const getAutomationsApi = async () => {
  const { data } = await apiClient.get("/automations");
  return data;
};

export const createAutomationApi = async (payload) => {
  const { data } = await apiClient.post("/automations", {
    name: payload.name,
    trigger: { type: payload.triggerType, config: {} },
    actions: payload.actions,
    conditions: payload.conditions,
  });
  return data.automation;
};

export const triggerWebhookApi = async (webhookUrl, payload) => {
  const { data } = await axios.post(webhookUrl, payload);
  return data;
};
