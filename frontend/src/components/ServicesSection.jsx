
import { useEffect, useState } from "react";

import ServiceCard from "./ServiceCard";
import { getActiveServices } from "../services/serviceService";
import { getServiceIcon } from "../utils/icons";

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getActiveServices()
      .then((response) => {
        if (active && response?.success) {
          setServices(
            Array.isArray(response.services)
              ? response.services
              : []
          );
        }
      })
      .catch((error) => {
        console.error("Home Services Load Error:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      {/* Subtle background effects */}
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
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-white px-4 py-2 text-[11px] font-black tracking-[0.18em] text-lime-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            WHAT I DO
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#18181b] sm:text-4xl lg:text-[42px]">
            Website Se Lekar
            <span className="block text-lime-600">
              Digital Growth Tak
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Business ki online presence banane, improve karne aur promote
            karne ke liye practical digital solutions — aapki requirements
            aur business goals ko dhyan mein rakhkar.
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-lime-400 to-lime-500" />
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-60 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-11 w-11 rounded-xl bg-slate-200" />
                <div className="mt-6 h-4 w-2/3 rounded bg-slate-200" />
                <div className="mt-4 h-3 w-full rounded bg-slate-100" />
                <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
                <div className="mt-6 h-8 w-28 rounded-lg bg-slate-100" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          /* Empty state */
          <div className="mx-auto mt-9 max-w-lg rounded-2xl border border-slate-200 bg-white px-6 py-9 text-center shadow-sm">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-lime-50 text-xl font-black text-lime-700">
              !
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-[#18181b]">
              Services abhi available nahi hain
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Kripya baad mein dobara check karein ya apne project ke baare
              mein humse contact karein.
            </p>
          </div>
        ) : (
          /* Services from API */
          <div className="mt-9 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((service) => {
              const Icon = getServiceIcon(service.icon);

              return (
                <ServiceCard
                  key={service._id || service.title}
                  icon={<Icon />}
                  title={service.title}
                  text={service.text}
                  image={service.image}
                  features={service.features || []}
                  accent={service.accent || "lime"}
                  link={service.link || "/contact"}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
