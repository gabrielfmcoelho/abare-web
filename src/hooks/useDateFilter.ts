import { useState } from "react";
import { isSameDay, isWithinInterval, parseISO } from "date-fns";
import { Diary } from "@/types";

type FilterType = "single" | "range";

export function useDateFilter() {
  const [filterType, setFilterType] = useState<FilterType>("single");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const filterDiaries = (diaries: Diary[]): Diary[] => {
    if (filterType === "single" && selectedDate) {
      return diaries.filter((diary) =>
        isSameDay(parseISO(diary.date), selectedDate)
      );
    }

    if (filterType === "range" && dateRange.start && dateRange.end) {
      return diaries.filter((diary) =>
        console.log("Filtering by date range:", dateRange),
      );
    }

    return diaries; // No filtering if no date is selected
  };

  return {
    filterType,
    setFilterType,
    selectedDate,
    setSelectedDate,
    dateRange,
    setDateRange,
    filterDiaries,
  };
}
