import { z } from "zod";


export const staffSettingsSchema = z.object({
    firstname: z.optional(z.string()),
    lastName: z.optional(z.string()),
    otherNames: z.optional(z.string()),
    state: z.optional(z.string()),
    localGovernment: z.optional(z.string()),
    gender: z.optional(z.string()),
    address: z.optional(z.string()),
    city: z.optional(z.string()),
    occupation: z.optional(z.string()),
    email: z.optional(z.string()),
    phone: z.optional(z.string()),
    image: z.optional(z.any()),
    maritalStatus: z.optional(z.string()),
    jobTitle: z.string().optional(),
    staffNumber: z.string().optional(),
    employerName: z.string().optional(),
    position: z.string().optional(),
    department: z.string().optional(),
    step: z.string().optional(),
    employmentLocation: z.string().optional(),
    salaryStructure: z.string().optional(),
    salaryGrade: z.string().optional(),
  }) 

  
  

export const StaffSchema = z.object({

    firstName: z.string().min(2, { //
      message: "Please provide your First Name",
    }),

    lastName: z.string().min(2, { //
      message: "Please provide your Last Name",
    }),

    otherNames: z.string().optional(), // 


    state: z.string().min(2, { // 
      message: "Please Select your State of residence",
    }),

    isTwoFactorEnabled: z.boolean().optional(),

    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),

    gender: z.enum(["MALE","FEMALE", "OTHER"]),

    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),

    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),

    phone: z.string().min(2, {
      message: "Provide Your Phone Number",
    }),

    localGovernment: z.string().min(2, {
      message: "Please provide your Local Government",
    }),

    // emplyment specifics

    jobTitle: z.string().min(2, {
      message: "Job Title is required",
    }),


    staffNumber: z.string().min(2, {
      message: "Please provide your staff number",
    }),

    employerName: z.string().min(2, {
      message: "Please provide your employer name",
    }),
    position: z.string().min(2, {
      message: "Please provide your work position",
    }),

    department: z.string().min(2, {
      message: "Please provide your Local Government",
    }),

    step: z.string().min(2, {
      message: "Step is required",
    }),

    employmentLocation: z.string().min(2, {
      message: "Location of employment is required",
    }),

    salaryStructure: z.string().min(2, {
      message: "Please provide your salary structure",
    }),
    salaryGrade: z.string().min(2, {
      message: "Please provide your Salary grade",
    }),
  })




export const StaffSettingsShema = z.object({

    firstName: z.string().min(2, { //
      message: "Please provide your First Name",
    }),

    lastName: z.string().min(2, { //
      message: "Please provide your Last Name",
    }),

    otherNames: z.string().optional(), // 


    state: z.string().min(2, { // 
      message: "Please Select your State of residence",
    }),

    
    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),
    
    gender: z.enum(["MALE","FEMALE", "OTHER"]),

    phone: z.string().min(2, {
      message: "Provide Your Phone Number",
    }),

    localGovernment: z.string().min(2, {
      message: "Please provide your Local Government",
    }),
  })