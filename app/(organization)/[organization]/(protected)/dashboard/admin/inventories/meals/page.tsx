"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CategoryAutocomplete, UnitAutocomplete } from "@/components/dashboard/organization/common"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtensilsCrossed, ShoppingBasket, AlertTriangle, Pencil, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Meal {
  id: string
  name: string
  category: string
  shelfLife?: number
  quantity?: number
  shelfLifeUnit?: string
  unitName?: string
}

interface MealCategory {
  id: string
  name: string
}

const shelfLifeUnits = ["days", "weeks", "months"]

export default function MealInventoryPage() {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Spaghetti Bolognese',
      category: 'Italian',
      shelfLife: 3,
      shelfLifeUnit: 'days',
      quantity: 20,
      unitName: 'servings',
    },
    {
      id: '2',
      name: 'Chicken Curry',
      category: 'Indian',
      shelfLife: 4,
      shelfLifeUnit: 'days',
      quantity: 15,
      unitName: 'portions',
    },
    {
      id: '3',
      name: 'Caesar Salad',
      category: 'Salads',
      shelfLife: 2,
      shelfLifeUnit: 'days',
      quantity: 25,
      unitName: 'bowls',
    },
  ])

  const [categories, setCategories] = useState<MealCategory[]>([
    { id: '1', name: 'Italian' },
    { id: '2', name: 'Indian' },
    { id: '3', name: 'Salads' },
  ])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)

  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    name: '',
    category: '',
    shelfLife: undefined,
    quantity: undefined,
    shelfLifeUnit: undefined,
    unitName: '',
  })

  const handleAddMeal = () => {
    const meal: Meal = {
      ...newMeal,
      id: Date.now().toString(),
    } as Meal
    setMeals([...meals, meal])
    setIsFormOpen(false)
    setNewMeal({
      name: '',
      category: '',
      shelfLife: undefined,
      quantity: undefined,
      shelfLifeUnit: undefined,
      unitName: '',
    })
  }

  const handleEditMeal = () => {
    if (editingMeal) {
      setMeals(meals.map(meal => meal.id === editingMeal.id ? editingMeal : meal))
      setEditingMeal(null)
      setIsFormOpen(false)
    }
  }

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id))
  }

  const handleCreateCategory = (name: string) => {
    const newCategory: MealCategory = {
      id: Date.now().toString(),
      name,
    }
    setCategories([...categories, newCategory])
  }

  const totalMeals = meals.length
  const lowStockMeals = meals.filter(meal => (meal.quantity || 0) < 10).length

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Meal Inventory</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Meals
            </CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMeals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Meals
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockMeals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Meal Categories
            </CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="meals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="meals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Meals List</h2>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button>Add Meal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingMeal ? 'Edit Meal' : 'Add Meal'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editingMeal ? editingMeal.name : newMeal.name}
                      onChange={(e) => editingMeal ? setEditingMeal({...editingMeal, name: e.target.value}) : setNewMeal({...newMeal, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <CategoryAutocomplete
                      categories={categories}
                      value={editingMeal ? editingMeal.category : newMeal.category || ''}
                      onChange={(value) => editingMeal ? setEditingMeal({...editingMeal, category: value}) : setNewMeal({...newMeal, category: value})}
                      onCreateCategory={handleCreateCategory}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shelfLife">Shelf Life</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="shelfLife"
                        type="number"
                        value={editingMeal ? editingMeal.shelfLife : newMeal.shelfLife}
                        onChange={(e) => editingMeal ? setEditingMeal({...editingMeal, shelfLife: parseInt(e.target.value)}) : setNewMeal({...newMeal, shelfLife: parseInt(e.target.value)})}
                      />
                      <Select 
                        value={editingMeal ? editingMeal.shelfLifeUnit : newMeal.shelfLifeUnit} 
                        onValueChange={(value) => editingMeal ? setEditingMeal({...editingMeal, shelfLifeUnit: value}) : setNewMeal({...newMeal, shelfLifeUnit: value})}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {shelfLifeUnits.map(unit => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={editingMeal ? editingMeal.quantity : newMeal.quantity}
                      onChange={(e) => editingMeal ? setEditingMeal({...editingMeal, quantity: parseInt(e.target.value)}) : setNewMeal({...newMeal, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitName">Unit</Label>
                    <UnitAutocomplete
                      value={editingMeal ? editingMeal.unitName || '' : newMeal.unitName || ''}
                      onChange={(value) => editingMeal ? setEditingMeal({...editingMeal, unitName: value}) : setNewMeal({...newMeal, unitName: value})}
                    />
                  </div>
                  <Button onClick={editingMeal ? handleEditMeal : handleAddMeal}>
                    {editingMeal ? 'Update Meal' : 'Add Meal'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Shelf Life</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meals.map((meal) => (
                <TableRow key={meal.id}>
                  <TableCell>{meal.name}</TableCell>
                  <TableCell>{meal.category}</TableCell>
                  <TableCell>{meal.shelfLife} {meal.shelfLifeUnit}</TableCell>
                  <TableCell>{meal.quantity}</TableCell>
                  <TableCell>{meal.unitName}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setEditingMeal(meal)
                        setIsFormOpen(true)
                      }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteMeal(meal.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Categories List</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setCategories(categories.filter(c => c.id !== category.id))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}

