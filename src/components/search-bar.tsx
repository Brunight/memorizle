import { Search } from "lucide-react";

import { SearchInput } from "./search-input";

interface SearchBarProps {
  defaultValue: string;
}

export function SearchBar({ defaultValue }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <SearchInput defaultValue={defaultValue} />
    </div>
  );
}
