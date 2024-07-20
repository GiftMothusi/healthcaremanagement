"use client"

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormvalidation } from "@/lib/validation"
import { useRouter } from "next/navigation"


export enum FormFieldType{
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "CHECKBOX",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON= "skeleton",
   
    
}

const Patientform=()=> {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormvalidation>>({
    resolver: zodResolver(UserFormvalidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
        
    },
  })
 
  // On Submit we need to add the user details to the database
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormvalidation>) {
    setIsLoading(true);

    try{
    
        /*
        const userData = {name,email,phone}

        //take that user data and pass it into the database, we will user appwrite 
        const user = await createUser(userData);

        //if we have that user then we will push to the router form
        if(user)
            router.push(`/patients/${user.$id}/register`)
        */

    }catch(err){
        console.error("Error submitting form: ", err);

    }



  }

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 ">
        <section className="mb-12 space-y-4 ">
            <h1 className="header">Hi There 👋🏽</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        {/**I turned FormField into a reusable component*/}
        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="name" label="Full name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user"  />
        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email" placeholder="Johndoe@gamil.com" iconSrc="/assets/icons/email.svg" iconAlt="email"  />
        <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control} name="phone" label="Phone Number" placeholder="+27"  />


        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default Patientform