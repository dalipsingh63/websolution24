import { useEffect, useState } from "react";
import { FaEye, FaTrash, FaWhatsapp } from "react-icons/fa";

import AdminPageHeader from "../../components/admin/AdminPageHeader";

import {
  getAllLeads,
  updateLead,
  deleteLead,
} from "../../services/leadService";

export default function ManageLeads() {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected lead for View Modal
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllLeads();

        if (response.success) {
          setLeads(response.leads);
        } else {
          setError(response.message || "Leads load nahi ho saki.");
        }
      } catch (error) {
        console.error("Fetch Leads Error:", error);
        setError("Leads load nahi ho saki.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // UPDATE LEAD STATUS
  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateLead(id, {
        status: status,
      });

      if (response.success) {
        setLeads((currentLeads) =>
          currentLeads.map((lead) =>
            lead._id === id
              ? {
                  ...lead,
                  status: status,
                }
              : lead
          )
        );

        // Modal mein wahi lead open ho to uska status bhi update karo
        setSelectedLead((currentLead) =>
          currentLead?._id === id
            ? {
                ...currentLead,
                status: status,
              }
            : currentLead
        );
      } else {
        alert(response.message || "Status update nahi ho saka.");
      }
    } catch (error) {
      console.error("Update Lead Status Error:", error);
      alert("Status update nahi ho saka.");
    }
  };

  // DELETE LEAD
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap is lead ko delete karna chahte hain?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteLead(id);

      if (response.success) {
        setLeads((currentLeads) =>
          currentLeads.filter((lead) => lead._id !== id)
        );

        // Agar deleted lead modal mein open thi
        if (selectedLead?._id === id) {
          setSelectedLead(null);
        }
      } else {
        alert(response.message || "Lead delete nahi ho saki.");
      }
    } catch (error) {
      console.error("Delete Lead Error:", error);
      alert("Lead delete nahi ho saki.");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
          <AdminPageHeader
            title="Leads"
            description="Website se aane wali customer enquiries."
          />

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#18181b] text-xs uppercase text-white">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        Loading leads...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        Abhi koi lead nahi hai.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
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
                          {lead.service}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {formatDate(lead.createdAt)}
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(
                                lead._id,
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-lime-400"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>

                        {/* ACTIONS */}
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            {/* VIEW */}
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500 hover:bg-lime-50 hover:text-lime-400"
                            >
                              <FaEye />
                            </button>

                            {/* WHATSAPP */}
                            <a
                              href={`https://wa.me/91${lead.phone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="grid h-8 w-8 place-items-center rounded-lg bg-green-50 text-green-500 hover:bg-green-100"
                            >
                              <FaWhatsapp />
                            </a>

                            {/* DELETE */}
                            <button
                              type="button"
                              onClick={() => handleDelete(lead._id)}
                              className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

      {/* ================= VIEW LEAD MODAL ================= */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Lead Details
                </h2>

                <p className="text-sm text-slate-500">
                  Customer enquiry details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-2xl leading-none text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Name
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selectedLead.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Phone
                </p>
                <p className="mt-1 text-slate-700">
                  {selectedLead.phone}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Email
                </p>
                <p className="mt-1 text-slate-700">
                  {selectedLead.email || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Service
                </p>
                <p className="mt-1 text-slate-700">
                  {selectedLead.service || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Message
                </p>

                <div className="mt-1 rounded-lg bg-slate-50 p-3 text-slate-700">
                  {selectedLead.message || "No message"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Status
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-lime-50 px-3 py-1 text-xs font-bold text-lime-600">
                    {selectedLead.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-slate-700">
                    {formatDate(selectedLead.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>

              <a
                href={`https://wa.me/91${selectedLead.phone}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
