export interface Data {
  skip: number,
  total: number,
  limit: number,
  products: Array<Product>
}

export interface Product {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags: Array<string>,
  brand: string,
  sku: string,
  weight: number,
  dimensions: ProductDimension,
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  reviews: Array<ProductReview>,
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: ProductMeta,
  thumbnail: string,
  images: Array<string>
}

export interface ProductDimension {
  width: number,
  height: number,
  depth: number
}

export interface ProductReview {
  rating: number,
  comment: string,
  date: string,
  reviewerName: string,
  reviewerEmail: string
}

export interface ProductMeta {
  createdAt: string,
  updatedAt: string,
  barcode: string,
  qrCode: string
}

export interface QueryParams {
  skip: number,
  limit: number,
  sortBy: string,
  order: string,
  category?: string,
  minPrice: number,
  maxPrice: number,
  select?: string
}

export interface SearchQueryParams extends QueryParams {
  searchTerm: string
}

export interface QueryFilter {
  category: string,
  minPrice: number,
  maxPrice: number
}