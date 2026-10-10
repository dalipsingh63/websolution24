import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBriefcase,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import AdminStatCard from "../../components/admin/AdminStatCard";

import { getAllLeads } from "../../services/leadService";
import { getAllPortfolios } from "../../services/portfolioService";
import { getAllServices } from "../../services/serviceService";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    leads: 0,
    portfolios: 0,
    services: 0,
    publishedServices: 0,
  });

  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      const results = await Promise.allSettled([
        getAllLeads(),
        getAllPortfolios(),
        getAllServices(),
      ]);

      if (!active) return;

      const [leadsResult, portfolioResult, servicesResult] =
        results;

      const failures = [];

      let leads = [];
      let portfolios = [];
      let services = [];

      if (leadsResult.status === "fulfilled") {
        leads = leadsResult.value?.leads || [];
      } else {
        failures.push("Leads");
      }

      if (portfolioResult.status === "fulfilled") {
        portfolios =
          portfolioResult.value?.portfolios || [];
      } else {
        failures.push("Portfolio");
      }

      if (servicesResult.status === "fulfilled") {
        services = servicesResult.value?.services || [];
      } else {
        failures.push("Services");
      }

      setStats({
        leads: leads.length,
        portfolios: portfolios.length,
        services: services.length,
        publishedServices: services.filter(
          (service) =>
            service.status === "Published" &&
            service.isActive
        ).length,
      });

      setRecentLeads(
        [...leads]
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          )
          .slice(0, 5)
      );

      if (failures.length) {
        setError(
          `${failures.join(", ")} data load nahi ho paya. Backend routes aur API connection check karein.`
        );
      }

      setLoading(false);
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Leads, Portfolio aur Services ka overview.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
            >
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              title="Total Leads"
              value={loading ? "—" : stats.leads}
              subtitle="Customer enquiries"
              icon={FaUsers}
              iconClass="bg-lime-400/10 text-lime-400"
            />

            <AdminStatCard
              title="Portfolio Projects"
              value={loading ? "—" : stats.portfolios}
              subtitle="All saved projects"
              icon={FaBriefcase}
              iconClass="bg-yellow-400/10 text-yellow-600"
            />

            <AdminStatCard
              title="Total Services"
              value={loading ? "—" : stats.services}
              subtitle="All saved services"
              icon={FaGlobe}
              iconClass="bg-lime-400/10 text-lime-600"
            />

            <AdminStatCard
              title="Published Services"
              value={loading ? "—" : stats.publishedServices}
              subtitle="Active on public website"
              icon={FaGlobe}
              iconClass="bg-green-500/10 text-green-600"
            />
          </div>

          <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h3 className="font-black text-slate-900">
                  Recent Leads
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Latest customer enquiries
                </p>
              </div>

              <Link
                to="/admin/leads"
                className="flex items-center gap-2 text-xs font-black text-lime-600 hover:text-lime-700"
              >
                View All <FaArrowRight />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        Dashboard data load ho raha hai...
                      </td>
                    </tr>
                  ) : recentLeads.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        Abhi koi lead nahi hai.
                      </td>
                    </tr>
                  ) : (
                    recentLeads.map((lead) => (
                      <tr
                        key={lead._id}
                        className="hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 font-bold text-slate-800">
                          {lead.name}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {lead.phone}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {lead.service || "—"}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {formatDate(lead.createdAt)}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-lime-50 px-3 py-1 text-xs font-bold text-lime-700">
                            {lead.status || "New"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Link
              to="/admin/services"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-lime-300 hover:shadow-lg"
            >
              <h3 className="font-black">Manage Services</h3>
              <p className="mt-2 text-sm text-slate-500">
                Services add, edit, publish aur deactivate karein.
              </p>
            </Link>

            <Link
              to="/admin/portfolio"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-lime-300 hover:shadow-lg"
            >
              <h3 className="font-black">Manage Portfolio</h3>
              <p className="mt-2 text-sm text-slate-500">
                Projects add aur update karein.
              </p>
            </Link>

            <Link
              to="/admin/leads"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-lime-300 hover:shadow-lg"
            >
              <h3 className="font-black">Manage Leads</h3>
              <p className="mt-2 text-sm text-slate-500">
                Customer enquiries aur status manage karein.
              </p>
            </Link>
          </div>
    </div>
  );
}