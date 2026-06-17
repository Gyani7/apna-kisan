import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    return redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login to Apna Kisan</h1>
        <AuthForm />
      </div>
    </div>
  );
}
