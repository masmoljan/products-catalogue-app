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
import { useRef, useState } from "react";
import { 
  BUTTONS,
  PRICE_RANGE
} from "@/utils/constants";
import { Dot } from "lucide-react";
import { ProductCategorySchema, ProductFilterSchema } from "@/validation/product";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setOpenProductFilter, setProductFilter } from "@/reducer/productFilter";
import { RootState } from "@/store";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import FilterRangeInput from "./FilterRangeInput";
import { resetPagination } from "@/reducer/productPagination";


interface FilterBarProps {
  categories?: Array<string>,
}

export function FilterBar({
  categories,
} : FilterBarProps) {

  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCatageory] = useState<string>("");

  const filterOpen = useSelector((state : RootState) => state.productFilter.open);
  const filterActive = useSelector((state : RootState) => state.productFilter.filterActive);
  const category = useSelector((state : RootState) => state.productFilter.category);
  const priceRange = useSelector((state : RootState) => state.productFilter.priceRange);

  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

   
  const handleFilterReset = () => {
    dispatch(setProductFilter({
      category: "", 
      priceRange: [PRICE_RANGE.min, PRICE_RANGE.max]
    }));
    dispatch(setOpenProductFilter({open: false}));
    dispatch(resetPagination());
  };


  const handleFilterSubmit = () => {
    const validatePriceRanges = ProductFilterSchema.safeParse(priceRange);
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
      return;
    }
    dispatch(setProductFilter({
      category: selectedCategory, 
      priceRange: [Number(minPriceRef.current?.value), Number(maxPriceRef.current?.value)]
    }));
    dispatch(setOpenProductFilter({open: false}));
    dispatch(resetPagination());
  };


  return (
    <Popover open={filterOpen} onOpenChange={() => dispatch(setOpenProductFilter({open: !filterOpen}))}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={() => dispatch(setOpenProductFilter({open: !filterOpen}))}
        >
          {BUTTONS.FILTER}
          {filterActive && <Dot color="red" strokeWidth={10} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 w-screen sm:w-80">
        <Select 
          value={selectedCategory}
          onValueChange={setSelectedCatageory}
        >
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
        <div className="flex items-center">
          <div className="flex-grow">
            <Separator />
          </div>
        <Label className="px-3">Price</Label>
          <div className="flex-grow">
            <Separator />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FilterRangeInput 
            label="Min:"
            min={PRICE_RANGE.min} 
            defaultValue={priceRange[0]}
            ref={minPriceRef}
            type="number"
          />
          <FilterRangeInput 
            label="Max:"
            max={PRICE_RANGE.max} 
            defaultValue={priceRange[1]}
            ref={maxPriceRef}
            type="number"
          />
        </div>
        <Button onClick={() => {handleFilterSubmit();}}>
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