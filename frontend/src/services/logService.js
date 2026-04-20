import apiClient from "./apiClient";

export const getLogsApi = async () => {
  const { data } = await apiClient.get("/logs");
  return data;
};
