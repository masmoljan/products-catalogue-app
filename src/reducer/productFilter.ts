import { PRICE_RANGE } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, isEqual } from "lodash";

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState: { 
    filterActive: false, 
    category: "", 
    priceRange: [PRICE_RANGE.min, PRICE_RANGE.max] 
  },
  reducers: {
    setProductFilter: (state, action) => {
      state.category = action.payload.category;
      state.priceRange = action.payload.priceRange;
      if(isEmpty(state.category) && isEqual(state.priceRange, [PRICE_RANGE.min, PRICE_RANGE.max])) {
        state.filterActive = false;
        return;
      }
      state.filterActive = true;
    },
  }
});

export const { setProductFilter } = productFilterSlice.actions;

export default productFilterSlice.reducer;