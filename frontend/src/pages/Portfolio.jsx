import useSEO from "../utils/useSEO";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaExternalLinkAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { getPublicPortfolios } from "../services/portfolioService";

export default function Portfolio() {
  useSEO({ title: 'Website Design Portfolio | DS Digital Studio ', description: 'View selected website development and design projects by Dalip Singh Web Solutions in Jaipur, Rajasthan.', path: '/portfolio' });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPortfolios = async () => {
    try {
      setLoading(true);

      const data = await getPublicPortfolios();

      const publishedProjects = (data.portfolios || []).filter(
        (project) =>
          project.status === "Published" &&
          project.isActive === true
      );

      setProjects(publishedProjects);
    } catch (error) {
      console.error("Failed to load portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-[#18181b] px-4 py-20 text-white md:px-8 lg:px-12">
        <div className="container-page mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-black tracking-wider text-lime-400">
            MY WORK
          </span>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Featured <span className="text-lime-400">Work</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Kuch selected projects aur websites jo modern design,
            responsiveness aur business requirements ko dhyan mein rakhkar
            banayi gayi hain.
          </p>
        </div>
      </section>

      {/* Projects */}
     <section className="px-4 pt-10 pb-0 sm:pt-12 sm:pb-0 md:px-8 lg:px-12">
        <div className="container-page mx-auto max-w-6xl">
          {loading ? (
            <div className="py-16 text-center">
              <p className="font-bold text-slate-500">
                Loading projects...
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
              <p className="font-black text-slate-700">
                No projects available yet.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                New projects will appear here soon.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="grid gap-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.08)] lg:grid-cols-2"
                >
                  {/* Preview */}
                  <div className="bg-slate-100 p-6 md:p-10">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                      <div className="flex items-center gap-2 border-b bg-slate-50 px-4 py-3">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-yellow-400" />
                        <span className="h-3 w-3 rounded-full bg-green-400" />
                      </div>

                      {project.image?.url ? (
                        <img
                          src={project.image.url}
                          alt={project.title}
                          className="h-72 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-72 items-center justify-center bg-[#18181b] text-xl font-black text-lime-400">
                          {project.title}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <span className="text-xs font-black tracking-[0.2em] text-lime-400">
                      {project.category}
                    </span>

                    <h2 className="mt-4 text-3xl font-black">
                      {project.title}
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                      {project.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        "Responsive website",
                        "Business-focused design",
                        "Mobile-friendly layout",
                        "Modern professional design",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm font-semibold"
                        >
                          <FaCheckCircle className="text-lime-400" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#18181b] px-5 py-3 font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#03264c]"
                        >
                          Visit Website
                          <FaExternalLinkAlt />
                        </a>
                      )}

                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-black text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:text-lime-400"
                      >
                        Start Your Project
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}