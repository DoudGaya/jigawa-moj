import { Gender, UserRole, User, Court, Case, Infrastructure, Probate, Transaction, PoliceStation, CaseType, CaseStatus, Hearing, Files, Council, Filing, Staff } from '@prisma/client';

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
    id: string
    title: string
    caseDescription: string | undefined
    FIR: string | undefined
    placeOfOffense: string | undefined
    statementOfComplainant: string | undefined
    statementOfVictims: string | undefined
    statementOfWitness: string | undefined
    medicalReport: string | undefined
    defendantName: string | undefined
    defendantAddress: string | undefined
    defendantAge:  string | undefined
    defendantSex: string | undefined
    defendantOccupation: string | undefined
    pictures:string[] | []
    nameOfIPO: string | undefined
    tribunal: string | undefined
    caseStatus: CaseStatus
    caseNumber: string
    courtId: string | undefined
  }

  interface CaseSchemaWithAllRecords {
    id : string
    title: string
    caseDescription: string | undefined
    FIR: string | undefined
    placeOfOffense: string | undefined
    statementOfComplainant: string | undefined
    statementOfVictims: string | undefined
    statementOfWitness: string | undefined
    medicalReport: string | undefined
    defendantName: string | undefined
    defendantAddress: string | undefined
    dateOfFiling: Date | undefined,
    yearOfFiling: string | undefined,
    underActs: string | undefined,
    underSections: string | undefined,
    defendantAge:  string | undefined
    defendantSex: string | undefined
    courtRoom: string | undefined,
    courtDate: string | undefined,
    caseType: CaseType | undefined,
    judgeName: string | undefined
    judgeEmail: string | undefined
    courtTime: string | undefined
    judgePhone: string | undefined
    tribunal: string | undefined
    defendantOccupation: string | undefined
    pictures:string[] | []
    nameOfIPO: string | undefined
    tribunal: string | undefined
    caseNumber: string
    courtId: string | undefined
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

  interface StaffUser {
    id:                         string
    firstName:                  string
    lastName:                   string
    otherNames:                 string
    email:                      string
    password:                   string
    phone:                      string
    state:                      string
    gender:                     Gender
    localGovernment:            string
    emailVerified:              string
    image:                      string
    role:                       UserRole
    isTwoFactorEnabled:         boolean
    staff:                      Staff                          
  }




  interface GenericUser {
    id:                       string                    
    firstName:                string        | undefined
    lastName:                 string        | undefined
    otherNames:               string        | undefined
    email:                    string        | undefined                  
    password:                 string        | undefined
    phone:                    string        | undefined
    state:                    string        | undefined
    gender:                   Gender        | undefined
    localGovernment:          string        | undefined
    role:                     UserROle                             
  }


    // customer:                 CustomerType
    // staffNumber:              string | undefined
    // staffRole:                string | undefined
    // salaryStructure:          string | undefined
    // jobTitle:                 string | undefined
    // isJudge:                  boolean| undefined
    // department:               string | undefined
    // employerName:             string | undefined
    // employmentLocation:       string | undefined
    // position:                 string | undefined
    // salaryGrade:              string | undefined
    // step:                     string | undefined
    // dateOfEmployment:         string | undefined
    // userId:                   string | undefined                  
    // courtId:                  string | undefined
    // createdAt               
    // updatedAt         
    // court:                    CourtWithAllRecords


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
    emailVerified: string
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