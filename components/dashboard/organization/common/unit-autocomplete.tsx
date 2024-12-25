import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

interface UnitAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

const defaultUnits = ["kg", "g", "l", "ml", "pcs"];

export function UnitAutocomplete({ value, onChange }: UnitAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [units, setUnits] = React.useState(defaultUnits);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select unit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search unit..." />
          <CommandEmpty>
            No unit found.
            <Button
              variant="link"
              onClick={() => {
                setUnits([...units, value]);
                onChange(value);
                setOpen(false);
              }}
            >
              Create {value}
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {units.map((unit) => (
              <CommandItem
                key={unit}
                onSelect={() => {
                  onChange(unit);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === unit ? "opacity-100" : "opacity-0"
                  )}
                />
                {unit}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
