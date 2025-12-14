import { useSelector } from "react-redux";
import { useEffect } from "react";

export const ThemeProvider = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return null;
};
