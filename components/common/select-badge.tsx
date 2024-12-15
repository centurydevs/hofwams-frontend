import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface SelectedMealBadgesProps {
  selectedMeals: string[];
  meals: Array<{ id: string; name: string }>;
  onRemove: (id: string) => void;
}

export function SelectedMealBadges({
  selectedMeals,
  meals,
  onRemove,
}: SelectedMealBadgesProps) {
  if (selectedMeals.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {selectedMeals.map((id) => {
        const meal = meals.find((m) => m.id === id);
        if (!meal) return null;

        return (
          <Badge
            key={meal.id}
            variant="secondary"
            className="flex items-center gap-1 pr-1"
          >
            {meal.name}
            <button
              onClick={(e) => {
                e.preventDefault();
                onRemove(meal.id);
              }}
              className="hover:bg-muted rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}
    </div>
  );
}
