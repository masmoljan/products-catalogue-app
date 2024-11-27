import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { 
  DEFAULT_CURRENCY, 
  PRICE_RANGE, 
  PRICE_RANGE_LABEL 
} from "@/utils/constants";
import { isEmpty, isEqual } from "lodash";
import { Dot } from "lucide-react";

interface FilterBarProps {
  categories?: Array<string>,
  handleFilterByCategory: (category : string, value: [number, number]) => void;
}

export function FilterBar({
  categories,
  handleFilterByCategory
} : FilterBarProps) {

  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [values, setValues] = 
    useState<number[]>([PRICE_RANGE.min, PRICE_RANGE.max]);

  const handleFilterActive = () => {
    if(isEqual(values, [PRICE_RANGE.min, PRICE_RANGE.max]) 
      && isEmpty(category)) 
    {
      setFilterActive(false);
      return;
    }
    setFilterActive(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
        >
          Filter
          {filterActive && <Dot color="red" strokeWidth={10} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 min-w-72">
        <Select 
          value={category}
          onValueChange={(value) => {
            setCategory(value);
        }}>
          <SelectTrigger className="min-w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category, index) => (
              <SelectItem
                className="min-w-0"
                key={index}
                value={category}
              >
                <p className="capitalize">{category}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Slider 
          defaultValue={values} 
          onValueChange={(values) => {
            setValues(values);
          }}
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={0.1}
          minStepsBetweenThumbs={50}
        />
        <p>{PRICE_RANGE_LABEL} {values[0]} - {values[1]}{DEFAULT_CURRENCY}</p>
        <Button 
          type="submit" 
          onClick={() => {
            handleFilterByCategory(category, values as [number, number]);
            handleFilterActive();
          }}
        >
          Submit
        </Button>
      </PopoverContent>
    </Popover>
  );
}