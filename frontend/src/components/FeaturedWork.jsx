
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaLaptopCode,
  FaMobileAlt,
  FaLayerGroup,
} from "react-icons/fa";

export default function FeaturedWork() {
  const features = [
    {
      icon: FaMobileAlt,
      title: "Responsive Design",
      text: "Mobile-friendly layout",
    },
    {
      icon: FaLayerGroup,
      title: "Business Pages",
      text: "Organized content and services",
    },
    {
      icon: FaLaptopCode,
      title: "Frontend + Backend",
      text: "Connected application features",
    },
  ];

  const highlights = [
    "Professional business presentation",
    "Responsive website experience",
    "Service and content sections",
    "Frontend and backend integration",
  ];

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-72 w-72 rounded-full bg-lime-200/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-64 w-64 rounded-full bg-lime-100/20 blur-3xl"
      />

      <div className="container-page relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-5 sm:gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-white px-4 py-2 text-[11px] font-black tracking-[0.18em] text-lime-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              FEATURED PROJECT
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#18181b] sm:text-4xl lg:text-[42px]">
              Kuch Kaam Jo
              <span className="block text-lime-600">
                Maine Kiya Hai
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Mere website development work ka ek example dekhein.
              Is project mein business information aur services ko ek
              organized online experience mein present kiya gaya hai.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-[#18181b] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:text-lime-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
          >
            View All Work
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured project */}
        <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-[#18181b] shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:mt-10">
          <div className="grid lg:grid-cols-2">
            {/* Project visual */}
            <div className="relative flex min-w-0 flex-col justify-center overflow-hidden bg-[#18181b] p-5 sm:p-8 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl"
              />

              <div className="relative mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-wider text-lime-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                  PROJECT PREVIEW
                </span>

                <span className="text-[10px] font-semibold text-slate-400">
                  KUSUM SOLAR
                </span>
              </div>

              {/* Browser frame */}
              <div className="relative rounded-2xl border border-white/10 bg-[#27272a] p-2 shadow-2xl sm:p-3">
                <div className="overflow-hidden rounded-xl bg-white">
                  {/* Browser bar */}
                  <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-3 py-3 sm:px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                    <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-slate-100 px-3 py-1.5 text-center text-[9px] font-medium text-slate-500">
                      kusumsolar.com
                    </div>
                  </div>

                  {/* Mock website preview */}
                  <div className="bg-slate-50 p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#18181b] text-xs font-black text-green-300">
                          KS
                        </div>

                        <span className="text-[10px] font-black tracking-wide text-slate-800 sm:text-xs">
                          KUSUM SOLAR
                        </span>
                      </div>

                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-[8px] font-bold text-green-700 sm:text-[9px]">
                        SOLAR ENERGY
                      </span>
                    </div>

                    <div className="grid gap-5 py-6 sm:grid-cols-[1.1fr_0.9fr] sm:items-center sm:py-8">
                      <div>
                        <span className="inline-block rounded-full bg-green-100 px-2.5 py-1 text-[8px] font-bold text-green-800">
                          CLEAN ENERGY SOLUTIONS
                        </span>

                        <h3 className="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
                          Solar Power
                          <span className="block text-green-600">
                            For Your Future
                          </span>
                        </h3>

                        <p className="mt-3 text-[10px] leading-5 text-slate-500 sm:text-xs">
                          Solutions for homes, businesses and industry.
                        </p>

                        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-700 px-3 py-2 text-[9px] font-bold text-white">
                          Explore Solutions
                          <FaArrowRight />
                        </div>
                      </div>

                      {/* Decorative solar panel illustration */}
                      <div className="relative hidden min-h-[160px] items-center justify-center sm:flex">
                        <div className="absolute inset-x-1 top-3 h-28 -rotate-6 rounded-2xl border border-green-700/20 bg-gradient-to-br from-green-700 to-[#18181b] p-3 shadow-lg">
                          <div className="grid h-full grid-cols-3 grid-rows-2 gap-1.5">
                            {Array.from({ length: 6 }, (_, index) => (
                              <div
                                key={index}
                                className="rounded border border-lime-200/20 bg-lime-300/15"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="absolute bottom-0 right-0 grid h-12 w-12 place-items-center rounded-xl border border-green-100 bg-white text-xl text-green-700 shadow-lg">
                          <FaCheckCircle />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-slate-200 pt-3">
                      {["Residential", "Commercial", "Industrial"].map(
                        (item, index) => (
                          <div
                            key={item}
                            className={`px-1 text-center text-[8px] font-bold text-slate-500 sm:text-[9px] ${
                              index > 0 ? "border-l border-slate-200" : ""
                            }`}
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap gap-2">
                {["Business Website", "Responsive Layout", "Solar Industry"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Project details */}
            <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-lime-300">
                <FaLaptopCode />
                WEBSITE DEVELOPMENT
              </div>

              <h3 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Kusum Solar
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Solar business ke liye ek dedicated website, jahan business
                information aur services ko visitors ke liye clear aur
                organized format mein present kiya gaya hai.
              </p>

              {/* Project features */}
              <div className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-200"
                  >
                    <FaCheckCircle className="mt-1 shrink-0 text-lime-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Project capabilities */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {features.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <Icon className="text-lg text-lime-300" />
                    <p className="mt-3 text-xs font-extrabold text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-400">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="https://kusumsolar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-extrabold text-[#18181b] shadow-lg shadow-cyan-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181b]"
                >
                  Visit Website
                  <FaExternalLinkAlt className="text-xs transition-transform group-hover:-translate-y-0.5" />
                </a>

                <Link
                  to="/contact"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:border-lime-300/50 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                >
                  Start Your Project
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
