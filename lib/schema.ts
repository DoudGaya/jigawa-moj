import { z } from "zod"


export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  image: z.optional(z.any())
}) 

export const settingsSecurityDetailsSchema = z.object({
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  newPasswordConfirmation: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
}) 


export const loginSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
    password: z.string().min(1, {
      message: "Password is required"
    }),
    code: z.optional(z.string().length(6))
  })
  

  export const newPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
  })

  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
  })
  

  export const signUpSchema = z.object({
    fullName: z.string().min(2, {
      message: "Please provide your Full Name",
    }),
    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    phone: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),
  })

  export const StaffSchema = z.object({

    firstName: z.string().min(2, { //
      message: "Please provide your First Name",
    }),

    lastName: z.string().min(2, { //
      message: "Please provide your Last Name",
    }),

    OtherNames: z.string().optional(), // 
    state: z.string().min(2, {
      message: "Please Select your state",
    }),

    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),

    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),

    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),

    phone: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),

    position: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),

    localGovernment: z.string().min(2, {
      message: "Please provide your Local Government",
    }),

    staffNumber: z.string().min(2, {
      message: "Please provide your Local Government",
    }),

    staffRole: z.string().min(2, {
      message: "Please provide your Local Government",
    }),

    salaryStructure: z.string().min(2, {
      message: "Please provide your Local Government",
    }),
    role: z.enum(["USER","ADMIN", "STAFF", "COURT"]).default("STAFF"),
  })

  const CustomerSchema = z.object({

  })

  