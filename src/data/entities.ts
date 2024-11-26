// src/data/entities.ts

import { entityTypes } from "./entityTypes";
import { userPositions } from "./userPositions";
import { Entity } from "@/types";

export const entities: Entity[] = [
  {
    id: 1,
    name: "The Lucena Family",
    entityTypeId: 1, // Family
    contactsIds: [1],
    mainUserId: 1, // Assuming user with id 1 is the main user
    usersIds: [1, 2], // User IDs
    accompaniedIds: [1], // Accompanied IDs
    schoolStructureId: 1, // Only for SCHOOL entities; irrelevant here
  },
  {
    id: 2,
    name: "InovaData Psychological Clinic",
    entityTypeId: 3, // Psychological Clinic
    contactsIds: [2],
    mainUserId: 3, // Assuming user with id 3 is the main user
    usersIds: [3, 4, 5], // User IDs
    accompaniedIds: [], // Accompanied IDs
    schoolStructureId: null, // Not applicable
  },
  {
    id: 3,
    name: "Abaré Elementary School",
    entityTypeId: 2, // School
    contactsIds: [3],
    mainUserId: 6, // Assuming user with id 6 is the main user
    usersIds: [6, 7, 8], // User IDs
    accompaniedIds: [2], // Accompanied IDs
    schoolStructureId: 2, // Reference to SchoolStructure
  },
  // Add more entities as needed
];
