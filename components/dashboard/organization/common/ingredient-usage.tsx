"use client";

import { useState } from "react";
import { IngredientUsageType, IngredientType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";
import { UnitAutocomplete } from "./unit-autocomplete";
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

interface IngredientUsageProps {
  usages: IngredientUsageType[];
  ingredients: IngredientType[];
  onAdd: (usage: Partial<IngredientUsageType>) => void;
  onEdit: (usage: IngredientUsageType) => void;
  onDelete: (id: string) => void;
}

interface UsageFormProps {
  usage: Partial<IngredientUsageType>;
  setUsage: (usage: Partial<IngredientUsageType>) => void;
  onSubmit: () => void;
  isEdit?: boolean;
}

export function IngredientUsage({
  usages,
  ingredients,
  onAdd,
  onEdit,
  onDelete,
}: IngredientUsageProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUsage, setEditingUsage] = useState<IngredientUsageType | null>(
    null
  );
  const [newUsage, setNewUsage] = useState<Partial<IngredientUsageType>>({
    ingredientName: "",
    assignedQuantity: 0,
    quantityUsed: null,
    unitName: "",
  });

  const handleAddUsage = () => {
    onAdd(newUsage);
    setIsAddDialogOpen(false);
    setNewUsage({
      ingredientName: "",
      assignedQuantity: 0,
      quantityUsed: null,
      unitName: "",
    });
  };

  const handleEditUsage = () => {
    if (editingUsage) {
      onEdit(editingUsage);
      setIsEditDialogOpen(false);
      setEditingUsage(null);
    }
  };

  const UsageForm = ({
    usage,
    setUsage,
    onSubmit,
    isEdit = false,
  }: UsageFormProps) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ingredientName">Ingredient Name</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {usage.ingredientName || "Select ingredient..."}
              <span className="sr-only">Toggle ingredient menu</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search ingredient..." />
              <CommandEmpty>No ingredient found.</CommandEmpty>
              <CommandGroup>
                {ingredients.map((ingredient) => (
                  <CommandItem
                    key={ingredient.id}
                    onSelect={() =>
                      setUsage({ ...usage, ingredientName: ingredient.name })
                    }
                  >
                    {ingredient.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="assignedQuantity">Assigned Quantity</Label>
        <Input
          id="assignedQuantity"
          type="number"
          value={usage.assignedQuantity}
          onChange={(e) =>
            setUsage({ ...usage, assignedQuantity: Number(e.target.value) })
          }
        />
      </div>
      <div>
        <Label htmlFor="quantityUsed">Quantity Used</Label>
        <Input
          id="quantityUsed"
          type="number"
          value={usage.quantityUsed || ""}
          onChange={(e) =>
            setUsage({ ...usage, quantityUsed: Number(e.target.value) })
          }
        />
      </div>
      <div>
        <Label htmlFor="unitName">Unit</Label>
        <UnitAutocomplete
          value={usage.unitName || ""}
          onChange={(value) => setUsage({ ...usage, unitName: value })}
        />
      </div>
      <Button onClick={onSubmit}>
        {isEdit ? "Update Usage" : "Add Usage"}
      </Button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ingredient Usage</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Usage
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Ingredient Usage</DialogTitle>
            </DialogHeader>
            <UsageForm
              usage={newUsage}
              setUsage={setNewUsage}
              onSubmit={handleAddUsage}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead>Assigned Quantity</TableHead>
            <TableHead>Quantity Used</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usages.map((usage) => (
            <TableRow key={usage.id}>
              <TableCell>{usage.ingredientName}</TableCell>
              <TableCell>{usage.assignedQuantity}</TableCell>
              <TableCell>{usage.quantityUsed || "N/A"}</TableCell>
              <TableCell>{usage.unitName}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingUsage(usage)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Ingredient Usage</DialogTitle>
                      </DialogHeader>
                      {editingUsage && (
                        <UsageForm
                          usage={editingUsage}
                          setUsage={(usage) =>
                            setEditingUsage(usage as IngredientUsageType)
                          }
                          onSubmit={handleEditUsage}
                          isEdit
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(usage.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
