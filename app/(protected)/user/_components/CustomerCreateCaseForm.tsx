"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react";
import { CourtRegisterSchema, customerCreateCase, signUpSchema } from "@/lib/schema";
import { states } from "@/lib/jigawa";
import { localGovernment } from "@/lib/jigawa";
import { Gender } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormSuccess } from "@/components/FormSuccess";
import { FormError } from "@/components/FormError";
import { useRouter } from "next/navigation";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CourtRegistrationAction } from "@/actions/courts";
import { customerCreateCaseAction } from "@/actions/cases";


const caseType = [ 
  {
    id: 1,
    name: "Criminal",
  },
  {
    id: 2,
    name: "Civil",
  },
  {
    id: 3,
    name: "Family",
  },
  {
    id: 4,
    name: "Other",
  },
]


interface Files {
  title: string
  description: string
  url: string
}



export function CustomerCreateCaseForm() {

  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')
  const [files, setFiles] = useState<Files[]>([])

  const [name, setName] = useState<string>("")
  const [number, setNumber] = useState<string>("")


  const router = useRouter()



  const addToInfrastructure = (event: any) => {
    event.preventDefault()
    setFiles((prev: any) => {
      return [...prev, { name, number}]
    })

    setName("")
    setNumber("")
  }




  const deleteInfrastructure = (itemToDelete: string) => {
    setFiles((prev) => prev.filter((item) => item.title !== itemToDelete));
  };



  // create form schema
   const form = useForm<z.infer<typeof customerCreateCase>>({
    resolver: zodResolver(customerCreateCase),
    defaultValues: {
        title: "",
        description: "",
        caseType: undefined,
        files: undefined,
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof customerCreateCase>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      customerCreateCaseAction({...values, files: files }) 
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
    router.refresh()
  }



  return (
    <div className=" flex mt-6 flex-col">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
      <fieldset className=" border  border-primary rounded-lg space-y-8 flex py-4 px-6 flex-col text-center items-center align-middle justify-center">
        <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" > Case Informations</legend>
        <div className="grid text-start grid-cols-1 w-full gap-2">
          <FormField 
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Title</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isPending} className=" outline-green-500" placeholder="I was beaten by my neighbor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
       
       </div>

        <div className=" grid grid-cols-1 w-full items-start text-start">
            <FormField 
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe Your Case</FormLabel>
                      <FormControl>
                      <Textarea
                          placeholder="Case Description "
                          className="resize-none w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
        

        </div>
       <div className=" flex flex-col border-y border-primary py-2 space-y-4 my-2">
        <div className=" flex flex-col divide-y ">
          { files ? files.map((item: Files) => {
              return (
                <div key={item.title} className=" flex items-center  hover:bg-gray-100 hover:cursor-pointer space-x-4 w-full">
                 <div className=" w-full flex justify-between px-3 rounded-md  ">
                  <p> { item.title }</p>
                 </div>
                  <Button className=" text-red-500 hover:text-red-300 bg-transparent  " onClick={() => deleteInfrastructure(item.title)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  </Button>
                </div>
              )
            }) : ""
            }
        </div>
        <div className=" flex space-x-3 w-full text-start items-end">
            <div className=" flex flex-col justify-center w-full">
              <label htmlFor="" className=" text-sm font-semibold font-poppins">Name</label>
              <Input type="text" id="item" name="number" onChange={(e) => {setName(e.target.value)}} value={name} className=" outline-green-500 " />
            </div>
            <div className=" flex flex-col ">
              <label htmlFor="amount" className=" text-sm font-semibold font-poppins">Number</label>
              <Input type="text" id="number" onChange={(e) => { setNumber(e.target.value)}} value={number} name="number" className=" outline-green-500 " />
            </div>
            <div className=" flex flex-col ">
            <Button onClick={addToInfrastructure}>Add</Button>
            </div>
        </div>
       </div>
      </fieldset>
     
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-jgreen text-white w-full">Submit a Case</Button>
      </form>
    </Form>
    </div>
  )
}

