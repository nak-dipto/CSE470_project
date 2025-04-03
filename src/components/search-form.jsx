import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm({ ...props }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form {...props} onSubmit={handleSearch}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="flex items-center space-x-2 w-full max-w-sm">
            <div className="relative w-full">
              <SidebarInput
                id="search"
                placeholder="Search"
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>
            <Button type="submit" className="rounded-full">
              <Search />
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
