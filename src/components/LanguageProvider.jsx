import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { selectSavedLanguage } from "@/features/language";

export const LanguageProvider = () => {
  const { i18n } = useTranslation();
  const currentLanguage = useSelector(selectSavedLanguage);
  localStorage.setItem("threads_language", currentLanguage);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return null;
};
