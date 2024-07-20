import { PatientForm } from '@/components/forms/PatientForm'
import { RegisterForm } from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params:{userId}}: SearchParamProps) => {
  const user = await getUser(userId);
   
  return (
    <div className="flex h-screen max-h-screen">  
       <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">
                <Image src="/assets/icons/medicare-logo.svg" alt="logo" height={1000} width={1000} className="mb-12 h-10 w-fit"/>
      

                <RegisterForm user={user}/>
                <div className="text-14-regular mt-20  flex justify-between">
                    <p className="justify-items-end xl:text-left">&copy; 2024 Medicare</p>
                    <Link href="/?admin=true" className="text-green-500">Admin</Link>
                </div>
            </div>
       </section>
       <Image src="/assets/images/medical.svg" alt="form-image" height={1000} width={1000} className="side-img max-w-[380px]"/>
    </div>
  )
}

export default Register