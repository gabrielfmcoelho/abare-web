import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().refine((date) => {
    const today = new Date();
    const dob = new Date(date);
    const age = today.getFullYear() - dob.getFullYear();
    return age >= 2 && age <= 18;
  }, 'Age must be between 2 and 18 years'),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-say']),
  sexAtBirth: z.enum(['male', 'female']),
  profilePhoto: z.any().optional(),
});

export const medicalHistorySchema = z.object({
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  emergencyContact: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    relationship: z.string().min(2, 'Relationship must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    email: z.string().email('Invalid email address'),
  }),
  allergies: z.array(z.string()).optional(),
  otherAllergies: z.string().optional(),
  medicalConditions: z.array(z.string()).optional(),
  otherConditions: z.string().optional(),
  medications: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
  })).optional(),
});

export const familyInfoSchema = z.object({
  primaryGuardian: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    relationship: z.string().min(2, 'Relationship must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
  }),
  additionalGuardians: z.array(z.object({
    name: z.string(),
    relationship: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
  })).optional(),
  siblings: z.array(z.object({
    name: z.string(),
    age: z.number().min(0),
    sameSchool: z.boolean(),
  })).optional(),
});

export const educationalInfoSchema = z.object({
  gradeLevel: z.string(),
  previousSchool: z.string(),
  specialNeeds: z.array(z.string()).optional(),
  supportRequirements: z.string().optional(),
  academicRecords: z.any().optional(),
});

export const registrationSchema = z.object({
  personalInfo: personalInfoSchema,
  medicalHistory: medicalHistorySchema,
  familyInfo: familyInfoSchema,
  educationalInfo: educationalInfoSchema,
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type MedicalHistory = z.infer<typeof medicalHistorySchema>;
export type FamilyInfo = z.infer<typeof familyInfoSchema>;
export type EducationalInfo = z.infer<typeof educationalInfoSchema>;
export type RegistrationData = z.infer<typeof registrationSchema>;