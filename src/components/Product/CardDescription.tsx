import { Product } from "@/types";
import { DESCRIPTION_CHARACTER_LIMIT } from "@/utils/constants";
import { truncate } from "@/utils/index";

export function CardDescription ({ 
  description 
} : Pick<Product, "description">) {

  const shouldTruncate = description.length > DESCRIPTION_CHARACTER_LIMIT;

  if (!shouldTruncate) return description;

  description = truncate(description, DESCRIPTION_CHARACTER_LIMIT).concat("...");

  return description;
}