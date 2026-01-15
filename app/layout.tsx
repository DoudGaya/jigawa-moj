import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zamfara | Justice",
  description: "Zamfara State Ministry of justice service portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
     <SessionProvider session={session}>
     <body className={`${inter.className} text-gray-950 bg-gray-50`} suppressHydrationWarning>
        {children}
      </body>
     </SessionProvider>
    </html>
  );
}
