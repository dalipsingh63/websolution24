import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

import {
  createService,
  updateService,
} from "../../../services/serviceService";

export default function ServiceForm({
  service = null,
  onClose,
  onSuccess,
}) {
  const isEditMode = Boolean(service);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    features: "",
    icon: "FaGlobe",
    accent: "cyan",
    link: "/contact",
    status: "Published",
    isActive: true,
    order: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        text: service.text || "",
        features: Array.isArray(service.features)
          ? service.features.join("\n")
          : "",
        icon: service.icon || "FaGlobe",
        accent: service.accent || "cyan",
        link: service.link || "/contact",
        status: service.status || "Published",
        isActive: service.isActive ?? true,
        order: service.order ?? 0,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        text: formData.text,

        features: formData.features
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        icon: formData.icon,
        accent: formData.accent,
        link: formData.link,
        status: formData.status,
        isActive: formData.isActive,
        order: Number(formData.order),
      };

      if (isEditMode) {
        await updateService(service._id, payload);
      } else {
        await createService(payload);
      }

      await onSuccess();

      onClose();
    } catch (error) {
      console.error("Service Save Error:", error);

      alert(
        error.response?.data?.message ||
          "Service save nahi ho payi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-black text-slate-900">
              {isEditMode
                ? "Edit Service"
                : "Add Service"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Service ki details update karein."
                : "Nayi service add karein."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500"
          >
            <FaTimes />
          </button>

        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Service Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Business Website"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            />
          </div>


          {/* Text */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Service Description
            </label>

            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Service ke baare mein short description..."
              rows="4"
              required
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            />
          </div>


          {/* Features */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Features
            </label>

            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder={`Mobile Responsive
Modern UI Design
Basic SEO Setup`}
              rows="5"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Har feature ko new line mein likhein.
            </p>
          </div>


          {/* Icon */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Icon
            </label>

            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            >
              <option value="FaGlobe">
                Globe
              </option>

              <option value="FaShoppingCart">
                Shopping Cart
              </option>

              <option value="FaPaintBrush">
                Paint Brush
              </option>

              <option value="FaTools">
                Tools
              </option>

              <option value="FaGoogle">
                Google
              </option>

              <option value="FaBullhorn">
                Bullhorn
              </option>
            </select>
          </div>


          {/* Accent */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Accent Color
            </label>

            <select
              name="accent"
              value={formData.accent}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            >
              <option value="cyan">
                Cyan
              </option>

              <option value="yellow">
                Yellow
              </option>

              <option value="green">
                Green
              </option>
            </select>
          </div>


          {/* Link */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Link
            </label>

            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="/contact"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            />
          </div>


          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            >
              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>
          </div>


          {/* Order */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Display Order
            </label>

            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            />
          </div>


          {/* Active */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
              className="h-4 w-4 accent-lime-400"
            />

            <span className="text-sm font-bold text-slate-700">
              Service Active
            </span>
          </label>


          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#18181b] px-5 py-3 text-sm font-black text-white hover:bg-[#062342] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Service"
                : "Create Service"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}