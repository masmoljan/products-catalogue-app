import { BUTTONS, DEFAULT_CURRENCY } from "@/utils/constants";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setProductId, toggleShow } from "@/reducer/productDetails";

interface ProductActionsProps {
  id: number
  price: number
}

export default function ProductActions({ 
  id, 
  price 
} : ProductActionsProps) {

  const dispatch = useDispatch();

  const showProductDetails = () => {
    dispatch(setProductId(id));
    dispatch(toggleShow());
  };

  return (
    <CardContent className="flex items-center justify-around pt-6 bg-slate-100">
      <p className="text-lg" title="product-price">{price + DEFAULT_CURRENCY}</p>
      <Button
        className="2xl:font-semibold"
        title="product-details-button" 
        type="button"
        onClick={showProductDetails}
      >
        {BUTTONS.DETAILS}
      </Button>
    </CardContent>
  );
}

