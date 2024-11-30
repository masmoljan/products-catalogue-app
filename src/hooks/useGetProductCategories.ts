import { getProductCategories } from "@/api/product";
import { useEffect, useState } from "react";

export const useGetProductCategories = () => {

  const [data, setData] = useState<Array<string>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {

    getProductCategories()
      .then((response) => {
        setIsLoading(true);
        setData(response.data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [isLoading, error]);

  return { data, isLoading, error };
};