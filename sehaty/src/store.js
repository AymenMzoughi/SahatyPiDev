import { configureStore } from "@reduxjs/toolkit";
import connectReducer from "./slices/connectSlice";

export default configureStore({
  reducer: {
    connect: connectReducer,
  },
});
