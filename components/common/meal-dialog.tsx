"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Category {
  id: string;
  name: string;
}

interface AddNewMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onAddMeal: (meal: { id: string; name: string; categoryId: string }) => void;
}

export function AddNewMealDialog({
  open,
  onOpenChange,
  categories,
  onAddMeal,
}: AddNewMealDialogProps) {
  const [mealName, setMealName] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  const [newCategory, setNewCategory] = React.useState("");
  const [categoryPopoverOpen, setCategoryPopoverOpen] = React.useState(false);
  const queryClient = useQueryClient();

  // Mock mutation for adding a new category
  const addCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        id: Math.random().toString(),
        name: name,
      };
    },
    onSuccess: (newCategory) => {
      // Update categories in the cache
      queryClient.setQueryData(["categories"], (oldData: Category[] = []) => {
        return [...oldData, newCategory];
      });
      setSelectedCategory(newCategory);
      setNewCategory("");
      setCategoryPopoverOpen(false);
      toast.success("Category added successfully");
    },
  });

  // Mock mutation for adding a new meal
  const addMealMutation = useMutation({
    mutationFn: async (data: { name: string; categoryId: string }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        id: Math.random().toString(),
        name: data.name,
        categoryId: data.categoryId,
      };
    },
    onSuccess: (data) => {
      // Update meals in the cache
      queryClient.setQueryData(["meals"], (oldData: Category[] = []) => {
        return [...oldData, data];
      });
      onAddMeal(data);
      toast.success("Meal added successfully");
      handleClose();
    },
    onError: () => {
      toast.error("Failed to add meal");
    },
  });

  const handleClose = () => {
    setMealName("");
    setSelectedCategory(null);
    setNewCategory("");
    onOpenChange(false);
  };

  const handleAddMeal = () => {
    if (!mealName || !selectedCategory) {
      toast.error("Please fill in all fields");
      return;
    }

    addMealMutation.mutate({
      name: mealName,
      categoryId: selectedCategory.id,
    });
  };

  const handleAddCategory = () => {
    if (!newCategory) return;
    addCategoryMutation.mutate(newCategory);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Meal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Meal name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Popover
              open={categoryPopoverOpen}
              onOpenChange={setCategoryPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryPopoverOpen}
                  className="justify-between"
                >
                  {selectedCategory?.name ?? "Select category"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandEmpty>
                    <div className="p-2">
                      <Input
                        placeholder="New category name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="mb-2"
                      />
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handleAddCategory}
                        disabled={addCategoryMutation.isPending}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {addCategoryMutation.isPending
                          ? "Adding..."
                          : "Add category"}
                      </Button>
                    </div>
                  </CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        onSelect={() => {
                          setSelectedCategory(category);
                          setCategoryPopoverOpen(false);
                        }}
                      >
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddMeal} disabled={addMealMutation.isPending}>
            {addMealMutation.isPending ? "Adding..." : "Add Meal"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
