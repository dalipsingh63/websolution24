
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
      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          border-r border-white/10
          bg-[#090B08]
          text-white
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* BRAND LOGO */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
            <NavLink
              to="/admin/dashboard"
              onClick={onClose}
              className="flex min-w-0 items-center gap-3"
              aria-label="DS Digital Studio admin dashboard"
            >
              <img
                src="/ds-logo.svg.png"
                alt="DS Digital Studio logo"
                className="h-12 w-12 shrink-0 object-contain"
                width="48"
                height="48"
              />

              <div className="min-w-0">
                <div className="whitespace-nowrap text-sm font-black text-white">
                  DS <span className="text-lime-400">Digital Studio</span>
                </div>

                <div className="mt-1 text-[9px] font-bold tracking-[0.15em] text-slate-400">
                  WEB · ADS · SEO
                </div>
              </div>
            </NavLink>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-slate-300 transition hover:bg-white/10 lg:hidden"
            >
              <FaTimes />
            </button>
          </div>

          {/* NAVIGATION */}
          <nav
            aria-label="Admin navigation"
            className="flex-1 space-y-2 overflow-y-auto p-4"
          >
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
                    text-sm font-bold transition-all duration-300
                    ${
                      isActive
                        ? "bg-lime-400 text-[#090B08] shadow-[0_5px_20px_rgba(163,230,53,0.18)]"
                        : "text-slate-300 hover:bg-white/5 hover:text-lime-400"
                    }
                  `
                }
              >
                <Icon className="text-base" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* BOTTOM SECTION */}
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 rounded-xl border border-white/5 bg-white/[0.04] p-3">
              <div className="text-xs font-bold text-slate-400">
                Logged in as
              </div>

              <div className="mt-1 truncate text-sm font-black text-white">
                Admin
              </div>

              <div className="mt-1 text-[10px] font-medium text-lime-400">
                DS Digital Studio
              </div>
            </div>

            <button
              type="button"
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
