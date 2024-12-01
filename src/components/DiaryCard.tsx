// src/components/DiaryCard.tsx

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Tag component
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Diary } from "@/types";

interface DiaryCardProps {
    diary: Diary;
    onClick: (diary: Diary) => void;
  }

const DiaryCard: React.FC<DiaryCardProps> = ({ diary, onClick }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the card's onClick
        setIsTruncated(!isTruncated);
    };

    return (
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden relative cursor-pointer group hover:bg-gray-50 transition-colors duration-200" onClick={() => onClick(diary)} aria-label={`View details for ${diary.title}`}>
            {/* Rings Section */}
            <div className="w-8 bg-abare-brown flex flex-col items-center py-4 space-y-2">
                {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="w-3 h-3 border-2 border-abare-gray-backgroud rounded-full bg-white"
                ></div>
                ))}
            </div>

            {/* Content Section */}
            <div className="p-4 w-full">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-semibold text-gray-800" aria-label={`${diary.replies.length} replies`}>{diary.title}</h2>
                    <Badge variant={"outline"}>{diary.replies?.length ?? 0}</Badge>
                </div>
                <p className="text-sm text-gray-500">
                    {
                        format(
                            parseISO(diary.date),
                            "dd 'de' MMMM yyyy", 
                            { locale: ptBR }
                        )
                    }
                    <br />
                    {diary.author && (
                        <span>{diary.author}</span>
                    )}
                </p>
                <p className="mt-2 text-gray-700">
                    <span className="font-semibold">Acompanhado:</span> {diary.patient}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {diary.tags.map((tag, idx) => (
                        <Badge key={idx} variant={"outline"}>{tag.name}</Badge>
                    ))}
                </div>
                <p className={`mt-4 text-gray-600 ${isTruncated ? "line-clamp-3" : ""}`}>{diary.annotation}</p>
                {diary.annotation.length > 100 && (
                    <button
                        className="text-blue-500 text-sm mt-1"
                        onClick={toggleTruncate}
                    >
                        {isTruncated ? "Leia mais" : "Leia menos"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DiaryCard;
