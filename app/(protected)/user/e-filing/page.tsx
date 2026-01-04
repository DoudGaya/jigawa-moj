"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AffidavitForm } from "@/components/filing/AffidavitForm";
import { DeclarationForm } from "@/components/filing/DeclarationForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

const EFilingPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">E-Filing Services</h1>
        <Button asChild variant="outline">
          <Link href="/user/e-filing/history">
            <History className="mr-2 h-4 w-4" />
            View History
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="affidavit" className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="affidavit">Affidavit</TabsTrigger>
          <TabsTrigger value="declaration">Declaration of Age</TabsTrigger>
        </TabsList>
        
        <TabsContent value="affidavit">
          <Card>
            <CardHeader>
              <CardTitle>File an Affidavit</CardTitle>
              <CardDescription>
                Submit a sworn affidavit electronically. Fee: ₦500
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AffidavitForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="declaration">
          <Card>
            <CardHeader>
              <CardTitle>Declaration of Age</CardTitle>
              <CardDescription>
                File a statutory declaration of age. Fee: ₦500
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeclarationForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EFilingPage;

