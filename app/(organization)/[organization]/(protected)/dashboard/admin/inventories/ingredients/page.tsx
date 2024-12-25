"use client";

import { ShoppingBasket, Utensils, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientType, IngredientUsageType } from "@/types";
import {
  IngredientForm,
  IngredientTable,
  IngredientUsage,
} from "@/components/dashboard/organization/common";

// Mock data
const mockIngredients: IngredientType[] = [
  {
    id: "1",
    name: "Flour",
    purchaseDate: new Date("2023-06-01"),
    expiryDate: new Date("2023-12-01"),
    availableQuantity: 50,
    unitName: "kg",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-01"),
  },
  // Add more mock ingredients...
];

const mockUsages: IngredientUsageType[] = [
  {
    id: "1",
    ingredientName: "Flour",
    assignedQuantity: 5,
    quantityUsed: 3,
    unitName: "kg",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-15"),
  },
  // Add more mock usages...
];

export default function IngredientInventoryPage() {
  const [ingredients, setIngredients] =
    useState<IngredientType[]>(mockIngredients);
  const [usages, setUsages] = useState<IngredientUsageType[]>(mockUsages);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] =
    useState<IngredientType | null>(null);

  const handleAddIngredient = (newIngredient: Partial<IngredientType>) => {
    const ingredient: IngredientType = {
      ...newIngredient,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IngredientType;
    setIngredients([...ingredients, ingredient]);
    setIsFormOpen(false);
  };

  const handleEditIngredient = (updatedIngredient: Partial<IngredientType>) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === updatedIngredient.id
          ? { ...ing, ...updatedIngredient, updatedAt: new Date() }
          : ing
      )
    );
    setEditingIngredient(null);
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleAddUsage = (newUsage: Partial<IngredientUsageType>) => {
    const usage: IngredientUsageType = {
      ...newUsage,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IngredientUsageType;
    setUsages([...usages, usage]);
  };

  const handleEditUsage = (updatedUsage: IngredientUsageType) => {
    setUsages(
      usages.map((usage) =>
        usage.id === updatedUsage.id
          ? { ...usage, ...updatedUsage, updatedAt: new Date() }
          : usage
      )
    );
  };

  const handleDeleteUsage = (id: string) => {
    setUsages(usages.filter((usage) => usage.id !== id));
  };

  const totalIngredients = ingredients.length;
  const lowStockIngredients = ingredients.filter(
    (ing) => ing.availableQuantity < 10
  ).length;
  const totalUsages = usages.length;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Ingredient Inventory</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Ingredients
            </CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIngredients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Ingredients
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockIngredients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usages</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsages}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ingredients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Ingredients List</h2>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button>Add Ingredient</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingIngredient ? "Edit Ingredient" : "Add Ingredient"}
                  </DialogTitle>
                </DialogHeader>
                <IngredientForm
                  ingredient={editingIngredient || undefined}
                  onSave={
                    editingIngredient
                      ? handleEditIngredient
                      : handleAddIngredient
                  }
                  onCancel={() => {
                    setIsFormOpen(false);
                    setEditingIngredient(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
          <IngredientTable
            ingredients={ingredients}
            onEdit={setEditingIngredient}
            onDelete={handleDeleteIngredient}
          />
        </TabsContent>
        <TabsContent value="usage" className="space-y-4">
          <IngredientUsage
            usages={usages}
            ingredients={ingredients}
            onAdd={handleAddUsage}
            onEdit={handleEditUsage}
            onDelete={handleDeleteUsage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
