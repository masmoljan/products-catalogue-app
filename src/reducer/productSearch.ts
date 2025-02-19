import { createSlice } from "@reduxjs/toolkit";

const productSearchSlice = createSlice({
  name: "productSearch",
  initialState: { searchTerm: "" },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  }
});

export const { setSearchTerm } = productSearchSlice.actions;

export default productSearchSlice.reducer;