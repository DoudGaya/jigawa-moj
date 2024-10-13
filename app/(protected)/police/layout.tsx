import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from '../_components/TopNav';
// import { CourtSideBar } from './_components/CourtSideBar';
import { PoliceSideBar } from './_components/PoliceSideBar';


export default async function AdmninLayout({ children }: { children: React.ReactNode }) {


  const session = await auth()
  const user = session?.user.name
  if (session?.user.role === "USER") {
    return redirect("/user/dashboard")
   } else if (session?.user.role === "STAFF") {
    return redirect("/staff/dashboard")
   } else if (session?.user.role === "ADMIN") {
    return redirect("/ministry/dashboard")
   } else if ( session?.user.role === "COURT" ) {
    return redirect('/court/dashboard') 
   } else {
    return (
      <SessionProvider session={session}>
        <div className="flex dark:bg-black h-screen md:flex-row md:overflow-hidden">
          <PoliceSideBar />
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