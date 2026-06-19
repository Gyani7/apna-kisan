
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/icons";

const userAuthSchema = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
});

type FormData = z.infer<typeof userAuthSchema>;

export function PhoneForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: data.phone }),
      });

      if (!res.ok) {
        throw new Error('Failed to send OTP');
      }

      router.push(`/otp?phone=${data.phone}`);
    } catch (error) {
      toast({
        title: "Error sending OTP",
        description: "Please check your phone number and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Enter your mobile number"
            type="tel"
            disabled={isLoading}
            {...register("phone")}
          />
          {errors?.phone && <p className="px-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <button className={cn(buttonVariants())} disabled={isLoading}>
          {isLoading && <Spinner role="status" className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with OTP
        </button>
      </div>
    </form>
  );
}
