"use client";

import { Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui";
import { DateFilter, DateFilterState } from "./date-filter";
import { TableHeader } from "./table-title";
import { SearchInput } from "./search-input";
import { ColumnVisibilityDropdown } from "./column-visibility-dropdown";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  title?: string;
  description?: string;
  dateField?: string;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  title,
  description,
  dateField = "createdAt",
}: DataTableToolbarProps<TData>) {
  const [dateState, setDateState] = useState<DateFilterState>({
    isRange: false,
    date: undefined,
    dateRange: undefined,
  });

  const hasFilters = useMemo(() => {
    return (
      globalFilter !== "" ||
      table.getState().columnFilters.length > 0 ||
      dateState.date ||
      dateState.dateRange?.from
    );
  }, [globalFilter, table, dateState]);

  const handleDateChange = (
    date: Date | undefined,
    dateRange: DateRange | undefined
  ) => {
    if (date) {
      table.getColumn(dateField)?.setFilterValue(format(date, "yyyy-MM-dd"));
    } else if (dateRange?.from) {
      table.getColumn(dateField)?.setFilterValue({
        from: format(dateRange.from, "yyyy-MM-dd"),
        to: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
      });
    } else {
      table.getColumn(dateField)?.setFilterValue(undefined);
    }
  };

  const clearFilters = () => {
    setGlobalFilter("");
    table.resetColumnFilters();
    setDateState({ isRange: false, date: undefined, dateRange: undefined });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <TableHeader title={title} description={description} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <SearchInput value={globalFilter} onChange={setGlobalFilter} />

        <DateFilter
          dateState={dateState}
          setDateState={setDateState}
          onDateChange={handleDateChange}
        />

        <ColumnVisibilityDropdown table={table} />

        {hasFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
