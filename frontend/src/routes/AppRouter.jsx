import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import CreateAutomationPage from "../pages/CreateAutomationPage";
import AutomationDetailsPage from "../pages/AutomationDetailsPage";
import LogsPage from "../pages/LogsPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useAuthStore } from "../store/authStore";

const AppRouter = () => {
  const token = useAuthStore((s) => s.token);

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={token ? <Navigate to="/" replace /> : <RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/automations/new" element={<CreateAutomationPage />} />
          <Route path="/automation/:id" element={<AutomationDetailsPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
