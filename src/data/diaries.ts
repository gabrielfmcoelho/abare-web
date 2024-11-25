// src/data/diaries.ts

import { Diary } from "@/types";

export const diaries: Diary[] = [
  {
    id: 1,
    title: "Acontecimento Inesperado",
    author: "Drª. Layse Policarpo",
    date: "2024-11-21",
    patient: "José Lucas Lucena",
    tags: ["Escola", "Crise"],
    annotation:
      "Aconteceu algo inesperado com o paciente, ele teve uma crise de ansiedade durante a aula de matemática.",
    replies: [
      {
        id: 1,
        content: "Lamento ouvir isso. Como está o acompanhamento psicológico?",
        author: "Dr. Silva",
        date: "2024-11-22",
      },
      {
        id: 2,
        content:
          "Vamos monitorar de perto e ajustar o plano de tratamento se necessário.",
        author: "Enfermeira Maria",
        date: "2024-11-23",
      },
    ],
  },
  // Add more diary entries as needed
];
