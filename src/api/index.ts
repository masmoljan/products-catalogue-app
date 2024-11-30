import { SearchQueryParams } from '@/types';
import axiosInstance from './axiosInstance';
import { 
  PRODUCT_CATEGORIES_URL, 
  PRODUCTS_SEARCH_URL, 
  PRODUCTS_URL, 
} from './routes';
import { 
  applyCustomProductFilter,
  filterProductsByCategory, 
  filterProductsByPriceRange, 
  filterProductsByTitle, 
  sortProductsByTitle
} from '@/utils';
import { PRICE_RANGE, SORT_BY_OPTIONS } from '@/utils/constants';

export const getProductCategories = async() => {
  const response = await axiosInstance.get(PRODUCT_CATEGORIES_URL);

  return response;
};

export const getProductById = async(id : number) => {
  const response = await axiosInstance.get(PRODUCTS_URL + `/${id}`);

  return response;
};

export const getProductsBySearch = async(queryParams : SearchQueryParams) => {
  const { 
    searchTerm,
    sortBy,
    select,
    order, 
    category, 
    minPrice, 
    maxPrice 
  } = queryParams;

  let { limit, skip } = queryParams;

  const customFilterLimit = limit + skip;
  const customFilterSkip = skip;

  if(searchTerm || category || minPrice !== PRICE_RANGE.min || maxPrice !== PRICE_RANGE.max || sortBy === SORT_BY_OPTIONS.TITLE) {
    limit = 0;
    skip = 0;
  }

  const queryUrl = 
    `?q=${searchTerm}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=${select}`;

  const response = await axiosInstance.get(PRODUCTS_SEARCH_URL + queryUrl);

  if(searchTerm) {
    response.data.products = filterProductsByTitle(response.data.products, searchTerm);
    response.data = applyCustomProductFilter(response.data, customFilterSkip, customFilterLimit);
  }

  if(category) {
    response.data.products = filterProductsByCategory(response.data.products, category);
    response.data = applyCustomProductFilter(response.data, customFilterSkip, customFilterLimit);
  }

  if(minPrice !== PRICE_RANGE.min || maxPrice !== PRICE_RANGE.max) {
    response.data.products = filterProductsByPriceRange(response.data.products, minPrice, maxPrice);
    response.data = applyCustomProductFilter(response.data, customFilterSkip, customFilterLimit);
  }

  /**
   * Implemented a custom sorting function for product titles 
   * because the API returns product results in an incorrect order
   */

  if (sortBy === SORT_BY_OPTIONS.TITLE) {
    response.data.products = sortProductsByTitle(response.data.products, order);
    response.data.products = response.data.products.slice(customFilterSkip, customFilterLimit);
  }

  return response;
};
