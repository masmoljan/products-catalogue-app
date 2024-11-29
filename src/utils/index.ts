import { Product } from "@/types";

export function scrollToTop () {
  window.scroll(0, 0);
}

export function truncate(input: string, limit: number) {
  return input.slice(0, limit);
}

export function filterProductsByTitle (products : Array<Product>, filterBy : string) {
  return products.filter((product : Product) => 
    product.title.toLowerCase().includes(filterBy.toLowerCase())
  );
}

export function filterProductsByCategory (products : Array<Product>, filterBy : string) {
  return products.filter((product : Product) => product.category === filterBy);
}

export function filterProductsByPriceRange (products : Array<Product>, minPrice : number, maxPrice : number) {
  return products.filter((product : Product) => 
    Number(product.price) > minPrice && Number(product.price) < maxPrice
  );
}

