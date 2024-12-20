import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from '../_components/TopNav';
import { CourtSideBar } from './_components/CourtSideBar';


export default async function CourtLayout({ children }: { children: React.ReactNode }) {


  const session = await auth()

  
  if (session?.user.role === "USER") {
    return redirect("/user/dashboard")
   } else if (session?.user.role === "STAFF") {
    return redirect("/staff/dashboard")
   } else if (session?.user.role === "ADMIN") {
    return redirect("/ministry/dashboard")
   } else if ( session?.user.role === "POLICE" ) {
    return redirect('/police/dashboard') 
   } else {
    return (
      <SessionProvider session={session}>
        <div className="flex h-screen bg-slate-50 dark:bg-black md:flex-row md:overflow-hidden">
          <CourtSideBar />
          <div className="flex flex-col w-full ">
            <TopNav />
          <div className=" w-full h-full">
          {children}
          </div>
          </div>
        </div>
      </SessionProvider>
    );
  }
}