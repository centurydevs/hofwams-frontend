"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UnitAutocomplete } from "./unit-autocomplete";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IngredientType } from "@/types";

interface IngredientFormProps {
  ingredient?: IngredientType;
  onSave: (ingredient: Partial<IngredientType>) => void;
  onCancel: () => void;
}

export function IngredientForm({
  ingredient,
  onSave,
  onCancel,
}: IngredientFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<
    Partial<IngredientType>
  >({
    defaultValues: ingredient || {
      name: "",
      purchaseDate: new Date(),
      expiryDate: new Date(),
      availableQuantity: 0,
      unitName: "",
    },
  });

  const onSubmit = (data: Partial<IngredientType>) => {
    onSave(data);
  };

  const purchaseDate = watch("purchaseDate");
  const expiryDate = watch("expiryDate");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name", { required: true })} />
      </div>
      <div>
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !purchaseDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {purchaseDate ? (
                format(purchaseDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={purchaseDate}
              onSelect={(date) => setValue("purchaseDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="expiryDate">Expiry Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !expiryDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiryDate ? (
                format(expiryDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={expiryDate}
              onSelect={(date) => setValue("expiryDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="availableQuantity">Available Quantity</Label>
        <Input
          id="availableQuantity"
          type="number"
          {...register("availableQuantity", {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>
      <div>
        <Label htmlFor="unitName">Unit</Label>
        <UnitAutocomplete
          value={watch("unitName") || ""}
          onChange={(value) => setValue("unitName", value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
