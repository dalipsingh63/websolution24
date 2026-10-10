
import {
  FaCode,
  FaMobileAlt,
  FaSearch,
  FaHeadset,
  FaRocket,
  FaUserTie,
  FaCheck,
} from "react-icons/fa";

const points = [
  {
    icon: FaCode,
    title: "Clean Development",
    text: "Organized aur maintainable code ke saath website development.",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Friendly",
    text: "Mobile, tablet aur desktop par achhe experience par focus.",
  },
  {
    icon: FaSearch,
    title: "SEO Foundations",
    text: "Search engines ke liye basic structure aur on-page setup.",
  },
  {
    icon: FaRocket,
    title: "Performance Focus",
    text: "Loading speed aur unnecessary complexity ko kam rakhne par focus.",
  },
  {
    icon: FaHeadset,
    title: "Website Support",
    text: "Project ke scope ke according updates aur maintenance support.",
  },
  {
    icon: FaUserTie,
    title: "Direct Communication",
    text: "Requirements, feedback aur changes par seedhi baat.",
  },
];

export default function WhyChooseMe() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-64 w-64 rounded-full bg-lime-100/60 blur-3xl"
      />

      <div className="container-page relative mx-auto max-w-7xl">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Left content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-lime-50 px-4 py-2 text-[11px] font-black tracking-[0.16em] text-lime-700">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              WHY WORK WITH ME
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#18181b] sm:text-4xl lg:text-[42px]">
              Business Ko Samajhkar
              <span className="mt-1 block text-lime-600">
                Digital Solutions.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
              Har business ki requirements alag hoti hain. Isliye website
              ki planning business ke purpose, customers aur zarooraton ke
              according honi chahiye — sirf design ke liye design nahi.
            </p>

            {/* Profile card */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#18181b] p-5 text-white shadow-[0_16px_40px_rgba(3,26,53,0.14)] sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-lime-400/10 blur-3xl"
              />

              <div className="relative flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-lime-300/20 bg-lime-300/10 text-2xl font-black text-lime-300 shadow-inner">
                  DS
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-black">Dalip Singh</h3>
                  <p className="mt-1 text-[10px] font-bold tracking-[0.15em] text-lime-300 sm:text-xs">
                    WEB · ADS · GROWTH
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    WebSolution
                  </p>
                </div>
              </div>

              <div className="relative mt-5 border-t border-white/10 pt-4">
                <p className="text-sm leading-6 text-slate-300">
                  Website development, redesign, maintenance aur online
                  advertising solutions par focus.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["Web Development", "Website Support", "Digital Ads"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold text-slate-300"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Feature cards */}
          <div className="grid items-stretch gap-3 sm:grid-cols-2 sm:gap-4">
            {points.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-200 hover:bg-white hover:shadow-[0_12px_32px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-lime-100 bg-lime-50 text-lg text-lime-700 transition duration-300 group-hover:border-lime-200 group-hover:bg-lime-100">
                    <Icon />
                  </div>

                  <span className="text-xs font-black tracking-wider text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-extrabold leading-snug text-[#18181b]">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                  {text}
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-lime-700">
                  <FaCheck className="text-[9px]" />
                  <span>Business-focused approach</span>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-lime-100/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
