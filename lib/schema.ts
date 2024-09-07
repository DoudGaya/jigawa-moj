import { z } from "zod"

export const UserSettingsSchema = z.object({
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
  maritalStatus: z.optional(z.string())
}) 


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







export const settingsSecurityDetailsSchema = z.object({
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  newPasswordConfirmation: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
}) 

const infrastructure = z.object({
  name: z.string().optional(),
  number: z.string().optional()
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



export const customerCreateProbate = z.object({
  title: z.string().min(3, {
    message: "Title must be more than 3 characters"
  }),
  description: z.string().min(3, {
    message: "Title must be more than 3 characters"
  }),
  files: z.array(fileUpload).optional(),
  caseType: z.enum(['Criminal', 'Civil', 'Family', 'Other']),
})

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
  city: z.string().optional(),
  address: z.string().min(2, {
    message: "Password confirmation must match characters.",
  }),

  localGovernment: z.string().min(2, {
    message: "Please provide your Local Government",
  }),

  courtLocalGovernment: z.string().min(2, {
    message: "Provide the local Government of the Court",
  }),


  name: z.string().min(2, {
    message: "Name of court must be more than 2 characters "
  }),
  courtFunction: z.string().min(3, {
    message: "Must Contain a function"
  }),

  level: z.string().min(3, {
    message: "Court Must have a level"
  }),
  infrastructure: z.array(infrastructure),
  location: z.string().min(2, {
    message: "Location must be more than 2 characters"
  }),
  jurisdiction: z.string().default("Jigawa State"),
  capacity: z.string().min(2, {
    message: 'Must be a minimum of two digits'
  }),
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

  