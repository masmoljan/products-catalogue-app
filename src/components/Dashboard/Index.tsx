import { useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/Product/Product";
import { NO_PRODUCTS_FOUND } from "@/utils/constants";
import { ProductDetails } from "@/components/ProductDetails/Details";
import { SearchBar } from "@/components/SearchBar/Index";
import { FilterBar } from "@/components/FilterBar/Index";
import { SortBar } from "@/components/SortBar";
import { SkeletonCard } from "@/components/Skeleton/Card";
import { BasicPagination } from "@/components/Pagination/Index";
import Error from "@/components/Error/Index";
import { SkeletonFilter } from "@/components/Skeleton/Filter";
import { scrollToTop } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetProductCategoriesQuery, useGetProductsBySearchQuery } from "@/api/productsSlice";

export default function Dashboard() {
  const sortBy = useSelector((state : RootState) => state.productSort.sortBy);
  const order = useSelector((state : RootState) => state.productSort.order);
  const showProductDetails = useSelector((state : RootState) => state.productDetails.show);
  const selectedProductId = useSelector((state : RootState) => state.productDetails.productId);
  const productCategory = useSelector((state : RootState) => state.productFilter.category);
  const minPrice = useSelector((state : RootState) => state.productFilter.priceRange[0]);
  const maxPrice = useSelector((state : RootState) => state.productFilter.priceRange[1]);
  const searchTerm = useSelector((state : RootState) => state.productSearch.searchTerm);
  const startPage = useSelector((state: RootState) => state.productPagination.startPage);
  const endPage = useSelector((state: RootState) => state.productPagination.endPage);

  useEffect(() => {
    scrollToTop();
  }, [startPage]);

  const {
    data: productCategories,
    isLoading: isProductCategoriesLoading,
    error: productCategoriesError
  } = useGetProductCategoriesQuery({});

  const { 
    data: productsSearch,
    isLoading: isProductsSearchLoading,
    error: productsSearchError,
  } = useGetProductsBySearchQuery({
      skip: startPage,
      limit: endPage - startPage, 
      category: productCategory,
      sortBy,
      order,
      minPrice,
      maxPrice,
      q: searchTerm,
      select: "title,price,description,thumbnail,category"
    });

  console.log("test", productsSearch);

  if(productsSearchError || productCategoriesError) {
    return (
      <Error />
    );
  }
  
  return (
    <div className="flex flex-col items-center pt-4 min-h-dvh">
      <div className="flex flex-col items-center gap-2 pl-4 pr-4 w-full max-w-xl">
        {isProductsSearchLoading || isProductCategoriesLoading ? 
          <>
            <SkeletonFilter />
            <SkeletonFilter />
          </>
        :
          <>
            <SearchBar />
            <div className="flex w-full justify-between">
              <FilterBar categories={productCategories}/>
              <SortBar />
            </div>
          </>
        }
      </div>
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
      >
        { isProductsSearchLoading ? 
          <SkeletonCard skeletonAmout={endPage}/>
        :
          productsSearch?.products.map((product : Product) => (
            <ProductCard
              key={product.id} 
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              thumbnail={product.thumbnail}
            />
            )
          )}
      </div>
      {!productsSearch?.total && (
        <div className="min-h-screen text-center">
          <p>{NO_PRODUCTS_FOUND}</p>
        </div>
      )}
      {showProductDetails &&
        <ProductDetails 
          open={showProductDetails}
          productId={selectedProductId}
        />
      }
      {productsSearch &&
        <BasicPagination 
          total={productsSearch.total}
          startPage={startPage}
          endPage={endPage}
        />
      }
    </div>
  );
}
