import { TABS } from "@/utils/constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import ProductReviewCard from "./ReviewCard";
import { ProductDetailsTable } from "./DetailsTable";
import { Product } from "@/types";

interface ProductDetailsTabs {
  product: Product
}

export default function ProductDetailsTabs({ product } : ProductDetailsTabs) {
  return (
    <Tabs
      title="product-tabs"
      defaultValue="details" 
      className="w-full flex flex-col items-center"
    >
      <TabsList title="tabs-list" className="min-w-full">
        <TabsTrigger className="w-full" value="details">{TABS.DETAILS}</TabsTrigger>
        <TabsTrigger className="w-full" value="reviews">{TABS.REVIEWS}</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="w-full">
        {product && <ProductDetailsTable product={product}/>}
      </TabsContent>
      <TabsContent value="reviews" className="w-full">
        <ScrollArea className="max-h-32 flex flex-col">
          {
            product.reviews.map((review, index) => (
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
  );
}