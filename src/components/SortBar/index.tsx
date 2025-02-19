import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { setProductSort } from "@/reducer/productSort";
import { ORDER_OPTIONS, SORT_BY_OPTIONS } from "@/utils/constants";
import { ProductSortBySchema } from "@/validation/product";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


const validateSort = (value: string) => {
  const validate = ProductSortBySchema.safeParse(value);

  if(!validate.success) {
    validate.error.issues.map((issue) => toast.error(issue.message));
    return false;
  }
  return true;
};

export function SortBar() {

  const dispatch = useDispatch();

  return (
    <Select onValueChange={(value) => validateSort(value) && dispatch(setProductSort(value))}>
      <SelectTrigger className="max-w-fit">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(SORT_BY_OPTIONS).map(sort => (
          Object.values(ORDER_OPTIONS).map((order, index) => (
            <SelectItem
              className="min-w-0" 
              key={index} 
              value={`${sort + '-' + order}`}
            >
              <p className="capitalize">{sort + ' (' + order + ')'}</p>
            </SelectItem>
          ))
        ))}
      </SelectContent>
    </Select>
  );
}