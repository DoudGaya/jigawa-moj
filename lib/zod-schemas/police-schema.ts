import * as z from 'zod'





export type FormData = z.infer<typeof policeUSerSchema>

// Zod schema for validating the user fields with password confirmation
const userSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    otherNames: z.string().optional(),
    email: z.string().email("Invalid email address"),
    confirmEmail: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(), // To be compared with password
    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^0\d{10}$/, "Invalid phone number format"),
    state: z.string().nonempty("State is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    localGovernment: z.string().nonempty("Local government area is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }).refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Email do not match",
  });

// Zod schema for validating the police fields
const policeSchema = z.object({
  stationName: z.string().nonempty("Police station name is required"),
  stationAddress: z.string().nonempty("Address is required"),
  stationState: z.string().optional().default("Zamfara State"),
  stationLocalGovernment: z.string( {
    message: "Local government area is required",
  }),
  stationcontactNumber: z
    .string()
    .regex(/^0\d{10}$/, "Invalid contact number format")
    .optional(),
    contactEmail: z.string().email("Invalid email address").optional(),
});

export const policeUSerSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  otherNames: z.string().optional(),
  email: z.string().email("Invalid email address"),
  confirmEmail: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(), // To be compared with password
  police: policeSchema,
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^0\d{10}$/, "Invalid phone number format"),
  state: z.string().nonempty("State is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  localGovernment: z.string().nonempty("Local government area is required"),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
}).refine((data) => data.email === data.confirmEmail, {
  path: ["confirmEmail"],
  message: "Email do not match",
});


// Combined schema
export const combinedPoliceUserSchema = z.object({
  user: userSchema,
  police: policeSchema,
});

