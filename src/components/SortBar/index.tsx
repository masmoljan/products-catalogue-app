import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { setProductSort } from "@/reducer/productSort";
import { ProductSortBySchema } from "@/validation/product";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import SortOptions from "./SortOptions";

export function SortBar() {
  const dispatch = useDispatch();

  const validateSort = (value: string) => {
    const validate = ProductSortBySchema.safeParse(value);
  
    if(!validate.success) {
      validate.error.issues.map((issue) => toast.error(issue.message));
      return false;
    }
    dispatch(setProductSort(value));
    return true;
  };

  return (
    <Select onValueChange={(value) => validateSort(value)}>
      <SelectTrigger className="max-w-fit">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SortOptions />
      </SelectContent>
    </Select>
  );
}