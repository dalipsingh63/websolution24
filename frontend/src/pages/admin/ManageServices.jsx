import { useCallback, useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { getServiceIcon } from "../../utils/icons";

import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../../services/serviceService";

const emptyForm = {
  title: "",
  text: "",
  featuresText: "",
  image: "",
  icon: "FaGlobe",
  accent: "cyan",
  link: "/contact",
  status: "Published",
  isActive: true,
  order: 0,
};

const iconOptions = [
  ["FaGlobe", "Globe — Business Website"],
  ["FaShoppingCart", "Shopping Cart — E-commerce"],
  ["FaPaintBrush", "Paint Brush — Redesign"],
  ["FaTools", "Tools — Maintenance"],
  ["FaGoogle", "Google — Google Ads"],
  ["FaBullhorn", "Bullhorn — Meta Ads"],
];

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllServices();

      if (!response?.success) {
        throw new Error(
          response?.message || "Services load nahi hui."
        );
      }

      setServices(
        Array.isArray(response.services)
          ? response.services
          : []
      );
    } catch (err) {
      console.error("Load Services Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Services load nahi hui. Backend/API check karein."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const openAddForm = () => {
    setEditingService(null);

    setForm({
      ...emptyForm,
      order: services.length + 1,
    });

    setError("");
    setNotice("");
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setEditingService(service);

    setForm({
      title: service.title || "",
      text: service.text || "",
      featuresText: Array.isArray(service.features)
        ? service.features.join("\n")
        : "",
      image: service.image || "",
      icon: service.icon || "FaGlobe",
      accent: service.accent || "cyan",
      link: service.link || "/contact",
      status: service.status || "Published",
      isActive: service.isActive !== false,
      order: Number(service.order) || 0,
    });

    setError("");
    setNotice("");
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      title: form.title.trim(),
      text: form.text.trim(),

      features: form.featuresText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      image: form.image.trim(),

      icon: form.icon,
      accent: form.accent,
      link: form.link.trim() || "/contact",
      status: form.status,
      isActive: Boolean(form.isActive),
      order: Number(form.order) || 0,
    };

    try {
      const response = editingService
        ? await updateService(editingService._id, payload)
        : await createService(payload);

      if (!response?.success) {
        throw new Error(
          response?.message || "Service save nahi hui."
        );
      }

      setShowForm(false);
      setEditingService(null);
      setForm(emptyForm);

      setNotice(
        editingService
          ? "Service successfully update ho gayi."
          : "Service successfully add ho gayi."
      );

      await loadServices();
    } catch (err) {
      console.error("Save Service Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Service save nahi hui."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service) => {
    const confirmed = window.confirm(
      `Kya aap "${service.title}" service delete karna chahte hain?`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      const response = await deleteService(service._id);

      if (!response?.success) {
        throw new Error(
          response?.message || "Service delete nahi hui."
        );
      }

      setServices((current) =>
        current.filter((item) => item._id !== service._id)
      );

      setNotice("Service delete ho gayi.");
    } catch (err) {
      console.error("Delete Service Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Service delete nahi hui."
      );
    }
  };

  const handleQuickActiveToggle = async (service) => {
    const nextActive = !service.isActive;

    try {
      setError("");

      const response = await updateService(service._id, {
        isActive: nextActive,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Status update nahi hua."
        );
      }

      setServices((current) =>
        current.map((item) =>
          item._id === service._id
            ? { ...item, isActive: nextActive }
            : item
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Status update nahi hua."
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
          <AdminPageHeader
            title="Services"
            description="Website ki services yahan se add, edit aur manage karein."
            action={
              <button
                type="button"
                onClick={openAddForm}
                className="flex items-center gap-2 rounded-xl bg-[#18181b] px-4 py-3 text-sm font-black text-white hover:bg-[#03264c]"
              >
                <FaPlus />
                Add Service
              </button>
            }
          />

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {notice && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
            >
              {notice}
            </div>
          )}

          <div className="mb-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total Services</p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {services.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Published & Active
              </p>
              <p className="mt-1 text-3xl font-black text-green-600">
                {
                  services.filter(
                    (s) =>
                      s.status === "Published" &&
                      s.isActive
                  ).length
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Draft / Inactive
              </p>
              <p className="mt-1 text-3xl font-black text-amber-600">
                {
                  services.filter(
                    (s) =>
                      s.status !== "Published" ||
                      !s.isActive
                  ).length
                }
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center font-semibold text-slate-500">
              Services load ho rahi hain...
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="font-bold text-slate-700">
                Abhi koi service add nahi hai.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Add Service button se pehli service add karein.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[...services]
                .sort(
                  (a, b) =>
                    (Number(a.order) || 0) -
                    (Number(b.order) || 0)
                )
                .map((service) => {
                  const Icon = getServiceIcon(service.icon);

                  const visible =
                    service.status === "Published" &&
                    service.isActive;

                  return (
                    <article
                      key={service._id}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      {service.image && (
                        <img src={service.image} alt={service.title} loading="lazy" className="mb-4 h-36 w-full rounded-xl object-cover" />
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-lime-50 text-xl text-lime-600">
                          <Icon />
                        </div>

                        <div className="flex flex-wrap justify-end gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-black ${
                              service.status === "Published"
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {service.status || "Draft"}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-black ${
                              service.isActive
                                ? "bg-lime-50 text-lime-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {service.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-5 text-lg font-black text-slate-900">
                        {service.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                        {service.text}
                      </p>

                      {service.features?.length > 0 && (
                        <ul className="mt-4 space-y-1 text-xs text-slate-600">
                          {service.features
                            .slice(0, 3)
                            .map((feature, index) => (
                              <li key={`${feature}-${index}`}>
                                ✓ {feature}
                              </li>
                            ))}
                        </ul>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <input
                            type="checkbox"
                            checked={Boolean(service.isActive)}
                            onChange={() =>
                              handleQuickActiveToggle(service)
                            }
                            className="h-4 w-4 accent-lime-400"
                          />
                          Active
                        </label>

                        <span className="text-xs text-slate-400">
                          Order: {service.order ?? 0}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(service)}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold hover:border-lime-400 hover:text-lime-600"
                        >
                          <FaEdit /> Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(service)}
                          className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                        >
                          <FaTrash /> Delete
                        </button>

                        <span
                          className={`ml-auto text-[10px] font-bold ${
                            visible ? "text-green-600" : "text-slate-400"
                          }`}
                        >
                          {visible
                            ? "Visible on website"
                            : "Hidden from website"}
                        </span>
                      </div>
                    </article>
                  );
                })}
            </div>
          )}

      {showForm && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !saving
            ) {
              setShowForm(false);
            }
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="my-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {editingService ? "Edit Service" : "Add Service"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Service ki details fill karein.
                </p>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() => setShowForm(false)}
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                aria-label="Close form"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
              <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
                Service Title *
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={120}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-lime-400"
                  placeholder="E-commerce Website"
                />
              </label>

              <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
                Text / Description *
                <textarea
                  required
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  rows={3}
                  maxLength={1000}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-lime-400"
                  placeholder="Service ke baare mein likhein"
                />
              </label>

              <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
                Service Image URL (optional)
                <input
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-lime-400"
                  placeholder="https://example.com/service-image.jpg"
                />
                <span className="mt-1 block text-xs font-normal text-slate-500">Image URL dene par ye image website par show hogi. Khali chhodne par title ke hisaab se relevant image use hogi.</span>
              </label>

              <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
                Features — har feature alag line par
                <textarea
                  name="featuresText"
                  value={form.featuresText}
                  onChange={handleChange}
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-lime-400"
                  placeholder={"Responsive Design\nOnline Payment Integration\nAdmin Management"}
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Icon
                <select
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal"
                >
                  {iconOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Accent Color
                <select
                  name="accent"
                  value={form.accent}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal"
                >
                  <option value="cyan">Cyan</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                </select>
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Link
                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal"
                  placeholder="/contact"
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Display Order
                <input
                  type="number"
                  min="0"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal"
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Publication Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>

              <label className="flex items-center gap-3 self-end rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={Boolean(form.isActive)}
                  onChange={handleChange}
                  className="h-4 w-4 accent-lime-400"
                />
                Active — website par dikhane ke liye
              </label>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4 sm:px-7">
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-[#18181b] px-5 py-3 text-sm font-black text-white disabled:opacity-60"
              >
                <FaSave />
                {saving
                  ? "Saving..."
                  : editingService
                    ? "Save Changes"
                    : "Create Service"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}