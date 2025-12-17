import { useSelector } from "react-redux";
import { useEffect } from "react";

import { selectSavedTheme } from "@/features/theme";

export const ThemeProvider = () => {
  const isDarkMode = useSelector(selectSavedTheme);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return null;
};
