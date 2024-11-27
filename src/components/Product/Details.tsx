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
import { DEFAULT_CURRENCY } from "@/utils/constants";


interface ProductDetailsProps {
  product: Product
  open: boolean,
  toggleShowDetails: () => void,
  isProductLoading: boolean,
  productError: string
}

export default function ProductDetails ({
  product,
  open,
  toggleShowDetails,
  isProductLoading,
  productError
} : ProductDetailsProps) {

  if(productError) {
    return (
      <Error errorMessage={productError} />
    );
  }

  return (
    <Dialog open={open} onOpenChange={toggleShowDetails}>
      <DialogContent>
        <Carousel className="flex justify-self-center">
          {isProductLoading ? <Skeleton className="h-64 w-64" />
          :          
          <CarouselContent className="h-64 w-64">
            {product?.images.map((image, index) => (
              <CarouselItem key={index}>
                <img className="h-full w-full object-contain" src={image} />
              </CarouselItem>
            ))}
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
          {isProductLoading &&
            <Skeleton className="h-16 w-full"/>
          }
          <DialogTitle>{product?.title}</DialogTitle>
          <DialogDescription className="text-justify">
            {product?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2 items-center">
          {isProductLoading ? 
            <Skeleton className="h-28 w-full" />
          :
            <>
              <Tabs defaultValue="details" className="w-full flex flex-col items-center">
                <TabsList className="min-w-full">
                  <TabsTrigger className="w-full" value="details">Details</TabsTrigger>
                  <TabsTrigger className="w-full" value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="w-full">
                  <p className="w-fit inline">
                    Price: {product?.price}{DEFAULT_CURRENCY}
                  </p>
                  <p className="w-fit inline bg-rose-300 rounded-md ml-1 p-0.5">
                    -{product.discountPercentage}%
                  </p>
                  <p>Availability: {product?.availabilityStatus}</p>
                  <p className="capitalize">Category: {product?.category}</p>
                  <p className="capitalize">Brand: {product?.brand}</p>
                </TabsContent>
                <TabsContent value="reviews" className="w-full">
                  {
                    product.reviews.map((review, index) => (
                      <div key={index}>
                        <p>{review.reviewerName}</p>
                        <p>{review.comment}</p>
                      </div>
                    ))
                  }
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