import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

import { Skeleton } from "../ui/skeleton";
import { Error } from "../Error/Index";
import { Image } from "lucide-react";
import { ProductDetailsTable } from "./DetailsTable";
import ProductReviewCard from "./ReviewCard";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product
  open: boolean,
  toggleShowDetails: () => void,
  isProductLoading: boolean,
  productError: string
}

export function ProductDetails ({
  product,
  open,
  toggleShowDetails,
  isProductLoading,
  productError
} : ProductDetailsProps) {

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleOnLoad = () => {
    setImageLoaded(true);
  };

  if(productError) {
    return (
      <Error errorMessage={productError} />
    );
  }

  return (
    <Dialog open={open} onOpenChange={toggleShowDetails}>
      <DialogContent className="max-h-screen">
        <Carousel className="flex justify-self-center">
          {isProductLoading ? <Skeleton className="h-64 w-64" />
          :          
          <CarouselContent className="h-64 w-64">
            {product?.images.map((image, index) => (
              <CarouselItem key={index}>
                <img 
                  className="h-full w-full object-contain"
                  loading={index === 0 ? "eager" : "lazy"}
                  onLoad={() => handleOnLoad()}
                  src={imageLoaded ? image : product.thumbnail} 
                />
              </CarouselItem>
            ))}
            {!product?.images.length &&
              <CarouselItem >
                <Image className="h-full w-full object-contain" width="10px" height="10px" />
              </CarouselItem>
            }
          </CarouselContent>
          }
          {product?.images?.length > 1 && 
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          }
        </Carousel>
        <DialogHeader>
          {isProductLoading ?
            <Skeleton className="h-28 w-full"/>
          :
          <>
            <DialogTitle>{product?.title}</DialogTitle>
            <DialogDescription className="text-justify hyphens-auto min-h-[60px]">
              {product?.description}
            </DialogDescription>
          </>
          }
        </DialogHeader>
        <div className="flex flex-col space-y-2 items-center">
          {isProductLoading ? 
            <Skeleton className="h-28 w-full" />
          :
            <>
              <Tabs 
                title="product-tabs"
                defaultValue="details" 
                className="w-full flex flex-col items-center">
                <TabsList title="tabs-list" className="min-w-full">
                  <TabsTrigger className="w-full" value="details">Details</TabsTrigger>
                  <TabsTrigger className="w-full" value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent title="product-tabs-content" value="details" className="w-full">
                  {product && <ProductDetailsTable product={product}/>}
                </TabsContent>
                <TabsContent value="reviews" className="w-full">
                  <ScrollArea className="max-h-32 flex flex-col">
                  {
                    product?.reviews.map((review, index) => (
                      <ProductReviewCard
                        key={index}
                        comment={review.comment}
                        reviewerName={review.reviewerName}
                        rating={review.rating}
                      />
                    ))
                  }
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          }
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}