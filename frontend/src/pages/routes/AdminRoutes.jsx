import { Routes, Route } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import ProtectedRoute from "../../components/admin/ProtectedRoute";

import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import ManageServices from "../admin/ManageServices";
import ManagePortfolio from "../admin/ManagePortfolio";
import ManageLeads from "../admin/ManageLeads";
import AdminSettings from "../admin/AdminSettings";
import WebsiteAnalytics from "../admin/WebsiteAnalytics";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Panel */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/services"
            element={<ManageServices />}
          />

          <Route
            path="/admin/portfolio"
            element={<ManagePortfolio />}
          />

          <Route
            path="/admin/leads"
            element={<ManageLeads />}
          />

          <Route
            path="/admin/settings"
            element={<AdminSettings />}
          />

          <Route
            path="/admin/analytics"
            element={<WebsiteAnalytics />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
