"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";


export const RegisterForm = ({user}: {user: User}) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Personal Information</h2>
        </section>

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            />

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            />

            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="+27 66 328 1232"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Date of birth"
                placeholder="select your birth date"
            />

            <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="gender"
                label="Gender"
                renderSkeleton={(field)=>(
                <FormControl>
                    <RadioGroup  className="flex h-11 gap-6 xl:justify-center" onChange={field.onChange} defaultValue={field.value}>
                        {GenderOptions.map((option)=>(
                            <div key={option} className="radio-group">
                                <RadioGroupItem value={option} id={option}/>
                                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>)}
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label="Address"
                placeholder="ex: 6511 Main Street, Sandton"
                />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Occupation"
                placeholder="Lawyer"
            />   
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeholder="Gaurdain's name"
                />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="+27 66 328 1232"
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
            </div>

            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Primary Provider"
                placeholder="Select a Physician"
                
            >
            {Doctors.map((doctor,index)=>(
                <SelectItem key={doctor.name + index} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image src={doctor.image} alt="doctor_display_picture" width={20} height={20}/>
                        <p>{doctor.name}</p>
                    </div>
                </SelectItem>
                
                
            ))}

            </CustomFormField>
        
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                label="Insurance Provider"
                placeholder="ex:Gems"
                
                />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="Insurance Policy Number"
                placeholder="ex:1293749213"
            />   
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                label="Allergies( if any)"
                placeholder="ex:Peanuts"
                
                />

            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                label="Current Medications"
                placeholder="ex: Ibuprofen"
            />   
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label="Family Medical History (if any)"
                placeholder="ex: Mother has diabetes"
                
                />

            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Past Medical History (if any)"
                placeholder="ex: Asthma, Sinus"
            />   
        </div>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
            </div>

            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="identificationType"
                label="Identification Type"
                placeholder="Select Identification Type"
            >
                {IdentificationTypes.map((idType,index)=>(
                    <SelectItem key={idType + index} value={idType} >
                        <div className="items-center gap-2">
                            {idType}
                        </div>
                    </SelectItem>
                    ))

                }
            </CustomFormField>

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="identificationNumber"
                label="Identification Number"
                placeholder="97393219413"
            />
            <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="identificationDocumentId"
                label="Scanned Copy of Identification Document"
                renderSkeleton={(field)=>(
                    <FormControl>
                        <FileUploader files={field.value} onChange={field.onChange}/>
                    </FormControl>
                )}
            />
        </section>
               
        <section>
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Consent and Privacy</h2>
            </div>

            <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="treatmentConsent"
                label="I consent to receive treatment for my health condition."
            />
            <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="disclosureConsent"
                label="I consent to the use and disclosure of my health information for treatment purposes."
            />
            <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="privacyConsent"
                label="I acknowledge that I have reviewed and agree to the privacy policy"
                
            />
            

        </section>
        

     

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};