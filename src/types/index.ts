export interface Trait { // PHYSICAL CONTACT, EMOTIONAL, VERBAL, FINANCIAL, SEXUAL, NEGLECT, CARS, CARTOONS, DINOSSAURS, BULLYING, FRIENDSHIP, FOOD, ...
  id: number;
  name: string;
  description: string;
}

export interface Tag { // CRISIS, SCHOOL, FAMILY, FRIENDS, PSYCHOLOGICAL, PSYQUIATRIC, TASTES, HOBBIES, ROUTINE, DISORDERS, DISLIKES, HEALTH, DEVELOPMENT
  id: number;
  name: string;
  traitsIds: Trait['id'][] | null;
}

export interface Reply {
  id: number;
  content: string;
  authorId: User['id'];
  date: string; // ISO date string
}
 
export interface Diary {
  id: number;
  title: string;
  authorId: User['id'];
  date: string; // ISO date string
  accompaniedId: Accompanied['id'];
  tagsIds: Tag['id'][];
  annotation: string;
  replies: Reply[] | null;
}

export interface Contact {
  id: number;
  email: string;
  phone: string;
}

export interface UserPosition { // Father, Mother, Teacher, Psychologist, Psychiatrist, Nurse, Doctor, School Principal, Social Worker, Professor, Pedagogue.
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  hashedPassword: string;
  avatarUrl: string;
  entityId: Entity['id'];
  positionId: UserPosition['id'];
  contactsIds: Contact['id'][];
  diaryIds: Diary['id'][] | null;
}

export interface EntityType { // FAMILY, SCHOOL, PSYCHOLOGICAL_CLINIC, PSYQUIATRIC_CLINIC
  id: number;
  name: string;
}

export interface Entity {
  id: number;
  name: string;
  entityTypeId: EntityType['id'];
  contactsIds: Contact['id'][];
  mainUserId: User['id'];
  usersIds: User['id'][];
  accompaniedIds: Accompanied['id'][] | null;
  schoolStructureId: SchoolStructure['id'] | null; // Only for SCHOOL entities
}

export interface Disorder { // ADHD, AUTISM, ASPERGER, DOWN
  id: number;
  name: string;
  description: string;
  degree: string;
}

export interface Metadata {
  id: number;
  description: string;
  birthDate: string; // ISO date string
  disordersIds: Disorder['id'][];
  tagsIds: Tag['id'][] | null;
  evolution: string;
}

export interface Accompanied {
  id: number;
  name: string;
  hashedPassword: string;
  avatarUrl: string;
  metadataId: Metadata['id'];
  contactsIds: Contact['id'][];
  entityId: Entity['id'];
  diariesIds: Diary['id'][] | null;
}

export interface SchoolClass {
  id: number;
  name: string;
  entityId: Entity['id'];
  accompaniedIds: Accompanied['id'][] | null;
  usersIds: User['id'][];
}

export interface SchoolStructure {
  id: number;
  entityIds: Entity['id'][];
  schoolClassesIds: SchoolClass['id'][];
}