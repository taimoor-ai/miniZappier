export const formatDateTime = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

export const normalizeApiError = (error) => {
  if (typeof error === "object" && error && "response" in error) {
    const response = error.response;
    return response?.data?.message ?? "Something went wrong.";
  }
  return "Something went wrong.";
};
