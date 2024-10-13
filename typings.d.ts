import { Gender, UserRole, User, Court, Case, Infrastructure, Probate, Transaction, PoliceStation } from '@prisma/client';

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
    courtName: string;
    tribunal: string;
    city: string | null;
    courtAdress: string | null;
    courtLocalGovernment: string | null;
    jurisdiction: string | null;
    courtAddress: string | null;
    level: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User
    cases: Case[]
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

  interface PoliceUserType {
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
    emailVerified: Date
    image: string
    role: UserRole
    isTwoFactorEnabled: boolean
    police: PoliceStation

  }