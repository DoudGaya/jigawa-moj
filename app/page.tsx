
import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronRight, Gavel, Shield, Users, FileText } from 'lucide-react'
import Link from "next/link"


export default function Home() {
  return (
  <>
  <PublicNavigations />
    <Banner />
    <section className="py-16 ">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Police Management", icon: Shield, description: "Efficient tracking and coordination of law enforcement activities" },
                { title: "Court Management", icon: Gavel, description: "Streamlined court processes and case scheduling" },
                { title: "Staff Management", icon: Users, description: "Comprehensive system for managing judiciary personnel" },
                { title: "Case Management", icon: FileText, description: "End-to-end tracking and management of legal cases" }
              ].map((feature, index) => (
                <Card key={index} className="text-center border-green-200 border">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 mx-auto text-navy-600 mb-4" />
                    <CardTitle className=" text-green-600">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
  <Footer />
  </>
  );
}


