"use client";
import React from 'react'
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



interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field:any) => React.ReactNode,
  
}

const RenderField = ({field,props}:{field:any;props:CustomProps}) =>{
    return (
        <Input
            type="text"
            placeholder="Enter your text"
         
        />
    )
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