import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/slices/authSlice";
import themeSlice from "@/store/slices/themeSlice";
import programSlice from "@/store/slices/programSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    program: programSlice,
  },
});