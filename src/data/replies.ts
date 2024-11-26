// src/data/replies.ts

import { Reply } from "@/types";

export const replies: Reply[] = [
  {
    id: 1,
    content: "Lamento ouvir isso. Como está o acompanhamento psicológico?",
    authorId: 3, // Dr. Silva
    date: "2024-11-22",
  },
  {
    id: 2,
    content: "Vamos monitorar de perto e ajustar o plano de tratamento se necessário.",
    authorId: 4, // Enfermeira Maria
    date: "2024-11-23",
  },
  {
    id: 3,
    content: "Great to hear about the improvements! Keep up the good work.",
    authorId: 6, // João Fernandes
    date: "2024-12-02",
  },
  // Add more replies as needed
];
