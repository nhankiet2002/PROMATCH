import { API_TIMEOUT, API_URL, AUTH_COOKIE_KEY } from "@constants/index";
import { Endpoint } from "@api/endpoint";
import axios, { HttpStatusCode } from "axios";
import { onTriggerSignOut, sleep } from "@utils/index";
import Cookies from "js-cookie";

axios.defaults.baseURL = `${API_URL}/api`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = API_TIMEOUT;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

axios.interceptors.request.use(
  (config) => {
    // Skip adding access token for refresh token endpoint
    if (config.url === Endpoint.REFRESH_TOKEN) {
      return config;
    }

    const access_token = Cookies.get(AUTH_COOKIE_KEY);

    if (access_token) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    // Handle 401 Unauthorized - try to refresh token
    if (
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        onTriggerSignOut();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          Endpoint.REFRESH_TOKEN,
          {},
          {
            // withCredentials: true,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (response.data && response.data.token) {
          const newAccessToken = response.data.token;

          // Update token in cookie
          Cookies.set(AUTH_COOKIE_KEY, newAccessToken, {
            secure: true,
            sameSite: "Strict",
          });

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          return axios(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        onTriggerSignOut();
        return Promise.reject(err);
      }
    }

    if (
      error?.config &&
      !error.config._retryCount &&
      ((error.code === "ECONNABORTED" &&
        error?.response?.status === HttpStatusCode.TooManyRequests) ||
        ("response" in error && error.response === undefined))
    ) {
      error.config._retryCount = (error.config._retryCount || 0) + 1;
      if (error.config._retryCount <= 3) {
        await sleep(1000);
        return axios.request(error.config);
      }
    }

    return Promise.reject(error);
  }
);

const RequestClient = class {
  async get(endpoint, params = {}, configs = {}) {
    const response = await axios.get(endpoint, { params, ...configs });
    return response?.data;
  }

  async post(endpoint, body, configs = {}) {
    const response = await axios.post(endpoint, body, configs);
    return response?.data;
  }

  async put(endpoint, body, configs = {}) {
    const response = await axios.put(endpoint, body, configs);
    return response?.data;
  }

  async patch(endpoint, body, configs = {}) {
    const response = await axios.patch(endpoint, body, configs);
    return response?.data;
  }

  async delete(endpoint, data = {}) {
    const response = await axios.delete(endpoint, { data });
    return response?.data;
  }
};

const client = new RequestClient();

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await client.post(Endpoint.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export { client, uploadFile };
