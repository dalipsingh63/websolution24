
import { FaWhatsapp, FaPhone, FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="container-page relative mx-auto max-w-7xl">
        {/* Main CTA card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#18181b] px-5 py-9 shadow-[0_20px_55px_rgba(3,26,53,0.15)] sm:px-8 sm:py-11 lg:px-12 lg:py-12">
          {/* Background effects */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl"
          />

          {/* Decorative grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:36px_36px]"
          />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-[11px] font-black tracking-[0.17em] text-lime-300">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              LET'S BUILD SOMETHING
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Aapke Business Ko
              <span className="mt-1 block text-lime-400">
                Online Le Chalein?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              Nayi website banwani ho, existing website redesign karwani ho
              ya Google, Facebook aur Instagram Ads ke baare mein discuss
              karna ho — apni requirements share karein.
            </p>

            {/* Contact buttons */}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://wa.me/917740972863"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-green-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181b]"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Karein
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="tel:+917740972863"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:border-lime-300/40 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
              >
                <FaPhone className="text-sm text-lime-300" />
                Call Karein
              </a>

              <Link
                to="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-extrabold text-[#18181b] shadow-lg shadow-cyan-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-200"
              >
                Contact Page
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Supporting points */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
              {[
                "Website Development",
                "Redesign & Support",
                "Digital Advertising",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <FaCheck className="text-[10px] text-lime-400" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-[11px] font-semibold tracking-wide text-slate-400">
                Jaipur · Rajasthan · Remote Projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
