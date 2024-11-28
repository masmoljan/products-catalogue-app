import { SearchQueryParams } from '@/types';
import axiosInstance from './axiosInstance';
import { 
  AUTHENTICATED_USER_URL,
  LOGIN_URL, 
  PRODUCT_CATEGORIES_URL, 
  PRODUCTS_SEARCH_URL, 
  PRODUCTS_URL, 
  USERS_URL 
} from './routes';
import { 
  filterProductsByCategory, 
  filterProductsByPriceRange, 
  filterProductsByTitle 
} from '@/utils';
import { PRICE_RANGE } from '@/utils/constants';

export const authenticateUser = async(body : object) => {
  const response = await axiosInstance
    .post(
      LOGIN_URL, 
      {
        ...body,
      },
      {
        withCredentials: true
      }
  );

  return response;
};

export const getAuthenticatedUser = async() => {
  const response = await axiosInstance.get(AUTHENTICATED_USER_URL);

  return response;
};

export const getUsers = async() => {
  const response = await axiosInstance.get(USERS_URL);

  return response;
};

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
    skip, 
    sortBy,
    select,
    order, 
    category, 
    minPrice, 
    maxPrice 
  } = queryParams;

  let { limit } = queryParams;

  if(searchTerm || category || minPrice !== PRICE_RANGE.min || maxPrice !== PRICE_RANGE.max) {
    limit = 0;
  }

  const queryUrl = 
    `?q=${searchTerm}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=${select}`;

  const response = await axiosInstance.get(PRODUCTS_SEARCH_URL + queryUrl);

  if(searchTerm) {
    response.data.products = filterProductsByTitle(response.data.products, searchTerm);
    response.data.total = response.data.products.length;
  }

  if(category) {
    response.data.products = filterProductsByCategory(response.data.products, category);
    response.data.total = response.data.products.length;
  }

  if(minPrice !== PRICE_RANGE.min || maxPrice !== PRICE_RANGE.max) {
    response.data.products = filterProductsByPriceRange(response.data.products, minPrice, maxPrice);
    response.data.total = response.data.products.length;
  }

  return response;
};
