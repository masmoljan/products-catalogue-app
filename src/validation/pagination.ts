/* eslint-disable max-len */
import { PAGINATION_OPTIONS } from '@/utils/constants';
import { z } from 'zod';

export const ProductsPerPage = z
  .union([z.literal(PAGINATION_OPTIONS[0]), z.literal(PAGINATION_OPTIONS[1]), z.literal(PAGINATION_OPTIONS[2])]);

