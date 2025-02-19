import { CardHeader } from "@/components/ui/card";
import ProductImage from "./ProductImage";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import { DESCRIPTION_CHARACTER_LIMIT } from "@/utils/constants";
import { truncate } from "@/utils";

interface ProductHeaderProps {
  id: number
  title: string
  thumbnail: string
  description: string
}

export default function ProductHeader({ 
  id, 
  title, 
  thumbnail, 
  description 
} : ProductHeaderProps ) {

  description = truncate(description, DESCRIPTION_CHARACTER_LIMIT).concat("...");
    
  return (
    <CardHeader key={id} className="items-center group p-4">
      <ProductImage thumbnail={thumbnail} />
      <ProductTitle 
        title="product-title" 
        className="min-h-8"
      >
        {title}
      </ProductTitle>
      <ProductDescription 
        title="product-description" 
        className="min-h-[60px] text-justify hyphens-auto text-sm xl:text-base"
      >
        {description}
      </ProductDescription>
    </CardHeader>
  )
}