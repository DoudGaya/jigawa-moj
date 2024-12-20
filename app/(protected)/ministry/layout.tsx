import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from '../_components/TopNav';
import { AdminDashboardSideBar } from "./_components/AdminSideBar";

export default async function AdmninLayout({ children }: { children: React.ReactNode }) {


  const session = await auth()
   if (session?.user.role === "USER") {
    return redirect("/user/dashboard")
   } else if (session?.user.role === "STAFF") {
    return redirect("/staff/dashboard")
   } else if (session?.user.role === "COURT") {
    return redirect("/court/dashboard")
  } else if ( session?.user.role === "POLICE" ) {
    return redirect('/police/dashboard') 
   } else {
    return (
      <SessionProvider session={session}>
        <div className="flex h-screen bg-slate-100 dark:bg-black md:flex-row md:overflow-hidden">
          <AdminDashboardSideBar/>
          <div className="flex flex-col w-full">
          <TopNav />
          <div className=" mt-16 lg:mt-4 w-full h-full">
                {children}
          </div>
          </div>
        </div>
      </SessionProvider>
    );
   }
}