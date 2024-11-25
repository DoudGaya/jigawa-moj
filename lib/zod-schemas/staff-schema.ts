import { z } from "zod";

export const staff = z.object({
  staffNumber: z.string().optional(),
  staffRole: z.string().optional(),
  salaryStructure: z.string().optional(),
  jobTitle: z.string().optional(),
  isJudge: z.boolean().optional(),
  department: z.string().optional(),
  employerName: z.string().optional(),
  employmentLocation: z.string().optional(),
  position: z.string().optional(),
  salaryGrade: z.string().optional(),
  step: z.string().optional(),
  dateOfEmployment: z.string().optional(),
  maritalStatus: z.optional(z.string()),
}) 




export const StaffUserSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  otherNames: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"), 
  confirmPassword: z.string(), // To be compared with password
  staff: staff,
  phone: 
    z.string()
    .nonempty("Phone number is required")
    .regex(/^0\d{10}$/, "Invalid phone number format"),
  state: z.string().nonempty("State is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  localGovernment: z.string().nonempty("Local government area is required"),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
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