// src/components/DiaryModal.tsx

"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"; // Adjust the import path based on your project structure
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Notebook,
    User,
    Ribbon,
    Handshake,
} from "lucide-react";
import { format } from "date-fns";
import { Diary } from "@/types";
import {Spinner} from "@nextui-org/spinner";
import Image from "next/image";

interface DiaryModalProps {
  diary: Diary | null;
  isOpen: boolean;
  onClose: () => void;
}

const DiaryModal: React.FC<DiaryModalProps> = ({ diary, isOpen, onClose }) => {
    if (!diary) {
        return (
          <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl p-6">
              <DialogHeader>
                <DialogTitle>Carregando...</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center h-40">
                <Spinner />
              </div>
            </DialogContent>
          </Dialog>
        );
      }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-6 transition-all duration-300">
        <DialogHeader className="flex justify-between items-start border-b pb-4">
          <div>
            <DialogTitle>{diary.title}</DialogTitle>
            <DialogDescription>
              {format(new Date(diary.date), "dd 'de' MMMM yyyy")}
              <br />
                {diary.author && (
                    <span>{diary.author}</span>
                )}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side: Diary Information */}
          <div className="space-y-4">
            {/* row gird */}
            <div className="grid gap-2 grid-flow-col"> 
                <h3 className="text-lg font-semibold">
                    <div className="flex flex-row space-x-2 items-center">
                        <User size={15} />
                        <span>Acompanhado</span>
                    </div>
                    <p className="text-base font-normal text-gray-600">
                        {diary.patient}
                    </p>
                </h3>
                <h3 className="text-lg font-semibold">
                    <div className="flex flex-row space-x-2 items-center">
                        <Handshake size={15} />
                        <span>Responsável</span>
                    </div>
                    <p className="text-base font-normal text-gray-600">
                        {diary.patient}
                    </p>
                </h3>   
            </div>
            
            <div className="flex flex-wrap gap-2">
              {diary.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div>
              <div className="flex flex-row space-x-2 items-center">
                <Notebook size={15} />
                <h3 className="text-lg font-semibold">Anotação</h3>
              </div>
              <p className="text-gray-600">{diary.annotation}</p>
            </div>
          </div>

          {/* Right Side: Replies */}
          <div className="space-y-4">
            
            <h3 className="text-lg font-semibold">Respostas</h3>
            {diary.replies.length === 0 ? (
              <p className="text-gray-500">Nenhuma resposta disponível.</p>
            ) : (
              <div className="space-y-4">
                {diary.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start">
                    {/* Speech Balloon */}
                    <div className="relative max-w-full bg-blue-100 p-3 rounded-lg shadow-lg">
                        <div className="flex flex-row space-x-4">
                            <p className="text-right">{reply.content}</p>
                            <Image src="/path-to-avatar.jpg" alt={`${reply.author} avatar`} className="w-8 h-8 rounded-full mr-3" width={32} height={32} />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-right block">
                            {reply.author} -{" "}
                            {format(new Date(reply.date), "dd/MM/yyyy")}
                        </p>
                    </div>
                  </div>
                ))}
                <div className="relative max-w-full bg-blue-100 p-3 rounded-lg shadow-lg space-y-4 justify-items-end">
                    <div className="flex flex-row space-x-4 w-full">
                        <textarea className="w-full p-2 text-right bg-transparent" placeholder="Escreva uma resposta..." />
                        <Image src="/path-to-avatar.jpg" alt='user avatar' className="w-8 h-8 rounded-full mr-3" width={32} height={32} />
                    </div>
                    <Button className="bg-abare-primary hover:bg-abare-secondary" variant={"default"}>Responder</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiaryModal;
