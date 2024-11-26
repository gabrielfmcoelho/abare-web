// src/data/tags.ts
import { Tag } from "@/types";
import { traits } from "./traits";

export const tags: Tag[] = [
  {
    id: 1,
    name: "Crisis",
    traitsIds: [2, 10], // Emotional, Bullying
  },
  {
    id: 2,
    name: "School",
    traitsIds: [1, 3, 11], // Physical Contact, Verbal, Friendship
  },
  {
    id: 3,
    name: "Family",
    traitsIds: [1, 2, 6], // Physical Contact, Emotional, Neglect
  },
  {
    id: 4,
    name: "Friends",
    traitsIds: [11, 3], // Friendship, Verbal
  },
  {
    id: 5,
    name: "Psychological",
    traitsIds: [2, 3, 4], // Emotional, Verbal, Financial
  },
  {
    id: 6,
    name: "Psychiatric",
    traitsIds: [2, 3], // Emotional, Verbal
  },
  {
    id: 7,
    name: "Tastes",
    traitsIds: [12], // Food
  },
  {
    id: 8,
    name: "Hobbies",
    traitsIds: [7, 8, 9, 12], // CARS, Cartoons, Dinosaurs, Food
  },
  {
    id: 9,
    name: "Routine",
    traitsIds: [2, 3], // Emotional, Verbal
  },
  {
    id: 10,
    name: "Disorders",
    traitsIds: [2, 5], // Emotional, Sexual
  },
  {
    id: 11,
    name: "Dislikes",
    traitsIds: [6], // Neglect
  },
  {
    id: 12,
    name: "Health",
    traitsIds: [4, 5, 6], // Financial, Sexual, Neglect
  },
  {
    id: 13,
    name: "Development",
    traitsIds: [2, 3, 11], // Emotional, Verbal, Friendship
  },
  // Add more tags as needed
];
