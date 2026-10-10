
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Our Work", "/portfolio"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  const linkClasses = ({ isActive }) =>
    `
      group relative rounded-lg px-3 py-2 text-sm font-bold
      transition-all duration-300
      ${
        isActive
          ? "bg-white/10 text-lime-400"
          : "text-slate-200 hover:-translate-y-0.5 hover:bg-white/5 hover:text-lime-400"
      }
    `;

  return (
    <header className="sticky top-0 z-50 pt-[1px]">
      <div
        className="
          relative border-y border-white/10 bg-[#090B08]/95
          px-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          backdrop-blur-xl md:px-8 lg:px-12
        "
      >
        {/* Top Glow */}
        <div
          className="
            pointer-events-none absolute left-1/2 top-0 h-[2px]
            w-1/2 -translate-x-1/2
            bg-gradient-to-r from-transparent via-lime-400 to-transparent
            opacity-80
          "
        />

        <div className="flex min-h-[76px] items-center justify-between gap-3">
          {/* BRAND LOGO + TEXT */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label="DS Digital Studio home"
            className="flex min-w-0 shrink items-center gap-3"
          >
            <img
              src="/ds-logo.svg.png"
              alt="DS Digital Studio logo"
              className="h-11 w-auto max-w-[100px] shrink-0 object-contain sm:h-14 sm:max-w-[120px]"
              width="120"
              height="80"
            />

            <span className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap text-base font-black tracking-tight text-white sm:text-xl">
                DS <span className="text-lime-400">Digital Studio</span>
              </span>

          <span className="mt-1 block text-[10px] font-medium tracking-[0.12em] text-slate-400 sm:text-xs">
  WEB · ADS · SEO
</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {nav.map(([label, path]) => (
              <NavLink key={path} to={path} className={linkClasses}>
                {label}

                <span
                  className="
                    absolute bottom-1 left-1/2 h-[2px] w-0
                    -translate-x-1/2 rounded-full bg-lime-400
                    transition-all duration-300 group-hover:w-5
                  "
                />
              </NavLink>
            ))}

            {/* DESKTOP WHATSAPP */}
            <a
              href="https://wa.me/917740972863"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with DS Digital Studio on WhatsApp"
              className="
                ml-2 flex items-center gap-2 rounded-xl
                border border-lime-300/20 bg-lime-400 px-3.5 py-2.5
                text-sm font-black text-[#10130B]
                shadow-[0_4px_0_#65a30d,0_8px_18px_rgba(163,230,53,0.15)]
                transition-all duration-300
                hover:-translate-y-1 hover:bg-lime-300
                active:translate-y-1
              "
            >
              <FaWhatsapp className="text-xl" />
              <span>WhatsApp</span>
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            className="
              grid h-10 w-10 shrink-0 place-items-center rounded-xl
              border border-white/10 bg-white/5 text-xl text-white
              transition-all duration-300 hover:border-lime-400/40
              hover:bg-lime-400/10 md:hidden
            "
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {open && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 py-3 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {nav.map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `
                      rounded-lg px-3 py-2.5 text-sm font-bold
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-lime-400/10 text-lime-400"
                          : "text-slate-200 hover:bg-white/5 hover:pl-5 hover:text-lime-400"
                      }
                    `
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* MOBILE WHATSAPP */}
              <a
                href="https://wa.me/917740972863"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with DS Digital Studio on WhatsApp"
                className="
                  mt-2 flex items-center justify-center gap-2 rounded-xl
                  bg-lime-400 px-4 py-3 font-black text-[#10130B]
                  transition-all hover:-translate-y-0.5 hover:bg-lime-300
                "
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
