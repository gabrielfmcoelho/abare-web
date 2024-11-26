// src/data/metadata.ts

import { disorders } from "./disorders";
import { tags } from "./tags";
import { Metadata } from "@/types";

export const metadataList: Metadata[] = [
  {
    id: 1,
    description: "José Lucas is making steady progress in his social interactions.",
    birthDate: "2010-05-15",
    disordersIds: [1], // Autism
    tagsIds: [1, 2, 8], // Crisis, School, Hobbies
    evolution: "Improved communication skills over the past six months.",
  },
  {
    id: 2,
    description: "Maria has been facing challenges with attention and focus.",
    birthDate: "2012-08-22",
    disordersIds: [0], // ADHD
    tagsIds: [3, 5, 9], // Family, Psychological, Routine
    evolution: "Implemented daily routines have shown positive effects.",
  },
  // Add more metadata entries as needed
];
