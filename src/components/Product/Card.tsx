import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { DEFAULT_CURRENCY } from "@/utils/constants";

interface ProductCardProps {
  id: number,
  title: string,
  description: React.ReactElement,
  price: number,
  thumbnail: string,
  toggleShowDetails: () => void,
  setProductId: (id : number) => void
}

export default function ProductCard ({
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
          <img className="w-full h-full" loading="lazy" src={thumbnail}/>
        </div>
        <CardTitle className="min-h-8">{title}</CardTitle>
        <CardDescription className="min-h-[60px] text-justify">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-around pt-6 bg-slate-100">
        <p>{price + DEFAULT_CURRENCY}</p>
        <Button 
          type="button"
          onClick={() => {
            toggleShowDetails();
            setProductId(id);
          }}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );

}