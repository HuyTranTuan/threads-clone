import { createSlice } from "@reduxjs/toolkit";

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem("threads_language");
  if (!savedLanguage) {
    localStorage.setItem("threads_language", "vn");
    return "vn";
  }
  if (savedLanguage === "vn") {
    return "vn";
  }
  return "en";
};

const initialState = {
  language: getInitialLanguage(),
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice;
