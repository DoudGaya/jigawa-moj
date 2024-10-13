
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET() {

    const role = await currentRole()
    if (role === UserRole.ADMIN) {
       return redirect('/ministry/dashboard')
    }

     if (role === UserRole.COURT) {

         return redirect('/court/dashboard')
     }

     if (role === UserRole.STAFF) {
        return redirect("/staff/dashboard")
     }
     if (role === UserRole.POLICE) {
      return redirect("/police/dashboard")
   }

     return redirect("/user/dashboard")
}




