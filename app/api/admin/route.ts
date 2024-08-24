
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET() {

    const role = await currentRole()
    if (role === UserRole.ADMIN) {
       return redirect('/admin/dashboard')
    }

     if (role === UserRole.COURT) {

         return redirect('/court/dashboard')
     }

     if (role === UserRole.STAFF) {
        return redirect("/staff/dashboard")
     }

     return redirect("/user/dashboard")
}




