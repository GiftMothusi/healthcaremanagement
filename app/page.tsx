import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggleTheme";
import Patientform from "@/components/forms/Patientform";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">  
   
       <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">
                <Image src="/assets/icons/medicare-logo.svg" alt="logo" height={1000} width={1000} className="mb-12 h-10 w-fit"/>
                <Patientform/>
                <div className="text-14-regular mt-20  flex justify-between">
                    <p className="justify-items-end xl:text-left">&copy; 2024 Medicare</p>
                    <Link href="/?admin=true" className="text-green-500">Admin</Link>
                </div>
            </div>
       </section>
       <Image src="/assets/images/form-image.jpg" alt="form-image" height={1000} width={1000} className="side-img max-w-[50%]"/>
    </div>
  );
}
