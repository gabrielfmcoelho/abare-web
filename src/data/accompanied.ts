// src/data/accompanied.ts

import { metadataList } from "./metadata";
import { contacts } from "./contacts";
import { entities } from "./entities";
import { diaries } from "./diaries";
import { Accompanied } from "@/types";

export const accompanied: Accompanied[] = [
  {
    id: 1,
    name: "José Lucas Lucena",
    hashedPassword: "hashedpassword567", // Replace with actual hashed password
    avatarUrl: "/avatars/jose_lucas.jpg",
    metadataId: 0,
    contactsIds: [1],
    entityId: 1, // The Lucena Family
    diariesIds: [0],
  },
  {
    id: 2,
    name: "Maria Fernanda",
    hashedPassword: "hashedpassword890", // Replace with actual hashed password
    avatarUrl: "/avatars/maria_fernanda.jpg",
    metadataId: 1,
    contactsIds: [2],
    entityId: 3, // Abaré Elementary School
    diariesIds: [],
  },
  // Add more accompanied individuals as needed
];
