import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";

interface ProductDetailsHeaderProps {
  productTitle: string | undefined
  productDescription: string | undefined
}

export default function ProductDetailsHeader({
  productTitle,
  productDescription
} : ProductDetailsHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{productTitle}</DialogTitle>
      <DialogDescription className="text-justify hyphens-auto min-h-[60px]">
        {productDescription}
      </DialogDescription>
    </DialogHeader>
  );
}