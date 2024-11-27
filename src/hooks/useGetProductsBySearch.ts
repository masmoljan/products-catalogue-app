import { getProductsBySearch } from "@/api";
import { Data, SearchQueryParams } from "@/types";
import { useEffect, useState } from "react";

export const useGetProductsBySearch = (queryParams : SearchQueryParams) => {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getProductsBySearch(queryParams)
      .then((response) => {
        setData(response.data);
        setTotal(response.data.total);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));

  }, [...Object.values(queryParams), isLoading, error]);

  return { data, isLoading, total, error };
};