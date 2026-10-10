
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck } from "react-icons/fa";

export default function ServiceCard({
  icon,
  title,
  text,
  features = [],
  link = "/contact",
  accent = "lime",
  image = "",
}) {
  const accentClasses = {
    lime: {
      icon: "bg-lime-50 text-lime-700",
      border: "hover:border-lime-300",
      glow: "hover:shadow-lime-900/10",
      link: "text-lime-700",
      line: "bg-lime-400",
      check: "bg-lime-50 text-lime-700",
    },
    yellow: {
      icon: "bg-lime-50 text-lime-800",
      border: "hover:border-lime-300",
      glow: "hover:shadow-lime-900/10",
      link: "text-lime-800",
      line: "bg-lime-400",
      check: "bg-lime-50 text-lime-800",
    },
    green: {
      icon: "bg-lime-50 text-lime-800",
      border: "hover:border-lime-300",
      glow: "hover:shadow-lime-900/10",
      link: "text-lime-800",
      line: "bg-lime-400",
      check: "bg-lime-50 text-lime-800",
    },
  };

  const theme = accentClasses[accent] || accentClasses.lime;
  const serviceFeatures = Array.isArray(features) ? features : [];
  const titleKey = String(title || "").toLowerCase();
  const imageOptions = [
    { match: /e.?commerce|online store|shopping|shop|product/, url: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=85" },
    { match: /seo|marketing|google|meta|facebook|instagram|ads|advertis/, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85" },
    { match: /app|mobile|android|ios/, url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=85" },
    { match: /design|ui.?ux|graphic|branding|logo|creative/, url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85" },
    { match: /maintain|support|repair|security|speed|hosting/, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85" },
    { match: /wordpress|cms|blog/, url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=85" },
    { match: /web|website|development|landing|business/, url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85" },
  ];
  const matchedImage = imageOptions.find((option) => option.match.test(titleKey));
  const serviceImage = image || matchedImage?.url || imageOptions[imageOptions.length - 1].url;
  const isInternalLink =
    typeof link === "string" &&
    link.startsWith("/") &&
    !link.startsWith("//");

  const linkClass = `
    group/link inline-flex items-center gap-2
    text-sm font-extrabold transition-all duration-300
    hover:gap-3 focus:outline-none focus-visible:ring-2
    focus-visible:ring-lime-400 focus-visible:ring-offset-4
    ${theme.link}
  `;

  const linkContent = (
    <>
      Know More
      <FaArrowRight className="text-xs transition-transform duration-300 group-hover/link:translate-x-0.5" />
    </>
  );

  return (
    <article
      className={`
        group relative flex h-full min-h-[300px] flex-col
        overflow-hidden rounded-2xl border border-slate-200
        bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl ${theme.border} ${theme.glow}
        sm:p-6
      `}
    >
      {/* Service visual: assigned on the frontend so the existing text-only API stays unchanged */}
      <div className="relative -mx-5 -mt-5 mb-5 h-40 overflow-hidden sm:-mx-6 sm:-mt-6 sm:h-44">
        <img
          src={serviceImage}
          alt={`${title} service preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">DS · Digital Services</span>
      </div>

      {/* Accent line */}
      <div
        aria-hidden="true"
        className={`absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${theme.line}`}
      />

      {/* Decorative background symbol */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 top-0 select-none text-7xl font-black leading-none text-slate-100/80 transition-colors duration-300 group-hover:text-slate-100"
      >
        +
      </span>

      {/* Icon */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div
          className={`
            grid h-14 w-14 shrink-0 place-items-center rounded-2xl
            text-2xl ring-1 ring-black/[0.03]
            transition-transform duration-300 group-hover:-translate-y-0.5
            ${theme.icon}
          `}
        >
          {icon}
        </div>

        <span className="mt-1 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Service
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-5">
        <h3 className="text-lg font-extrabold leading-snug text-[#18181b] sm:text-xl">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {text}
        </p>
      </div>

      {/* Features */}
      {serviceFeatures.length > 0 && (
        <ul className="relative z-10 mt-5 space-y-3">
          {serviceFeatures.map((feature, index) => (
            <li
              key={`${feature}-${index}`}
              className="flex items-start gap-2.5 text-sm leading-5 text-slate-600"
            >
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${theme.check}`}
              >
                <FaCheck className="text-[9px]" />
              </span>

              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Bottom link stays aligned across cards */}
      <div className="relative z-10 mt-auto border-t border-slate-100 pt-4">
        {isInternalLink ? (
          <Link to={link} className={linkClass}>
            {linkContent}
          </Link>
        ) : (
          <a
            href={link}
            className={linkClass}
            target={
              typeof link === "string" && /^https?:\/\//i.test(link)
                ? "_blank"
                : undefined
            }
            rel={
              typeof link === "string" && /^https?:\/\//i.test(link)
                ? "noopener noreferrer"
                : undefined
            }
          >
            {linkContent}
          </a>
        )}
      </div>

      {/* Subtle bottom accent */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-16 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${theme.line}`}
      />
    </article>
  );
}
