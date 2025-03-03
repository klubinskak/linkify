import React, { forwardRef } from "react";
import { Input } from "./input";
import { Search } from "lucide-react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = "Search...", ...props }, ref) => {
    return (
      <div className="relative flex items-center rounded">
        <Search className="absolute left-2 h-6 w-6 p-1 text-gray-500 dark:text-gray-400 pointer-events-none" />
        <Input
          type="search"
          className="pl-10 pr-12 py-1 flex-1"
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        <kbd className="absolute right-2 h-5 border p-1 flex items-center gap-1 rounded font-mono text-[10px] font-medium text-muted-foreground pointer-events-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
