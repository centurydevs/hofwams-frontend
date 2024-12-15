import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  open,
  onOpenChange,
}: CategoryFilterProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2",
            selectedCategories.length > 0 &&
              "bg-primary text-primary-foreground"
          )}
        >
          <Filter className="h-4 w-4" />
          {selectedCategories.length > 0
            ? `${selectedCategories.length} categories`
            : "Filter by category"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category.id}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={() => onCategoryChange(category.id)}
          >
            {category.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
