import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <AuthForm />
    </div>
  );
}
