
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-root min-h-screen bg-slate-100">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

     <div className="lg:pl-72">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="admin-main p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
