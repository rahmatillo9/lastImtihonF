import { Heart, Search, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchBar() {
    return (
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input type="search" placeholder="What are you looking for?" className="w-[200px] lg:w-[300px]" />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
    );
  }