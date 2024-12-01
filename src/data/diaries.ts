// src/data/diaries.ts

import { 
  Diary,
  Tag
} from "@/types";

const tagAnxiety: Tag = {
  id: 1,
  group: "Tags",
  name: "Ansiedade"
};

const tagSchool: Tag = {
  id: 2,
  group: "Ambientes",
  name: "Escola"
};

export const calendars = [
  {
    name: 'Tags',
    items: ['Crise', 'Gostos', 'Desgostos', 'Desenvolvimento', 'Atenção', 'Saúde', 'Ansiedade']
  },
  {
    name: "Acompanhados",
    items: ['José Lucas Lucena', 'Samuel Martins', 'Lucas Vinicius', 'Maria Cecilia Almeida'],
  },
  {
    name: "Ambientes",
    items: ["Familiar", "Escola", "Externo"]
  },
]

export const diaries: Diary[] = [
  {
    id: 1,
    title: "Acontecimento Inesperado",
    author: "Drª. Layse Policarpo",
    date: "2024-11-21",
    patient: "José Lucas Lucena",
    tags: [
      tagAnxiety,
      tagSchool,
    ],
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
