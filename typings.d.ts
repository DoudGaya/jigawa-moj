import { Gender, UserRole, User, Court, Case, Infrastructure, Probate, Transaction } from '@prisma/client';

interface CustomerType {
    id: string
    city: string
    address: string
    occupation: string
    employmentStatus:string
    maritalStatus: string
    userId: string
    probates: Probate[]
    transactions: Transaction[]
    cases: Case[]
  }


  interface CourtWithAllRecords {
    id: string;
    name: string;
    function: string;
    location: string | null;
    localGovernment: string | null;
    jurisdiction: string | null;
    city: string | null;
    level: string | null;
    userId: string;
    capacity: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: User
    cases: Case[]
    infrastructure: Infrastructure[]
    staffs: User[]
  }

  interface UserCustomer {
    id: string
    firstName: string
    lastName: string
    otherNames:string
    email: string
    password: string
    phone: string
    state: string
    gender: Gender
    localGovernment: string
    emailVerified: String
    image: string
    role: UserRole
    isTwoFactorEnabled: boolean
    customer: CustomerType

  }