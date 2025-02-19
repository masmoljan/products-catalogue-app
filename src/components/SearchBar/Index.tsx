import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { SEARCH_CHARACTER_LIMIT } from "@/utils/constants";
import { ProductSearchSchema } from "@/validation/searchProduct";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/reducer/productSearch";
import { resetPagination } from "@/reducer/productPagination";


export function SearchBar() {

  const [input, setInput] = useState<string>('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch()

  const handleInput = (input: string) => {
    if(input.length >= SEARCH_CHARACTER_LIMIT) {
      setInput(input.slice(0, SEARCH_CHARACTER_LIMIT));
      return;
    }
    setInput(input);
  };

  const handleSubmit = (input: string) => {
    const validate = ProductSearchSchema.safeParse(input);

    if(!validate.success) {
      validate.error.issues.map((issue) => 
        toast.error(issue.message)
      );
      return;
    }
    dispatch(resetPagination());
    dispatch(setSearchTerm(input));
  };

  return (
    <div 
      className="
        flex 
        min-w-full 
        items-center 
        border 
        border-gray-300 
        rounded-lg 
        px-2.5 
        py-1.5 
        space-x-3
        shadow-inner
      "
    >
      <Search />
      <Input 
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={(e) => {
          if(e.key !== "Enter") return;
          handleSubmit(input);
        }}
        ref={searchRef}
        value={input}
        type="search" 
        placeholder="Enter product name..." 
        className="w-full" 
      />
      <Button
        variant="secondary"
        disabled={!input.length}
        onClick={() => {
          setInput('');
          dispatch(setSearchTerm(''))
        }}
      >
        <p className="hidden sm:block">Clear</p>
        <X className="sm:hidden"/>
      </Button>
    </div>

  );
}
