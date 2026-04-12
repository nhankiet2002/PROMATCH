import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "@constants/index";

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    Cookies.set(AUTH_COOKIE_KEY, token, {
      secure: true,
      sameSite: "Strict",
    });
  }
};

export const clearToken = () => {
  axios.defaults.headers.common["Authorization"] = "";
  Cookies.remove(AUTH_COOKIE_KEY);
  Cookies.remove("refreshToken");
};
