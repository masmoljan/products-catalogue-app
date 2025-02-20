import { forwardRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FilterRangeInputProps {
  defaultValue: number
  min?: number
  max?: number
  type: string
  label: string
}

const FilterRangeInput = forwardRef<HTMLInputElement, FilterRangeInputProps>(
  function FilterRangeInput({ ...props }, ref) {
    return (
      <>
        <Label>{props.label}</Label>
        <Input {...props} ref={ref}/>
      </>
    );
  }
);

export default FilterRangeInput;