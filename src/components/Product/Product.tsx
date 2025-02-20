import { Card } from "@/components/ui/card";
import ProductHeader from "./ProductHeader";
import ProductActions from "./ProductActions";

interface ProductCardProps {
  id: number,
  title: string,
  description: string,
  price: number,
  thumbnail: string,
}

export default function ProductCard ({
	id,
	title,
	description,
	price,
  thumbnail,
} : ProductCardProps ) {

  return (
    <Card>
      <ProductHeader title={title} description={description} thumbnail={thumbnail} />
      <ProductActions id={id} price={price} />
    </Card>
  );

}