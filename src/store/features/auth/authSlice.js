import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user  = token ? JSON.parse(localStorage.getItem("user")) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    token: token,
    status: null,
    error: null,
    message: null
  },

  reducers: {
    loginStart: (state) => {
      state.status  = "loading";
      state.error   = null;
    },

    loginSuccess: (state, action) => {
      state.status = "success";
      state.user   = action.payload.user;
      state.token  = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    loginError: (state, action) => {
      state.status = "error";
      state.error  = action.payload;
    },

    logout: (state) => {
      state.user  = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    forgotPasswordStart: (state) => {
      state.status  = "loading";
      state.error   = null;
      state.message = null;
    },

    forgotPasswordSuccess: (state, action) => {
      state.status  = "success";
      state.message = action.payload;
    },

    forgotPasswordFailure: (state, action) => {
      state.status  = "error";
      state.error   = action.payload;
    },

    resetPasswordStart: (state) => {
      state.status  = "loading";
      state.error   = null;
    },

    resetPasswordSuccess: (state, action) => {
      state.status  = "success";
      state.message = action.payload;
    },

    resetPasswordFailure: (state, action) => {
      state.status  = "error";
      state.error   = action.payload;
    },
  },
});

export const { 
  loginStart, loginSuccess, loginError, logout, 
  forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure,
  resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } = authSlice.actions;
export default authSlice.reducer;