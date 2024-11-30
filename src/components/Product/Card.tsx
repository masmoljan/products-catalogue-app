import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { BUTTONS, DEFAULT_CURRENCY } from "@/utils/constants";
import { Image } from "lucide-react";

interface ProductCardProps {
  id: number,
  title: string,
  description: React.ReactElement,
  price: number,
  thumbnail: string,
  toggleShowDetails?: (id: number) => void,
}

export function ProductCard ({
	id,
	title,
	description,
	price,
  thumbnail,
  toggleShowDetails,
} : ProductCardProps ) {

  return (
    <Card>
      <CardHeader key={id} className="items-center group p-4">
        <div className="h-48 w-48">
          {thumbnail ?
            <img className="w-full h-full" loading="lazy" src={thumbnail}/>
          :
            <div title="product-fallback-image">
              <Image className="w-full h-full"/>
            </div>
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
        {toggleShowDetails &&
          <Button
            title="product-details-button" 
            type="button"
            onClick={() => {
              toggleShowDetails(id);
            }}
          >
            {BUTTONS.DETAILS}
          </Button>
        }
      </CardContent>
    </Card>
  );

}