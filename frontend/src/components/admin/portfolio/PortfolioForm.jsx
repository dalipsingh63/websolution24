
import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

import {
  createPortfolio,
  updatePortfolio,
} from "../../../services/portfolioService";

export default function PortfolioForm({
  onClose,
  onSuccess,
  project = null,
}) {
  const isEditMode = Boolean(project);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    liveUrl: "",
    status: "Published",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        category: project.category || "",
        description: project.description || "",
        liveUrl: project.liveUrl || "",
        status: project.status || "Published",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("liveUrl", formData.liveUrl);
      data.append("status", formData.status);
      data.append("isActive", "true");

      if (image) {
        data.append("image", image);
      }

      let response;

      if (isEditMode) {
        response = await updatePortfolio(project._id, data);
      } else {
        response = await createPortfolio(data);
      }

      console.log("Portfolio Response:", response);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Portfolio Save Error:", error);

      alert(
        error.response?.data?.message ||
          "Portfolio save nahi ho paya."
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
                ? "Edit Portfolio Project"
                : "Add Portfolio Project"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Project ki details update karein."
                : "Apna completed project add karein."}
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
              Project Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Kusum Solar"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            >
              <option value="">Select Category</option>
              <option value="Business Website">
                Business Website
              </option>
              <option value="E-Commerce Website">
                E-Commerce Website
              </option>
              <option value="Portfolio Website">
                Portfolio Website
              </option>
              <option value="Landing Page">
                Landing Page
              </option>
              <option value="Custom Website">
                Custom Website
              </option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project ke baare me short description..."
              rows="4"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Live Website URL
            </label>

            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
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
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Current Image */}
          {isEditMode && project?.image?.url && !image && (
            <div>
              <p className="mb-2 text-sm font-bold text-slate-700">
                Current Image
              </p>

              <img
                src={project.image.url}
                alt={project.title}
                className="h-32 w-full rounded-xl object-cover"
              />
            </div>
          )}

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              {isEditMode
                ? "Replace Project Image (Optional)"
                : "Project Image"}
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-lime-400 hover:bg-lime-50/30">
              <FaCloudUploadAlt className="text-3xl text-lime-400" />

              <p className="mt-3 text-sm font-bold text-slate-700">
                {image
                  ? image.name
                  : "Upload project image"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                JPG, PNG, WEBP — Maximum 5MB
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

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
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
