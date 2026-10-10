import { FaBars, FaBell } from "react-icons/fa";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 hover:border-lime-400 hover:text-lime-400 lg:hidden"
          >
            <FaBars />
          </button>

          <div>
            <p className="text-xs font-bold text-slate-400">
              ADMIN PANEL
            </p>

            <h1 className="text-lg font-black text-slate-900">
              Welcome back, Admin
            </h1>
          </div>
        </div>

        <button className="relative grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-lime-400 hover:text-lime-400">
          <FaBell />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-lime-400" />
        </button>
      </div>
    </header>
  );
}