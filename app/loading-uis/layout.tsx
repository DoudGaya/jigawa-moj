import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from '../(protected)/_components/TopNav';
import { AdminDashboardSideBar } from '../(protected)/admin/_components/AdminSideBar';

export default async function LoadingLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-black md:flex-row md:overflow-hidden">
          <AdminDashboardSideBar/>
          <div className="flex flex-col w-full md:overflow-y-auto ">
            <TopNav />
          <div className=" mt-20 md:mt-0 w-full h-full">
          {children}
          </div>
          </div>
        </div>
    );
   }