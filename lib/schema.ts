import { z } from "zod"


const UserRoleEnum = z.enum(["USER", "ADMIN", "STAFF", "COURT", "POLICE"]);
const GenderEnum = z.enum(["MALE", "FEMALE"]);

export const userSchema = z.object({
  id: z.string().optional(),  // MongoDB ObjectId, optional since it's auto-generated
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherNames: z.string().optional(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be valid"),
  state: z.string().optional(),
  gender: GenderEnum,
  localGovernment: z.string().optional(),
  emailVerified: z.date().optional(),
  image: z.string().url().optional(),  // Image URL
  // role: UserRoleEnum.default("USER"),  // Default role is "USER"
  isTwoFactorEnabled: z.boolean().default(false),  // Default is 2FA disabled
});








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


