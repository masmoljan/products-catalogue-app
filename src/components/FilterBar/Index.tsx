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
  BUTTONS,
  DEFAULT_CURRENCY, 
  PRICE_RANGE, 
  PRICE_RANGE_LABEL 
} from "@/utils/constants";
import { isEmpty, isEqual } from "lodash";
import { Dot } from "lucide-react";
import { ProductCategorySchema, ProductFilterSchema } from "@/validation/product";
import { toast } from "sonner";


interface FilterBarProps {
  categories?: Array<string>,
  handleFilterByCategory: (category : string, value: [number, number]) => void;
}

export function FilterBar({
  categories,
  handleFilterByCategory
} : FilterBarProps) {

  const [open, setOpen] = useState<boolean>(false);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [priceRanges, setPriceRanges] = 
    useState<number[]>([PRICE_RANGE.min, PRICE_RANGE.max]);

  const handleFilterReset = () => {
    setCategory("");
    setPriceRanges([PRICE_RANGE.min, PRICE_RANGE.max]);
  };

  const handleFilterActive = () => {
    if(isEqual(priceRanges, [PRICE_RANGE.min, PRICE_RANGE.max]) 
      && isEmpty(category)) 
    {
      setFilterActive(false);
      return;
    }
    setFilterActive(true);
  };

  const handleFilterSubmit = () => {
    const validatePriceRanges = ProductFilterSchema.safeParse(priceRanges);
    const validateCategory = ProductCategorySchema.safeParse(category);

    if(!validatePriceRanges.success) {
      validatePriceRanges.error?.issues.map((issue) => 
        toast.error(issue.message)
      );
      return;
    }

    if(!validateCategory.success) {
      validateCategory.error?.issues.map((issue) => 
        toast.error(issue.message)
      );
    }

    handleFilterByCategory(category, priceRanges as [number, number]);
    handleFilterActive();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
        >
          {BUTTONS.FILTER}
          {filterActive && <Dot color="red" strokeWidth={10} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 w-screen sm:w-80">
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
          defaultValue={priceRanges}
          value={priceRanges} 
          onValueChange={(priceRanges) => {
            setPriceRanges(priceRanges);
          }}
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={0.1}
          minStepsBetweenThumbs={20}
        />
        <p>{PRICE_RANGE_LABEL} {priceRanges[0]} - {priceRanges[1]}{DEFAULT_CURRENCY}</p>
        <Button 
          onClick={() => {handleFilterSubmit();}}
        >
          {BUTTONS.SUBMIT}
        </Button>
        <Button
          variant="secondary" 
          onClick={() => {
            handleFilterReset();
          }}
        >
          {BUTTONS.RESET}
        </Button>
      </PopoverContent>
    </Popover>
  );
}