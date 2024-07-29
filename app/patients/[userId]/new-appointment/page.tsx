import React from 'react'
import Image from 'next/image'
import { getPatient} from '@/lib/actions/patient.actions'
import AppointmentForm from '@/components/forms/AppointmentForm'

const NewAppointment = async ({params:{userId}}: SearchParamProps) => {

  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">  
    {/**TODO: OTP Verification / Passkey Modal */}

       <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[860px] flex-1 justify-center">
                <Image src="/assets/icons/medicare-logo.svg" alt="logo" height={1000} width={1000} className="mb-12 h-10 w-fit"/>
                    <AppointmentForm patientId={[patient?.$id]}  userId={userId} type="create"/>
            </div>
       </section>
       <Image src="/assets/images/medical.svg" alt="form-image" height={1000} width={1000} className="side-img max-w-[380px] bg-bottom"/>
    </div>
  )
}

export default NewAppointment