import useSEO from "../utils/useSEO";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import ServiceCard from "../components/ServiceCard";
import { getActiveServices } from "../services/serviceService";
import { getServiceIcon } from "../utils/icons";

export default function Services() {
  useSEO({ title: 'Website Development Services in Jaipur | Dalip Singh', description: 'Explore business website development, e-commerce websites, redesign, maintenance and digital advertising services in Jaipur, Rajasthan.', path: '/services' });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getActiveServices()
      .then((response) => {
        if (!active) return;

        if (response?.success) {
          setServices(
            Array.isArray(response.services)
              ? response.services
              : []
          );
        } else {
          setError(
            response?.message || "Services load nahi ho paayi."
          );
        }
      })
      .catch((err) => {
        console.error("Services Page Load Error:", err);

        if (active) {
          setError(
            "Services load nahi ho paayi. Thodi der baad dobara try karein."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#18181b] px-4 py-14 text-white sm:py-16 md:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-lime-400/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl"
        />

        <div className="container-page relative mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-black tracking-wider text-lime-400">
            WHAT I DO
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            Website &{" "}
            <span className="text-lime-400">Digital Growth</span>{" "}
            Services
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:text-lg">
            Business website se lekar Google, Facebook aur Instagram Ads
            tak — aapke business ko online grow karne ke liye practical
            solutions.
          </p>
        </div>
      </section>

      {/* Services from API */}
      <section className="px-4 pt-10 pb-0 sm:pt-12 sm:pb-0 md:px-8 lg:px-12">
        <div className="container-page mx-auto max-w-6xl">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-sm text-amber-800"
            >
              {error}
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              Abhi services available nahi hain.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

      {/* CTA */}
      <section className="px-4 pt-0 pb-0 md:px-8 lg:px-12">
        <div className="container-page mx-auto max-w-6xl">
          <div className="rounded-3xl bg-[#18181b] p-6 text-center text-white sm:p-8 md:p-10">
            <h2 className="text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
              Apne Business Ke Liye Website Chahiye?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base">
              Apne business ke baare mein bataiye. Hum requirement samajhkar
              aapke liye suitable solution discuss karenge.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3 font-black text-[#18181b] shadow-[0_4px_0_#0891b2] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-300 active:translate-y-0"
            >
              Baat Karein
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
