"use client"
import React from 'react'
import { Dispatch, SetStateAction, useState } from "react";
import { Appointment } from "@/types/appwrite.types";
import SubmitButton from '../SubmitButton';
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from '../CustomFormField';
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from 'next/navigation';
import { SelectItem } from '@/components/ui/select';
import { Doctors } from '@/constants';
import Image from 'next/image';
import { FaSearch } from "react-icons/fa";

const AppointmentForm = ({ userId,
    patientId,
    type = "create",
    appointment,
    setOpen,}
    :
    {
    userId: string;
    patientId: string;
    type: "create" | "schedule" | "cancel";
    appointment?: Appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);   

    const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
        name: "",
        email: "",
        phone: "",
    },
    });      
    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);
    
        try {
          const user = {
            name: values.name,
            email: values.email,
            phone: values.phone,
          };
    
          const newUser = await createUser(user);
    
          if (newUser) {
            router.push(`/patients/${newUser.$id}/register`);
          }
        } catch (error) {
          console.log(error);
        }
    
        setIsLoading(false);
      };
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi there 👋</h1>
        <p className="text-dark-700">Book an appointment</p>
      </section>

     {/* PRIMARY CARE PHYSICIAN */}
     <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
           
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
           
    </CustomFormField>  
    <div className='flex flex-col gap-6'>
        <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Appointment reason"
            placeholder="ex:Prefer afternoon appointments, if possible"
        />

        <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Additional comments/notes"
            placeholder="ex:Monthly checkups, Seasonal Injections"
        />
    </div>
    <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat='MM/dd/yyyy - h:mm aa'
    />
   
      <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
    </form>
  </Form>
  )
}

export default AppointmentForm