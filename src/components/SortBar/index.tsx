import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ORDER_OPTIONS, SORT_BY_OPTIONS } from "@/utils/constants";

interface SortBarProps {
  handleSort: (options : string) => void
}

export function SortBar({
  handleSort
} : SortBarProps) {
  return (
    <Select onValueChange={(value) => handleSort(value)}>
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