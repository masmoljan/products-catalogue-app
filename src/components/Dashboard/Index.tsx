import { Data, Product } from "@/types";
import { useRef, useState } from "react";
import ProductCard from "../Product/Card";
import { CardDescription } from "../Product/CardDescription";
import { DEFAULT_PAGINATION_LIMIT, PRICE_RANGE } from "@/utils/constants";
import ProductDetails from "../Product/Details";
import { useGetProduct } from "@/hooks/useGetProduct";
import { useGetProductsBySearch } from "@/hooks/useGetProductsBySearch";
import { useGetProductCategories } from "@/hooks/useGetProductCategories";
import { SearchBar } from "@/components/SearchBar/Index";
import { FilterBar } from "@/components/FilterBar/Index";
import { SortBar } from "@/components/SortBar";
import { SkeletonCard } from "@/components/Skeleton/Card";
import { BasicPagination } from "@/components/Pagination/Index";
import { Error } from "../Error/Index";
import { throttle } from "lodash";
import { SkeletonFilter } from "../Skeleton/Filter";


export default function Dashboard() {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const [showProductDetails, setShowProductDetails] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(Number);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState(PRICE_RANGE.min);
  const [maxPrice, setMaxPrice] = useState(PRICE_RANGE.max);

  const [startPage, setstartPage] = useState(0);
  const [endPage, setendPage] = useState<number>(DEFAULT_PAGINATION_LIMIT);

  const toggleShowDetails = () => {
    setShowProductDetails(!showProductDetails);
  };

  const handleSearch = (searchTerm : string) => {
    setSearchTerm(searchTerm);
    handleProductsPerPage(endPage - startPage);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
  };

  const handleFilterByCategory = (category : string, priceRange : number[]) => {
    setProductCategory(category);
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
    setstartPage(0);
    setendPage(DEFAULT_PAGINATION_LIMIT);
  };

  const handleSort = (options: string) => {
    setSortBy(options.split('-')[0]);
    setOrder(options.split('-')[1]);
  };

  const handlePagination = (start: number, end: number) => {
    setstartPage(start);
    setendPage(end);
  };

  const throttleHandlePagination = useRef(throttle(handlePagination, 500));

  const handleProductsPerPage = (total: number) => {
    setstartPage(0);
    setendPage(total);
  };

  const { 
    data: product, 
    isLoading: isProductLoading, 
    error: ProductError 
  } : {
    data: Product | undefined
    isLoading: boolean | undefined, 
    error: string
  } = useGetProduct(selectedProductId);

  const { 
    data: productsSearch,
    isLoading: isProductsSearchLoading,
    error: productsSearchError,
    total: productsSearchCount
  } : {
    data: Data | undefined,
    isLoading: boolean | undefined, 
    error: string | undefined,
    total: number
  } = useGetProductsBySearch({ 
    searchTerm, 
    limit: 0, 
    sortBy, 
    order,
    category: productCategory,
    minPrice,
    maxPrice
  });

  const {
    data: productCategories,
    isLoading: isProductCategoriesLoading,
    error: productCategoriesError
  } = useGetProductCategories();

  if(productsSearchError || productCategoriesError) {
    return (
      <Error errorMessage={productsSearchError || productCategoriesError}/>
    );
  }
  
  return (
    <div className="flex flex-col items-center pt-4 min-h-dvh">
      <div className="flex flex-col items-center gap-2 pl-4 pr-4 w-full max-w-lg">
        {isProductsSearchLoading || isProductCategoriesLoading ? 
          <>
            <SkeletonFilter />
            <SkeletonFilter />
          </>
        :
          <>
            <SearchBar 
              handleSearch={handleSearch} 
              handleSearchClear={handleSearchClear}
            />
            <div className="flex w-full justify-between">
              <FilterBar 
                categories={productCategories}
                handleFilterByCategory={handleFilterByCategory}
              />
              <SortBar handleSort={handleSort}/>
            </div>
          </>
        }
      </div>
      <div 
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4 
          p-4
        "
      >
        { isProductsSearchLoading ? 
          <SkeletonCard skeletonAmout={endPage}/>
        :
          productsSearch?.products.slice(startPage, endPage)
            .map((product : Product) => (
              <ProductCard
                key={product.id} 
                id={product.id}
                title={product.title}
                description={<CardDescription description={product.description}/>}
                price={product.price}
                thumbnail={product.thumbnail}
                toggleShowDetails={toggleShowDetails}
                setProductId={setSelectedProductId}
              />
            )
          )}
      </div>
      {!productsSearchCount && (
        <div className="min-h-screen text-center">
          <p>No products found. Please change your search criteria.</p>
        </div>
      )}
      {showProductDetails && product &&
        <ProductDetails 
          open={showProductDetails}
          toggleShowDetails={toggleShowDetails}
          product={product}
          isProductLoading={isProductLoading}
          productError={ProductError}
        />
      }
      <BasicPagination 
        total={productsSearchCount}
        startPage={startPage}
        endPage={endPage}
        handlePagination={throttleHandlePagination.current}
        handleProductsPerPage={handleProductsPerPage}
      />
    </div>
  );
}