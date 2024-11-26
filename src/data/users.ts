// src/data/users.ts

import { entities } from "./entities";
import { userPositions } from "./userPositions";
import { contacts } from "./contacts";

import { User } from "@/types";

export const users: User[] = [
  {
    id: 1,
    name: "Carlos Lucena",
    hashedPassword: "hashedpassword123", // Replace with actual hashed password
    avatarUrl: "/avatars/carlos.jpg",
    entityId: 1, // The Lucena Family
    positionId: 1, // Father
    contactsIds: [1], // Contact IDs
    diaryIds: [1],
  },
  {
    id: 2,
    name: "Mariana Lucena",
    hashedPassword: "hashedpassword456", // Replace with actual hashed password
    avatarUrl: "/avatars/mariana.jpg",
    entityId: 1, // The Lucena Family
    positionId: 2, // Mother
    contactsIds: [1],
    diaryIds: [1],
  },
  {
    id: 3,
    name: "Dr. Silva",
    hashedPassword: "hashedpassword789", // Replace with actual hashed password
    avatarUrl: "/avatars/dr_silva.jpg",
    entityId: 2, // InovaData Psychological Clinic
    positionId: 4, // Psychologist
    contactsIds: [2, 4],
    diaryIds: [],
  },
  {
    id: 4,
    name: "Enfermeira Maria",
    hashedPassword: "hashedpassword012", // Replace with actual hashed password
    avatarUrl: "/avatars/nurse_maria.jpg",
    entityId: 2, // InovaData Psychological Clinic
    positionId: 6, // Nurse
    contactsIds: [2, 5],
    diaryIds: [],
  },
  {
    id: 5,
    name: "Dr. Pereira",
    hashedPassword: "hashedpassword345", // Replace with actual hashed password
    avatarUrl: "/avatars/dr_pereira.jpg",
    entityId: 2, // InovaData Psychological Clinic
    positionId: 5, // Psychiatrist
    contactsIds: [2],
    diaryIds: [],
  },
  {
    id: 6,
    name: "João Fernandes",
    hashedPassword: "hashedpassword678", // Replace with actual hashed password
    avatarUrl: "/avatars/joao.jpg",
    entityId: 3, // Abaré Elementary School
    positionId: 3, // Teacher
    contactsIds: [3, 6],
    diaryIds: [],
  },
  {
    id: 7,
    name: "Ana Costa",
    hashedPassword: "hashedpassword901", // Replace with actual hashed password
    avatarUrl: "/avatars/ana.jpg",
    entityId: 3, // Abaré Elementary School
    positionId: 10, // Professor
    contactsIds: [3, 7],
    diaryIds: [],
  },
  {
    id: 8,
    name: "Luiza Souza",
    hashedPassword: "hashedpassword234", // Replace with actual hashed password
    avatarUrl: "/avatars/luiza.jpg",
    entityId: 3, // Abaré Elementary School
    positionId: 11, // Pedagogue
    contactsIds: [3, 8],
    diaryIds: [],
  },
  // Add more users as needed
];
