"use client"
import React from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { BeatLoader } from 'react-spinners'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Separator } from "@/components/ui/separator"
  import { toast } from "sonner"



  
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Menu, FileText, Send, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTransition } from 'react'
import { submitPoliceCase } from "@/actions/police"
import { improvedPoliceCaseSchema, MinistryCaseSchema } from "@/lib/zod-schemas/case-schema"
import { uploadFileToS3, uploadMultipleFilesToS3 } from '@/awss3'




export const MinistryCaseForm = () => {
  
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState < string | undefined>('')
    const router = useRouter()
  
    const form = useForm<z.infer<typeof MinistryCaseSchema>>({
      resolver: zodResolver(MinistryCaseSchema),
      defaultValues: {
        title: "",
        caseDescription: "",
        placeOfOffense: "",
        nameOfIPO: "",
        defendantAddress: "",
        defendantAge: "",
        defendantName: "",
        defendantOccupation: "",
        caseCouncil: undefined,
        caseStatus: undefined,
        court: undefined,
        files: undefined,
        hearings: undefined,
        tribunal: undefined,
        caseType: undefined,
        defendantSex: undefined,
        FIR: undefined,
        medicalReport: undefined,
        pictures: undefined,
        statementOfComplainant: undefined,
        statementOfVictims: undefined, 
        statementOfWitness: undefined,
      },
    })

    async function onSubmit(data: z.infer<typeof MinistryCaseSchema>, isDraft: boolean) {
        try {
          let formDataToSubmit: any = { ...data };
    
          // Handle file uploads
          if (data.FIR) {
            formDataToSubmit.FIR = await uploadFileToS3(data.FIR, 'jigawa-state');
          }
    
          if (data.statementOfComplainant) {
            formDataToSubmit.statementOfComplainant = await uploadFileToS3(data.statementOfComplainant, 'jigawa-state');
          }
    
          if (data.statementOfVictims) {
            formDataToSubmit.statementOfVictims = await uploadFileToS3(data.statementOfVictims, 'jigawa-state');
          }
    
          if (data.statementOfWitness) {
            formDataToSubmit.statementOfWitness = await uploadFileToS3(data.statementOfWitness, 'jigawa-state');
          }
    
          if (data.medicalReport) {
            formDataToSubmit.medicalReport = await uploadFileToS3(data.medicalReport, 'jigawa-state');
          }
    
          if (data.pictures) {
            formDataToSubmit.pictures = await uploadMultipleFilesToS3(data.pictures, 'jigawa-state');
          }
          
          // if (data.files) {
          //   formDataToSubmit.pictures = await uploadMultipleFilesToS3(data.files, 'jigawa-state');
          // }

          setError('')
          setSuccess('')
      
          startTransition(() => {
            submitPoliceCase(formDataToSubmit, isDraft)
            .then((data) => {
              if (data.error) {
                setError(data.error)
              } else {
                setSuccess(data.message)
                toast("New Case has been created.")
                router.refresh()
              }
            })
          })
        } catch (error) {
          console.error('Error processing form submission:', error);
         
        }
    }

  return (
    <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => onSubmit(data, false))} className="space-y-8">
                  <div className=' flex flex-col space-y-8'>
                  <div className=' py-4'>
                   <div className=" flex flex-row ">
                      <h3 className="text-xl font-semibold mb-4 text-primary">Case Information</h3>
                   </div>
                    <Separator className=' my-2 border-green-300' />
                    <div className="grid grid-cols-1 my-4 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Title</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} placeholder="Enter place of offense" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="caseDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Description</FormLabel>
                            <FormControl>
                              <Textarea disabled={isPending} placeholder="Case Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 my-4 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="placeOfOffense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Offense</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} placeholder="Enter place of offense" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nameOfIPO"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of IPO</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} placeholder="Enter name of IPO" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator about='Text' />


                    <h3 className="text-xl text-green-600 font-semibold mb-4">Defendant Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="defendantName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of the Defendant</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} placeholder="Enter defendant's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="defendantAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address of the Defendant</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} placeholder="Enter defendant's address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="defendantAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} type="number" placeholder="Enter defendant's age" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="defendantSex"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sex</FormLabel>
                            <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sex" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="defendantOccupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} placeholder="Enter defendant's occupation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">File Uploads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="FIR"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>First Information Report</FormLabel>
                            <FormControl>
                              <Input disabled={isPending}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="statementOfComplainant"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Statement of Complainant</FormLabel>
                            <FormControl>
                              <Input disabled={isPending}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="statementOfVictims"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Statement of Victims</FormLabel>
                            <FormControl>
                              <Input disabled={isPending}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="statementOfWitness"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Statement of Witness</FormLabel>
                            <FormControl>
                              <Input disabled={isPending}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="medicalReport"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Medical Report (if any)</FormLabel>
                            <FormControl>
                              <Input disabled={isPending}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pictures"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Pictures (if any)</FormLabel>
                            <FormControl>
                              <Input disabled={isPending}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => onChange(e.target.files)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="md:flex grid grid-cols-2 gap-4 md:justify-end space-x-4">
                    <Button type="button" disabled={isPending} variant="outline" onClick={() => form.handleSubmit((data) => onSubmit(data, true))()}>
                      <Save className="mr-2 h-4 w-4" />
                      Save as Draft
                    </Button>
                    <Button disabled={isPending} type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Submit
                    </Button>
                  </div>
                </form>
          </Form>
    </div>
  )
}
