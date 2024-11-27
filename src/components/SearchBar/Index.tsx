import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, SearchIcon, X } from "lucide-react";

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
  handleSearchClear: () => void;
}

export function SearchBar({ 
  handleSearch,
  handleSearchClear
} : SearchBarProps) {

  const [input, setInput] = useState<string>('');

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
        onChange={(e) => setInput(e.target.value)}
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
