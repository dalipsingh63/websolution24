import useSEO from "../utils/useSEO";
import { useState } from "react";
import {
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import { createLead } from "../services/leadService";

export default function Contact() {
  useSEO({ title: 'Contact Website Developer in Jaipur | Dalip Singh', description: 'Contact DS Digital Studio for business websites, e-commerce development, website redesign, maintenance and digital advertising in Jaipur, Rajasthan.', path: '/contact' });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save lead in MongoDB
      const response = await createLead(form);

      if (!response.success) {
        alert(response.message || "Lead save nahi ho saki.");
        return;
      }

      // WhatsApp message
      const message = `
Hello Dalip,

Name: ${form.name}
Phone: ${form.phone}
Service: ${form.service}

Message:
${form.message}
      `.trim();

      const whatsappUrl = `https://wa.me/917740972863?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");

      // Reset form after successful submission
      setForm({
        name: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Lead Submit Error:", error);

      alert("Lead save nahi ho saki. Please try again.");
    }
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-[#18181b] px-4 py-12 text-white sm:py-14 md:px-8 lg:px-12 lg:py-16">
        <div className="container-page mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-black tracking-wider text-lime-400">
            GET IN TOUCH
          </span>

          <h1 className="mt-5 text-4xl font-black md:text-5xl">
            Let's Talk About Your{" "}
            <span className="text-lime-400">Project</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Website banwani hai, purani website update karni hai ya Ads ke
            through business promote karna hai? Message karein.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 pt-6 pb-2 sm:pt-8 sm:pb-3 md:px-8 lg:px-12">
        <div className="container-page mx-auto grid max-w-6xl gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Info */}
          <div className="lg:col-span-2">
            <span className="text-xs font-black tracking-[0.2em] text-lime-400">
              CONTACT DETAILS
            </span>

            <h2 className="mt-3 text-3xl font-black">
              Baat Karte Hain
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Apni requirement simple words mein bata sakte hain. Main
              requirement samajhkar next steps discuss karunga.
            </p>

            <div className="mt-6 space-y-4">
              <a
                href="https://wa.me/917740972863"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-300"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-green-500 text-xl text-white">
                  <FaWhatsapp />
                </span>

                <div>
                  <div className="text-xs font-bold text-slate-500">
                    WHATSAPP
                  </div>
                  <div className="font-black">Chat on WhatsApp</div>
                </div>
              </a>

              <a
                href="tel:+917740972863"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-lime-300"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime-400 text-xl text-[#18181b]">
                  <FaPhone />
                </span>

                <div>
                  <div className="text-xs font-bold text-slate-500">
                    CALL
                  </div>
                  <div className="font-black">+91 77409 72863</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-yellow-400 text-xl text-[#18181b]">
                  <FaMapMarkerAlt />
                </span>

                <div>
                  <div className="text-xs font-bold text-slate-500">
                    LOCATION
                  </div>
                  <div className="font-black">Jaipur, Rajasthan</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] sm:p-6 md:p-8"
            >
              <h2 className="text-2xl font-black">
                Send Your Requirement
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Form submit karne ke baad WhatsApp message open hoga.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-bold"
                  >
                    Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-bold"
                  >
                    Phone
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your phone number"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-service"
                  className="mb-2 block text-sm font-bold"
                >
                  Service
                </label>

                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                >
                  <option value="">Select a service</option>
                  <option value="Business Website">
                    Business Website
                  </option>
                  <option value="E-commerce Website">
                    E-commerce Website
                  </option>
                  <option value="Website Redesign">
                    Website Redesign
                  </option>
                  <option value="Website Maintenance">
                    Website Maintenance
                  </option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-bold"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Apne project ke baare mein bataiye..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                />
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-black text-white shadow-[0_5px_0_#15803d] transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 active:translate-y-1"
              >
                Send on WhatsApp
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}