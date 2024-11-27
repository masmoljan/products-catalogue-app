import { Product } from "@/types";
import { DESCRIPTION_CHARACTER_LIMIT } from "@/utils/constants";

export function CardDescription ({ 
  description 
} : Pick<Product, "description">) {

  const shouldTruncate = description.length > DESCRIPTION_CHARACTER_LIMIT;

  if (!shouldTruncate) return description;
  
  return description
    .slice(0, DESCRIPTION_CHARACTER_LIMIT)
    .concat('...');
}