import { createSlice } from "@reduxjs/toolkit";

const showProductDetailsSlice = createSlice({
  name: "showProductDetails",
  initialState: { show: false, productId: Number() },
  reducers: {
    toggleShow: (state) => {
      state.show = !state.show;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    }
  }
});

export const { toggleShow, setProductId } = showProductDetailsSlice.actions;

export default showProductDetailsSlice.reducer;