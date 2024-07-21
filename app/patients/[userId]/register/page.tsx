import {redirect} from 'next/navigation';
import RegisterForm from '@/components/forms/RegisterForm';
import { getPatient, getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const Register = async ({params:{userId}}: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);


  if(patient) redirect(`/patients/${userId}/new-appointment`)
   
  return (
    <div className="flex h-screen max-h-screen">  
       <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">
                <Image src="/assets/icons/medicare-logo.svg" alt="logo" height={1000} width={1000} className="mb-12 h-10 w-fit"/>
      

                <RegisterForm user={user}/>
                <p className="copyright py-12">&copy; 2024 Medicare</p>
               
            </div>
       </section>
       <Image src="/assets/images/medical.svg" alt="form-image" height={1000} width={1000} className="side-img max-w-[380px]"/>
    </div>
  )
}

export default Register