"use client"

import { format } from "date-fns"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wine, ShoppingBasket, AlertTriangle, Pencil, Trash2 } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { CategoryAutocomplete, UnitAutocomplete } from "@/components/dashboard/organization/common"

interface Drink {
  id: string
  name: string
  category: string
  expiryDate?: Date
  quantity?: number
  unitName?: string
}

interface DrinkCategory {
  id: string
  name: string
}

export default function DrinkInventoryPage() {
  const [drinks, setDrinks] = useState<Drink[]>([
    {
      id: '1',
      name: 'Red Wine',
      category: 'Alcoholic',
      expiryDate: new Date('2024-12-31'),
      quantity: 50,
      unitName: 'bottles',
    },
    {
      id: '2',
      name: 'Orange Juice',
      category: 'Non-Alcoholic',
      expiryDate: new Date('2023-08-15'),
      quantity: 30,
      unitName: 'liters',
    },
    {
      id: '3',
      name: 'Sparkling Water',
      category: 'Non-Alcoholic',
      expiryDate: new Date('2024-06-30'),
      quantity: 100,
      unitName: 'cans',
    },
  ])

  const [categories, setCategories] = useState<DrinkCategory[]>([
    { id: '1', name: 'Alcoholic' },
    { id: '2', name: 'Non-Alcoholic' },
  ])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null)

  const [newDrink, setNewDrink] = useState<Partial<Drink>>({
    name: '',
    category: '',
    expiryDate: undefined,
    quantity: undefined,
    unitName: '',
  })

  const handleAddDrink = () => {
    const drink: Drink = {
      ...newDrink,
      id: Date.now().toString(),
    } as Drink
    setDrinks([...drinks, drink])
    setIsFormOpen(false)
    setNewDrink({
      name: '',
      category: '',
      expiryDate: undefined,
      quantity: undefined,
      unitName: '',
    })
  }

  const handleEditDrink = () => {
    if (editingDrink) {
      setDrinks(drinks.map(drink => drink.id === editingDrink.id ? editingDrink : drink))
      setEditingDrink(null)
      setIsFormOpen(false)
    }
  }

  const handleDeleteDrink = (id: string) => {
    setDrinks(drinks.filter(drink => drink.id !== id))
  }

  const handleCreateCategory = (name: string) => {
    const newCategory: DrinkCategory = {
      id: Date.now().toString(),
      name,
    }
    setCategories([...categories, newCategory])
  }

  const totalDrinks = drinks.length
  const lowStockDrinks = drinks.filter(drink => (drink.quantity || 0) < 10).length

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Drink Inventory</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Drinks
            </CardTitle>
            <Wine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDrinks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Drinks
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockDrinks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Drink Categories
            </CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="drinks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="drinks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Drinks List</h2>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button>Add Drink</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingDrink ? 'Edit Drink' : 'Add Drink'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editingDrink ? editingDrink.name : newDrink.name}
                      onChange={(e) => editingDrink ? setEditingDrink({...editingDrink, name: e.target.value}) : setNewDrink({...newDrink, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <CategoryAutocomplete
                      categories={categories}
                      value={editingDrink ? editingDrink.category : newDrink.category || ''}
                      onChange={(value) => editingDrink ? setEditingDrink({...editingDrink, category: value}) : setNewDrink({...newDrink, category: value})}
                      onCreateCategory={handleCreateCategory}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !editingDrink?.expiryDate && !newDrink.expiryDate && "text-muted-foreground"
                          )}
                        >
                          {editingDrink?.expiryDate || newDrink.expiryDate ? (
                            format(editingDrink?.expiryDate || newDrink.expiryDate!, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={editingDrink?.expiryDate || newDrink.expiryDate}
                          onSelect={(date) => editingDrink ? setEditingDrink({...editingDrink, expiryDate: date}) : setNewDrink({...newDrink, expiryDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={editingDrink ? editingDrink.quantity : newDrink.quantity}
                      onChange={(e) => editingDrink ? setEditingDrink({...editingDrink, quantity: parseInt(e.target.value)}) : setNewDrink({...newDrink, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitName">Unit</Label>
                    <UnitAutocomplete
                      value={editingDrink ? editingDrink.unitName || '' : newDrink.unitName || ''}
                      onChange={(value) => editingDrink ? setEditingDrink({...editingDrink, unitName: value}) : setNewDrink({...newDrink, unitName: value})}
                    />
                  </div>
                  <Button onClick={editingDrink ? handleEditDrink : handleAddDrink}>
                    {editingDrink ? 'Update Drink' : 'Add Drink'}
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
                <TableHead>Expiry Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drinks.map((drink) => (
                <TableRow key={drink.id}>
                  <TableCell>{drink.name}</TableCell>
                  <TableCell>{drink.category}</TableCell>
                  <TableCell>{drink.expiryDate ? format(drink.expiryDate, "PPP") : 'N/A'}</TableCell>
                  <TableCell>{drink.quantity}</TableCell>
                  <TableCell>{drink.unitName}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setEditingDrink(drink)
                        setIsFormOpen(true)
                      }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteDrink(drink.id)}>
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

