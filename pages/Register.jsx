import Image from 'next/image'
import WebHeader from '@/components/WebHeader'
import WebFooter from '@/components/WebFooter'
import RegisterForm from '@/components/RegisterForm'
export default function Register() {
  return (
    <div className="w-full h-full">
    <WebHeader/>
    <main className="w-full h-[100vh] flex justify-center items-center py-[3rem] px-3">
      <RegisterForm/>
    </main>
    <WebFooter/>
    </div>
  )
}
