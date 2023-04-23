import { createSlice } from "@reduxjs/toolkit";

const connectSlice = createSlice({
  name: "connect",
  initialState: {
    isConnected: false,
    user: null,
  },
  reducers: {
    login: (state) => {
      state.isConnected = true;
      state.user = fetch();
    },
    logout: (state) => {
      state.isConnected = false;
      state.user = null;
      console.log("logged out");
    },
  },
});

export const { login, logout } = connectSlice.actions;
export default connectSlice.reducer;
