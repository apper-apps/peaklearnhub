import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme !== null) {
    return JSON.parse(savedTheme);
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const initialState = {
  darkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;

export const initializeTheme = () => (dispatch) => {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme !== null) {
    dispatch(setDarkMode(JSON.parse(savedTheme)));
  }
};

export default themeSlice.reducer;