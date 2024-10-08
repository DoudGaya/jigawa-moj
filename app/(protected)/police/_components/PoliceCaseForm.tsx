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
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Separator } from "@/components/ui/separator"


  
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Menu, FileText, Send, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitPoliceCase } from "@/actions/police"
import { policeCaseFormSchema } from "@/lib/zod-schemas/policeSchema"
import { uploadFileToS3 } from '@/lib/aws/aws-s3'




export const PoliceCaseForm = () => {
  
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
  
    const form = useForm<z.infer<typeof policeCaseFormSchema>>({
      resolver: zodResolver(policeCaseFormSchema),
      defaultValues: {
        defendantName: "",
        defendantAddress: "",
        defendantAge: "",
        defendantSex: "",
        defendantOccupation: "",
        placeOfOffense: "",
        nameOfIPO: "",
      },
    })
  
    async function onSubmit(data: z.infer<typeof policeCaseFormSchema>, isDraft: boolean) {

      console.log(data)


      let formDataSubmit = {

      }


      if (data.firstInformationReport) {
        data.firstInformationReport = await uploadFileToS3(data.firstInformationReport, 'jigawa-moj')
      }


      if (data.pictures) {

      }



      return setIsModalOpen(false);
      // const formData = new FormData()
      // Object.entries(data).forEach(([key, value]) => {
      //   if (value instanceof FileList) {
      //     for (let i = 0; i < value.length; i++) {
      //       formData.append(key, value[i])
      //     }
      //   } else if (value instanceof File) {
      //     formData.append(key, value)
      //   } else {
      //     formData.append(key, value as string)
      //   }
      // })
      // formData.append('isDraft', isDraft.toString())

      // console.log(formData)
      const result = await submitPoliceCase(data, isDraft)
      if (result.success) {
        setIsModalOpen(false)
        form.reset()
        router.refresh()
      } 
    }

  return (
    <div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className=' font-poppins'>Create a Case</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-w-[95%] rounded-lg mx-auto max-h-[80vh] overflow-y-auto">
              <DialogHeader className=' w-full flex items-center justify-center rounded-md py-2 '>
                <DialogTitle>Create a New Case</DialogTitle>
                <DialogDescription className=' border-b border-primary/50 mb-6 py-3'>
                  Fill in the details for the new case. You can submit or save as draft.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => onSubmit(data, false))} className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Defendant Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="defendantName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of the Defendant</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter defendant's name" {...field} />
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
                              <Input placeholder="Enter defendant's address" {...field} />
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
                              <Input type="number" placeholder="Enter defendant's age" {...field} />
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                              <Input placeholder="Enter defendant's occupation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Case Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="placeOfOffense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Commission of Offense</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter place of offense" {...field} />
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
                              <Input placeholder="Enter name of IPO" {...field} />
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
                        name="firstInformationReport"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>First Information Report</FormLabel>
                            <FormControl>
                              <Input
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
                              <Input
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
                              <Input
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
                              <Input
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
                              <Input
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
                              <Input
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
                    <Button type="button" variant="outline" onClick={() => form.handleSubmit((data) => onSubmit(data, true))()}>
                      <Save className="mr-2 h-4 w-4" />
                      Save as Draft
                    </Button>
                    <Button type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
    </div>
  )
}
