import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import CreateAutomationPage from "../pages/CreateAutomationPage";
import AutomationDetailsPage from "../pages/AutomationDetailsPage";
import LogsPage from "../pages/LogsPage";
import NotFoundPage from "../pages/NotFoundPage";
import LandingPage from "../pages/LandingPage";
import { useAuthStore } from "../store/authStore";
import AuthModal from "../components/AuthModel";

const AppRouter = () => {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();

  const state = location.state;

  return (
    <>
      {/* Main Routes */}
      <Routes location={state?.backgroundLocation || location}>
        {/* Landing */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <LandingPage />}
        />

        {/* Auth (normal full page if directly accessed) */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
        />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/automations/new" element={<CreateAutomationPage />} />
            <Route path="/automation/:id" element={<AutomationDetailsPage />} />
            <Route path="/logs" element={<LogsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* 🔥 Modal Routes */}
      {state?.backgroundLocation && !token && (
        <Routes>
          <Route
            path="/login"
            element={
              <AuthModal>
                <LoginPage />
              </AuthModal>
            }
          />
          <Route
            path="/register"
            element={
              <AuthModal>
                <RegisterPage />
              </AuthModal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;