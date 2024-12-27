import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";

import {
  Button,
  Calendar as CalendarComponent,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export interface DateFilterState {
  date?: Date;
  dateRange?: DateRange;
  isRange: boolean;
}

export const DateFilter = ({
  dateState,
  setDateState,
  onDateChange,
}: {
  dateState: DateFilterState;
  setDateState: (state: DateFilterState) => void;
  onDateChange: (
    date: Date | undefined,
    dateRange: DateRange | undefined
  ) => void;
}) => {
  const toggleRangeMode = () => {
    const newState = {
      isRange: !dateState.isRange,
      date: undefined,
      dateRange: undefined,
    };
    setDateState(newState);
    onDateChange(undefined, undefined);
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDateState({ ...dateState, date: newDate });
    onDateChange(newDate, undefined);
  };

  const handleDateRangeSelect = (newDateRange: DateRange | undefined) => {
    setDateState({ ...dateState, dateRange: newDateRange });
    onDateChange(undefined, newDateRange);
  };

  const getDisplayText = () => {
    if (dateState.isRange) {
      if (!dateState.dateRange?.from) return "Pick a date range";
      return dateState.dateRange.to
        ? `${format(dateState.dateRange.from, "LLL dd, y")} - ${format(
            dateState.dateRange.to,
            "LLL dd, y"
          )}`
        : format(dateState.dateRange.from, "LLL dd, y");
    }
    return dateState.date ? format(dateState.date, "LLL dd, y") : "Pick a date";
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className={cn(dateState.isRange && "bg-accent")}
        onClick={toggleRangeMode}
      >
        {dateState.isRange ? "Date Range" : "Single Date"}
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !dateState.date && !dateState.dateRange && "text-muted-foreground"
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {getDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {dateState.isRange ? (
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateState.dateRange?.from}
              selected={dateState.dateRange}
              onSelect={handleDateRangeSelect}
              numberOfMonths={2}
            />
          ) : (
            <CalendarComponent
              mode="single"
              selected={dateState.date}
              onSelect={handleDateSelect}
              initialFocus
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
