
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaChartLine,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

const platforms = [
  {
    icon: FaGoogle,
    title: "Google Ads",
    label: "Search & Discovery",
    text: "Google Search aur relevant placements par potential customers tak pahunchne ke liye campaigns.",
  },
  {
    icon: FaFacebookF,
    title: "Facebook Ads",
    label: "Audience Reach",
    text: "Business ke goals aur selected audience ke hisaab se promotional campaigns.",
  },
  {
    icon: FaInstagram,
    title: "Instagram Ads",
    label: "Visual Promotion",
    text: "Visual content aur paid promotion ke through products, services aur brand ko present karna.",
  },
];

const benefits = [
  "Business goals ke according planning",
  "Website aur advertising ka coordinated approach",
  "Campaign performance ko review karne par focus",
];

export default function GrowthSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#18181b] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-lime-400/[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-lime-400/[0.10] blur-3xl"
      />

      <div className="container-page relative mx-auto max-w-7xl">
        <div className="grid items-start gap-9 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14">
          {/* Left: Main message */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-[11px] font-black tracking-[0.16em] text-lime-300">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              WEBSITE + ADVERTISING
            </span>

            <h2 className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              Sirf Website Nahi,
              <span className="mt-1 block text-lime-400">
                Business Growth Par Focus.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Website aapke business ki online identity banati hai. Digital
              advertising ke through aap relevant audience tak pahunchne ki
              koshish kar sakte hain. Dono ko business goals ke according
              plan kiya ja sakta hai.
            </p>

            {/* Approach highlights */}
            <div className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime-400/10 text-lime-300">
                    <FaCheck className="text-[9px]" />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Growth service summary */}
            <div className="mt-7 flex max-w-md items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-lime-400/15 bg-lime-400/10 text-xl text-lime-300">
                <FaChartLine />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-white">
                  Digital Growth Setup
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Website · Advertising · Optimization
                </p>
              </div>
            </div>
          </div>

          {/* Right: Advertising platforms */}
          <div>
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
                Advertising Platforms
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Apne business ke liye suitable platform aur campaign approach
                select karein.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
              {platforms.map(({ icon: Icon, title, label, text }, index) => (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-lime-300/30 hover:bg-white/[0.075] sm:p-5"
                >
                  <div className="flex items-start gap-3 sm:flex-col lg:flex-row lg:items-center lg:gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-lime-300/15 bg-lime-300/10 text-lg text-lime-300 transition duration-300 group-hover:border-lime-300/30 group-hover:bg-lime-300/15">
                      <Icon />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-lime-300/80">
                        {label}
                      </p>
                      <h3 className="mt-1 text-base font-extrabold text-white">
                        {title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-6 text-slate-400 sm:text-sm">
                    {text}
                  </p>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-lime-400/[0.06] blur-2xl transition duration-300 group-hover:bg-lime-400/10"
                  />

                  <span className="sr-only">Platform {index + 1}</span>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="max-w-2xl">
            <h3 className="text-sm font-extrabold text-white">
              Apne business ke liye sahi approach discuss karein
            </h3>
            <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
              Advertising results audience, budget, competition aur campaign
              quality par depend karte hain. Strategy business ki requirements
              ke hisaab se plan ki jayegi.
            </p>
          </div>

          <a
            href="https://wa.me/917740972863"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-extrabold text-[#18181b] transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181b]"
          >
            Discuss Your Business
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
