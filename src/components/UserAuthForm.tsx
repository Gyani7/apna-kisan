
"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Spinner, GithubIcon, GoogleIcon } from "@/components/icons"; 
import { useGuest } from "@/app/guest-provider";
import { Button } from "@/components/ui/button";
import { EmailForm } from "./EmailForm";
import { PhoneForm } from "./PhoneForm";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [authMethod, setAuthMethod] = React.useState<"email" | "phone">("email");
  const { setGuestId } = useGuest();
  const router = useRouter();

  const handleGuestMode = () => {
    setGuestId("guest");
    router.push('/');
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
       <Button variant="outline" onClick={handleGuestMode}>Continue as Guest</Button>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
                Or sign in with
            </span>
            </div>
        </div>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Button variant={authMethod === 'email' ? 'secondary' : 'ghost'} onClick={() => setAuthMethod('email')}>Email</Button>
        <Button variant={authMethod === 'phone' ? 'secondary' : 'ghost'} onClick={() => setAuthMethod('phone')}>Mobile OTP</Button>
      </div>
      {authMethod === 'email' ? <EmailForm /> : <PhoneForm />}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
       <div className="grid grid-cols-2 gap-4">
        <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
            setIsGoogleLoading(true);
            signIn("google");
            }}
            disabled={isLoading || isGoogleLoading}
        >
            {isGoogleLoading ? (
            <Spinner role="status" className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <GoogleIcon className="mr-2 h-4 w-4" />
            )}{ " "}
            Google
        </button>
        <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
            setIsGitHubLoading(true);
            signIn("github");
            }}
            disabled={isLoading || isGitHubLoading}
        >
            {isGitHubLoading ? (
            <Spinner role="status" className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <GithubIcon className="mr-2 h-4 w-4" />
            )}{ " "}
            Github
        </button>
      </div>
    </div>
  );
}
