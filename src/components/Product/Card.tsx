import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { DEFAULT_CURRENCY } from "@/utils/constants";
import { Image } from "lucide-react";

interface ProductCardProps {
  id: number,
  title: string,
  description: React.ReactElement,
  price: number,
  thumbnail?: string,
  toggleShowDetails?: () => void,
  setProductId?: (id : number) => void
}

export function ProductCard ({
	id,
	title,
	description,
	price,
  thumbnail,
  toggleShowDetails,
  setProductId
} : ProductCardProps ) {

  return (
    <Card>
      <CardHeader key={id} className="items-center group p-4">
        <div className="h-48 w-48">
          {thumbnail ?
            <img className="w-full h-full" loading="lazy" src={thumbnail}/>
          :
            <Image className="w-full h-full"/>
          }
        </div>
        <CardTitle title="product-title" className="min-h-8">{title}</CardTitle>
        <CardDescription 
          title="product-description" 
          className="min-h-[60px] text-justify hyphens-auto"
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-around pt-6 bg-slate-100">
        <p title="product-price">{price + DEFAULT_CURRENCY}</p>
        {toggleShowDetails && setProductId &&
          <Button
            title="product-details-button" 
            type="button"
            onClick={() => {
              toggleShowDetails();
              setProductId(id);
            }}
          >
            Details
          </Button>
        }
      </CardContent>
    </Card>
  );

}