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
import { Textarea } from "@/components/ui/textarea";
import { createAffidavit } from "@/actions/filings";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const affidavitSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  deponentName: z.string().min(1, "Deponent name is required"),
  swornAt: z.string().min(1, "Location is required"),
});

export const AffidavitForm = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof affidavitSchema>>({
    resolver: zodResolver(affidavitSchema),
    defaultValues: {
      title: "",
      content: "",
      deponentName: "",
      swornAt: "",
    },
  });

  const onSubmit = (values: z.infer<typeof affidavitSchema>) => {
    if (!user?.id || !user?.email) {
      toast.error("User information missing");
      return;
    }

    startTransition(() => {
      createAffidavit({ ...values, userId: user.id, email: user.email! })
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title of Affidavit</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Affidavit of Loss of Document" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deponentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deponent Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Full Name" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="swornAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sworn At (Court/Location)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. High Court of Justice, Dutse" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="I, [Name], citizen of Nigeria..." disabled={isPending} />
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

