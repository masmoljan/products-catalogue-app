import { PRODUCT_CATEGORIES_URL, PRODUCTS_SEARCH_URL, PRODUCTS_URL } from './routes';
import { Data, Product, QueryParams } from '@/types';
import { apiSlice } from './apiSlice';
import { PRICE_RANGE } from '@/utils/constants';
import { applyCustomProductFilter, filterProductsByCategory, filterProductsByPriceRange, filterProductsByTitle } from '@/utils';
import _ from 'lodash'

export const productsSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => {
		return {
			getProductsBySearch: builder.query<Data, QueryParams>({
				query: (params) => {
          const filteredParams = _.omitBy(params, param => param === '');
          const { minPrice, maxPrice, q: searchTerm, category } = filteredParams;
          if(minPrice !== PRICE_RANGE.min || maxPrice !== PRICE_RANGE.max || searchTerm || category) {
            filteredParams.limit = 0
            filteredParams.skip = 0
          }
        
					return {
						url: filteredParams.q ? PRODUCTS_SEARCH_URL : PRODUCTS_URL,
						params: filteredParams
					};
				},
        transformResponse: (response : Data, _meta, arg) => {
          const { minPrice, maxPrice, category, q: searchTerm } = arg;
          console.log("arg", arg)
          //console.log("meta", meta)
          console.log("res", response)
          if(searchTerm) {
            response.products = filterProductsByTitle(response.products, searchTerm);
            response = applyCustomProductFilter(response, arg.skip, arg.skip + arg.limit);
          }
          if(category) {
            response.products = filterProductsByCategory(response.products, category);
            response = applyCustomProductFilter(response, arg.skip, arg.skip + arg.limit);
          }
          if(minPrice !== PRICE_RANGE.min || maxPrice !== PRICE_RANGE.max) {
            response.products = filterProductsByPriceRange(response.products, minPrice, maxPrice);
            response = applyCustomProductFilter(response, arg.skip, arg.skip + arg.limit);
          }
          return response;
        }
			}),
      getProductById: builder.query<Product, number>({
        query: (id) => {
          return {
            url: `${PRODUCTS_URL}/${id}`,
          };
        }
      }),
      getProductCategories: builder.query({
        query: () => {
          return {
            url: PRODUCT_CATEGORIES_URL
          };
        }
      })
		};
	}
});

export const { 
  useGetProductsBySearchQuery, 
  useGetProductByIdQuery,
  useGetProductCategoriesQuery 
} = productsSlice;