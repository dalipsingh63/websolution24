
import { FaBars, FaBell } from "react-icons/fa";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#090B08] px-4 text-white shadow-md md:px-6">

      {/* Left: Mobile Menu */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-lime-400 lg:hidden"
        >
          <FaBars />
        </button>
      </div>

      {/* Center: Brand */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <h1 className="whitespace-nowrap text-sm font-black sm:text-lg">
          DS <span className="text-lime-400">Digital Studio</span>
        </h1>
        <p className="hidden text-xs text-slate-400 sm:block">
          Admin Panel
        </p>
      </div>

      {/* Right: Notifications + Admin */}
      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-lime-400"
        >
          <FaBell />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-lime-400 ring-2 ring-[#090B08]" />
        </button>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-white">
            DS Digital Studio
          </p>
          <p className="text-xs text-slate-400">
            Administrator
          </p>
        </div>

        <img
          src="/ds-logo.svg.png"
          alt="DS Digital Studio logo"
          className="h-9 w-9 rounded-full border border-lime-400/30 bg-white/5 object-contain p-1"
          width="36"
          height="36"
        />
      </div>
    </header>
  );
}
