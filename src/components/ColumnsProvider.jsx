import { useSelector } from "react-redux";

import { selectSavedColumn } from "@/features/columns";

export const ColumnsProvider = () => {
  const currentColumns = useSelector(selectSavedColumn);
  localStorage.setItem("threads_columns", JSON.stringify(currentColumns));

  return null;
};
