import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from '../_components/TopNav';
import { StaffSideBar } from './_components/StaffSideBar';


export default async function StaffDahboard({ children }: { children: React.ReactNode }) {

  const session = await auth()
  const user = session?.user.firstName
  if (session?.user.role === "USER") {
    return redirect("/user/dashboard")
   } else if (session?.user.role === "ADMIN") {
    return redirect("/admin/dashboard")
   } else if (session?.user.role === "COURT") {
    return redirect("/court/dashboard")
   } else {
    return (
      <SessionProvider session={session}>
        <div className="flex h-screen bg-slate-50 dark:bg-black md:flex-row md:overflow-hidden">
          <StaffSideBar />
          <div className="flex flex-col w-full md:overflow-y-auto ">
            <TopNav />
          <div className=" mt-20 md:mt-0 w-full h-full">
          {children}
          </div>
          </div>
        </div>
      </SessionProvider>
    );
  }
  }