import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaGlobe,
  FaBriefcase,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();

  const links = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: FaHome,
    },
    {
      label: "Services",
      path: "/admin/services",
      icon: FaGlobe,
    },
    {
      label: "Portfolio",
      path: "/admin/portfolio",
      icon: FaBriefcase,
    },
    {
      label: "Leads",
      path: "/admin/leads",
      icon: FaUsers,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: FaCog,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminDemoLogin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  return (
    <>
      {open && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          border-r border-white/10
          bg-[#18181b]
          text-white
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-lime-400 to-lime-500 font-black shadow-lg">
                DS
              </div>

              <div>
                <div className="font-black text-white">
                  Dalip <span className="text-lime-400">Singh</span>
                </div>

                <div className="text-[9px] font-bold tracking-[0.18em] text-slate-400">
                  ADMIN PANEL
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 lg:hidden"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            <div className="mb-3 px-3 text-[10px] font-black tracking-[0.2em] text-slate-500">
              MANAGEMENT
            </div>

            {links.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-bold
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-lime-400 text-[#18181b] shadow-[0_5px_20px_rgba(34,211,238,0.18)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-lime-400"
                  }
                  `
                }
              >
                <Icon />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Bottom */}
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 rounded-xl bg-white/[0.04] p-3">
              <div className="text-xs font-bold text-slate-400">
                Logged in as
              </div>

              <div className="mt-1 truncate text-sm font-black text-white">
                Admin
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-300 transition-all hover:bg-red-500/10 hover:text-red-400"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}