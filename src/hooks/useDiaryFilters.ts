// src/hooks/useDiaryFilters.ts
import { useState, useEffect } from "react";
import { Diary } from "@/types";
import { parseISO, isWithinInterval, isSameDay } from "date-fns";
import { DateRange } from "react-day-picker";

export interface UseDiaryFilters {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedDate?: Date;
  setSelectedDate: (date: Date | undefined) => void;
  filteredDiaries: Diary[];
}

export function useDiaryFilters(diaries: Diary[]): UseDiaryFilters {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredDiaries, setFilteredDiaries] = useState<Diary[]>(diaries);

  useEffect(() => {
    let filtered = diaries;

    // Filtrar por tags selecionadas
    if (selectedTags.length > 0) {
        filtered = diaries.filter((diary) => {
        return selectedTags.some((tag) => {
            const [group, name] = tag.split("/");
            console.log("Filtering by group:", group, "name:", name);
            if (group === "Acompanhados") {
            return diary.patient.toLowerCase().includes(name.toLowerCase());
            } else {
            return diary.tags.some((t) => t.name.toLowerCase() === name.toLowerCase());
            }});
        });
    }

    // Filtrar por data ou intervalo de datas selecionadas
    if (selectedDate) {
      console.log("Filtering by date:", selectedDate);
      filtered = filtered.filter((diary) => {
        const diaryDate = parseISO(diary.date);
        if (selectedDate) {
          console.log("Diary date:", diaryDate);
          return isSameDay(diaryDate, selectedDate);
        }
        return true;
      });
    }

    setFilteredDiaries(filtered);
  }, [selectedTags, selectedDate, diaries]);

  return {
    selectedTags,
    setSelectedTags,
    selectedDate,
    setSelectedDate,
    filteredDiaries,
  };
}
