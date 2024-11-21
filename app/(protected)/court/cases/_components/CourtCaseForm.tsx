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

  import { Plus, Trash2 } from 'lucide-react'
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
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTransition } from 'react'
import { MinistryCaseSchema } from "@/lib/zod-schemas/case-schema"
import { uploadFileToS3, uploadMultipleFilesToS3 } from '@/awss3'
import { CourtWithAllRecords } from '@/typings'
import { submitMinistryCaseRecords } from '@/actions/admin'
import { CaseType } from '@prisma/client'



export const MinistryCaseForm = ({courts}: {
  courts: CourtWithAllRecords[]
}) => {
  
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
        courtId: "",
        defendantOccupation: "",
        courtRoom: "",
        underActs: "",
        courtDate: "",
        courtTime: "",
        judgeName: "",
        judgePhone: "",
        judgeEmail: "",
        underSections: "",
        // caseCouncil: [],
        caseStatus: undefined,
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

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "caseCouncil",
    })

    async function onSubmit(data: z.infer<typeof MinistryCaseSchema>, isDraft: boolean) {

      // console.log("submitting data", data)
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

          setError('')
          setSuccess('')
      
          startTransition(() => {
            // console.log('Submitting form data:', formDataToSubmit)
            submitMinistryCaseRecords(formDataToSubmit, isDraft)
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
                <form onSubmit={form.handleSubmit((data) => {
                  return onSubmit(data, false)
                })} className="space-y-8">
                  <div className=' flex flex-col space-y-8'>
                  <div className=' py-4'>
                   <div className=" flex flex-row ">
                      <h3 className="text-xl font-semibold mb-4 text-primary">Case Information</h3>
                   </div>
                    <Separator className=' my-2 border-green-300' />
                    <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
                    <div className=" col-span-2">
                      <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Case Title</FormLabel>
                              <FormControl>
                                <Input disabled={isPending} className=' border-green-400' placeholder="case Title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                    </div>
                    <FormField
                        control={form.control}
                        name="caseType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Type</FormLabel>
                            <FormControl>
                              <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Case Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={CaseType.Criminal}>Criminal</SelectItem>
                                    <SelectItem value={CaseType.Civil}>Civil</SelectItem>
                                    <SelectItem value={CaseType.Family}>Family</SelectItem>
                                    <SelectItem value={CaseType.Other}>Other</SelectItem>
                                  </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     <div className=" col-span-3 w-full">
                     <FormField
                        control={form.control}
                        name="caseDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Description</FormLabel>
                            <FormControl>
                              <Textarea className=' h-[150px] border-green-400' disabled={isPending} placeholder="Case Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     </div>
                    </div>

                    <div className="grid grid-cols-1 my-4 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="placeOfOffense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Place of Offense</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className=' border-green-400' placeholder="Place of offense" {...field} />
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
                              <Input disabled={isPending} className=' border-green-400' placeholder="Enter name of IPO" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="underActs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Under Acts</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className=' border-green-400' placeholder="Under Act" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="underSections"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Under Sections</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className=' border-green-400' placeholder="Under Section" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>


                  {/* <Separator about='Text' /> */}

                  <div className=' py-4'>
                   <div className=" flex flex-row ">
                      <h3 className="text-xl font-semibold mb-4 text-primary">Court Information</h3>
                   </div>
                    <Separator className=' my-2 border-green-300' />
                    <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
          
                     <FormField
                        control={form.control}
                        name="judgeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Judge Name </FormLabel>
                            <FormControl>
                                <Input disabled={isPending} className=' border-green-400' placeholder="Judge Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     <FormField
                        control={form.control}
                        name="judgePhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Judge Room</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className='border-green-400' placeholder="Court Room" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     <div className=" grid gap-3 ">
                      <FormField
                        control={form.control}
                        name="judgeEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Judge Email </FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className=' border-green-400' placeholder="Judge Email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     </div>
                      
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4">
          
                      <FormField
                        control={form.control}
                        name="courtId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Court </FormLabel>
                            <FormControl>
                            <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Court" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {
                                      courts.map((court) => {
                                        return (
                                          <SelectItem key={court.id} value={court.id}>{court.courtName}</SelectItem>
                                        )
                                      })
                                    }
                                  </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="courtRoom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Court Room</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className='border-green-400' placeholder="Court Room" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className=" grid gap-3 grid-cols-2">
                      <FormField
                        control={form.control}
                        name="courtDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Court Date </FormLabel>
                            <FormControl>
                              <Input disabled={isPending} type='date' className=' border-green-400' placeholder="Court Date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                        <FormField
                        control={form.control}
                        name="courtTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Court Time</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} type='time' className=' border-green-400' placeholder="Court Time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    
                      </div>
           
                  </div>
                  </div>
                    <h3 className="text-xl text-green-600 font-semibold mb-4">Defendant Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                     
                      <FormField
                        control={form.control}
                        name="defendantName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of the Defendant</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className=' border-green-400' placeholder="Enter defendant's name" {...field} />
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
                              <Input disabled={isPending} className=' border-green-400' placeholder="Enter defendant's address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <div className=" col-span-2 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="defendantAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className=' border-green-400' type="number" placeholder="Enter defendant's age" {...field} />
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
                            <FormLabel>Defendant Gender</FormLabel>
                            <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Gender" />
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
                              <Input disabled={isPending} className=' border-green-400' placeholder="Enter defendant's occupation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    </div>

                    <Separator />
                      {/* <div className="py-4">
                        <h3 className="text-xl font-semibold mb-4 text-primary">Case Council</h3>
                        <Separator className="my-2 border-green-300" />
                        {fields.map((field, index) => (
                          <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                            <FormField
                              control={form.control}
                              name={`caseCouncil.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`caseCouncil.${index}.email`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="email" placeholder="Enter email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`caseCouncil.${index}.phone`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter phone number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`caseCouncil.${index}.address`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter address" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                           <div className=" flex space-x-2 items-end justify-end">
                           <FormField
                              control={form.control}
                              name={`caseCouncil.${index}.role`}
                              render={({ field }) => (
                                <FormItem className=' w-full'>
                                  <FormLabel>Role (Optional)</FormLabel>
                                  <FormControl>
                                    <Input className='w-full bg-green-100' {...field} placeholder="Enter role" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => remove(index)}
                              className=" self-end flex-none"
                            >
                              <Trash2 className="h-4 flex-none w-4" />
                            </Button>
                           </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className=''
                          onClick={() => append({ name: '', email: '', phone: '', address: '', role: '' })}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Case Council
                        </Button>
                      </div> */}
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">File Uploads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="FIR"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>First Information Report</FormLabel>
                            <FormControl>
                              <Input disabled={isPending} className=' border-green-400'
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
                              <Input disabled={isPending} className=' border-green-400'
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
                              <Input disabled={isPending} className=' border-green-400'
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
                              <Input disabled={isPending} className=' border-green-400'
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
                              <Input disabled={isPending} className=' border-green-400'
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
                              <Input disabled={isPending} className=' border-green-400'
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
                    <Button disabled={isPending} type="submit">
                      <Send className="mr-2 h-4 w-4" />
                        {isPending ? <BeatLoader size={8} color="#fff" /> : "Submit"}
                    </Button>
                  </div>
                </form>
          </Form>
    </div>
  )
}
