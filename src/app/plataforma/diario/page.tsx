"use client";

import { useState, useEffect, useCallback } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DiaryCard from "@/components/DiaryCard";
import DiaryModal from "@/components/DiaryModal";
import { diaries as staticDiaries } from "@/data/diaries";
import { Diary } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useDiaryFilters } from "@/hooks/useDiaryFilters";
import { calendars } from "@/data/diaries";

export default function Page() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parsedDate, setParsedDate] = useState<string>("");
  const { 
    selectedTags, 
    setSelectedTags, 
    selectedDate, 
    setSelectedDate,  
    filteredDiaries 
  } = useDiaryFilters(diaries);
  const { toast } = useToast();

  const handleDiaryClick = (diary: Diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDiary(null);
    setIsModalOpen(false);
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch("https://127.0.0.1:8080/api/diaries"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch diaries");
        }
        const data: Diary[] = await response.json();
        setDiaries(data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Erro ao carregar diários do servidor",
          description: "Carregando dados demonstrativos.",
          variant: "destructive",
        });
        setDiaries(staticDiaries);
      }
    };

    fetchDiaries();
  }, [toast]);

  // function to parse selectedDate into a string like "Novembro 2024"
  const parseSelectedDate = useCallback((date: Date | undefined) => {
    if (date instanceof Date) {
      const month = date.toLocaleString("pt-BR", { month: "long" });
      const year = date.getFullYear();
      return `${month} ${year}`;
    }
    return "";
  },
  []);

  useEffect(() => {
    setParsedDate(parseSelectedDate(selectedDate));
  });

  return (
    <SidebarProvider>
      <AppSidebar onTagsChange={handleTagsChange} selectedDate={selectedDate} onDateChange={handleDateChange} calendarsData={calendars} />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{parsedDate}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
          {filteredDiaries.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum diário disponível.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDiaries.map((diary) => (
                <DiaryCard
                  key={diary.id}
                  diary={diary}
                  onClick={handleDiaryClick}
                />
              ))}
            </div>
          )}
        </main>
      </SidebarInset>
      {/* Modal */}
      <DiaryModal
        diary={selectedDiary}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </SidebarProvider>
  );
}
