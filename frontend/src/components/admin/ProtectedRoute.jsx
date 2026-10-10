import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const adminToken = localStorage.getItem("adminToken");
  const adminData = localStorage.getItem("adminData");
  let isAdmin = false;

  if (adminToken && adminData) {
    try {
      const admin = JSON.parse(adminData);
      isAdmin = admin?.role === "admin";
    } catch {
      isAdmin = false;
    }
  }

  if (!adminToken || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
