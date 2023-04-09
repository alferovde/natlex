import { configureStore } from "@reduxjs/toolkit";
import { getAllData } from "./dataSlice";
export const store = configureStore({
  reducer: getAllData,
});
