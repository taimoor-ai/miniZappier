import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createAutomationApi,
  getAutomationsApi,
  triggerWebhookApi,
} from "../services/automationService";
import { getLogsApi } from "../services/logService";
import { normalizeApiError } from "../utils/format";

export const useAutomations = () =>
  useQuery({
    queryKey: ["automations"],
    queryFn: getAutomationsApi,
  });

export const useLogs = () =>
  useQuery({
    queryKey: ["logs"],
    queryFn: getLogsApi,
  });

export const useCreateAutomation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAutomationApi,
    onSuccess: () => {
      toast.success("Automation created.");
      queryClient.invalidateQueries({ queryKey: ["automations"] });
    },
    onError: (error) => toast.error(normalizeApiError(error)),
  });
};

export const useTriggerWebhook = () =>
  useMutation({
    mutationFn: ({ webhookUrl, payload }) => triggerWebhookApi(webhookUrl, payload),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(normalizeApiError(error)),
  });
