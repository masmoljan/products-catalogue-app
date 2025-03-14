import { Data, Product } from "@/types";
import { ORDER_OPTIONS } from "./constants";

export function scrollToTop(): void {
  window.scroll(0, 0);
}

export function truncate(input: string, limit: number): string {
  return input.slice(0, limit);
}

export function filterProductsByTitle(products : Array<Product>, filterBy : string): Array<Product> {
  return products.filter((product : Product) => 
    product.title.toLowerCase().includes(filterBy.toLowerCase())
  );
}

export function filterProductsByCategory(products : Array<Product>, filterBy : string): Array<Product> {
  return products.filter((product : Product) => product.category === filterBy);
}

export function filterProductsByPriceRange(products : Array<Product>, minPrice : number, maxPrice : number): Array<Product> {
  return products.filter((product : Product) => 
    Number(product.price) > minPrice && Number(product.price) < maxPrice
  );
}

export function sortProductsByTitle(products : Array<Product>, order : string): Array<Product> {
  products.sort((a : Product, b : Product) => {
    return order === ORDER_OPTIONS.ASCENDING 
      ? a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
      : b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase());
  });
  return products;
}

export function applyCustomProductFilter(data: Data, customSkip: number, customLimit: number): Data {
  data.total = data.products.length;
  data.products = data.products.slice(customSkip, customLimit);
  return data;
}

