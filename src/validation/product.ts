import { PRICE_RANGE, SEARCH_CHARACTER_LIMIT } from '@/utils/constants';
import { PRODUCT_FILTER } from '@/utils/schemaConstants';
import { z } from 'zod';

export const ProductSearchQuerySchema = z.object({
  skip: z.number(),
  limit: z.number(),
  sortBy: z.string(),
  order: z.string(),
  category: z.string().optional(),
  minPrice: z.number().min(PRICE_RANGE.min).max(PRICE_RANGE.max - 1),
  maxPrice: z.number().min(PRICE_RANGE.min + 1).max(PRICE_RANGE.max),
  select: z.string().optional(),
  searchTerm: z.string().min(0).max(SEARCH_CHARACTER_LIMIT).regex(/^[a-zA-Z]*$/)
});

export const ProductWithIdSchema = z.number().min(0);

export const PorductPriceRangesSchema = z
  .number().min(PRICE_RANGE.min, { message: PRODUCT_FILTER.PRICE })
  .and(z.number().max(PRICE_RANGE.max, { message: PRODUCT_FILTER.PRICE }));

export const ProductFilterSchema = z
  .array(PorductPriceRangesSchema, { message: PRODUCT_FILTER.PRICE })
  .length(2, {message: PRODUCT_FILTER.PRICE_LIMIT });

export const ProductCategorySchema = z.string().regex(/^[a-zA-Z]*$/).optional();

export const ProductSortBySchema = z
  .string()
  .regex(/^[a-zA-Z]*-[a-zA-Z]*$/, {message: "Invalid sort option!"})
  .optional();
