import { getProductById } from "@/api/product";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export const useGetProduct = (id : number) => {

  const [data, setData] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if(!id) return;

    getProductById(id)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));

    return () => {
      setData(undefined);
      setIsLoading(true);
      setError("");
    };

  }, [id]);

  return { data, isLoading, error };
};