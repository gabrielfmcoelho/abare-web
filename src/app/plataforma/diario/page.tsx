// src/app/diaries/page.tsx

"use client";

import { useState, useEffect } from "react";
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
import { diaries as staticDiaries } from "@/data/diaries"; // Import your diaries data
import { Diary } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDiaryClick = (diary: Diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDiary(null);
    setIsModalOpen(false);
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
          description: "Por favor, tente novamente mais tarde, por enquanto mostrando diários estáticos.",
          variant: "destructive",
        })
        setDiaries(staticDiaries);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Novembro 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
          {diaries.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum diário disponível.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {diaries.map((diary) => (
                <DiaryCard key={diary.id} diary={diary} onClick={handleDiaryClick} />
              ))}
            </div>
          )}
        </main>
      </SidebarInset>
      {/* Modal */}
      <DiaryModal diary={selectedDiary} isOpen={isModalOpen} onClose={handleCloseModal} />
    </SidebarProvider>
  );
}
