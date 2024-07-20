"use client";
import React,{useState} from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { E164Number } from 'libphonenumber-js/core';



export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label: string,
    placeholder?: string,
    icon?: React.ReactNode,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field:any) => React.ReactNode,
  
}

const RenderField = ({field,props}:{field:any;props:CustomProps}) =>{
    switch(props.fieldType){
        case FormFieldType.INPUT:
          return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                {props.iconSrc &&(
                    <Image src={props.iconSrc} alt={props.iconAlt || "form-icon"} width={24} height={24} className='ml-2'/>
                )}
                <FormControl>
                    <Input placeholder={props.placeholder} {...field} className='shad-input border-0'/>
                </FormControl>
          </div>)
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        defaultCountry='US'
                        withCountryCallingCode
                        international
                        placeholder={props.placeholder}
                        onChange={field.onChange}
                        value={field.value as E164Number | undefined}  
                        className='input-phone'
                    />
                </FormControl>
            )
        
            
               
            
        default:
          return null;
      }
}


const CustomFormField = (props: CustomProps) => {

  const {control,name,label} = props;
   
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>    
                {props.fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel className='shad-input-label'>{label}</FormLabel>
                )}

            <RenderField
                field={field}
                props={props}
            />   
            <FormMessage className='shad-error'/>

            </FormItem>
          )}
       />
  )
}

export default CustomFormField