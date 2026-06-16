
import { AuthForm } from '@/components/common/AuthForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Login to Apna Kisan</h1>
        <AuthForm type="login" />
      </div>
    </div>
  )
}
