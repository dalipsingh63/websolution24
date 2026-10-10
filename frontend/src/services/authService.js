import API from "./api";

export const adminLogin = async (email, password) => {
  const response = await API.post("/admin/login", {
    email,
    password,
  });

  return response.data;
};