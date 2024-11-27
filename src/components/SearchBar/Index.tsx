import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, SearchIcon, X } from "lucide-react";
import { SEARCH_CHARACTER_LIMIT } from "@/utils/constants";

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
  handleSearchClear: () => void;
}

export function SearchBar({ 
  handleSearch,
  handleSearchClear
} : SearchBarProps) {

  const [input, setInput] = useState<string>('');

  const handleInput = (input: string) => {
    if(input.length >= SEARCH_CHARACTER_LIMIT) {
      setInput(input.slice(0, SEARCH_CHARACTER_LIMIT));
      return;
    }
    setInput(input);
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
      "
    >
      <Search />
      <Input 
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={(e) => {
          if(!input.length || e.key !== "Enter") return;
          handleSearch(input);
        }}
        value={input}
        type="search" 
        placeholder="Enter product name..." 
        className="w-full" 
      />
      <Button 
        type="submit"
        disabled={!input.length}
        onClick={() => handleSearch(input)}
      >
        <p className="hidden sm:block">Search</p>
        <SearchIcon className="sm:hidden"/>
      </Button>
      <Button
        variant="secondary"
        disabled={!input.length}
        onClick={() => {
          setInput('');
          handleSearchClear();
        }}
      >
        <p className="hidden sm:block">Clear</p>
        <X className="sm:hidden"/>
      </Button>
    </div>

  );
}
