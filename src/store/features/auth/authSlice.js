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
  },

  reducers: {
    loginStart: (state) => {
      state.status = "loading";
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
  },
});

export const { loginStart, loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;