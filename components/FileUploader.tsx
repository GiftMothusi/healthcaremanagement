"use client"
import React,{useCallback} from 'react'
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import {useDropzone} from "react-dropzone";

type FileUploaderProps = {
    files: File[] | undefined;
    onChange: (file: File[]) => void;

}


const FileUploader = ({files,onChange}:FileUploaderProps) => {
  
    const onDrop = useCallback((acceptedFiles: File[])=>{
    onChange(acceptedFiles)
  },[])  

  const {getRootProps, getInputProps} = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='file-upload'>
        <input {...getInputProps()}/>
        {files && files?.length > 0  ? (
            <Image
                src={convertFileToUrl(files[0])}
                alt="uploaded_file"
                width={1000}
                height={1000}
                className='max-h-[400px] overflow-hidden object-cover'
            />
        ):
        <>
            <Image
                src="/assets/icons/upload.svg"
                alt="upload"
                width={40}
                height={40}
            />
            <div className='fiel-upload_label'>
                <p className='text-14-regular'>
                    <span className='text-green-500'>Click to upload {" "}</span>
                    or drag and drop your files here.
                </p>
                <p className='text-12-regular'>
                    SVG, PNG, JPG or GIF (max size: 800x400px)
                </p>
            </div>
        </>

        }
    </div>
  )
}

export default FileUploader