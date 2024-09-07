import { UserRole } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";


export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    firstName: string;
    lastName: string;
    otherNames: string;
    email: string | null;
    state: string;
    phone: string
    isOAuth: boolean
    
    localGovernment: string;
    gender: string;
    address: string | null;
    city: string | null;
    occupation: string | null
    maritalStatus: string | null
    password: string | null;
    isTwoFactorEnabled: boolean
    image: string | null
    emailVerified: Date | null;
    role: $Enums.UserRole;

    // staff

    jobTitle: string | null
    staffNumber: string | null
    employerName: string | null
    position: string | null
    department: string | null
    step: string | null
    employmentLocation: string | null
    salaryStructure: string | null
    salaryGrade: string | null


}


declare module 'next-auth' {
    interface Session {
        user: ExtendedUser
    }
}