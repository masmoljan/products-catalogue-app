import { createSlice } from "@reduxjs/toolkit";

const productSortSlice = createSlice({
  name: "productSort",
  initialState: { order: '', sortBy: '' },
  reducers: {
    setProductSort: (state, action) => {
      state.sortBy = action.payload.split('-')[0];
      state.order = action.payload.split('-')[1];
    }
  }
});

export const { setProductSort } = productSortSlice.actions;

export default productSortSlice.reducer;