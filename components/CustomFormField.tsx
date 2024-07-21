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
import "react-datepicker/dist/react-datepicker.css";
import { E164Number } from 'libphonenumber-js/core';
import DatePicker from "react-datepicker";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';



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
    label?: string,
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
            </div>
          )
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        defaultCountry='ZA'
                        withCountryCallingCode
                        international
                        placeholder={props.placeholder}
                        onChange={field.onChange}
                        value={field.value as E164Number | undefined}  
                        className='input-phone'
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                   <Image src="/assets/icons/calendar.svg" alt="calendar" height={24} width={24} className='ml-'/>
                   <FormControl>
                        <DatePicker selected={field.value} onChange={(date)=>field.onChange(date)} showTimeSelect={props.showTimeSelect ?? false} dateFormat={props.dateFormat ?? "MM/dd/yyyy"} timeInputLabel="Time:" wrapperClassName='date-picker'/>
                   </FormControl>
                </div>
            )
         case FormFieldType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={props.placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
             )

        case FormFieldType.TEXTAREA:
            return(
                <FormControl>
                    <Textarea placeholder={props.placeholder} {...field} className='shad-textArea' disabled={props.disabled} />
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className='flex items-center gap-4 p-4'>
                        <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange}/>
                        <label htmlFor={props.name} className='checkbox-label'>
                            {props.label}
                        </label>
                    </div>  
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