import { Gender, UserRole, User, Court, Case, Infrastructure, Probate, Transaction, PoliceStation, CaseType, CaseStatus, Hearing, Files, Council, Filing } from '@prisma/client';

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



  interface PoliceCaseSchemaType {
    id: String
    title: String
    caseDescription: String | undefined
    FIR: String | undefined
    placeOfOffense: String | undefined
    statementOfComplainant: String | undefined
    statementOfVictims: String | undefined
    statementOfWitness: String | undefined
    medicalReport: String | undefined
    defendantName: String | undefined
    defendantAddress: String | undefined
    defendantAge:  String | undefined
    defendantSex: String | undefined
    defendantOccupation: String | undefined
    pictures:String[] | []
    nameOfIPO: String | undefined
    tribunal: String | undefined
    caseStatus: CaseStatus
    caseNumber: String
    courtId: String | undefined
  }

  interface CaseSchemaWithAllRecords {
    id : String
    title: String
    caseDescription: String | undefined
    FIR: String | undefined
    placeOfOffense: String | undefined
    statementOfComplainant: String | undefined
    statementOfVictims: String | undefined
    statementOfWitness: String | undefined
    medicalReport: String | undefined
    defendantName: String | undefined
    defendantAddress: String | undefined
    defendantAge:  String | undefined
    defendantSex: String | undefined
    defendantOccupation: String | undefined
    pictures:String[] | []
    nameOfIPO: String | undefined
    tribunal: String | undefined
    caseNumber: String
    courtId: String | undefined
    court: CourtWithAllRecords
    caseType: CaseType | undefined
    caseStatus: CaseStatus
    transactions: Transaction[]
    hearings: Hearing[]
    files: Files[]
    caseCouncil: Council[]
    filing: Filing
    createdAt: Date
    updatedAt: Date
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