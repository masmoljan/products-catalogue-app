/* eslint-disable max-len */
import { SEARCH_CHARACTER_LIMIT } from '@/utils/constants';
import { 
  ALPHA_CHARACTERS_ONLY, 
  ALPHA_CHARACTER_MAX_LIMIT
 } from '@/utils/schemaConstants';
import { z } from 'zod';

export const ProductSearchSchema = 
  z
    .string()
    .max(SEARCH_CHARACTER_LIMIT, {message: ALPHA_CHARACTER_MAX_LIMIT.replace("{number}", `${SEARCH_CHARACTER_LIMIT}`)})
    .regex(/^[a-zA-Z ]*$/, {message: ALPHA_CHARACTERS_ONLY})
;

