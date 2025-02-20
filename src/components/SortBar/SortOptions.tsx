import { ORDER_OPTIONS, SORT_BY_OPTIONS } from "@/utils/constants";
import { SelectItem } from "../ui/select";

export default function SortOptions() {
  return (
    Object.values(SORT_BY_OPTIONS).map(sort => (
      Object.values(ORDER_OPTIONS).map((order, index) => (
        <SelectItem
          className="min-w-0" 
          key={index} 
          value={`${sort + '-' + order}`}
        >
          <p className="capitalize">{sort + ' (' + order + ')'}</p>
        </SelectItem>
      ))
    ))
  );
}