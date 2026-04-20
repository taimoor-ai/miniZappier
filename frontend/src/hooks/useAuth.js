import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi, registerApi } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { normalizeApiError } from "../utils/format";

export const useAuthActions = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success("Welcome back!");
      navigate("/");
    },
    onError: (error) => toast.error(normalizeApiError(error)),
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }) => registerApi(name, email, password),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success("Account created successfully.");
      navigate("/");
    },
    onError: (error) => toast.error(normalizeApiError(error)),
  });

  return { loginMutation, registerMutation, logout: clearAuth };
};
