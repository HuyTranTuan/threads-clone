import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

export const httpClient = axios.create({
  baseURL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

let isRefreshing = false;

let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const result = await axios.post(`${baseURL}/auth/refresh`, {
      refresh_token: localStorage.getItem("refresh_token"),
    });

    localStorage.setItem("access_token", result.data.data.access_token);
    localStorage.setItem("refresh_token", result.data.data.refresh_token);

    processQueue(null);
  } catch (error) {
    processQueue(error);
    throw error;
  }
};

const getNewToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    await refreshToken();
    isRefreshing = false;
    return;
  }

  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });
};

httpClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isLoginRequest = originalRequest.url.includes("/auth/login");

    const shouldRenewToken =
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isLoginRequest;

    if (shouldRenewToken) {
      originalRequest._retry = true;

      try {
        await getNewToken();
        originalRequest.headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`,
        );
        return httpClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unknown error occurred";
    return Promise.reject(errorMessage);
  },
);

const _send = async (method, path, data, config) => {
  const response = await httpClient.request({
    ...config,
    method,
    url: path,
    data,
  });

  return response.data;
};

const get = async (path, config) => {
  return await _send("get", path, null, config);
};

const post = async (path, data, config) => {
  return await _send("post", path, data, config);
};

const put = async (path, data, config) => {
  return await _send("put", path, data, config);
};

const patch = async (path, data, config) => {
  return await _send("patch", path, data, config);
};

const del = async (path, config) => {
  return await _send("delete", path, null, config);
};

const http = { get, post, put, patch, del };

export default http;
