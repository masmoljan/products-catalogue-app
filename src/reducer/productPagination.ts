import { DEFAULT_PAGINATION_LIMIT, PAGINATION_OPTIONS } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const productPaginationSlice = createSlice({
  name: "productPagination",
  initialState: { 
    startPage: 0, 
    endPage: DEFAULT_PAGINATION_LIMIT, 
    rowsPerPage: PAGINATION_OPTIONS[0] 
  },
  reducers: {
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = Number(action.payload.rowsPerPage);
      state.startPage = 0;
      state.endPage = state.rowsPerPage;
    },
    setNextPage: (state) => {
      state.startPage = state.startPage + state.rowsPerPage;
      state.endPage = state.endPage + state.rowsPerPage;
    },
    setPreviousPage: (state) => {
      state.startPage = state.startPage - state.rowsPerPage;
      state.endPage = state.endPage - state.rowsPerPage;
    },
    resetPagination: (state) => {
      state.startPage = 0;
      state.endPage = DEFAULT_PAGINATION_LIMIT;
      state.rowsPerPage = PAGINATION_OPTIONS[0];
    }
  }
});

export const { setRowsPerPage, setNextPage, setPreviousPage, resetPagination } = productPaginationSlice.actions;

export default productPaginationSlice.reducer;