import { Tribunal } from "@prisma/client";
import * as z from "zod";
import { userSchema } from "../schema";


// const infrastructure = z.object({
//   name: z.string().optional(),
//   number: z.string().optional()
// })


const TribunalEnum = z.enum([
    "SHARIA",
    "CIVIL",
    "ELECTION",
    "INDUSTRIAL",
    "TAX",
    "ADMINISTRATIVE",
    "OTHER",
  ]);


//   // Define Zod schema for the Court
// const CourtRegisterSchema = z.object({
//     id: z.string().optional(),  // MongoDB ObjectId, optional since it's auto-generated
//     courtName: z.string().min(1, "Court name is required"),
//     tribunal: TribunalEnum,  // Must match one of the Tribunal enum values
//     location: z.string().optional(),
//     localGovernment: z.string().optional(),
//     jurisdiction: z.string().optional(),
//     city: z.string().optional(),
//     level: z.string().optional(),  // Supreme Court, High Court, etc.
//     user: userSchema,  // Nested user data schema for associating a user with the court
//     createdAt: z.date().optional().default(new Date()),  // Defaults to current date
//     updatedAt: z.date().optional().default(new Date()),  // Auto-updated
//   });


export const CourtRegisterSchema = z.object({

    firstName: z.string().min(2, { //
      message: "Please provide your First Name",
    }),
    lastName: z.string().min(2, { //
      message: "Please provide your Last Name",
    }),
    otherNames: z.string().optional(), // 
    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),
    state: z.string().min(2, {
      message: "Please Select your state",
    }),
    gender: z.enum(["MALE","FEMALE", "OTHER"]),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),
    phone: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),
    courtAddress: z.string().optional(),
    localGovernment: z.string().min(2, {
      message: "Please provide your Local Government",
    }),
  
    courtLocalGovernment: z.string().min(2, {
      message: "Provide the local Government of the Court",
    }),
  
  
    courtName: z.string().min(2, {
      message: "Name of court must be more than 2 characters "
    }),
    tribunal: TribunalEnum.default(Tribunal.CIVIL),
  
    level: z.string().min(3, {
      message: "Court Must have a level"
    }),
    city: z.string().min(2, {
      message: "Location must be more than 2 characters"
    }),
    jurisdiction: z.string().default("jigawa State"),
    // capacity: z.string().min(2, {
    //   message: 'Must be a minimum of two digits'
    // }),
  })