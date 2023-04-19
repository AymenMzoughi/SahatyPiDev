import { createSlice } from "@reduxjs/toolkit";

const connectSlice = createSlice({
  name: "connect",
  initialState: {
    isConnected: false,
  },
  reducers: {
    login: (state) => {
      state.isConnected = true;
    },
    logout: (state) => {
      state.isConnected = false;
      console.log("logged out");
    },
  },
});

export const { login, logout } = connectSlice.actions;
export default connectSlice.reducer;
