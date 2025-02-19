import { configureStore } from '@reduxjs/toolkit'
import productDetailsReducer from '@/reducer/productDetails'
import productFilterReducer from '@/reducer/productFilter'
import productSortReducer from '@/reducer/productSort'
import productSearchReducer from '@/reducer/productSearch'
import productPaginationReducer from '@/reducer/productPagination'
import { productsSlice } from '@/api/productsSlice'



export const store = configureStore({
  reducer: {
    productDetails: productDetailsReducer,
    productFilter: productFilterReducer,
    productSort: productSortReducer,
    productSearch: productSearchReducer,
    productPagination: productPaginationReducer,
    [productsSlice.reducerPath]: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsSlice.middleware);
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch