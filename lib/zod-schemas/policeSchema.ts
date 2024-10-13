import { z } from "zod"

// Zod schema for validating the user fields with password confirmation
const userSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    otherNames: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(), // To be compared with password
    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    state: z.string().nonempty("State is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    localGovernment: z.string().nonempty("Local government area is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Zod schema for validating the police fields
const policeSchema = z.object({
  stationName: z.string().nonempty("Police station name is required"),
  stationAddress: z.string().nonempty("Address is required"),
  stationLocalGovernment: z.string().nonempty("Local government area is required"),
  stationcontactNumber: z
    .string()
    .nonempty("Contact number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid contact number format"),
  contactEmail: z.string().email("Invalid email address").optional(),
});

// Combined schema
const combinedPoliceUserSchema = z.object({
  user: userSchema,
  police: policeSchema,
});

export const policeCaseFormSchema = z.object({
 defendantName: z.string().min(1, "Defendant's name is required"),
  defendantAddress: z.string().min(1, "Defendant's address is required"),
  defendantAge: z.string().min(1, "Defendant's age is required"),
  defendantSex: z.string().min(1, "Defendant's sex is required"),
  defendantOccupation: z.string().min(1, "Defendant's occupation is required"),
  placeOfOffense: z.string().min(1, "Place of offense is required"),
  nameOfIPO: z.string().min(1, "Name of IPO is required"),
  firstInformationReport: z.any().optional(),
  statementOfComplainant: z.any().optional(),
  statementOfVictims: z.any().optional(),
  statementOfWitness: z.any().optional(),
  medicalReport: z.any().optional(),
  pictures: z.any().optional(),
  })

