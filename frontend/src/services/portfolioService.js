
import API from "./api";

// Public website: published + active projects only
export const getPublicPortfolios = async () => {
  const response = await API.get("/portfolio/public");
  return response.data;
};

// Admin: all portfolios (requires admin token)
export const getAllPortfolios = async () => {
  const response = await API.get("/portfolio");

  return response.data;
};

// CREATE PORTFOLIO
export const createPortfolio = async (formData) => {
  const response = await API.post("/portfolio", formData);

  return response.data;
};

// UPDATE PORTFOLIO
export const updatePortfolio = async (id, formData) => {
  const response = await API.put(`/portfolio/${id}`, formData);

  return response.data;
};

// DELETE PORTFOLIO
export const deletePortfolio = async (id) => {
  const response = await API.delete(`/portfolio/${id}`);

  return response.data;
};
