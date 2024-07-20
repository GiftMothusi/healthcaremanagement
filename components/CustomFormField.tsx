"use client";
import React,{useState} from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/Patientform';
import Image from 'next/image';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core';



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

    const [value,setValue] = useState();

    const {fieldType,iconSrc,iconAlt,placeholder}= props;

      switch(fieldType){
        case FormFieldType.INPUT:
          return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400 p-2'>
                {props.iconSrc &&(
                    <Image src={iconSrc} alt={iconAlt || "form-icon"} width={24} height={24} className='ml-2'/>
                )}
                <FormControl>
                    <Input placeholder={placeholder} {...field} className='shad-input border-0'/>
                </FormControl>
          </div>)
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        defaultCountry='ZA'
                        withCountryCallingCode
                        international
                        placeholder={placeholder}
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

    const {control,name,label,fieldType} = props;
   
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>    
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>{label}</FormLabel>
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