
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaArrowRight,
  FaCode,
  FaBullhorn,
  FaCheck,
  FaLaptopCode,
} from "react-icons/fa";

export default function Hero() {
  const benefits = [
    "Mobile-friendly design",
    "Clean, professional layout",
    "Website & advertising solutions",
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#18181b] text-white">
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:42px_42px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
          {/* Left: Main content */}
          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-bold tracking-wide text-lime-300">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              WEB DESIGN · DEVELOPMENT · ADS
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]">
              Apne Business Ko
              <span className="mt-1 block text-lime-400">
                Online Grow
              </span>
              Karne Mein Aage Badhein.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Apne business ke liye professional website banwayein, existing
              website improve karwayein aur Google ya social media advertising
              ke through online customers tak pahunchne ki planning karein.
            </p>

            {/* Action buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/917740972863"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-3 font-extrabold text-white shadow-lg shadow-green-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300/30"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Karein
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                to="/portfolio"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-lime-400/30 bg-white/[0.04] px-6 py-3 font-bold text-lime-300 transition duration-300 hover:-translate-y-0.5 hover:border-lime-400/60 hover:bg-lime-400/10"
              >
                Mera Work Dekhein
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Key benefits */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              {benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 sm:text-sm"
                >
                  <FaCheck className="shrink-0 text-lime-400" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Website preview */}
          <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-lime-400/[0.05] blur-2xl"
            />

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/30 backdrop-blur-sm sm:rounded-3xl sm:p-3">
              {/* Browser top bar */}
              <div className="flex items-center justify-between rounded-t-xl bg-[#27272a] px-3 py-3 sm:px-5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>

                <div className="rounded-md border border-white/10 bg-white/5 px-4 py-1 text-[10px] text-slate-400">
                  dalipsingh.dev
                </div>

                <div className="w-8" />
              </div>

              {/* Mock website */}
              <div className="overflow-hidden rounded-b-xl bg-white text-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#18181b] text-xs font-black text-lime-400">
                      DS
                    </div>

                    <span className="text-[10px] font-black tracking-wide sm:text-xs">
                      DS Digital Studio
                    </span>
                  </div>

                  <span className="rounded-lg bg-lime-400 px-3 py-2 text-[9px] font-black text-[#18181b]">
                    CONTACT
                  </span>
                </div>

                <div className="grid gap-5 bg-slate-50 px-4 py-7 sm:grid-cols-[1.1fr_0.9fr] sm:px-6 sm:py-9">
                  <div className="flex flex-col items-start justify-center">
                    <span className="mb-3 rounded-full bg-lime-100 px-3 py-1 text-[8px] font-bold text-lime-800">
                      DALIP SINGH WEB SOLUTIONS · ONLINE
                    </span>

                    <h2 className="text-2xl font-black leading-tight sm:text-3xl">
                      Grow Your
                      <span className="block text-lime-400">
                        Business Online.
                      </span>
                    </h2>

                    <p className="mt-3 max-w-[230px] text-[10px] leading-5 text-slate-500 sm:text-xs">
                      A modern website to present your business and help
                      customers connect with you.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-md bg-[#18181b] px-3 py-2 text-[9px] font-bold text-white">
                        Get Started
                      </span>
                      <span className="rounded-md border border-slate-300 px-3 py-2 text-[9px] font-bold text-slate-600">
                        Our Services
                      </span>
                    </div>
                  </div>

                  {/* Developer workspace visual */}
                  <div className="relative hidden min-h-[180px] items-center justify-center overflow-hidden rounded-2xl sm:flex">
                    <img
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85"
                      alt="Developer workspace with laptop and code"
                      loading="eager"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-zinc-950/35" />
                    <div className="absolute right-2 top-3 h-36 w-36 rounded-2xl border border-white/15 bg-zinc-950/80 p-4 shadow-xl backdrop-blur-sm">
                      <div className="h-2 w-16 rounded-full bg-lime-400" />
                      <div className="mt-4 h-16 rounded-xl border border-white/10 bg-white/[0.07] p-3">
                        <div className="h-2 w-16 rounded bg-white/20" />
                        <div className="mt-3 h-2 w-10 rounded bg-lime-400/70" />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <div className="h-3 flex-1 rounded bg-white/10" />
                        <div className="h-3 w-8 rounded bg-lime-400" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-1 grid h-14 w-14 place-items-center rounded-2xl border border-lime-100 bg-white text-xl text-lime-600 shadow-lg">
                      <FaLaptopCode />
                    </div>
                  </div>
                </div>

                {/* Feature strip */}
                <div className="grid grid-cols-3 border-t border-slate-200">
                  {[
                    { icon: FaLaptopCode, label: "Responsive" },
                    { icon: FaCode, label: "Modern Design" },
                    { icon: FaBullhorn, label: "Digital Ads" },
                  ].map(({ icon: Icon, label }, index) => (
                    <div
                      key={label}
                      className={`flex flex-col items-center gap-2 px-1 py-4 text-center ${
                        index !== 0 ? "border-l border-slate-200" : ""
                      }`}
                    >
                      <Icon className="text-sm text-lime-600 sm:text-base" />
                      <span className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Small floating label */}
            <div className="relative mt-4 flex justify-end sm:absolute sm:-bottom-5 sm:-left-5 sm:mt-0 sm:justify-start">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#27272a] px-4 py-3 shadow-xl shadow-black/20">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime-400/10 text-lime-300">
                  <FaCode />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    Built by Dalip Singh
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Web Design · Development · Growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
