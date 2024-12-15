"use client";

import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Check, ChevronsUpDown, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddNewMealDialog } from "./meal-dialog";
import { CategoryFilter } from "./category-filter";
import { SelectedMealBadges } from "./select-badge";

interface Category {
  id: string;
  name: string;
}

interface Meal {
  id: string;
  name: string;
  categoryId: string;
}

// Mock data - replace with actual API calls
const mockCategories: Category[] = [
  { id: "1", name: "Italian" },
  { id: "2", name: "Japanese" },
  { id: "3", name: "Chinese" },
  { id: "4", name: "Mexican" },
  { id: "5", name: "Indian" },
  { id: "6", name: "Thai" },
  { id: "7", name: "Mediterranean" },
  { id: "8", name: "American" },
];

const mockMeals: Meal[] = [
  { id: "1", name: "Pizza", categoryId: "1" },
  { id: "2", name: "Sushi", categoryId: "2" },
  { id: "3", name: "Dim Sum", categoryId: "3" },
  { id: "4", name: "Tacos", categoryId: "4" },
];

export function MealCombobox() {
  const [open, setOpen] = React.useState(false);
  const [selectedMeals, setSelectedMeals] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);

  const { data: meals = [], isLoading: isMealsLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => mockMeals,
    initialData: [],
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => mockCategories,
    initialData: [],
  });

  const filteredMeals = React.useMemo(() => {
    if (selectedCategories.length === 0) return meals;
    return meals.filter((meal) => selectedCategories.includes(meal.categoryId));
  }, [meals, selectedCategories]);

  const toggleMeal = (mealId: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isMealsLoading || isCategoriesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={toggleCategory}
          open={filterOpen}
          onOpenChange={setFilterOpen}
        />
      </div>

      <div>
        <SelectedMealBadges
          selectedMeals={selectedMeals}
          meals={meals}
          onRemove={toggleMeal}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedMeals.length === 0
                ? "Select meals..."
                : "Add more meals"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search meals..." />
              <CommandEmpty className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  No meals found.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setDialogOpen(true);
                    setOpen(false);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add new meal
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {filteredMeals.map((meal) => (
                  <CommandItem
                    key={meal.id}
                    value={meal.name}
                    onSelect={() => toggleMeal(meal.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedMeals.includes(meal.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {meal.name}
                    <span className="ml-auto text-sm text-muted-foreground">
                      {categories.find((c) => c.id === meal.categoryId)?.name}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <AddNewMealDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={categories}
        onAddMeal={(meal) => {
          setSelectedMeals((prev) => [...prev, meal.id]);
        }}
      />
    </div>
  );
}
