// src/data/diaries.ts
import { User } from "@/types";
import { accompanied } from "./accompanied";
import { Diary } from "@/types";

export const diaries: Diary[] = [
  {
    id: 1,
    title: "Unexpected Event",
    authorId: 3, // Dr. Silva
    date: "2024-11-21",
    accompaniedId: 1, // José Lucas Lucena
    tagsIds: [1, 2, 8], // Crisis, School, Hobbies
    annotation:
      "An unexpected event occurred with the patient; he had an anxiety attack during the math class.",
    replies: [
      {
        id: 1,
        content: "I'm sorry to hear that. How is the psychological support going?",
        authorId: 3, // Dr. Silva
        date: "2024-11-22",
      },
      {
        id: 2,
        content: "We will closely monitor and adjust the treatment plan if necessary.",
        authorId: 4, // Enfermeira Maria
        date: "2024-11-23",
      },
    ],
  },
  {
    id: 2,
    title: "Routine Adjustment",
    authorId: 6, // João Fernandes
    date: "2024-12-01",
    accompaniedId: 2, // Maria Fernanda
    tagsIds: [3, 5, 9], // Family, Psychological, Routine
    annotation:
      "Adjusted daily routines to help Maria focus better in class. Noticed slight improvement in attention.",
    replies: [
      {
        id: 3,
        content: "Great to hear about the improvements! Keep up the good work.",
        authorId: 6, // João Fernandes
        date: "2024-12-02",
      },
    ],
  },
  // Add more diaries as needed
];
