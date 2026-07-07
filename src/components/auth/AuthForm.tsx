
'use client';

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth";
import { Icons } from "@/components/icons";

export function AuthForm() {
  return (
    <div className="space-y-4">
      <Button onClick={signInWithGoogle} className="w-full">
        <Icons.Google className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  );
}
