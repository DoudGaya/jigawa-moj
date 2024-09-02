import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from '../(protected)/_components/TopNav';
import { UserDashboardSideBar } from '../(protected)/user/_components/UserSideBar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
    return (
      <SessionProvider>
        <div className="flex h-screen bg-slate-50 dark:bg-black md:flex-row md:overflow-hidden">
          <UserDashboardSideBar/>
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