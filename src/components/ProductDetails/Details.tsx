import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

import Error from "../Error/Index";
import { useDispatch } from "react-redux";
import { toggleShow } from "@/reducer/productDetails";
import { useGetProductByIdQuery } from "@/api/productsSlice";
import ProductDetailsGallery from "./ProductDetailsGallery";
import ProductDetailsHeader from "./ProductDetailsHeader";
import ProductDetailsTabs from "./ProductDetailsTabs";
import { Loader2 } from "lucide-react";

interface ProductDetailsProps {
  open: boolean,
  productId: number
}

export function ProductDetails ({
  open,
  productId
} : ProductDetailsProps) {

  const {
    data: product, 
    isLoading: isProductLoading,
    error: productError 
  } = useGetProductByIdQuery(productId);

  const dispatch = useDispatch();

  if(isProductLoading) {
    return (<Loader2 className="animate-spin h-40 w-40" />);
  }

  return (
    <Dialog open={open} onOpenChange={() => dispatch(toggleShow())}>
      {productError && <Error />}
      <DialogContent className="max-h-screen">
      <ProductDetailsGallery 
        productImages={product?.images} 
        productThumbnail={product?.thumbnail} 
      />
      <ProductDetailsHeader 
        productDescription={product?.description} 
        productTitle={product?.title}
      />
      {product && <ProductDetailsTabs product={product} />}
      </DialogContent>
    </Dialog>
  );
}