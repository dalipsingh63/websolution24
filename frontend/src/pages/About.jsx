import useSEO from "../utils/useSEO";

import { Link } from "react-router-dom";
import {
  FaCode,
  FaMobileAlt,
  FaSearch,
  FaBullhorn,
  FaArrowRight,
  FaCheck,
  FaLaptopCode,
  FaRegLightbulb,
  FaComments,
  FaRocket,
  FaGlobe,
  FaTools,
  FaPalette,
} from "react-icons/fa";

const services = [
  {
    icon: FaLaptopCode,
    number: "01",
    title: "Website Development",
    description:
      "Business websites jo aapke brand ko professional look dein aur customers ko zaroori information aasani se mile.",
    points: ["Business websites", "Responsive design", "Easy navigation"],
  },
  {
    icon: FaPalette,
    number: "02",
    title: "Website Design",
    description:
      "Clean, modern aur user-friendly layouts jo aapke business ki identity ko achhe se present karein.",
    points: ["Modern UI design", "Mobile-friendly layout", "Brand consistency"],
  },
  {
    icon: FaBullhorn,
    number: "03",
    title: "Digital Advertising",
    description:
      "Google, Facebook aur Instagram advertising ke liye practical campaign setup aur business-focused solutions.",
    points: ["Google Ads", "Facebook & Instagram Ads", "Campaign planning"],
  },
  {
    icon: FaTools,
    number: "04",
    title: "Website Support",
    description:
      "Existing website mein updates, improvements aur maintenance ke liye support.",
    points: ["Content updates", "Website improvements", "Maintenance support"],
  },
];

const process = [
  {
    number: "01",
    icon: FaComments,
    title: "Understand",
    description:
      "Pehle aapke business, requirements aur goals ko samajhte hain.",
  },
  {
    number: "02",
    icon: FaRegLightbulb,
    title: "Plan & Design",
    description:
      "Requirements ke hisaab se website ka layout aur features plan karte hain.",
  },
  {
    number: "03",
    icon: FaCode,
    title: "Build & Test",
    description:
      "Website develop karke mobile, desktop aur important functionality test karte hain.",
  },
  {
    number: "04",
    icon: FaRocket,
    title: "Launch",
    description:
      "Final review ke baad website launch aur agreed support par kaam karte hain.",
  },
];

export default function About() {
  useSEO({ title: 'About Dalip Singh | Web Developer in Jaipur', description: 'Learn about Dalip Singh, a web developer helping businesses with professional websites, website improvements and digital advertising in Jaipur, Rajasthan.', path: '/about' });

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#18181b] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl"
        />

        <div className="container-page relative mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
                <span className="h-2 w-2 rounded-full bg-lime-300" />
                About WebSolution
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Aapke business ke liye
                <span className="block text-lime-400">
                  better digital presence.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Main Dalip Singh hoon. Main businesses ke liye professional
                websites, website improvements aur digital advertising
                solutions par kaam karta hoon — practical planning aur clear
                communication ke saath.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-lime-400 px-6 py-3 font-extrabold text-[#18181b] transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 focus:outline-none focus:ring-4 focus:ring-lime-300/30"
                >
                  Discuss Your Project
                  <FaArrowRight />
                </Link>

                <Link
                  to="/portfolio"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/20 px-6 py-3 font-bold text-white transition duration-300 hover:border-lime-300/60 hover:bg-white/5"
                >
                  Explore Our Work
                  <FaGlobe />
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                {[
                  "Clear communication",
                  "Responsive websites",
                  "Practical solutions",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <FaCheck className="text-lime-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Intro card */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-lime-300/15" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
                    Meet the Developer
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    WebSolution
                  </span>
                </div>

                <div className="mt-5 grid h-20 w-20 place-items-center rounded-3xl border border-lime-300/20 bg-lime-300/10 text-3xl font-black text-lime-300 shadow-inner">
                  DS
                </div>

                <h2 className="mt-4 text-3xl font-black">Dalip Singh</h2>
                <p className="mt-2 text-sm font-bold tracking-wide text-lime-300">
                  WEB DEVELOPMENT & DIGITAL SOLUTIONS
                </p>

                <div className="my-5 h-px bg-white/10" />

                <p className="text-sm leading-7 text-slate-300">
                  Har project ki shuruaat business ko samajhne se hoti hai.
                  Mera focus hai aisi digital solutions par kaam karna jo
                  useful, accessible aur maintain karne mein aasaan hon.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                    <FaCode className="text-xl text-lime-300" />
                    <p className="mt-3 text-sm font-bold">Development</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Structured websites
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                    <FaBullhorn className="text-xl text-lime-300" />
                    <p className="mt-3 text-sm font-bold">Digital Growth</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Advertising solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / mission */}
      <section className="px-4 py-0 md:px-8 lg:px-12">
        <div className="container-page mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.22em] text-lime-600">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Website sirf online presence nahi,
              <span className="text-lime-600"> business ka ek tool hai.</span>
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Aaj customers kisi business ko contact karne se pehle uski
              website aur online presence dekh sakte hain. Ek achhi website
              aapki services samjhane, business ki credibility present karne
              aur customers ko contact karne ka clear raasta dene mein madad
              karti hai.
            </p>

            <p className="mt-3 leading-8 text-slate-600">
              Isi soch ke saath WebSolution mein business ki requirements ke
              hisaab se websites aur digital solutions par focus kiya jata
              hai. Har business alag hota hai, isliye project ki planning bhi
              uski zaroorat ke hisaab se honi chahiye.
            </p>

            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 font-extrabold text-lime-700 transition hover:gap-3"
            >
              Apne project par baat karein
              <FaArrowRight />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex items-start gap-4 border-b border-slate-200 pb-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#18181b] text-lime-300">
                <FaRegLightbulb size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black">Our Approach</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Pehle requirements samajhna, phir suitable solution plan
                  karna aur kaam ko clear steps mein complete karna.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b border-slate-200 py-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#18181b] text-lime-300">
                <FaMobileAlt size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black">User-Friendly Experience</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Design ko mobile aur desktop par easy to use, readable aur
                  well-organized rakhne par focus.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#18181b] text-lime-300">
                <FaSearch size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black">Practical Foundations</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Clean page structure, basic SEO considerations aur
                  maintainable code par dhyan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 px-4 py-0 md:px-8 lg:px-12">
        <div className="container-page mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-lime-600">
              What I Do
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Digital solutions for your business
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Business ki online presence banane, improve karne aur promote
              karne ke liye practical services.
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map(({ icon: Icon, number, title, description, points }) => (
              <article
                key={number}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-300 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#18181b] text-xl text-lime-300 transition group-hover:bg-lime-400 group-hover:text-[#18181b]">
                    <Icon />
                  </div>
                  <span className="text-sm font-black text-slate-300">
                    {number}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {description}
                </p>

                <ul className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600"
                    >
                      <FaCheck className="mt-1 shrink-0 text-lime-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-0 md:px-8 lg:px-12">
        <div className="container-page mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-lime-600">
              How We Work
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Idea se launch tak, clear steps ke saath.
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Har project ki details alag hoti hain, lekin ek organized
              process se requirements aur expectations clear rehti hain.
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ number, icon: Icon, title, description }, index) => (
              <div key={number} className="relative">
                {index !== process.length - 1 && (
                  <div className="absolute left-12 top-6 hidden h-px w-[calc(100%-2rem)] bg-slate-200 lg:block" />
                )}

                <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-lime-200 bg-lime-50 text-lg text-lime-700">
                  <Icon />
                </div>

                <p className="mt-4 text-xs font-black tracking-[0.18em] text-lime-700">
                  STEP {number}
                </p>
                <h3 className="mt-2 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-0 md:px-8 lg:px-12">
        <div className="container-page relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#18181b] px-6 py-6 text-white sm:px-10 sm:py-8 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl"
          />

          <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">
                Have a Project in Mind?
              </span>

              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Chaliye, aapke business ki website par baat karte hain.
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Apni requirements share karein. Hum aapke project ke liye
                suitable next steps discuss kar sakte hain.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-lime-400 px-6 py-4 font-extrabold text-[#18181b] transition hover:-translate-y-0.5 hover:bg-lime-300"
            >
              Contact Us
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
