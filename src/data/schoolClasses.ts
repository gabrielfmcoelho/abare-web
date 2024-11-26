// src/data/schoolClasses.ts

import { entities } from "./entities";
import { accompanied } from "./accompanied";
import { users } from "./users";
import { SchoolClass } from "@/types";

export const schoolClasses: SchoolClass[] = [
  {
    id: 1,
    name: "5th Grade - A",
    entityId: 3, // Abaré Elementary School
    accompaniedIds: [1], // José Lucas Lucena
    usersIds: [6, 7], // João Fernandes, Ana Costa
  },
  {
    id: 2,
    name: "6th Grade - B",
    entityId: 3, // Abaré Elementary School
    accompaniedIds: [2], // Maria Fernanda
    usersIds: [6, 8], // João Fernandes, Luiza Souza
  },
  // Add more school classes as needed
];
