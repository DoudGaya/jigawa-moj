"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createDeclarationOfAge } from "@/actions/filings";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

const declarationSchema = z.object({
  declarantName: z.string().min(1, "Declarant name is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  relationship: z.string().min(1, "Relationship is required"),
  personName: z.string().min(1, "Person's name is required"),
});

export const DeclarationForm = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof declarationSchema>>({
    resolver: zodResolver(declarationSchema),
    defaultValues: {
      declarantName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      relationship: "SELF",
      personName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof declarationSchema>) => {
    if (!user?.id || !user?.email) {
      toast.error("User information missing");
      return;
    }

    startTransition(() => {
      createDeclarationOfAge({
        ...values,
        dateOfBirth: new Date(values.dateOfBirth),
        userId: user.id,
        email: user.email!,
      })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else if (data.authorizationUrl) {
            toast.success("Redirecting to payment...");
            window.location.href = data.authorizationUrl;
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="declarantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Declarant Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Full Name" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Person's Name (Whose age is being declared)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Full Name" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship to Person</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. SELF, FATHER, MOTHER" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place of Birth</FormLabel>
              <FormControl>
                <Input {...field} placeholder="City, State" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Processing..." : "Proceed to Payment (₦500)"}
        </Button>
      </form>
    </Form>
  );
};

