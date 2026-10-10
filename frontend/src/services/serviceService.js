import API from "./api";

// Public website: Published + Active services
export const getActiveServices = async () => {
  const response = await API.get("/services/active");
  return response.data;
};

// Admin: All services
export const getAllServices = async () => {
  const response = await API.get("/services");
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await API.get(`/services/${id}`);
  return response.data;
};

export const createService = async (serviceData) => {
  const response = await API.post("/services", serviceData);
  return response.data;
};

export const updateService = async (id, serviceData) => {
  const response = await API.put(`/services/${id}`, serviceData);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await API.delete(`/services/${id}`);
  return response.data;
};