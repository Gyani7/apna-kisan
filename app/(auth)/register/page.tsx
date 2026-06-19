
import { Suspense } from "react";
import { UserAuthForm } from "@/components/UserAuthForm";
import { Shell } from "@/components/shell";

export default function RegisterPage() {
  return (
    <Shell>
      <Suspense fallback={<div>Loading...</div>}>
        <UserAuthForm />
      </Suspense>
    </Shell>
  );
}
