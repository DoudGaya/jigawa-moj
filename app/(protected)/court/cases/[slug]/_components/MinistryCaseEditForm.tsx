'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { 
  Menu, 
  FileText, 
  Trash2, 
  Send, 
  Plus, 
  Save 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MinistryCaseSchema } from "@/lib/zod-schemas/case-schema"
import { uploadFileToS3, uploadMultipleFilesToS3 } from '@/awss3'
import { CaseSchemaWithAllRecords, CourtWithAllRecords } from '@/typings'
import { ScrollArea } from '@/components/ui/scroll-area'
import { updateMinistryCaseRecords } from '@/actions/admin'

// Assuming you have an updatePoliceCase action
// import { updatePoliceCase } from "@/actions/police"

export default function MinistryCaseEditForm({ existingCase, courts }: {
  existingCase: CaseSchemaWithAllRecords,
  courts: CourtWithAllRecords[]
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const router = useRouter()



  const form = useForm<z.infer<typeof MinistryCaseSchema>>({
    resolver: zodResolver(MinistryCaseSchema),
    defaultValues: {
      // ...existingCase,
      title: existingCase?.title || undefined,
      caseDescription: existingCase?.caseDescription || undefined,
      placeOfOffense: existingCase?.placeOfOffense || undefined,
      nameOfIPO: existingCase?.nameOfIPO || undefined,
      defendantAddress: existingCase?.defendantAddress || undefined,
      defendantAge: existingCase?.defendantAge || undefined,
      defendantName: existingCase?.defendantName || undefined,
      courtId: existingCase?.courtId || undefined,
      // yearOfFiling: existingCase?.yearOfFiling || undefined,
      defendantOccupation: existingCase?.defendantOccupation || undefined,
      courtRoom: existingCase?.courtRoom || undefined,
      underActs: existingCase?.underActs || undefined,
      // courtDate: existingCase?.courtDate || undefined,
      // courtTime: existingCase?.courtTime || undefined,
      // dateOfFiling: existingCase?.dateOfFiling || undefined,
      judgeName: existingCase?.judgeName || undefined,
      judgePhone: existingCase?.judgePhone || undefined,
      judgeEmail: existingCase?.judgeEmail || undefined,
      underSections: existingCase?.underSections || undefined,
      // @ts-ignore
      caseCouncil: existingCase?.caseCouncil || undefined,
      // @ts-ignore
      hearings: existingCase?.hearings || undefined,
      // caseStatus: existingCase?.caseStatus || undefined,
      files: undefined,
      tribunal: existingCase?.tribunal || undefined,
      caseType: existingCase?.caseType || undefined,
      defendantSex: existingCase?.defendantSex || undefined,
      FIR: undefined,
      medicalReport: undefined,
      pictures: undefined,
      statementOfComplainant: undefined,
      statementOfVictims: undefined, 
      statementOfWitness: undefined,
    },
  })

  const { fields: councilFields, append: appendCouncil, remove: removeCouncil } = useFieldArray({
    control: form.control,
    name: "caseCouncil",
  })

  const { fields: hearingFields, append: appendHearing, remove: removeHearing } = useFieldArray({
    control: form.control,
    name: "hearings",
  })

  async function onSubmit(data: z.infer<typeof MinistryCaseSchema>, isDraft: boolean) {
    try {
      let formDataToSubmit: any = { ...data };

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
        updateMinistryCaseRecords( existingCase.id, formDataToSubmit)
        .then((data) => {
            if (data.error) {
              setError(data.error)
            } else {
              setSuccess(data.message)
              toast("Case has been updated.")
              router.push('/court/cases')
              toast("Case has been updated.")
            }
          })
      })
    

    } catch (error) {
      console.error('Error processing form submission:', error);
    }
  }

  return (
    <div className=' max-w-6xl w-full mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data, false))} className="">
          <div className=" w-full bg-white py-4 px-6 rounded-md ">
            <h1 className=' text-xl font-bold font-poppins'>Update Case Record</h1>
          </div>
        <ScrollArea className='h-[calc(100vh-8rem)] py-10 px-4'>
         <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='flex flex-col space-y-8'>
            <div className='py-4 grid-cols-1 md:grid-cols-2'>
              <div className="flex flex-row">
                <h3 className="text-xl font-semibold mb-4 text-primary">Case Information</h3>
              </div>
              <Separator className='my-2 bg-green-300' />
              <div className="grid grid-cols-1 my-4 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Title</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} className='border-green-400' placeholder="Enter case title" {...field} />
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
                        <Textarea className='border-green-400 h-[200px]' disabled={isPending} placeholder="Case Description" {...field} />
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
                        <Input disabled={isPending} className='border-green-400' placeholder="Enter place of offense" {...field} />
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
                        <Input disabled={isPending} className='border-green-400' placeholder="Enter name of IPO" {...field} />
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
                        <Input disabled={isPending} className='border-green-400' placeholder="Under Act" {...field} />
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
                        <Input disabled={isPending} className='border-green-400' placeholder="Under Section" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

                  {/* DTATE OF FILING */}

                  <div className=" flex flex-col space-y-4">
            <div className=''>
              <div className=" py-6"> 
                <div className="flex flex-row">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Defendant Information</h3>
                </div>
                <Separator className=' bg-green-300' />
              <div className="grid py-4 gap-4">
                <FormField
                  control={form.control}
                  name="defendantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of the Defendant</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} className='border-green-400' placeholder="Enter defendant's name" {...field} />
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
                        <Input disabled={isPending} className='border-green-400' placeholder="Enter defendant's address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className=" gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="defendantAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} className='border-green-400' type="number" placeholder="Enter defendant's age" {...field} />
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
                          <Input disabled={isPending} className='border-green-400' placeholder="Enter defendant's occupation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
             </div>
            </div>
            <div className=''>
              <div className="flex flex-row">
                <h3 className="text-xl font-semibold mb-4 text-primary">Court Information</h3>
              </div>
              <Separator className='my-2 bg-green-300' />
              <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                <FormField
                  control={form.control}
                  name="courtId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Court</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Court" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courts.map((court) => (
                            <SelectItem key={court.id} value={court.id}>{court.courtName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Input disabled={isPending} className='border-green-400' placeholder="Enter court room" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className=' my-2 bg-green-300' />
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
                        <FormLabel>Judge Phone</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} className='border-green-400' placeholder="Judge Phone" {...field} />
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
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">File Uploads (Only if you want to update)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="FIR"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>First Information Report</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} className='border-green-400'
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
                        <Input disabled={isPending} className='border-green-400'
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
                        <Input disabled={isPending} className='border-green-400'
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
                        <Input disabled={isPending} className='border-green-400'
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
                        <Input disabled={isPending} className='border-green-400'
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
                        <Input disabled={isPending} className='border-green-400'
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

            </div>
          </div>

          {/* OTHER GRID SECITON  */}

                 {/* Case Council Section */}
           <div className=" w-full">
           <div className="py-2 flex flex-col space-y-4 w-full">
              <h3 className="text-xl font-semibold mb-4 text-primary">Case Council</h3>
              <Separator className="my-2 bg-green-300" />
              {/* <div className="  flex flex-col space-y-3">
                  {councilFields.map((field, index) => (
                    <div key={field.id} className=" bg-white rounded-lg grid-cols-2 gap-4 grid px-4 py-4 border border-green-300">
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
                        name={`caseCouncil.${index}.role`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter role" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className=" w-full flex space-x-3 col-span-2">
                      <FormField

                        control={form.control}
                        name={`caseCouncil.${index}.address`}
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeCouncil(index)}
                        className="mt-8 px-3 flex items-center justify-center"
                      >
                        <span className=' hidden'>Remove</span>
                        <Trash2 className="h-4 flex-none w-4" />
                      </Button>
                      </div>
                    </div>
                  ))}
              </div> */}
              <Button
                type="button"
                variant="outline"
                className=' py-2'
                size="sm"
                onClick={() => appendCouncil({ name: '', email: '', phone: '', role: '', address: '' })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Case Council
              </Button>
            </div>

            {/* Hearings Section */}
            <div className="py-4">
              <h3 className="text-xl font-semibold mb-4 text-primary">Hearings</h3>
              <Separator className="my-2 bg-green-300" />
              {hearingFields.map((field, index) => (
                <div key={field.id} className="grid bg-white rounded-lg px-3 py-4 grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name={`hearings.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`hearings.${index}.time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input {...field} type="time" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    // @ts-ignore
                    name={`hearings.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter hearing description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeHearing(index)}
                    className="mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                // @ts-ignore
                onClick={() => appendHearing({ date: new Date(), time: '', description: '' })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Hearing
              </Button>
            </div>

           </div>

      
         

          <div className="md:flex grid grid-cols-2 gap-4 md:justify-end space-x-4">
           
            <Button disabled={isPending} type="submit">
              <Send className="mr-2 h-4 w-4" />
              Update Case
            </Button>
          </div>
         </div>
      </ScrollArea>
        </form>
      </Form>
    </div>
  )
}