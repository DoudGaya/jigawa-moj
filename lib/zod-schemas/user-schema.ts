
import { z } from "zod"




export const UpdateUserRecordSchema = z.object({
    firstName: z.optional(z.string()),
    lastName:  z.optional(z.string()),
    otherNames: z.string().optional(), // 
    email:  z.optional(z.string()),
    state: z.optional(z.string()),
    maritalStatus: z.optional(z.string()),
    employmentStatus: z.string().optional(),
    gender: z.enum(["MALE","FEMALE", "OTHER"]).optional(),
    password:  z.optional(z.string()),
    passwordConfirmation:  z.optional(z.string()),
    phone:  z.optional(z.string()),
    city: z.string().optional(),
    address:  z.optional(z.string()),
    occupation: z.string().optional(),
    localGovernment: z.optional(z.string()),
  }).refine((data) => {
    if (data.password && !data.passwordConfirmation) {
      return false
    }

    if (data.passwordConfirmation !== data.password) {
      return false
    }
    return true
  }, {
    message: "Password Must Match"
  })


  
export const UserSettingsSchema = z.object({
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    otherNames: z.optional(z.string()),
    state: z.optional(z.string()),
    localGovernment: z.optional(z.string()),
    gender: z.optional(z.enum(["MALE","FEMALE", "OTHER"])),
    address: z.optional(z.string()),
    city: z.optional(z.string()),
    occupation: z.optional(z.string()),
    email: z.optional(z.string()),
    phone: z.optional(z.string()),
    image: z.optional(z.any()),
    maritalStatus: z.optional(z.string())
  }) 
  


  const fileUpload = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
  })

  
  
export const customerCreateCase = z.object({
    title: z.string().min(3, {
      message: "Title must be more than 3 characters"
    }),
    description: z.string().min(3, {
      message: "Title must be more than 3 characters"
    }),
    files: z.array(fileUpload).optional(),
    caseType: z.enum(['Criminal', 'Civil', 'Family', 'Other']),
  })

  

export const settingsSecurityDetailsSchema = z.object({
    oldPassword: z.optional(z.string()),
    newPassword: z.optional(z.string()),
    newPasswordConfirmation: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
  }) 

  
  

  export const signUpSchema = z.object({
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

    maritalStatus: z.string().optional(),
    employmentStatus: z.string().optional(),
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
    city: z.string().optional(),

    address: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),

    occupation: z.string().optional(),

    localGovernment: z.string().min(2, {
      message: "Please provide your Local Government",
    }),
  })