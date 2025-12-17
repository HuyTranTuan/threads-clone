import { createSlice } from "@reduxjs/toolkit";

const getInitialColumns = () => {
  const savedColumns = localStorage.getItem("threads_columns");
  if (!savedColumns) {
    localStorage.setItem("threads_columns", JSON.stringify(["for_you"]));
    return ["for_you"];
  }
  const retrievedArray = JSON.parse(savedColumns);
  return retrievedArray;
};

const initialState = {
  columns: getInitialColumns(),
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state.columns.push(action.payload);
    },
    removeColumn: (state, action) => {
      state.columns.splice(action.payload, 1);
    },
  },
});

export const { addColumn, removeColumn } = columnsSlice.actions;
export default columnsSlice;
