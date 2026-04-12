import { client, Endpoint } from "@api/index";
import { setToken, clearToken } from "@api/helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  authData: null,
  token: null,
  isLogin: false,
  loading: false,
  error: null,
};

export const requestLogin = createAsyncThunk("auth/login", async (data) => {
  const response = await client.post(Endpoint.LOGIN, data);
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      state.authData = action.payload;
    },
    requestLogout: (state) => {
      state.authData = null;
      state.token = null;
      state.isLogin = false;
      state.error = null;
      clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.authData = {
            ...action.payload.data,
            token: "",
            refreshToken: "",
          };
          state.token = action.payload.data.token;
          // state.authData = action.payload.user;
          // state.token = action.payload.token;
          state.isLogin = true;
          state.error = null;

          // Save token to axios header và cookie
          setToken(action.payload.data.token);

          // Set refreshToken to cookie
          if (action.payload.refreshToken) {
            Cookies.set("refreshToken", action.payload.data.refreshToken, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });
          }
        }
      })
      .addCase(requestLogin.rejected, (state, action) => {
        state.loading = false;
        state.authData = null;
        state.token = null;
        state.isLogin = false;
        state.error = action.error?.message || "Login failed";
      });
  },
});
export const authState = (state) => state.auth;

export const { loadUserInfo, requestLogout } = authSlice.actions;
export default authSlice.reducer;
