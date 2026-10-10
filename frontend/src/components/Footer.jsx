
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaPhone,
  FaArrowUp,
  FaArrowRight,
  FaCode,
  FaSearch,
  FaBullhorn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const quickLinks = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Our Work", "/portfolio"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const services = [
  { name: "Business Websites", icon: FaCode },
  { name: "E-commerce Websites", icon: FaCode },
  { name: "Website Redesign", icon: FaCode },
  { name: "SEO Services", icon: FaSearch },
  { name: "Google & Meta Ads", icon: FaBullhorn },
];

const email = "dalipsingh2863@gmail.com";

// Add your real profile URLs here.
const instagramUrl = "https://www.instagram.com/dsdigitalworks.in/";
const facebookUrl = "";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#090B08] text-slate-300">

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-lime-400/[0.06] blur-[100px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-lime-400/[0.05] blur-[110px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/70 to-transparent" />
      </div>

      {/* Main footer */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 sm:py-14 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr] lg:gap-10 lg:px-10 lg:py-16">

        {/* Brand */}
        <div className="min-w-0">
          <Link
            to="/"
            aria-label="DS Digital Studio home"
            className="mb-5 inline-flex items-center"
          >
            <img
              src="/ds-logo.svg.png"
              alt="DS Digital Studio"
              width="220"
              height="100"
              className="h-20 w-auto max-w-[220px] object-contain object-left"
            />
          </Link>

          <p className="max-w-md text-sm leading-7 text-slate-400">
            We build modern websites and digital solutions that help
            businesses strengthen their online presence and grow.
          </p>

          <p className="mt-3 text-xs font-semibold tracking-wide text-slate-500">
            DESIGN <span className="text-lime-400">·</span> DEVELOP{" "}
            <span className="text-lime-400">·</span> GROW
          </p>

          {/* Contact actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:+917740972863"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-white transition duration-300 hover:border-lime-400/40 hover:bg-lime-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <FaPhone className="text-lime-400" />
              Call Now
            </a>

            <a
              href="https://wa.me/917740972863"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-lime-400 px-4 py-2.5 text-sm font-extrabold text-[#10130B] transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links" className="min-w-0">
          <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white">
            Quick Links
          </h3>

          <div className="mb-5 h-0.5 w-10 rounded-full bg-lime-400" />

          <ul className="space-y-3.5">
            {quickLinks.map(([label, path]) => (
              <li key={path}>
                <Link
                  to={path}
                  className="group inline-flex items-center gap-2.5 text-sm text-slate-400 transition-colors duration-200 hover:text-lime-400"
                >
                  <FaArrowRight className="shrink-0 text-[10px] text-lime-400/70 transition-transform group-hover:translate-x-1 group-hover:text-lime-400" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div className="min-w-0">
          <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white">
            Our Services
          </h3>

          <div className="mb-5 h-0.5 w-10 rounded-full bg-lime-400" />

          <ul className="space-y-3.5">
            {services.map(({ name, icon: Icon }) => (
              <li key={name}>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-lime-400"
                >
                  <Icon className="shrink-0 text-xs text-lime-400/80 transition-colors group-hover:text-lime-300" />
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Personal profile */}
        <div className="min-w-0">
          <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white">
            Meet the Developer
          </h3>

          <div className="mb-5 h-0.5 w-10 rounded-full bg-lime-400" />

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition duration-300 hover:border-lime-400/25">

            {/* Profile image and introduction */}
            <div className="flex items-center gap-3">
              <img
                src="/dalip.jpeg"
                alt="Dalip Singh, Web Developer"
                width="80"
                height="80"
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-2xl border border-lime-400/25 bg-[#18181b] object-contain"
              />

              <div className="min-w-0">
                <h4 className="text-base font-extrabold text-white">
                  Dalip Singh
                </h4>

                <p className="mt-1 text-sm font-semibold text-lime-400">
                  Web Developer
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Websites & Digital Solutions
                </p>
              </div>
            </div>

            {/* Email: one place only */}
            <a
              href={`mailto:${email}`}
              className="mt-5 flex min-h-11 items-center gap-3 rounded-xl border border-white/[0.08] bg-black/20 px-3 py-3 transition duration-300 hover:border-lime-400/35 hover:bg-lime-400/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <FaEnvelope className="shrink-0 text-lime-400" />

              <span className="min-w-0 break-all text-xs font-medium text-slate-300">
                {email}
              </span>
            </a>

            {/* Social links: render only when URLs are provided */}
            {(instagramUrl || facebookUrl) && (
              <div className="mt-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Social Profiles
                </p>

                <div className="flex gap-3">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram profile"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:bg-lime-400/10 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                    >
                      <FaInstagram />
                    </a>
                  )}

                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook profile"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:bg-lime-400/10 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08] bg-black/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <p className="text-xs leading-6 text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-slate-300">
              DS Digital Studio
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <span className="inline-flex items-center gap-2 text-xs text-slate-400">
              <FaMapMarkerAlt className="text-lime-400" />
              Jaipur, Rajasthan
            </span>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-lime-400/25 bg-lime-400/[0.06] text-lime-400 transition duration-300 hover:-translate-y-1 hover:border-lime-400/60 hover:bg-lime-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
