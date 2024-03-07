import axios from "axios";

const env = import.meta.env.VITE_NODE_ENV;
const devApiUrl = import.meta.env.VITE_DEV_API_URL;
const prodApiUrl = import.meta.env.VITE_PROD_API_URL;

export const apiClient = axios.create({
  baseURL: env === "development" ? `${devApiUrl}` : `${prodApiUrl}`,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("userInfo")) {
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")!).accessToken
      }`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
