
import {
  FaComments,
  FaClipboardList,
  FaPalette,
  FaCode,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: FaComments,
    title: "Baat Karein",
    text: "Business aur aapki requirements ko samajhna.",
  },
  {
    number: "02",
    icon: FaClipboardList,
    title: "Planning",
    text: "Pages, features aur project scope decide karna.",
  },
  {
    number: "03",
    icon: FaPalette,
    title: "Design",
    text: "Website ka layout aur visual direction tayyar karna.",
  },
  {
    number: "04",
    icon: FaCode,
    title: "Development",
    text: "Approved design ko responsive website mein banana.",
  },
  {
    number: "05",
    icon: FaRocket,
    title: "Launch",
    text: "Testing aur final review ke baad website live karna.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-0 -z-10 h-64 w-64 rounded-full bg-lime-200/25 blur-3xl"
      />

      <div className="container-page relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-white px-4 py-2 text-[11px] font-black tracking-[0.18em] text-lime-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            HOW IT WORKS
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#18181b] sm:text-4xl lg:text-[42px]">
            Idea Se
            <span className="block text-lime-600">
              Live Website Tak
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Clear steps aur organized process ke saath apne project ko aage
            badhayein.
          </p>

          <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-lime-400 to-lime-500" />
        </div>

        {/* Process steps */}
        <div className="relative mt-9 sm:mt-10">
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-lime-200 via-slate-300 to-lime-200 lg:block"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {steps.map(({ number, icon: Icon, title, text }) => (
              <article
                key={number}
                className="group relative rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-lime-200 hover:shadow-lg lg:border-transparent lg:bg-transparent lg:shadow-none lg:hover:border-lime-100 lg:hover:bg-white/70"
              >
                {/* Icon */}
                <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-lime-200 bg-white text-xl text-lime-700 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition duration-300 group-hover:border-lime-400 group-hover:bg-[#18181b] group-hover:text-lime-300">
                  <Icon />
                </div>

                {/* Step label */}
                <div className="mt-4 inline-flex rounded-full bg-lime-50 px-3 py-1 text-[10px] font-black tracking-[0.16em] text-lime-700">
                  STEP {number}
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#18181b]">
                  {title}
                </h3>

                <p className="mx-auto mt-2 max-w-[190px] text-xs leading-6 text-slate-600 sm:text-sm">
                  {text}
                </p>

                {/* Small arrow on desktop */}
                {number !== "05" && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-7 hidden translate-x-1/2 text-[10px] text-lime-400 lg:block"
                  >
                    <FaArrowRight />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
