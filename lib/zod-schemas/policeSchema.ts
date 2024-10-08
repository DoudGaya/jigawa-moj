import { z } from "zod"


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