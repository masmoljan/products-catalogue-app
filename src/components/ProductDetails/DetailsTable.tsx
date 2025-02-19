import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { 
  DEFAULT_WEIGHT_UNIT, 
  PRODUCT_DETAIL_LABELS, 
  PRODUCT_DETAILS_PLACEHOLDER 
} from "@/utils/constants";

interface ProductDetailsTableProps {
  product : Product
}

export function ProductDetailsTable ({
  product
} : ProductDetailsTableProps) {

  return (
    <div 
      title="product-details-table" 
      className="max-h-32 2xl:max-h-full overflow-y-auto border rounded-xl"
    >
    <Table>
      <TableBody className="capitalize">
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.BRAND}</TableCell>
          <TableCell>{product.brand || PRODUCT_DETAILS_PLACEHOLDER.BRAND}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.AVAILABILITY}</TableCell>  
          <TableCell>{product.availabilityStatus}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.RATING}</TableCell>  
          <TableCell>{(Math.round(product.rating * 10) / 10).toFixed(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.SHIPPING}</TableCell>  
          <TableCell>{product.shippingInformation}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.CATEGORY}</TableCell>  
          <TableCell>{product.category}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.WEIGHT}</TableCell>
          <TableCell>{product.weight} {DEFAULT_WEIGHT_UNIT}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.RETURNS}</TableCell>
          <TableCell>{product.returnPolicy}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{PRODUCT_DETAIL_LABELS.WARRANTY}</TableCell>
          <TableCell>{product.warrantyInformation}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
  );
}