import { getProductsBySearch } from "@/api/product";
import { Data, SearchQueryParams } from "@/types";
import { useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";


export const useGetProductsBySearch = (queryParams : SearchQueryParams) => {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");
  
  useDeepCompareEffect(() => {
    getProductsBySearch(queryParams)
      .then((response) => {
        setData(response.data);
        setTotal(response.data.total);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));

  }, [queryParams, isLoading, error]);

  return { data, isLoading, total, error };
};