import Image from 'next/image'
import WebHeader from '@/components/WebHeader'
import WebFooter from '@/components/WebFooter'
import LoginForm from '@/components/LoginForm'
export default function Login() {
  return (
    <div className="w-full h-full">
    <WebHeader/>
    <main className="w-full h-[100vh] flex justify-center items-center py-[3rem] px-3">
      <LoginForm/>
    </main>
    <WebFooter/>
    </div>
  )
}
