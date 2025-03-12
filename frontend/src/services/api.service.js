import axios from "axios";

const createApiClient = (baseUrl) => {
  const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return apiClient;
};

export default createApiClient;
