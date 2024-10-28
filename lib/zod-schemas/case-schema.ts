import { PartyRole } from '@prisma/client';
import * as z from 'zod'

const isBrowser = typeof window !== 'undefined';

// Custom file validation function
const fileValidation = (maxSize: number, allowedTypes: string[]) =>
    z.any()
      .refine(
        (file) => {
          if (!isBrowser) return true; // Skip validation on server
          return file instanceof File;
        },
        "Expected a file."
      )
      .refine(
        (file) => {
          if (!isBrowser) return true; // Skip validation on server
          return file.size <= maxSize;
        },
        `Max file size is ${maxSize / 1000000}MB.`
      )
      .refine(
        (file) => {
          if (!isBrowser) return true; // Skip validation on server
          return allowedTypes.includes(file.type);
        },
        `Only ${allowedTypes.join(', ')} files are allowed.`
      );


// Custom multiple file validation function
const multipleFileValidation = (maxSize: number, allowedTypes: string[]) =>
    z.any()
      .refine(
        (files) => {
          if (!isBrowser) return true; // Skip validation on server
          return files instanceof FileList;
        },
        "Expected a FileList."
      )
      .refine(
        (files) => {
          if (!isBrowser) return true; // Skip validation on server
          return Array.from(files as FileList).every(file => file.size <= maxSize);
        },
        `Max file size is ${maxSize / 1000000}MB.`
      )
      .refine(
        (files) => {
          if (!isBrowser) return true; // Skip validation on server
          return Array.from(files as FileList).every(file => allowedTypes.includes(file.type));
        },
        `Only ${allowedTypes.join(', ')} files are allowed.`
      );


export const policeCaseSchema = z.object({
    title: z.string().min(1, "First name is required"),
    caseDescription: z.string().min(1, "Last name is required"),
    placeOfOffense: z.string().optional(),
    nameOfIPO: z.string().optional(),
    defendantName: z.string().optional(),
    defendantAddress: z.string().optional(),
    defendantAge: z.string().optional(),
    defendantSex: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: "Please select the defendant's sex" })
    }),
    defendantOccupation: z.string().optional(),
    FIR: z.string().min(1, "Last name is required"),
    statementOfComplainant: z.string().optional(),
    statementOfVictims: z.string().optional(),
    statementOfWitness: z.string().optional(),
    medicalReport: z.string().optional(),
    pictures: z.array(z.string()).optional(),
});

export const improvedPoliceCaseSchema = z.object({

    title: z.string().min(1, "First name is required"),
    caseDescription: z.string().min(1, "Last name is required"),
    // FIR: z.string().min(1, "Last name is required"),
    placeOfOffense: z.string().optional(),
    nameOfIPO: z.string().optional(),

    // Defendant Information
    defendantName: z.string().optional(),
    defendantAddress: z.string().optional(),
    defendantAge: z.string().optional(),
    defendantSex: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: "Please select the defendant's sex" })
    }),
    defendantOccupation: z.string().min(1, "Defendant's occupation is required"),
    // FIR: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
    FIR: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
    statementOfComplainant: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
    statementOfVictims: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
    statementOfWitness: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
    medicalReport: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
    pictures: multipleFileValidation(5000000, ['image/jpeg', 'image/png', 'image/gif']).optional(),
});



export type PoliceCaseFormData = z.infer<typeof policeCaseSchema>;



export const UploadsSchema = z.object({
  fileTitle: z.string().min(1, "File title is required"),
  fileDescriptions: z.string().optional(),
  fileUrl: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
  caseId: z.string().optional(),
})



export const CaseCouncilSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be valid"),
  address: z.string().min(1, "Address is required"),
  role: z.string().optional(),
})

export const HearingSchema = z.object({
  date: z.date().optional(),
  time: z.string().optional(),
  caseCouncil: z.array(CaseCouncilSchema).optional(),
})

export const MinistryCaseSchema = z.object({
  title: z.string().min(1, "First name is required"),
  caseDescription: z.string().min(1, "Last name is required"),
  placeOfOffense: z.string().optional(),
  nameOfIPO: z.string().optional(),

  // Defendant Information
  defendantName: z.string().optional(),
  defendantAddress: z.string().optional(),
  defendantAge: z.string().optional(),
  defendantSex: z.enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: "Please select the defendant's sex" })
  }),
  defendantOccupation: z.string().min(1, "Defendant's occupation is required"),


  caseCouncil: z.array(CaseCouncilSchema).optional(),
  FIR: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
  statementOfComplainant: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
  statementOfVictims: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
  statementOfWitness: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
  medicalReport: fileValidation(5000000, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']).optional(),
  pictures: multipleFileValidation(5000000, ['image/jpeg', 'image/png', 'image/gif']).optional(),
  caseType: z.string().optional(),
  caseStatus: z.string().default("submitted"),



  // tribunal and court informations
  files: z.array(UploadsSchema).optional(),
  tribunal: z.string().optional(),
  court: z.string().optional(),
  hearings: z.array(HearingSchema).optional(),
});



