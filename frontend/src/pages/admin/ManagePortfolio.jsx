
import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

import AdminPageHeader from "../../components/admin/AdminPageHeader";

import {
  getAllPortfolios,
  deletePortfolio,
} from "../../services/portfolioService";

import PortfolioForm from "../../components/admin/portfolio/PortfolioForm";

export default function ManagePortfolio() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const loadPortfolios = async () => {
    try {
      setLoading(true);

      const data = await getAllPortfolios();

      setProjects(data.portfolios || []);
    } catch (error) {
      console.error("Failed to load portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  // ADD
  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  // EDIT
  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  // DELETE
  const handleDeleteProject = async (project) => {
    const confirmed = window.confirm(
      `Kya aap "${project.title}" ko delete karna chahte hain?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deletePortfolio(project._id);

      await loadPortfolios();

      alert("Portfolio successfully delete ho gaya.");
    } catch (error) {
      console.error("Delete Portfolio Error:", error);

      alert(
        error.response?.data?.message ||
          "Portfolio delete nahi ho paya."
      );
    }
  };

  // FORM SUCCESS
  const handleFormSuccess = async () => {
    await loadPortfolios();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
          <AdminPageHeader
            title="Portfolio"
            description="Apne completed projects manage karein."
            action={
              <button
                onClick={handleAddProject}
                className="flex items-center gap-2 rounded-xl bg-[#18181b] px-4 py-3 text-sm font-black text-white"
              >
                <FaPlus />
                Add Project
              </button>
            }
          />

          {loading ? (
            <div className="py-16 text-center text-sm font-bold text-slate-500">
              Loading portfolios...
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="font-bold text-slate-600">
                Abhi koi portfolio project nahi hai.
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Add Project button se apna first project add karein.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Image */}
                  <div className="h-44 overflow-hidden bg-[#18181b]">
                    {project.image?.url ? (
                      <img
                        src={project.image.url}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-4xl font-black text-lime-400">
                        DS
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-black text-slate-900">
                        {project.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black ${
                          project.status === "Published"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {project.category}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() =>
                          handleEditProject(project)
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold hover:border-lime-400 hover:text-lime-400"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteProject(project)
                        }
                        className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                      >
                        <FaTrash />
                        Delete
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500 hover:bg-lime-50 hover:text-lime-400"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add / Edit Form */}
          {showForm && (
            <PortfolioForm
              project={editingProject}
              onClose={() => {
                setShowForm(false);
                setEditingProject(null);
              }}
              onSuccess={handleFormSuccess}
            />
          )}
    </div>
  );
}
