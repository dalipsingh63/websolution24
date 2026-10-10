import API from "./api";

// CREATE LEAD
export const createLead = async (leadData) => {
  const response = await API.post("/leads", leadData);

  return response.data;
};

// GET ALL LEADS
export const getAllLeads = async () => {
  const response = await API.get("/leads");

  return response.data;
};

// GET SINGLE LEAD
export const getLeadById = async (id) => {
  const response = await API.get(`/leads/${id}`);

  return response.data;
};

// UPDATE LEAD
export const updateLead = async (id, leadData) => {
  const response = await API.put(`/leads/${id}`, leadData);

  return response.data;
};

// DELETE LEAD
export const deleteLead = async (id) => {
  const response = await API.delete(`/leads/${id}`);

  return response.data;
};