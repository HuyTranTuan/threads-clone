import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("threads_theme");
  if (!savedTheme) {
    localStorage.setItem("threads_theme", "light");
    return false;
  }
  if (savedTheme === "light") {
    return false;
  }
  return true;
};

const initialState = {
  isDarkMode: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state) => {
      state.isDarkMode = true;
    },
    setLightMode: (state) => {
      state.isDarkMode = false;
    },
  },
});

export const { toggleTheme, setDarkMode, setLightMode } = themeSlice.actions;
export default themeSlice;
